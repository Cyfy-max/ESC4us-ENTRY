import React, { useContext } from 'react'
import{Card,Icon,Button,Label} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import BegenButon from './BegenButon';
import SilButon from './SilButon';
import {AuthContext} from '../context/auth';


export default function PostCard({post}) {

        const {id,body,olusturulmaTarihi,kullaniciAd,begeniSayisi,yorumSayisi,begeniler}=post;
        const {kullanici}=useContext(AuthContext);
       // function toggleBegen(){
          //  console.log("Begen tıklandı");
       // }
        function yorumYap(){
            console.log('yorum butonu tıklandı');
        }
   
    return (
        <div>
            <Card fluid>
                <Card.Content>
                    <Card.Header>{kullaniciAd}</Card.Header>
                    <Card.Meta>{moment(olusturulmaTarihi).fromNow(true)}</Card.Meta>
                    <Card.Description as={Link} to={`/post/${id}`}>{body}</Card.Description>
                </Card.Content>
                <Card.Content extra> 
                    <BegenButon kullanici={kullanici} post={{id,begeniSayisi,begeniler}}/>
                    <Button as='div' labelPosition='right' as={Link} to={`/post/${id}`} >
                        <Button color='blue'>
                            <Icon name='comments'/>
                                Comment
                        </Button>
                        <Label basic color ='blue' pointing='left'as='a'>
                            {yorumSayisi}
                        </Label>
                    </Button>
                    {
                        kullanici && kullanici.kullaniciAd === kullaniciAd &&
                        <SilButon postId={id}/>
                    }
                </Card.Content>
            </Card>
            <br/>
            </div>
   
    )
}
