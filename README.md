# Task Management API

## Getting started

* Download Node and npm
* `npm install` to install all node dependencies
* setup a .env file
* set `NODE_ENV` to developments
* set `PORT` to your preferred port
* set `MONGO_URI` to your mongoDB connection string
* run `npm start` to start the server

## REST API
```
    POST    /api/users/                          Create a new user
    PUT     /api/users/{task_id}/follow          Follow/Unfollow tasks using task ID (req.body must include user ID)
    GET     /api/users/{user_id}/followlist      Get user's follow list by user ID
    GET     /api/users/{user_id}/completed       Get user's completed tasks by user ID
    GET     /api/users/{user_id}/incomplete      Get user's incomplete tasks by user ID
    DELETE  /api/users/{user_id}/deleteuser      Delete user and their data by their user ID
    POST    /api/tasks/                          Create a new task (req.body must include user ID)
    PUT     /api/tasks/{task_id}                 Edit task title and/or content by task ID
    PUT     /api/tasks/{task_id}/status          Mark tasks complete or incomplete by task ID
    DELETE     /api/tasks/{task_id}              Delete task by task ID
    
```



