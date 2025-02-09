## Project setup

```bash
$ npm install
```

Create .env

```bash
cp .env.example env
```

```bash
# set up database
$ docker compose up -d
```

```bash
$ npm run start
```

## Run tests

```bash
$ npm run test
```

## What's have been done

- Basic application archtecture (see more below)
- Get client by id (`GetClientQuery`)
- Create new client (`CreateClientCommand`)
- Unit tests

## Todo

- Update client
- Delete client
- Get health_report by client
- Create health_report by client
- Delete health_report by client
- Deduplicate script

## Hexagonal Architecture

- This project follows CQRS pattern: (https://docs.nestjs.com/recipes/cqrs#installation)
- This project follows Hexagonal architecture:
  - `domain`: Core business entity and logic
  - `application`: Different use cases. Each business demand should be a separated action
  - `infrastructure`: Connection to outside world. `infrastructure/persistence` for DB interaction, `infrastructure/presentation` for HTTP, GraphQL interaction

## Testing

- Inside `infrastructure/persistence`, we have a mock repository alongs side the real repository. We can use this mock repository to unit test domain/application without having to mock a Prisma connection each time
