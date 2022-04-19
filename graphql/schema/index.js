const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Saved {
    _id: ID!
    job: Job!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Job {
  _id: ID!
  title: String!
  description: String!
  wage: String!
  date: String!
  creator: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdJobs: [Job!]
}

type AuthData {
  userId: ID!
  token: String!
  email: String!
  tokenExpiration: Int!
}

input JobInput {
  title: String!
  description: String!
  wage: String!
  date: String!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
    jobs: [Job!]!
    jobItem(jobId: String!): Job!
    saveds: [Saved!]!
    login(email: String!, password: String!): AuthData!
}
type RootMutation {
    createJob(jobInput: JobInput): Job
    createUser(userInput: UserInput): User
    savedJob(jobId: ID!): Saved!
    cancelSaved(savedId: ID!): Job!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
