# Admin

# for Developers

## 0. start containers

```
$ docker compose up -d
```

## 1. install

```
$ cat .node-version | nodenv install
$ yarn
```

## 2. create .env.local

create .env.local from .env.template and edit it.

```
cp .env.template .env.local
```

## 3. start local application

```
$ yarn dev
```

- http://localhost:3500/

##  4. create first account

- http://localhost:3500/firstuser


# Storybook

```
$ yarn sb
```

- http://localhost:6506