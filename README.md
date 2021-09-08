# Would You Rather Server
This repo is a Simple CRUD app with Node, Express, and MongoDB for Udacity React Nanodegree Program project Would You Rather.

### How to run:
* install all project dependencies with `npm install`
* start the development server with `npm run dev`
* run a production build with `npm run build && npm start`

## Environment Setup
Rename .env.example to .env and Edit your Environment variables

## API Reference

### Error Handling
Errors are returned as JSON objects in the following format:
```
{
  "error": string,
}
```
The API will return three error types when requests fail:
- 400: Bad Request
- 401: Unauthorized 
- 404: Resource Not Found
- 422: Unprocessable Entity

### Endpoints 

#### GET /api/users
- General:
    - Returns a list of user objects. 

``` 
[
  {
    id: string,
    username: string,
    name: string,
    avatarURL: string,
    answers: {[key: string]: answer},
    questions: string[],
  },...
]
```

#### POST /api/users
- General:
    - Returns the created user object. 

``` 
{
  id: string,
  username: string,
  name: string,
  avatarURL: string,
  answers: {[key: string]: answer},
  questions: string[],
}
```

#### POST /api/login
- General:
    - Returns the authedUser object. 

``` 
{
  username: string,
  name: string,
  token: string,
}
```

#### GET /api/questions
- General:
    - Returns a list of question objects. 

``` 
[
  {
    id: string,
    author: string,
    timestamp: number,
    optionOne: {
      votes: string[],
      text: string,
    },
    optionTwo: {
      votes: string[],
      text: string,
    }
  },...
]
```

#### POST /api/questions
- General:
    - Creates a new question using the submitted question options. Returns the created question object. 

```
{
  id: string,
  author: string,
  timestamp: number,
  optionOne: {
    votes: string[],
    text: string,
  },
  optionTwo: {
    votes: string[],
    text: string,
  }
}
```

#### PUT /api/questions
- General:
    - Updates a question using the submitted question properties. Returns the updated question object. 

```
{
  id: string,
  author: string,
  timestamp: number,
  optionOne: {
    votes: string[],
    text: string,
  },
  optionTwo: {
    votes: string[],
    text: string,
  }
}
```


#### DELETE /api/questions/{question_id}
- General:
    - Deletes the question of the given ID if it exists. Returns status code 204 No Content. 
