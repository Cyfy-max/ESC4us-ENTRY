const {model,Schema} =require('mongoose');

const postSchema = new Schema({
    body:String,
    kullaniciAd:String,
    olusturulmaTarihi:String,
    yorumlar:[
        {
            body:String,kullaniciAd:String,olusturulmaTarihi:String

        }
    ],
    begeniler:[
        {
             kullaniciAd:String,olusturulmaTarihi:String 
        }
    ],
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    }
});
module.exports = model('Post',postSchema);