# ChatCenter

## Config the enviroment variables
Before the start, your must config enviroment variables of general.
Remember within each project it is also necessary to configure environment variables

#### Intructions:
- Copy the file '.env.example'
- Change the name '.env.example' to '.env'
- open file and complete the variables

Example
```
// POSTGRES
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=

// RABBITMQ
RABBITMQ_DEFAULT_USER=
RABBITMQ_DEFAULT_PASS=
```

## Start

Run build of docker-compose for development
```bash
docker-compose -f docker-compose.dev build
```

Run build
```bash
docker-compose -f docker-compose.dev up
```
