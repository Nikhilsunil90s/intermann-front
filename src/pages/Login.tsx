import React, { useState, useEffect,useRef } from "react";
import "../CSS/Login.css";
import { connect, useDispatch, useSelector, Connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserAction, logout } from "../redux/actions/userActions";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Cookies from 'js-cookie'

function Login() {
  const navigate = useNavigate();
  const state = useSelector((state: any) => state.loginReducer);
  const action = useSelector((action: any) => action.loginReducer);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ModalOpen,setModalOpen]=useState(false)
  const [LoginLoad,setLoginLoad]=useState(false)

  const notifyLogin = () => toast.success("Welcome To Intermann!");
  const notifyLoginError = () =>
    toast.dismiss("Invalid Email or Password! Please Try Again.");
  const notifyMessage = () => toast("Please Sign In!", {});

  useEffect(() => {
    if (state?.login?.status) {
      notifyLogin();
    setLoginLoad(false)
    Cookies.set("token", state.login.token,{expires:1});
      localStorage.setItem("LoginUser",JSON.stringify(state.login.user))
      navigate("/dashboard");
    } else if (state?.login?.error !== undefined) {
      notifyLoginError();
    setLoginLoad(false)

    }
  }, [state]);
  useEffect(() => {
    let login = Cookies.get("token");
    if (login) {
      navigate("/dashboard");
    }
  });

  const onLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoginLoad(true)
    e.preventDefault();
    dispatch(loginUserAction({ email, password }));
    if (state?.login?.status) {
      notifyLogin();
    setLoginLoad(false)
      Cookies.set("token", state.login.token);
      localStorage.setItem("LoginUser",JSON.stringify(state.login.user))
      navigate("/dashboard");
    } else if (state?.login?.error !== undefined) {
    setLoginLoad(false)
    notifyLoginError();
    }
  };
  const Modal=()=>{

    if(ModalOpen == true){
     setModalOpen(false)
    }
    if(ModalOpen == false){
     setModalOpen(true)
    }
 
   }

   const onchange=(val:any)=>{
    if (val == 'ROUMAIN') {
          window.open("https://www.intermann.ro/")
         } 
         if (val == 'FRANCAIS') {
           window.open("https://www.intermann.fr/")
           
         }
}


const ref = useRef();

useOnClickOutside(ref, () => setModalOpen(false));

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because the passed-in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}


  return (
    <main className="padding-x01">
      <div className="container-fluid">
        <div className="row m-0">
        
          <div className="col-12">
            <div className="row" style={{height:"100vh"}}>
              <div className="col-6 px-0">
                <div className="img-Back d-flex justify-content-center align-items-center">
                <div
              
                className="d-flex bottom-radius  justify-content-center align-items-center text-decoration-none"
              >
                <img className="TopStickClass" src={require("../images/LoginStick.svg").default} />
                <span>
                  <img src={require("../images/logo-header.svg").default} style={{width:"70px"}} className="filter-logo" />
                </span>
                <img src={require("../images/LogoName.svg").default} style={{width:"175px"}} className="filter-text" />
              </div>
                </div>
              </div>
              <div className="col-6 pt-1">
                <div className=" d-flex justify-content-end">
                <div  className="d-flex cursor-pointer" onClick={()=>
                  Modal()}>
                    <div className="HeaderModalSelect">
                      <img src={require("../images/headerSelect.svg").default} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center ml-1" >
                      <img src={require("../images/Vector-9.svg").default} />
                    </div>
                    {
                ModalOpen ? 
                
                <div className="modal d-flex LoginModalContainer"  ref={ref}  data-target='#deleteModal'  id="staticBackdrop2"  data-backdrop="static" data-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog HeaderWidthModal">
                    <div className="modal-content">
                        <div className="modal-body HeaderWidthModal text-start">
                            <button
                             style={{
                               backgroundColor:"transparent",
                               border:"0px",
                               width: "100%",
                               height: "35px",
                               textAlign:"left"
                            }}
                            className="hoverbtnS"
                      
                          onClick={()=>{onchange("ROUMAIN");setModalOpen(false);}}
                            >
                      <p className="VoirLESite mb-0 ml-1">VOIR LE SITE ROUMAIN</p>
                           </button>
                           <button 
                          onClick={()=>{onchange("FRANCAIS");setModalOpen(false);}}
                            style={{
                            marginTop:"10px",
                            backgroundColor:"transparent",
                            border:"0px",
                            width: "100%",
                         height:"35px",
                         textAlign:"left"
                            
                            }}
                            className="hoverbtnS"
                            >
              <p className="VoirLESite mb-0 ml-1">VOIR LE SITE FRANCAIS</p>
                           </button>
                        </div>
                    </div>
                </div>
            </div>
           
                : 
                null
               }
                    </div>
                    
                   
                </div>
                <br />
                <section className="Login-fields">
                  {/* <form className="login-panel" > */}
                  <form className="login-panel" onSubmit={onLoginFormSubmit}>
                    <div className="text-center">
                      <h3 className="fw-bold backOffice">LOGIN BACKOFFICE</h3>

                      <p className="lost-If">
                        If you lost your login account please mail
                        contact@textone.fr <br />Login should be your @intermann.ro
                        adress
                      </p>
                    </div>
                    <div className="mx-auto ">
                      {
                        LoginLoad?
                        <div className="col-12  d-flex align-items-center justify-content-center mt-5 mb-2">
<span  className="formLogin" />
</div>
                        :
<>
                        <div className="text-start">
                        <label htmlFor="Email "  className="fw-bold">E-mail</label>
                        <div className="d-flex input-box" style={{height:"50px"}}>
                          <span
                            className="icon"
                            style={{ paddingLeft: "15px" }}
                          >
                            <img src={require("../images/EmailIcon.svg").default} />
                          </span>
                          <span className="input">
                            <input
                              name="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              style={{fontFamily:"Poppins",fontSize:"18px",fontWeight:"500"}}
                              placeholder="Email"
                              required
                              disabled={LoginLoad}
                              
                            />
                          </span>
                        </div>
                      </div>
                      <br />
                      <div className="text-start">
                        <label htmlFor="Password"  className="fw-bold">Password</label>
                        <div className="d-flex input-box" style={{height:"50px"}}>
                          <span
                            className="icon"
                            style={{ paddingLeft: "15px" }}
                          >
                            <img  src={require("../images/PasswordInput.svg").default} />
                          </span>
                          <span className="input">
                            <input
                              type="password"
                              name="password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              placeholder="Password"
                              required
                              disabled={LoginLoad}
                            />
                          </span>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="px-2">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-6 text-start">
                              <input type="checkbox" />
                              <span className="Remember-me">Remember me</span>
                            </div>
                            <div className="col-6">
                              <p className="fw-bold forgetPassword">
                                Forgot Password ?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      </>
                      }
                     
                      <br />
                      <div className="d-flex">
                        
                  <motion.button
  
  type="submit"
  className="sign-in-btn mx-auto btn"
  disabled={LoginLoad} whileTap={{ scale: 0.9 }} 
>
                   
                          <div className="col-12">
                            <div className="row">
                              <div className="col-2 d-flex justify-content-start align-items-center">
                              {LoginLoad ? <div className="loaderLogin"></div> :null}
                              </div>
                              <div className="col-8 d-flex justify-content-center align-items-center">
                              {LoginLoad ? "Please Wait.."  :  "SIGN IN"}
                                </div>
                                <div className="col-2 d-flex  justify-content-end align-items-center ">
                                {LoginLoad ? <div className="loaderLogin"></div> :null}
                                </div>
                            </div>
                          </div>
                   
                          </motion.button>

                      </div>
                    </div>
                  </form>
                
                  <Toaster position="top-right" containerStyle={{zIndex:"9999999999999999"}}/>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  
  );
}

//this map the states to our props in this functional component

//this map actions to our props in this functional component
export default Login;
