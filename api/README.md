# ChatCenter - api

## Config the enviroment variables
Before the start, your must config enviroment variables.

#### Intructions:
- Copy the file '.env.example'
- Change the name '.env.example' to '.env'
- open file and complete the variables

Example
```
// CONFIG
PORT=
DEV=

// PG
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=

// AWS
S3_SECRET_ACCESS_KEY=
S3_ACCESS_KEY_ID=
S3_BUCKET=
```

## Start

Run development mode
```bash
npm run dev
```

Run production mode
```bash
npm start
```