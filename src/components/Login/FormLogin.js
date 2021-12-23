import React, { useState } from "react";
import axios from '../../../../router/react-app/node_modules/axios';
const FormLogin = (props) => {
    const {setIsLogin} = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = (e)=>{
        setUsername(e.target.value);
    }

    const onChangePassword = (e)=>{
        setPassword(e.target.value);
    }

    const onLogin = (e)=>{
        e.preventDefault();
        alert(username + "-" + password);
        // axios.post(`http://localhost:8080/api/auth/login`,
        //     {

        //     }
        // ).then((response) => response.data).then((data) => {

        // },
        // (error) => {
        //     alert(error.data.error);
        // });
        
    }
    return (
    <div>

        <p>
      Login Page
      </p>
    
    <form onSubmit = {onLogin} style={{width : "80%", margin: "2px auto"}}>
        <div className="form-group">
            <input type="text" className="form-control " placeholder="Username..." aria-label="Search"
            aria-describedby="search-addon"
            value={username}
            onChange ={(e) => onChangeUsername(e)}   
            required
            />
        </div>
        <div className="form-group">
            <input type="password" className="form-control" placeholder="Password..." aria-label="Search"
            aria-describedby="search-addon" 
            value={password}
            onChange ={(e) => onChangePassword(e)}
            required
            />
        </div>
        <div className="form-group">
            <button type="submit" class="btn btn-primary mr-2">Login</button>
            <button type="button" class="btn btn-dark" onClick = {()=>setIsLogin(false)}>Register</button>
        </div>

    </form>
    </div>
    );
}

export default FormLogin;