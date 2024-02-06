import {useState} from 'react'

export const UseToken = ()=> {

     const [token, setInternalToken] = useState(() =>{
        return localStorage.getItem('token');
     })

     const setToken = (newToken : string)  => {
       localStorage.setItem("token", newToken);
       setInternalToken(newToken);
       return [token, setInternalToken]
     }
}