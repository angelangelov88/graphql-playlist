const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const cors = require('cors');

const schema = require('./schema/schema');

const app = express();

// allow cors
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});