
Add the rest-client config to the vs-code settings.json. Code > Preferences > Settings. 

```JSON
"rest-client.environmentVariables": {
    "$shared": {
        "@accessToken": ""
    },
    "local":{
        "authEndpoint": "http://localhost:2000",
        "apiServer": "http://localhost:3003",
        "cdsServer": "http://localhost:4004",
        "username": "********",
        "password": "********"
    }
}
```

![Settings](../screenshots/settings.png?raw=true "Optional Title")