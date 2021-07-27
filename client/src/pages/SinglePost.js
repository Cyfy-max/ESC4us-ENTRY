import React, { useContext,useRef,useState } from 'react'
import {Card,Icon,Grid,Button,Label,Form} from 'semantic-ui-react'
import gql from 'graphql-tag';
import {useQuery,useMutation} from '@apollo/react-hooks';
import moment from 'moment';
import {AuthContext} from '../context/auth';

import BegenButon from '../components/BegenButon';
import SilButon from '../components/SilButon';


const TEKIL_POST=gql`
    query($postId:ID!){
        getPost(postId:$postId){
            id,kullaniciAd,body,olusturulmaTarihi,begeniSayisi,yorumSayisi,
            begeniler{id,olusturulmaTarihi,kullaniciAd},
            yorumlar{id,olusturulmaTarihi,kullaniciAd,body}
        }
    }
`
const YORUM_YAP=gql`
    mutation createComment($postId:String!,$body:String!){
        createComment(postId:$postId,body:$body){
            id,yorumlar{id,body,olusturulmaTarihi,kullaniciAd},yorumSayisi
        }
    }
`;

export default function SinglePost(props) {
    
    const postId=props.match.params.postId;
    const {kullanici}=useContext(AuthContext);

    const {loading,data}=useQuery(TEKIL_POST,{
        variables:{postId},
        onError(err){

        }
    });
    function silCallback(){
        props.history.push('/');
    }

    const [yorum,setYorum]=useState('');
    const yorumInputRef=useRef(null);

    const[yorumYap]=useMutation(YORUM_YAP,{
        update(){
           setYorum('')
           yorumInputRef.current.blur() 
        },
        variables:{
            postId,
            body:yorum
        }
    })


    let template;
    if(loading){
        template=<p>Loading...</p>
    }else{
        const {id,kullaniciAd,olusturulmaTarihi,body,begeniSayisi,yorumSayisi,begeniler,yorumlar} = data.getPost;

        template=(
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                    <Card fluid>
                <Card.Content>
                    <Card.Header>{kullaniciAd}</Card.Header>
                    <Card.Meta>{moment(olusturulmaTarihi).fromNow(true)}</Card.Meta>
                    <Card.Description >{body}</Card.Description>
                </Card.Content>
                <Card.Content extra> 
                    <BegenButon kullanici={kullanici} post={{id,begeniSayisi,begeniler}}/>
                    <Button as='div' labelPosition='right'  >
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
                        <SilButon postId={id} callback={silCallback}/>
                    }
                </Card.Content>
            </Card>
                    {
                        kullanici && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input type="text" placeholder="Your comment" name="yorum" value={yorum} onChange={(e)=>setYorum(e.target.value)} ref={yorumInputRef} />
                                        </div>
                                        <button type='submit' className="ui button orange" disabled={yorum.trim()===''} onClick={yorumYap}> Add Comment</button>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )
                    }
                    <h2>Comments</h2>
                    {
                        yorumlar.map((y)=>(
                            <Card fluid key={y.id}>
                                <Card.Content>
                                    <Card.Header>{y.kullaniciAd}</Card.Header>
                                    <Card.Meta>{moment(y.olusturulmaTarihi).fromNow()}</Card.Meta>
                                    <Card.Description>
                                        {y.body}
                                    </Card.Description>
                                    {
                                        kullanici && kullanici.kullaniciAd===y.kullaniciAd && (
                                            <SilButon postId={id} yorumId={y.id} />
                                        )
                                    }
                                </Card.Content>
                            </Card>
                        ))
                    }


                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )



    }

    
    
    return template;
}
