export interface user {
  id: string,
  username: string,
  name: string,
  avatarURL: string,
  passwordHash: string,
  answers: {[key: string]: answer},
  questions: string[],
}

export interface authedUser {
  username: string,
  name: string,
  token: string,
}

export interface question {
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

export type answer = "optionOne" | "optionTwo"

export interface userRegisterRequest { username: string, name: string, password: string, avatarURL?: string, }

export interface userLoginRequest { username: string, password: string }

export interface questionPostRequest { optionOne: string, optionTwo: string }
