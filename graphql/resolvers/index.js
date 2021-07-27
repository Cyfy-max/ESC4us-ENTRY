const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comments');
module.exports={
    Post:{
        begeniSayisi(parent){
           console.log(parent); 
           return parent.begeniler.length;
        },
        yorumSayisi:(parent)=>parent.yorumlar.length
    },
    Query:{
        ...postResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription:{
        ...postResolvers.Subscription
    }
}