
To run the example with in multitenant mode, we must enable the xsuaa authentication microservice. Create a `xs-security.json` file with the following content:

```JSON
{
    "xsappname": "pg-tacoshop",
    "tenant-mode": "shared",
    "scopes": [
        {
            "name": "$XSAPPNAME.Callback",
            "description": "With this scope set, the callbacks for tenant onboarding, offboarding and getDependencies can be called.",
            "grant-as-authority-to-apps": [
                "$XSAPPNAME(application,sap-provisioning,tenant-onboarding)"
            ]
        },
        {
            "name": "$XSAPPNAME.Administrator",
            "description": "Administrate the application"
        },
        {
            "name": "$XSAPPNAME.User",
            "description": "Use the application"
        }
    ],
    "role-templates": [
        {
            "name": "Administrator",
            "description": "Administrator",
            "scope-references": [
                "$XSAPPNAME.Administrator"
            ]
        },
        {
            "name": "User",
            "description": "User",
            "scope-references": [
                "$XSAPPNAME.User"
            ]
        }
    ],
    "role-collections": [
        {
            "name": "tacoshop_Administrator",
            "description": "tacoshop Administrator",
            "role-template-references": [
                "$XSAPPNAME.Administrator",
                "$XSAPPNAME.User"
            ]
        },
        {
            "name": "tacoshop_User",
            "description": "tacoshop User",
            "role-template-references": [
                "$XSAPPNAME.User"
            ]
        }
    ]
}
```

Create new xsuaa service and key then view credentials:

```
cf create-service xsuaa application pg-tacoshop-uaa -c ./xs-security-vscode.json
cf create-service-key pg-tacoshop-vscode-uaa default
cf service-key pg-tacoshop-vscode-uaa default

```