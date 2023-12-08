import { FormGroup, Label, Input} from "reactstrap";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/login.scss";
import { LoginUser } from "../redux/slices/dataSlice";
import { useEffect, useState } from "react";
export default function Login() {
  const [formData001, setFormData001] = useState({});
  const loginUser = useSelector((state) => state.User.value.login);
  const { token } = loginUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick001 = (e) => {
    e.preventDefault();
    dispatch(LoginUser(formData001));
  };
  const handleClick2 = (e) =>{
    e.preventDefault();
    navigate("/register")
  }
  useEffect(() => {

    if (token) {

      navigate("/home");
    }
  }, [token])
  return (
    <div className='login-container'>
        <div className='left'>
            <img src ="https://res.cloudinary.com/cliqtick/image/upload/v1684308943/create_user_ryynll.jpg"/>
            <button type='button'  onClick={handleClick001}>Login</button>
        </div>
      
            <div className='right'>
               <div className="blacircle"></div>
               <div className="oraline"></div>
               <div className="oracircle"></div> 
            </div>
            <br/>
            <img className="tecp" src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"/>

            <br/>

            <div className='login'>
              <FormGroup>
              <input  className="inpp"
               id="exampleEmail"
               name="email"
               placeholder="Email Address"
               type="email" 
               onChange={(e) =>
                setFormData001({ ...formData001, email: e.target.value })
              }
               ></input>
              </FormGroup>


              <FormGroup>
            <input className="inpp"
              id="Password"
              name="password"
              placeholder="Login with Password"
              type="password"
              onChange={(e) =>
                setFormData001({ ...formData001, password: e.target.value })
              }
            />
          </FormGroup>
            </div>
            <br/>
            <br/>
          <Label className="logins" onClick={handleClick2}>Create Account ? Register</Label>
          
    </div>
  )
}

