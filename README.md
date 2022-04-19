# JobBoard App Backend with Node.js GraphQL MongoDB

`jobboard-backend-graph-ql-react-node-mongodb`

## About

This is the backend side of a JobBoard App that I created as a playground with React.js on the frontend side, Node.js on the backend side, utilizing the amazing GraphQL as the backend API and MongoDB as the backend.

Frontend site-wide state management was provided by React Context, while API endpoints mapped with GraphQL using Schema & Resolvers, and all data to be fetched from a MongoDB database.

Authentication on the backend side was created using BCrypt hash to safely store user password and a signed JWT (JSON Web Token) token string generated on server to be 
provided to client web browser for each successfully authenticated / logged-in user.

Here we practice a decoupled server backend from frontend clients, where the server only provide data and is not related with client-side states.

## Usage
### Create a new file named 'nodemon.json' right in the root directory

### Add inside .env file variables as follows:
`{
  "env": {
    "MONGO_USER": "yourMongoDBUsername",
    "MONGO_PASSWORD": "yourPassword",
    "MONGO_DB": "yourMongoDB_Database_Name",
    "MONGO_CLUSTER": "yourMongoDB_Cluster",
    "JWT_KEY": "YourVeryLongVerySecretKey"
  }
}`


### Run the following from command prompt

`npm install`

`npm start`

----------------
## Online Demo
<https://rikotrihendrawan.github.io/portfolio/job-board-graphql>
