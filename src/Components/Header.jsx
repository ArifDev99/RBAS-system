import  { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../Context/userContext";
import { deleteCookie } from "../Utils/common";
import { getMenu } from "../Constant/constant";

const Header = () => {
    const navigate = useNavigate()
    const {userInfo, setUserInfo} = useUser()
    const [menu, setMenu]=useState([])

    useEffect(()=>{
        console.log("Header",userInfo);
        
        if(userInfo) setMenu(getMenu(userInfo.role)) 
        else setMenu([])
    },[userInfo])

    const handelLogout=()=>{
        deleteCookie('_USER_AUTH_');
        setUserInfo(null) 
        navigate('/login')
        setMenu([])
    }
  return (
    <>
      <nav className="bg-white border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="text-xl font-bold px-4">
                RBAC-system
            </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8  md:mt-0 md:border-0 md:bg-white ">
              <li>
              {menu.map((item,i)=>{
                return <NavLink key={i} className="px-2 text-black" to={item.path}>{item.displayName}</NavLink>
              })}
              </li>
              
              {userInfo ?
                <button onClick={handelLogout} >Logout </button> 
                :
                <button>  <NavLink to="/login" className='text-white' >Login</NavLink></button>
             }

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
