# Listem API

## Dependencies

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
    $ $(npm bin)/sequelize db:create
    ```

2. Run all migrations:

    ```
    $ $(npm bin)/sequelize db:migrate
    ```

## Documentation

1. Run server:

    ```
    $ npm start
    ```

2. Explore API docs at [http://localhost:3001/api-docs/](http://localhost:3001/api-docs/)
