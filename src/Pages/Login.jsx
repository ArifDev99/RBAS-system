import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import SignupForm from "../Components/SignupForm";
import Userlogo from "../Assets/Userlogo.png";

export const Login = () => {
  const [showLoginPopup, setshowLoginPopup] = useState(false);
  const [showSignupPopup, setshowSignupPopup] = useState(false);
  return (
    <>
      <div>
        <div className="flex-col p-4 mx-auto sm:flex sm:flex-row h-screen sm:w-full sm:justify-evenly sm:items-center  bg-slate-300">
          <div
            onClick={() => {
              setshowLoginPopup(true);
            }}
            className="w-full sm:w-96 h-96 bg-purple-500 my-4"
          >
            <img src={Userlogo} className="h-80 w-full"></img>
            <h1 className="text-center text-4xl">Login</h1>
          </div>
          <div
            onClick={() => setshowSignupPopup(true)}
            className="w-full sm:w-96  h-96 bg-lime-600"
          >
            <img src={Userlogo} className="h-80 w-full"></img>
            <h1 className="text-center text-4xl">Signup</h1>
          </div>
        </div>
      </div>
      {showLoginPopup && <LoginForm onClose={() => setshowLoginPopup(false)} />}
      {showSignupPopup && (
        <SignupForm onClose={() => setshowSignupPopup(false)} />
      )}
    </>
  );
};
