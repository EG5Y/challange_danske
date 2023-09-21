# challange-danske

## Index
1. [Old Code Problems Review](#old-code-problems-review)
2. [New Code Completion list](#new-code-completion-list)
3. [Running new code](#running-new-code)
   1. [Setup firebase env](#setup-firebase-env)
   2. [Using docker compose](#using-docker-compose)
   3. [Or using bun](#or-using-bun)

## Old Code Problems Review
1. Missing .gitignore. - It's needed to prevent committing node modules and other files.
2. Missing package-lock.json. - It's needed to preserve correct package versions.
3. Missing manifest file - It's included in index.html, but it was never created.

4. Using deprecated version of packages - The app is getting "...validators directly is not supported..." warnings when using styled components, updating packages fixed it.
5. Loops don't have unique keys - Creating react components using map requires you to include unique key.
   ```javascript
   (task, i) => <Active key={i + "not completed"}...
   ```
6. Adds instead of updating items upon completion - It causes duplicate items on active and completed lists.
   ```javascript
   // Might want to filter completed items
   this.setState({
      completed: this.state.completed.concat(task),
      active: this.state.active.filter((t, index)=> i !== index),
   })
   
   // Instead of just adding
   this.setState({ 
         completed: this.state.completed.concat(task)
     })
   ```
7. Overrides state when adding new item - That removes all the changes made by Done component onClick event.
   ```javascript
   // Might want to update state directly 
   addTask() {
    this.state.active.push({ title: 'new task', done: false });
    this.forceUpdate();
   }
   
   // Instead of updeting props
   addTask() {
     this.props.tasks.push({ title: 'new task', done: false });
     this.state = {
       active: this.props.tasks.filter(task => !task.done),
       completed: this.props.tasks.filter(task => task.done),
       total: this.props.tasks.length
     };
     this.forceUpdate();
   }
   ```
8. Keeping separate list length state is not required in this instance - Because you can use array length directly.
   ```javascript
   <Total >Total tasks: {this.state.active.length + this.state.completed.length}</Total>
   ```
9. Using class components is [not recommended by the React team.](https://legacy.reactjs.org/docs/hooks-faq.html#do-i-need-to-rewrite-all-my-class-components)
10. Doesn't fulfill the requirements:
    1. Missing input field for specifying item name.
    2. Missing persistent storage.

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
docker compose up # wait for bun to finish installing packages
```
### Or Using [bun](https://bun.sh/)
```shell
bun i
```
```shell
bun dev
```
