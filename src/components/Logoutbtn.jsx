import React from 'react';
import { logout } from "../store/authSlice"
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'


function Logoutbtn(props) {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())    //updating the store...
        })
    }
    return (
        <button className='inline-block px-6 py-2 duration-200
            hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}>
            Logout
        </button>
    );
}

export default Logoutbtn;