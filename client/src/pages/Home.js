import React ,{useContext} from 'react'
import {from, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Grid} from 'semantic-ui-react';
import PostCard from '../components/PostCard';

import PostForm from '../components/PostForm';
import {AuthContext} from '../context/auth';
import {POST_GETIR} from '../utils/graphql';



export default function Home() {
    
    const {kullanici}=useContext(AuthContext);

    const {loading,error,data}=useQuery(POST_GETIR);

    
    return (
        <Grid columns={1} >
            <Grid.Row className="page-tittle">
                <h1>Recently Added Posts </h1>
            </Grid.Row>
            <Grid.Row>
                {kullanici &&(<Grid.Column><PostForm/></Grid.Column>)}
            </Grid.Row>
            <Grid.Row>
                {
                    loading ? (<h1> Loading posts</h1>):(
                        data.getPosts && data.getPosts.map(post=>(
                            <Grid.Column key={post.id}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )
                }
            </Grid.Row>
        </Grid>
    )
}
