import React,{useState} from 'react'
import {Confirm,Button,Icon} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {POST_GETIR} from '../utils/graphql'

const SIL_POST=gql`
    mutation deletePost($postId:ID!){
        deletePost(postId:$postId)
    }
`;

const SIL_YORUM=gql`
    mutation deleteComment($postId:ID!,$yorumId:ID!){
     deleteComment(postId:$postId,commentId:$yorumId){
         id,yorumlar{id,kullaniciAd,olusturulmaTarihi,body},yorumSayisi
     }   
    }
`

function SilButon({postId,yorumId,callback}){
    const [confirm,setConfirm]=useState(false);

    const mutation = yorumId ? SIL_YORUM: SIL_POST;

    const [sil] = useMutation(mutation,{
            update(proxy){  
                setConfirm(false);
                if(!yorumId){
                const data = proxy.readQuery({query:POST_GETIR});
                proxy.writeQuery({query:POST_GETIR,
                data:{getPosts:data.getPosts.filter((p)=>p.id !==postId)}}) 
                }
                

                if(callback) callback();
        },
        variables:{postId,yorumId}

    })
    return(
        <>
            <Button as='div' color='orange' inverted floated="right" onClick={()=>setConfirm(true)}>
                <Icon name="trash" style={{margin:0}}/>
            </Button>
            <Confirm open={confirm} content='Are you sure?' onCancel={()=>setConfirm(false)} onConfirm={sil} />
        </>
    )

}


export default SilButon;