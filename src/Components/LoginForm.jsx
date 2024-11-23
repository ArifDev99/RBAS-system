import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { user } from "../Data/users";
import { setCookie } from "../Utils/common";
import { useUser } from "../Context/userContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onClose, header }) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const firstInput = useRef(null);

  useEffect(() => {
    firstInput.current.focus();
  }, []);

  const handleSubmit = () => {
    if (!email && !password) {
      alert("Please fill form all required fields");
      return;
    }

    let formData = new Object();
    formData["email"] = email;
    formData["password"] = password;

    // you can call database here


    setTimeout(() => {
      let checkUser = user.filter((u) => u.email === formData.email.trim());
      console.log("checkUser", checkUser);
      console.log("login", header);

      if (
        checkUser.length &&
        checkUser[0].email === formData.email &&
        checkUser[0].password === formData.password
      ) {
        setCookie("_USER_AUTH_", JSON.stringify(checkUser[0]));
        setUserInfo(checkUser[0]);
        toast.success("Login done Successfully");
        onClose();
        navigate("/");
      } else {
        toast.error("Something Went Wrong!");
      }
    }, 2000);
  };
  return (
    <>
      <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
          <button onClick={onClose} className="absolute top-2 right-2">
            X
          </button>
          <div className="my-6">
            <h1 className="text-xl text-center font-semibold">
              {header} Login
            </h1>
          </div>
          <form className="mx-auto">
            <div className="w-full mb-5">
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block py-2.5  w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 px-2"
                ref={firstInput}
                placeholder=""
              />
            </div>
            <div className="w-full mb-5">
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block py-2.5  w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 px-2"
                placeholder=""
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-lg font-medium sm-w-auto text-white bg-purple-500 hover:bg-purple-700 w-full text-center "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
