import { useState, useEffect } from "react";
import { UseToken } from "./useToken";

export const UseUser = () => {
    const [user, setInternalUser] = useState(() =>{
        return localStorage.getItem('user');
     })

     type User = {

     }
     const setUser = (newUser : User)  => {
       localStorage.setItem("user", JSON.stringify({user: newUser}));
      // setInternalUser(newUser);
       return [user, setInternalUser]
     }
}