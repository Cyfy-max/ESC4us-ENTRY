import React,{useState} from 'react'
import {Form,Button} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

import {POST_GETIR} from '../utils/graphql';


const CREATE_POST=gql`

    mutation postOlustur($body:String!){
     createPost(body:$body){
     id,kullaniciAd,olusturulmaTarihi,body,
     begeniler{id,olusturulmaTarihi,kullaniciAd},
     yorumlar{id,olusturulmaTarihi,kullaniciAd,body},
     begeniSayisi,yorumSayisi   
    }
    }
`;


export default function PostForm() {

        const [body,setBody]=useState('');

        const [yeniPost,{error}] = useMutation(CREATE_POST,{
            variables:{body},
            update(proxy,result){
               // console.log(result);
               const data = proxy.readQuery({
                   query:POST_GETIR
               });
               proxy.writeQuery({
                   query:POST_GETIR,
                   data:{getPosts:[result.data.createPost,...data.getPosts]}
               });
               setBody('');
            },
            onError(err){

            }
        })

        const onChange =(e)=>{
            setBody(e.target.value);
        }
        const onSubmit=(e)=>{
            e.preventDefault();
            yeniPost();
        }

    return (
        <div>
            <Form onSubmit={onSubmit}>
            <h2>Create New Post</h2>
            <Form.Field>
                <Form.Input placeholder="What do you think?" name="body" onChange={onChange} value={body} error={error?true:false}/> 
                <Button type="submit" color="orange">Submit</Button>
            </Form.Field> 

        </Form>
        {
            error && (
                <div className="ui error message" style={{marginBottom:15}}>
                    <ul className="list"> 
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )
        }
        </div>
    )
}
