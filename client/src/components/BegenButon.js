import React,{useEffect,useState} from 'react'
import {Label,Button,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const POST_BEGEN=gql`
    mutation likePost($postId:ID!){
        likePost(postId:$postId){
            id,
            begeniler{
                id,kullaniciAd
            },
            begeniSayisi
        }
    }
`;



export default function BegenButon({post:{id,begeniSayisi,begeniler},kullanici}) {
    
   const [toggleBegen]=useMutation(POST_BEGEN,{
       variables:{postId:id},
       onError(err){
           
       }
   })
   
   
    
    const [begenMi,setBegenmi]=useState(false);
    
    useEffect(()=>{
        if(kullanici && begeniler.find(b=>b.kullaniciAd===kullanici.kullaniciAd)){
            setBegenmi(true)
        }else{
            setBegenmi(false)
        }
    },[begeniler,kullanici]);

    const begenBtn=kullanici ? (
        begenMi ? (
            <Button color="red">
                <Icon name="heart"/>Like
            </Button>
        ):(
            <Button color="red" basic> 
                <Icon name="heart"/>Like
            </Button>
        )
    ):(
        <Button basic color="red" as={Link} to="/login">
             <Icon name="heart"/>Like
        </Button>
    )
   
    return (
        
           <Button as='div' labelPosition='right' onClick={toggleBegen} >
                     {begenBtn}
                        <Label basic color ='red' pointing='left'as='a'>
                            {begeniSayisi}
                        </Label>
             </Button> 
    
    )
}
