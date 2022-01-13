# CAP tacoshop using PostgreSQL for persistence

## Local execution

### Prerequisites

To get started quickly you need docker and docker-compose.

### Setup

To run the example with a local PostgreSQL DB in docker create a `default-env.json` file with the following content:

```JSON
{
  "VCAP_SERVICES": {
    "postgres": [
      {
        "name": "postgres",
        "label": "postgres",
        "tags": ["plain", "database"],
        "credentials": {
          "host": "localhost",
          "port": "5432",
          "database": "tacoshop",
          "user": "postgres",
          "password": "postgres"
        }
      }
    ]
  }
}
```


Start the PostgreSQL database and [Adminer](https://www.adminer.org/) using:

`npm run docker:start:pg`


Now deploy the database schema using [cds-dbm](https://github.com/mikezaschka/cds-dbm) with the command:

`npm run deploy:pg`

Then open [http://localhost:8080/](http://localhost:8080/) and login by selecting System _PostgreSQL_, Server: _tacoshop-postgresql_, Username _postgres_ and Password _postgres_. The database _tacoshop_ should already exist as you've just deployed it. If you have issues with the deployment you can run the SQL commands via adminer. You find them in the file _tacoshop.sql_.

Now you can start the CAP application by using:

`cds run`

Then open <http://localhost:4004/odata/v4/AdminService/UnitOfWeights> in the browser and you should see:
```JSON
// http://localhost:4004/odata/v4/AdminService/UnitOfWeights
{
  "@odata.context": "$metadata#UnitOfWeights",
  "value": [
    {
      "Symbol": "G",
      "Name": "Gram"
    },
    {
      "Symbol": "KG",
      "Name": "Kilogram"
    },
    {
      "Symbol": "LBS",
      "Name": "Pound"
    },
    {
      "Symbol": "OZ",
      "Name": "Ounce"
    }
  ]
}
```