# Listem API

## Requirements

- [PostgreSQL](https://www.postgresql.org/) - PostgreSQL database
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [npm](https://www.npmjs.com/) - Node.js dependency manager
- [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools/) - Build Tools for Windows

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
   $ npm run db:create
   $ NODE_ENV=test npm run db:create
   ```

2. Run all migrations:

   ```
   $ npm run db:migrate
   $ NODE_ENV=test npm run db:migrate
   ```

### IDE

IntelliJ IDEA / WebStorm / PhpStorm:

1. Install the following plugins:

   - [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier)
   - [EditorConfig](https://plugins.jetbrains.com/plugin/7294-editorconfig)
   - [.ignore](https://plugins.jetbrains.com/plugin/7495--ignore)

2. Go to `File > Settings > Languages & Frameworks > JavaScript > Prettier`

   Check run for files `On save` and use below as a value:

   ```
   {**/*,*}.{js,json,md,yml}
   ```

From now on every change in code base will be automatically formatted by [Prettier](https://prettier.io/).

## Development

Run server and start hacking:

```
$ npm start
```

## Tests

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

## Documentation

1. Run server:

   ```
   $ npm start
   ```

2. Explore API docs at [http://localhost:3001/api/docs/](http://localhost:3001/api/docs/)

3. Edit `docs/swagger.yml` file to update API docs.
