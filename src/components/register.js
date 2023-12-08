import {  useNavigate } from "react-router-dom";
import { FormGroup, Label, Input,Form } from "reactstrap";
import "../styles/login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../redux/slices/dataSlice";
export default function Register() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date();
  console.log(date);
  const OnHandleClick1 = (e) => {
    e.preventDefault();
    navigate("/login")
  }
  const handleClick = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmpassword) {
    window.alert("Password and Confirm Password are not same");
    }else{
      dispatch(RegisterUser({...formData,timedate : date}));
      window.alert("Successfully Registered");
    }
              }
  
  return (
    <div className='login-container'>
        <div className='left'>
            <img src ="https://res.cloudinary.com/cliqtick/image/upload/v1684308943/create_user_ryynll.jpg"/>
            <button type='button' onClick={handleClick}>Register</button>
        </div>

        <div className='right' style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',columnGap:'2em',marginLeft:'20em',marginTop:'-25.5em'}}>
        <div className="blacircle"></div>
               <div className="oraline"></div>
               <div className="oracircle"></div> 
            </div>
            <br/>
            <img className="panda" src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"  style={{width:'11em',height:'12vh',marginLeft:'44.5em'}}/>

            <br/>

            <div className='form' onSubmit={handleClick} style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'0.5em',paddingLeft:'20%',paddingRight:'10%',paddingTop:'1%',marginLeft:'15em',columnGap:'0%'}}>
            {/* <Form > */}
          <FormGroup>
            <input className="invalu"
              id="exampleDatetime"
              name="username"
              placeholder="User Name"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            ></input>
          </FormGroup>

              <FormGroup>
              <input
               id="Email" className="invalu"
               name="email"
               placeholder="Email "
               type="email"  
               onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
               ></input>
              </FormGroup>

              <FormGroup>
            <input
              id="exampleNumber" className="invalu"
              name="number"
              placeholder="Phone"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, mobilenumber: e.target.value })
              }
            ></input>
          </FormGroup>


              <FormGroup>
            <input
              id="Password" className="invalu"
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              ></input>
          </FormGroup>

          <FormGroup>
            <input
              id="examplePassword" className="invalu"
              name="confirmpassword"
              placeholder="Confirm password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, confirmpassword: e.target.value })
              }
              ></input>
          </FormGroup>
           {/* </Form> */}
              </div>

   <FormGroup check className="fmgrp">
            <Input type="checkbox" />
            <Label check className='label'>I here by agree to terms and conditions</Label>
          </FormGroup>
          <Label className="registers"onClick={OnHandleClick1}>Already Have An Account ? </Label>

    </div>
  )

}
