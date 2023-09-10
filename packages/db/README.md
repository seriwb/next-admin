# DB

## Environments

Set following environments at applications.

- DATABASE_URL


## Connect database

```
psql postgresql://admin:admin@127.0.0.1:5432/next_admin
```

## Create migration

```
yarn run prisma migrate dev --name first-migration
```
