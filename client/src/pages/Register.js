import React,{useState,useContext} from 'react'
import {Button,Form} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {AuthContext} from '../context/auth';

const REGISTER_USER=gql`

mutation register($kullaniciAd:String!,$email:String!,$parola:String!,$parolaKontrol:String!){
    register(registerInput:
    {kullaniciAd:$kullaniciAd,parola:$parola,parolaKontrol:,$parolaKontrol,
      email:$email}){
    kullaniciAd,
    parola,
    token, 
  }
}
`;


export default function Register(props) {
    
    const context=useContext(AuthContext);

    const[errors,setErrors]=useState({})

    const [values,setValues]=useState({
        kullaniciAd:'',
        email:'',
        parola:'',
        parolaKontrol:''

    })
    const [kullaniciEkle,{loading}]=useMutation(REGISTER_USER,{
        update(proxy,{data:{register:userData}}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.hatalar);
        },
        variables:values
    })

    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value});
    }
    const onSubmit=(e)=>{
        e.preventDefault();
       // console.log(values);
       kullaniciEkle();
    }
    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading':''}>
                <h1>Üye Olma Formu</h1>
                <Form.Input label='Username' placeholder='Enter your username' name='kullaniciAd' value={values.kullaniciAd} error={errors.kullaniciAd ? true:false} onChange=
                {onChange}/>
                <Form.Input label='Email' placeholder='Enter your email' name='email' value={values.email} error={errors.email ? true:false} onChange=
                {onChange}/>
                <Form.Input label='Password' placeholder='Enter your password' name='parola' type='password' value={values.parola } error={errors.parola  ? true:false} onChange=
                {onChange}/>
                <Form.Input label='Password Again ' placeholder='Enter your password again' type='password' name='parolaKontrol' value={values.parolaKontrol} error={errors.parolaKontrol  ? true:false} onChange=
                {onChange}/>
                <Button type='submit' color='orange'>Sign Up</Button>
            </Form>
            {
                Object.keys(errors).length>0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {
                                Object.values(errors).map(value=>(
                                    <li key={value}>{value}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
            
        </div>
    )
}
