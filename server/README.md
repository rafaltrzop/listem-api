# Listem API

## Setup

Install dependencies:

```
$ npm install
```

## Environment variables

Copy example file and edit it providing correct data:

```
$ cp .env.example .env
$ vim .env
```

## Database

1. Create database:

    ```
    $ node_modules/.bin/sequelize db:create
    ```

2. Run all migrations:

    ```
    $ node_modules/.bin/sequelize db:migrate
    ```
