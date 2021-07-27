import React,{useContext, useState} from 'react'
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth';
export default function MenuBar() {

        const [activeItem,setActiveItem]=useState('anasayfa');
        const handleItemClick=(e,{name})=>setActiveItem(name)
        const {kullanici,logout}=useContext(AuthContext);

        const menubar = kullanici ? (
            <Menu secondary size='large' color='orange'>
            <Menu.Item name={kullanici.kullaniciAd} as={Link} to="/" active onClick={handleItemClick}/>
            <Menu.Menu position='right'>
                    <Menu.Item name="Log out" as={Link} to="/login"  active={activeItem==='çıkış'}onClick={logout}/>
                    </Menu.Menu>
                   
        </Menu>
        ):(
            <Menu secondary size='large' color='orange'>
            <Menu.Item name="Home Page" as={Link} to="/" active={activeItem==='anasayfa'}onClick={handleItemClick}/>
                 <Menu.Menu position='right'>
                    <Menu.Item name="Login" as={Link} to="/login"  active={activeItem==='giriş'}onClick={handleItemClick}/>
                    <Menu.Item name="Sign Up" as={Link} to="/register" active={activeItem==='üye ol'}onClick={handleItemClick}/>
                </Menu.Menu>
        </Menu>
        )
   
    return menubar;
}
