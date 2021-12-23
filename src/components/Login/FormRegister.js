import React, { useState } from "react";
import axios from '../../../../router/react-app/node_modules/axios';
const FormRegister = (props) => {
    const {setIsLogin} = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");

    const onChangeUsername = (e)=>{
        setUsername(e.target.value);
    }

    const onChangePassword = (e)=>{
        setPassword(e.target.value);
    }
    
    const onChangeEmail = (e)=>{
        setEmail(e.target.value);
    }
    
    const onChangeFullname = (e)=>{
        setFullname(e.target.value);
    }

    const onRegister = (e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8080/api/auth/login`,
            {
                
            }
        ).then((response) => response.data).then((data) => {

        },
        (error) => {
            alert(error.data.error);
        });
        
    }
    return (
        <div>

        <p>
            Register Page
      </p>
    <form onSubmit = {onRegister} style={{width : "80%", margin: "2px auto"}}>
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
            <input type="email" className="form-control" placeholder="Email..." aria-label="Search"
            aria-describedby="search-addon" 
            value={email}
            onChange ={(e) => onChangeEmail(e)}
            required
            />
        </div>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Fullname" aria-label="Search"
            aria-describedby="search-addon" 
            value={fullname}
            onChange ={(e) => onChangeFullname(e)}
            required
            />
        </div>
        <div className="form-group">
            <button type="submit" class="btn btn-primary mr-2">Register</button>
            <button type="button" class="btn btn-dark" onClick = {()=>setIsLogin(true)}>Login</button>
        </div>

    </form>
    </div>
    );
}

export default FormRegister;