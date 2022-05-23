import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import "../CSS/Login.css";
import { connect, useDispatch, useSelector, Connect } from "react-redux";
// import { loginUser } from '../redux/actions/userActions';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/serverApiConfig";
import { loginUserAction } from "../redux/actions/userActions";
import Dashboard from "./Dashboard";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const state = useSelector((state: any) => state.loginReducer);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const notifyLogin = () => toast("Welcome To Intermann!",);
  const notifyLoginError = () => toast("Invalid Email or Password! Please Try Again.");
  const notifyMessage = () => toast("Please Sign In!", {
    autoClose: 1000,
    closeOnClick: true,
    toastId: "custom-id-yes"
  });

  useEffect(() => {
    if (state?.login?.status) {
      notifyLogin();
      console.log(state.login.token);
      localStorage.setItem("token", state.login.token);
      navigate("/dashboard");
    } else if (state?.login?.error !== undefined) {
      notifyLoginError();
    } else {
      notifyMessage();
    }

  }, [state])

  const onLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUserAction({ email, password }));
  };

  return (
    <main>
      <div className="d-flex justify-content-between">
        <div className="bg-dark p-1">
          <a href="http://intermann.ro/" target="_blank">
            <button className="btn btn-dark">VOIR LE SITE ROUMAIN</button>
          </a>
        </div>
        <div className="bg-dark p-1">
          <a href="https://www.intermann.fr/" target="_blank">
            <button className="btn btn-dark">VOIR LE SITE FRANCAIS</button>
          </a>
        </div>
      </div>
      <div className="logo-hold">
        <Logo />
      </div>
      <br />
      <section className="mb-2">
        {/* <form className="login-panel" > */}
        <form className="login-panel" onSubmit={onLoginFormSubmit}>
          <div className="text-center">
            <h3>LOGIN BACKOFFICE</h3>
          </div>
          <div className="mx-auto py-4">
            <div className="d-flex input-box">
              <span className="icon">
                <svg
                  width="3rem"
                  height="3rem"
                  viewBox="0 0 73 73"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.3392 18.9146H56.4101C58.09 18.9146 59.4518 20.2764 59.4518 21.9562L59.4517 21.9664L59.3606 49.2771C59.355 50.9529 57.9948 52.3086 56.3189 52.3086H16.3088C14.6289 52.3086 13.2671 50.9468 13.2671 49.2669L13.2671 49.2635L13.2975 21.9529C13.2994 20.2743 14.6606 18.9146 16.3392 18.9146Z"
                    stroke="#FE8700"
                    stroke-width="2.4"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M35.7596 40.371C36.2641 40.8008 37.0215 40.7402 37.4513 40.2357C37.881 39.7312 37.8204 38.9738 37.3159 38.544L35.7596 40.371ZM14.8863 19.4384C14.3818 19.0086 13.6244 19.0692 13.1947 19.5738C12.7649 20.0783 12.8255 20.8356 13.33 21.2654L14.8863 19.4384ZM59.6363 21.2635C60.1398 20.8325 60.1985 20.075 59.7676 19.5715C59.3366 19.068 58.579 19.0093 58.0756 19.4403L59.6363 21.2635ZM35.7572 38.5459C35.2538 38.9769 35.195 39.7344 35.626 40.2379C36.057 40.7414 36.8145 40.8001 37.318 40.3691L35.7572 38.5459ZM37.3159 38.544C29.8394 32.1755 24.232 27.3991 20.4937 24.2148C18.6246 22.6227 17.2227 21.4285 16.2881 20.6325C15.8209 20.2344 15.4704 19.9359 15.2368 19.7369C15.1199 19.6374 15.0323 19.5628 14.9739 19.513C14.9447 19.4881 14.9228 19.4695 14.9082 19.457C14.9009 19.4508 14.8954 19.4461 14.8918 19.443C14.89 19.4415 14.8885 19.4403 14.8877 19.4395C14.887 19.439 14.887 19.439 14.8866 19.4387C14.8865 19.4386 14.8864 19.4385 14.8864 19.4384C14.8863 19.4384 14.8863 19.4384 14.1082 20.3519C13.33 21.2654 13.3301 21.2654 13.3301 21.2655C13.3302 21.2655 13.3303 21.2656 13.3304 21.2657C13.3305 21.2658 13.331 21.2663 13.3314 21.2666C13.3321 21.2672 13.3338 21.2686 13.3355 21.2701C13.339 21.273 13.3448 21.278 13.3519 21.2841C13.3665 21.2965 13.3885 21.3152 13.4176 21.34C13.4761 21.3898 13.5637 21.4644 13.6805 21.5639C13.9141 21.7629 14.2646 22.0615 14.7319 22.4595C15.6664 23.2556 17.0683 24.4497 18.9374 26.0418C22.6757 29.2261 28.2831 34.0025 35.7596 40.371L37.3159 38.544ZM58.856 20.3519C58.0756 19.4403 58.0756 19.4403 58.0755 19.4404C58.0754 19.4404 58.0754 19.4405 58.0752 19.4406C58.075 19.4408 58.0747 19.441 58.0742 19.4415C58.0732 19.4423 58.072 19.4433 58.0701 19.445C58.0665 19.448 58.061 19.4528 58.0538 19.4589C58.0393 19.4714 58.0175 19.49 57.9884 19.5149C57.9303 19.5647 57.8431 19.6393 57.7269 19.7388C57.4944 19.9378 57.1456 20.2364 56.6807 20.6344C55.7508 21.4305 54.3559 22.6246 52.496 24.2167C48.7763 27.401 43.1967 32.1774 35.7572 38.5459L37.318 40.3691C44.7574 34.0006 50.337 29.2242 54.0567 26.0399C55.9166 24.4478 57.3115 23.2537 58.2414 22.4576C58.7064 22.0596 59.0551 21.761 59.2876 21.562C59.4038 21.4625 59.491 21.3879 59.5492 21.3381C59.5782 21.3132 59.6 21.2946 59.6145 21.2821C59.6218 21.2759 59.6272 21.2713 59.6309 21.2682C59.6327 21.2666 59.6341 21.2654 59.635 21.2647C59.6354 21.2643 59.6358 21.2639 59.636 21.2638C59.6361 21.2637 59.6362 21.2636 59.6362 21.2636C59.6363 21.2635 59.6363 21.2635 58.856 20.3519Z"
                    fill="#FE8700"
                  />
                </svg>
              </span>
              <span className="input">
                <input
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  placeholder="Email"
                  required
                />
              </span>
            </div>
            <br />
            <div className="d-flex input-box">
              <span className="icon">
                <svg
                  width="3rem"
                  height="3rem"
                  viewBox="0 0 83 83"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M28.1872 33.801H59.0012C60.8921 33.801 62.425 35.3339 62.425 37.2248V61.1912C62.425 63.0821 60.8921 64.615 59.0012 64.615H28.1872C26.2963 64.615 24.7634 63.0821 24.7634 61.1912V37.2248C24.7634 35.3339 26.2963 33.801 28.1872 33.801Z"
                    stroke="#FE8700"
                    stroke-width="2.4"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M32.6099 33.801V25.1063C32.6099 19.0397 37.5278 14.1217 43.5945 14.1217C49.6611 14.1217 54.5791 19.0397 54.5791 25.1063V25.1745V25.1745V33.801"
                    stroke="#FE8700"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span className="input">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  placeholder="Password"
                  required
                />
              </span>
            </div>
            <br />
            <br />
            <div className="px-2">
              <p>
                If you lost your login account please mail :{" "}
                <a href="mailto:contact@textone.fr">contact@textone.fr</a>
                <br />
                Login should be your @intermann.ro address
              </p>
            </div>
            <br />
            <div className="d-flex">
              <button type="submit" className="sign-in-btn mx-auto btn">
                SIGN IN
              </button>
            </div>
          </div>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </section>
    </main>
  );
}

//this map the states to our props in this functional component

//this map actions to our props in this functional component
export default Login;
