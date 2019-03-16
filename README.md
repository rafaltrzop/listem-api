# Listem API

## Requirements

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [npm](https://www.npmjs.com/) - dependency manager

## Setup

### Dependencies

Install dependencies:

```
$ npm install
```

### Environment variables

Copy example file and edit it providing correct data:

```
$ cp .env.example .env
$ vim .env
```

### Database

1. Create development and test databases:

   ```
   $ npx sequelize db:create
   $ NODE_ENV=test npx sequelize db:create
   ```

2. Run all migrations:

   ```
   $ npx sequelize db:migrate
   $ NODE_ENV=test npx sequelize db:migrate
   ```

### Development

Run server and start hacking:

```
$ npm start
```

### Tests

1. Run tests:

   ```
   $ npm test
   ```

2. Run tests in watch mode:

   ```
   $ npm run test:watch
   ```

3. Generate code coverage report:

   ```
   $ npm run test:coverage
   ```

### Documentation

1. Run server:

   ```
   $ npm start
   ```

2. Explore API docs at [http://localhost:3001/api-docs/](http://localhost:3001/api-docs/)

3. Edit `swagger.yaml` file to update API docs.
