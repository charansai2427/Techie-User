import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAllJobs,getSearchJobs } from '../redux/slices/dataSlice';
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import {FaArrowRightLong} from "react-icons/fa6"
import { Progress } from 'reactstrap';
import "../styles/header.css"
import Home from './home';
import AllJobs from './allJobs';
import SearchJob from './searchJob';
function Header() {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
  const[on,setOn]=useState(false);

    const searchJobs = useSelector((state)=> state.User.value.searchJobs);

    const [open, setOpen] = useState(false);
    const [search,setSearch] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        setOpen(!open);
      };
      const handleClick2 =() =>{
        navigate('/Alljobs')
      }

      const searchClick = () =>{
        dispatch(getSearchJobs({searchedInput:search}))
      }

      useEffect(() => {
        dispatch(getAllJobs());
        if (!token) {
          navigate("/accounts/login");
          window.location.reload();
        }
      }, [token]);

  return (
 
        <div className="home-container ">
        <div className="line"></div>
        <div className="home-container-header shadow bg-light">
          <div>
            <img
              className="logo"
              src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png" onClick={() => navigate("/home")}
            />
          </div>
          <div>
          <input type="search" placeholder="Search by Keyboard / desigination / role / company" style={{ position: 'relative', top: '0.1em', left: '2em', borderRadius: '50px', width: '27em', height: '3em', border: 'solid rgb(232,235,238)' }}  onChange={(e)=>setSearch(e.target.value)}/>
          <BiSearch style={{ position: "absolute", top: '1.3em', left: "26em", fontSize: '1.5em', color: 'gray' }} onClick={searchClick}/>
        </div>

          <div style={{ cursor: "pointer" }}className="drop" >
        <p className="downbtn" >Jobs</p>
        <div className="drop-content">
          <div className="column">
            <h5 className="job">Jobs by Hot Skills</h5>
            <a href="#">Python</a>
            <a href="#">Java</a>
            <a href="#">Javascript</a>
            <a href="#">React Js</a>
            <a href="#">PHP</a>
        <br/>
        <br/>
        <br/>
        <p onClick={handleClick2} style={{fontSize:'1.2em'}}>All Jobs <FaArrowRightLong /></p>
          </div>

          <div className="left"></div>

          <div className="column">
            <h5 className="jloc">Jobs at Top Location</h5>
            <a href="#">Remote</a>
            <a href="#">Delhi/Delhi INR</a>
            <a href="#">Mumbai</a>
            <a href="#">Banglore</a>
            <a href="#">Hyderabad</a>
            <a href="#">Chennai</a>
            <a href="#">Pune</a>

          </div>
        </div>
      </div>
       
          <div>
          <Link
            to={"/profile=/" + userId}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "gray",
              fontSize:'1.5em',
            }}
          >
            Build My Profile
          </Link>
          <Progress
            color="warning"
            striped
            value={50} style={{height:'1.5vh'}}
          />
        </div>
          <div  onClick={() => navigate("/ifollow")} style={{cursor: "pointer"}} className="border rounded-pill p-2 border-success text-success">
            iFollow 
          </div>
          <div onClick={handleClick} className="profile-name" style={{ backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16) ,color:'white'}}>
            <p>{email && email.slice(0, 2).toUpperCase()}</p>
          </div>
        </div>
        

        <div
          className={` profile-dropdown ${open ? "display" : "display-none"}`}style={{zIndex:'1'}}
          >
          <ul style={{border:'1px solid',borderRadius:'10px',marginTop:'1.5em',boxShadow:''}}>
            <li onClick={() => navigate("/profile=/:userId")}>My Profile</li>
            <li>
               <Link to={"/savedJobs/" + userId} style={{color:'black',textDecoration:'solid',}}>Saved Jobs</Link>
            </li>
            <li>Applied Jobs</li>
            <li
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Log Out
            </li>
          </ul>
        </div>
     {  
      on ?<Home/>:<SearchJob/>
      }
      </div>
   
  )
}

export default Header
