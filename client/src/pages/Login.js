import React,{useState,useContext} from 'react'
import {Button,Form} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AuthContext} from '../context/auth';

const LOGIN_USER=gql`

mutation login($kullaniciAd:String!,$parola:String!){
    login(kullaniciAd:$kullaniciAd,parola:$parola){
    id,
    email,
    olusturulmaTarihi,
    token,
    kullaniciAd
  }
}
`;


export default function Login(props) {
    
    const context=useContext(AuthContext);
    const[errors,setErrors]=useState({})

    const [values,setValues]=useState({
        kullaniciAd:'',
        parola:'',

    })
    const [girisYap,{loading}]=useMutation(LOGIN_USER,{
        update(proxy,{data:{login:userData}}){
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
       girisYap();
    }
    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading':''}>
                <h1>Sign In Form</h1>
                <Form.Input label='Username' placeholder='Enter Username' name='kullaniciAd' error={errors.kullaniciAd ? true:false} value={values.kullaniciAd}  onChange=
                {onChange}/>
                <Form.Input label='Password' placeholder='Enter password' name='parola' type='password' error={errors.parola  ? true:false} value={values.parola }  onChange=
                {onChange}/>
                <Button type='submit' color='orange'>Login</Button>
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
