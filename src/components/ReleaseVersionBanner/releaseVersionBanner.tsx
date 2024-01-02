import React from 'react';
import "./releaseVersionBanner.css";
import { token } from '../../auth';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { logout } from "../../redux/actions/userActions";
import Cookies from "js-cookie";


const ReleaseVersionBanner = ({ message, versionAlert }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogNotify = () => toast.success("Log-Out!");

  const refreshAndLogOut = async () => {
    await dispatch(logout());
    await Cookies.remove("token");
    await localStorage.removeItem("token");
    await localStorage.removeItem("archive");
    await localStorage.removeItem("embauch");
    await localStorage.removeItem("profile");
    await localStorage.removeItem("LoginUser");
    versionAlert(false);
    navigate("/");
    LogNotify();
  };

  return (
    <div className="banner shadow-lg">
      <p className='my-2'>{message}</p>
      <div onClick={refreshAndLogOut}>
      <Link to={"/"} className='btn updateCRMBtn'>
        <span className='mt-n2 font-weight-bold'>Update CRM</span>
      </Link>
      </div>
    </div>
  );
};

export default ReleaseVersionBanner;