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
      
            <div className='right' style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',columnGap:'2em',marginLeft:'20em',marginTop:'-25.5em'}}>
               <div style={{backgroundColor:'black',border:'2px solid  #f4b34a',borderRadius:'50px',height:'1em',width:'1em'}}></div>
               <div style={{width:'25em',height:'0.1em',backgroundColor:'rgb(244,179,74)'}}></div>
               <div style={{backgroundColor:'rgb(244,179,74)',borderRadius:'50px',height:'1em',width:'1em'}}></div> 
            </div>
            <br/>
            <img src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"  style={{width:'11em',height:'12vh',marginLeft:'44.5em'}}/>

            <br/>

            <div className='login' style={{lineHeight:'3em',marginLeft:'11em'}}>
              <FormGroup>
              <input 
               id="exampleEmail"
               name="email"
               placeholder="Email Address"
               type="email"  style={{width:'80%',height:'8vh',textAlign:'start',paddingLeft:'4%',color:'rgb(244,179,74)'}}
               onChange={(e) =>
                setFormData001({ ...formData001, email: e.target.value })
              }
               ></input>
              </FormGroup>


              <FormGroup>
            <input
              id="Password"
              name="password"
              placeholder="Login with Password"
              type="password"
              style={{width:'80%',height:'8vh',textAlign:'start',paddingLeft:'4%',color:'rgb(244,179,74)'}}
              onChange={(e) =>
                setFormData001({ ...formData001, password: e.target.value })
              }
            />
          </FormGroup>
            </div>
            <br/>
            <br/>
          <Label className="logins" onClick={handleClick2} style={{marginLeft:'60%',marginTop:'-2em',cursor:'pointer',color:'rgb(244,179,74)'}}>Create Account ? Register</Label>
          
    </div>
  )
}

