const {gql} = require('apollo-server');

module.exports = gql`
type Yorum{
    id:ID!,
    kullaniciAd:String!,
    olusturulmaTarihi:String!,
    body:String!
},
type Begeni{
    id:ID!,
    olusturulmaTarihi:String!,
    kullaniciAd:String!
},
type Post{
    id:ID!,
    body:String!,
    olusturulmaTarihi:String!,
    kullaniciAd:String!,
    yorumlar:[Yorum]!,
    begeniler:[Begeni],
    yorumSayisi:Int!,
    begeniSayisi:Int!
},
type User{
    id:ID!,
    email:String!,
    parola:String!,
    token:String!,
    olusturulmaTarihi:String!,
    kullaniciAd:String!
},
input RegisterInput{
    kullaniciAd:String!,
    parola:String!,
    parolaKontrol:String!,
    email:String!
},
type Query{
    getPosts:[Post],
    getPost(postId:ID!):Post
},
type Mutation{
    register(registerInput:RegisterInput):User!
    login(kullaniciAd:String!,parola:String!):User!
    createPost(body:String):Post!
    deletePost(postId:ID!):String!
    createComment(postId:String!,body:String!):Post!
    deleteComment(postId:ID!,commentId:ID!):Post!
    likePost(postId:ID!):Post!
},
type Subscription{
    newPost:Post!
}
`;