import React, { useEffect } from "react";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompanies,
  getUserFollowedComp,
} from "../redux/slices/dataSlice"; 
import { FaArrowRightLong } from "react-icons/fa6";
import { AiFillLinkedin } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import {BsInstagram} from "react-icons/bs"

import { verifyToken } from "../utils/utlis";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ifollow.scss"
function Ifollow() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.User.value.companyData)
  // const getJobDetails = useSelector((state) => state.User.value.getJobDetails);
  const followedCompanies = useSelector((state) => state.User.value.followedCompanies);

  useEffect(() => {
    dispatch(getAllCompanies());
    dispatch(getUserFollowedComp({ userId: localStorage.getItem("userId") }));
  }, []);

  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  useEffect(() => {
    if (!verifyToken(email,userId,token)) {
      navigate("/login");
      window.location.reload();
    }
  }, [token]);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="h2 pt-4 pb-2 ">i-Follow</div>
        <div style={{ width: "100%" }} className="">
          <input className="w-100 p-2 " type="text" />
        </div>
        <div className="h2 pt-4 pb-2">Companies Followed</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }} className="gap-3 ">
          {
            followedCompanies && followedCompanies.map((e) => {
              return (
                <div className="shadow border rounded " style={{ width: '30em' }}>
                  <div style={{ backgroundColor: 'rgb()' }} className="card-profile pt-3 p-3">
                    <p style={{ backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16) ,color:'white'}}>{e.value.company_name.slice(0, 2).toUpperCase()}</p>
                  </div>
                  <div style={{ fontSize: '1.3em', marginLeft: '5em', marginTop: '-4.5em', height: '3.5em' }}><b>{e.value.company_name}</b></div>
                  <div style={{ marginLeft: '6.5em', marginTop: '-2.2em', color: 'gray' }}>{e.value.location}</div>
                  <div style={{ marginLeft: '19em', marginTop: '1.5em' }}>
                    <Link to={"/viewCompany/" + e.value._id} style={{ color: 'black', textDecoration: 'solid' }}>
                      View Company<FaArrowRightLong />
                    </Link>
                  </div>
                </div>

              )
            })
          }
        </div>
        <div className="h3 pt-4 pb-2">Browse Companies</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }} className="gap-3 ">
          {
            companyData && companyData.map((e) => {
              return (
                <div className="shadow border rounded " style={{ width: '23em' }}>
                  <div style={{ backgroundColor: 'rgb()' }} className="card-profile pt-3 p-1">
                    <p style={{ backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),color:'white'}}>{e?.company_name?.slice(0, 2).toUpperCase()}</p>
                  </div>
                  <div style={{ fontSize: '1.1em', marginLeft: '5em', marginTop: '-5.5em', height: '3.5em' }}><b>{e.company_name}</b></div>
                  <div style={{ marginLeft: '6em', marginTop: '-0.7em', color: 'gray' }}>{e.location}</div>                 
                   <div style={{ marginLeft: '15em', marginTop: '1.5em' }}>
                    <Link to={"/viewCompany/" + e._id} style={{ color: 'black', textDecoration: 'solid' }}>
                      View Company<FaArrowRightLong />
                    </Link>
                  </div>
                </div>

              )
            })
          }
        </div>
      </div>

      <div className="footter">
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
                <img className="plays" src="https://codezo.s3.amazonaws.com/static/img/google-play-download.png" />
            </div>
            </div>
    </div>
  );
}

export default Ifollow;



