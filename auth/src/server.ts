import express from "express";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import qs from "qs";
import passport from "passport";
import {parseDomain, ParseResultType} from "parse-domain";

const port = (process.env.PORT || 2000);
const app = express();

app.use(express.json());

/* tslint:disable-next-line */
const xsenv = require('@sap/xsenv');

/* tslint:disable-next-line */
const xssec = require('@sap/xssec');

const env = xsenv.loadEnv();
const services = xsenv.getServices({ uaa: {tags: 'xsuaa', plan: 'application' }});

const parseIdentityZone = (hostname: string) : string => {
    let identityzone = '' as string;
    const parseResult = parseDomain(hostname);

        if (parseResult.type === ParseResultType.Listed) {
            const {subDomains, domain, topLevelDomains} = parseResult;
            identityzone = parseResult.subDomains[0].replace("-shipping-exeuction-auth","");

            // Remove '-test' space for CF enabled account
            identityzone = identityzone.replace("skipum-cf-eu-test","skipum-cf-eu");
        } else {
            identityzone = services.uaa.identityzone;
        }
    return identityzone;
}

const authorize = (iUsername : string, iPassword: string, identityzone: string ) : any => {
    return new Promise((resolve, reject) => {

        const url = 'https://' + identityzone + '.' + services.uaa.uaadomain + '/oauth/token';

        const config = {
            headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
              }
          };

        const requestBody = {
            username        : iUsername,
            password        : iPassword,
            client_id       : services.uaa?.clientid,
            client_secret   : services.uaa?.clientsecret,
            grant_type      : 'password',
            // login_hint      : {"origin":"sap.custom"},
            response_type   : 'token'
        };

        axios.post(url, qs.stringify(requestBody), config)
        .then((response: any )=> {
            resolve(response.data);
        }).catch((e: any) => {
            reject('unauthorized');
        });
    });
};


app.use(passport.initialize());
passport.use('JWT', new xssec.JWTStrategy(services.uaa));

// health-check
app.get('/health', (request, response) => {
    const healthCheck = { status: "Healhty" };
    return response.status(200).send(healthCheck);
});

app.post( "/oauth/token", async (request, response ) => {
    try {
        const authToken = await authorize(request.body.username, request.body.password, parseIdentityZone(request.hostname));
        return response.status(200).send(authToken);

    } catch (error) {
        return response.status(422).send('unauthorized');
    }

});

app.get("/identityzone", (request, response) => {
    // return identityzone
    return response.status(200).send({IdentityZone: parseIdentityZone(request.hostname)});
});

app.get("/hostname", (request, response) => {
    // return hostname
    return response.status(200).send({ hostname: request.hostname });
});

app.use('/secure*', passport.authenticate('JWT', { session: false }));

app.get('/secure/whoami', (request: any, response) => {
        const info = {
            'userInfo'  : request?.user,
            'subdomain' : request?.authInfo.getSubdomain(),
            'tenantId'  : request?.authInfo.getZoneId(),
            'scopes'    : {
                User: request.authInfo.checkScope('$XSAPPNAME.User'),
                Administrator: request.authInfo.checkScope('$XSAPPNAME.Administrator'),
                Onboarding: request.authInfo.checkScope('$XSAPPNAME.Onboarding')
            }
        };
        response.status(200).json(info);
});


// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );