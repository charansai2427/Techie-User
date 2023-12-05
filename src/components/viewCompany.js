import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followCompany, getCompanyJobs, getOneCompany } from "../redux/slices/dataSlice";
import { Link, useMatches, useNavigate, useParams } from "react-router-dom";
import {BsInstagram} from "react-icons/bs"
import { FaArrowRightLong } from "react-icons/fa6";
import { AiFillLinkedin } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import Header from "./header";
import "../styles/home.scss";
import "../styles/viewCompany.scss"
import { BsBookmark,BsArrowRight } from "react-icons/bs";
import { verifyToken } from "../utils/utlis";
const ViewCompany = () => {
  const company = useSelector((state) => state.User.value.company);
  console.log(company);
     console.log(company.about?.split(",")[0]);
  const companyJobs = useSelector((state) => state.User.value.companyJobs);
  const [aboutCompanyArr,setAboutCompanyArr] = useState([])
  const dispatch = useDispatch();
  const params = useMatches();
  const [open123, setOpen123] = useState({open1: true, open2 : false, open3 : false})
  const params1 = useParams();

  const handleFollow = () => {
    dispatch(followCompany(params1))
  }
  const handleClick2 =() => {
    setOpen123({...open123,open2 : true, open1 : false, open3: false})
  }
  const handleClick3 =() => {
    dispatch(getCompanyJobs({ cid: params[0].params.cid }))
    const {about}=company;
    const temp = about?.split(" ").filter((e)=> e!== '');
    console.log(temp);
    setAboutCompanyArr([temp[1],temp[4],temp[7],temp[9],temp[12]])
    setOpen123({...open123,open1: true, open2 : false, open3 : false})
    
    console.log(aboutCompanyArr);
    setOpen123({...open123,open2 : false, open1 : false, open3: true})
  }
  const handleClick4 =() => {
    setOpen123({...open123,open2 : false, open1 : true, open3: false})
  }
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    
    if (!verifyToken(email,userId,token)) {
      navigate("/login");
      window.location.reload();
    }
  }, [token]); 
  useEffect(() => {
    dispatch(getOneCompany(params1));
   
 
    
  }, []);
 
  return (
    <div>
      <Header />
      <div className="container">
        <div className="d-flex justify-content-between pt-3">
          <div>i-Follow / {company._id && company.company_name}</div>
          <div style={{ cursor: "pointer" }}>
            <BsBookmark />{" "}
            <span onClick={handleFollow} className="text-decoration-underline">Follow</span></div>
        </div>
        <div className="h2">{company && company.company_name} , {company && company.location}</div>
         <hr/>

        <div className="card-profile shadow border rounded pt-1 p-2" style={{height:'19vh'}}>
          <p style={{ backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16) ,color:'white'}}>
            {company.company_name &&
              company.company_name.slice(0, 2).toUpperCase()}
          </p>
          <div><b>{company && company.company_name}</b></div>
          <div style={{color:'gray',position:'absolute',top:'16.3em',left:'10.5em'}}>{
            company && company.location
          }
          </div>
          <br/>
          <b style={{position:'absolute',top:'18em',left:'10.5em'}}>About Company</b>
        </div>
        <div
          style={{ backgroundColor: "rgb(244,179,74)",marginTop:'2em' }}
          className="d-flex justify-content-evenly align-items p-2"
        >
          <div
            onClick={handleClick4}
            style={{ fontSize: "1.1rem", fontWeight: "600", cursor: "pointer" }}
          >
            Home{" "}
          </div>
          <div
            style={{ fontSize: "1.1rem", fontWeight: "600", cursor: "pointer" }}
            onClick={handleClick3}
          >
            About
          </div>
          <div
            onClick={handleClick2}
            style={{ fontSize: "1.1rem", fontWeight: "600", cursor: "pointer" ,gridTemplateColumns:'(2,1fr)'}}
          >
            Jobs
          </div>
        </div>
      </div>
      <div className="home" >
       { open123.open1 && <p>No posts published by the company!</p>}
      </div>
      <div className="homePage-container">
         <div className="homePage-cards-container container">
            {open123.open2  && companyJobs &&
              companyJobs?.map((e) => {
                console.log(e?.value);
                return (
                  <div className="card-container">
                    <div className="card-container-01">
                      <div>
                        <h5>{e?.value?.title}</h5>
                        <h5 className="text-secondary ">{e?.value?.company_name}</h5>
                        <div>
                          <label className="h6">Role :</label>
                          <span>{e?.value?.role}</span>
                        </div>
                        <div>
                          <label className="h6">Functional Area : </label>
                          <span>{e?.value?.functionalarea}</span>
                        </div>
                        <div>
                          <label className="h6">States/Cities :</label>
                          <span>{e?.value?.States}</span>
                        </div>
                        <div>
                          <label className="h6">Employment Type :</label>
                          <span>{e?.value?.employmenttype}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="h6">Skills :</label>
                      <div className="d-flex" style={{ columnGap: "0.3rem" }}>
                        {e?.value?.skills &&
                          e?.value?.skills.split(",").map((i) => {
                            return (
                              <div>
                                <span
                                  style={{
                                    fontSize: "0.8rem",
                                    padding: "0 0.2rem 0 0.2rem",
                                  }}
                                  className="bg-secondary text-white rounded-pill"
                                >
                                  {i}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="d-flex gap-1 ">
                      <div>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            padding: "0 0.2rem 0 0.3rem",
                          }}
                          className=" text-success border border-success rounded-pill"
                        >
                          HIRING
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            padding: "0 0.2rem 0 0.2rem",
                          }}
                          className="bg-secondary text-white rounded-pill"
                        >
                          {e?.value?.experience}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            padding: "0 0.2rem 0 0.2rem",
                          }}
                        >
                          {e?.value?.salary && e?.value?.salary == "" ? (
                            <span className="bg-white"></span>
                          ) : (
                            <span className="bg-secondary text-white rounded-pill">
                              {" "}
                              {e?.value?.salary}
                            </span>
                          )}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            padding: "0 0.2rem 0 0.2rem",
                          }}
                          className="bg-secondary text-white rounded-pill"
                        >
                          {e?.value?.openings}
                        </span>
                      </div>
                    </div>
                    <div className="card-profile">
                      <p style={{ backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16) ,color:'white'}}>{ e?.value?.company_name && e?.value?.company_name.slice(0, 2).toUpperCase()}</p>
                    </div>
                    <Link to={"/viewJOb/" + e._id}>
                      {" "}
                      <div className="viewjob">
                        view job <BsArrowRight />
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
      </div>

      <div  >
      <div>
        {
        open123.open3 &&   company.about ? 
       <div  className="about "> 
       
        <div>
          <div> <b>Industry : </b>{aboutCompanyArr[0]}</div>
          <div><b>Year Established : </b>{aboutCompanyArr[1]}</div>
          <div><b>Company Size : </b>{aboutCompanyArr[2]}</div>
          <div><b>Email : </b>{aboutCompanyArr[3]}</div>
          <div><b>Phone Number : </b>{aboutCompanyArr[4]}</div>
        </div>
        </div>
         : 
         ""
        }
      </div>
      </div>

      <div className="footer">
                <div className="inside">
                    <img src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png" style={{ width: '7em', height: '3em', marginTop: '1em', marginLeft: '10em' }} />
                    <p className="privacy">Privacy Policy . Terms & Conditions . Beware of Fraudsters</p>
                    <p className="copy">Copyright © 2023 codezo.in | All Rights Reserved</p>
                    <div className="icons">
                        <FaTwitter />
                        <BsInstagram />
                        <AiFillLinkedin />
                        <CiMail />
                    </div>
                </div>
            <div className="links">
                <img className="play" src="https://codezo.s3.amazonaws.com/static/img/google-play-download.png" />
            </div>
            </div>
    </div>
  );
};

export default ViewCompany;