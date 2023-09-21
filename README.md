# challange-danske

## Index
1. [Old Code Problems Review](#old-code-problems-review)
2. [New Code Completion list](#new-code-completion-list)
3. [Running new code](#running-new-code)
   1. [Setup firebase env](#setup-firebase-env)
   2. [Using docker compose](#using-docker-compose)
   3. [Or using bun](#or-using-bun)

## Old Code Problems Review
1. Missing .gitignore.
2. Missing manifest file.
3. Loops don't have unique keys.
4. Using deprecated version of packages and getting warnings about it.
5. Doesn't filter items upon completion.
6. Doesn't fulfill the requirements.

## New Code Completion list
1. ✅ Should keep a list of tasks which can be "active" and "completed"
2. ✅ New task is added as "active"
3. ✅ Clicking on "active" task marks it as "completed" by crossing it out
4. ✅ Should show a total count of all tasks in the list
5. ✅ Name for a new task is specified by typing in an input field
6. ✅ There should be a backend service (node.js), which enables data persistence
7. ✅ Data storage in firebase (https://firebase.google.com/)

## Running new code 
### Setup firebase env
Create .env
```shell
cp ./apps/be-todo/.env.example ./apps/be-todo/.env # And fill in the required fields.
```

### Using [docker compose](https://docs.docker.com/compose/install/)
```shell
docker compose up
```
### Or Using [bun](https://bun.sh/)
```shell
bun i
```
```shell
bun dev
```
