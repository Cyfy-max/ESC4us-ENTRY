const {ApolloServer,PubSub} = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose');
const {MONGODB} = require('./config');

const Post = require('./models/Post');


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const pubsub = new PubSub();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req,pubsub})
});


mongoose.connect(MONGODB,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>
{
    console.log('mongoDb bağlandı');
    return server.listen({port:5000})
}).then(res=>{
    console.log(`server calisiyor ${res.url}`);
})



