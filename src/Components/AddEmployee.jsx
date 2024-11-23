import React, { useEffect, useRef, useState } from "react";
import { DepartmentList, rolesList } from "../Constant/constant";
import { user } from "../Data/users";
import toast from "react-hot-toast";
const AddEmployee = ({ onClose , setAllEmployeeData}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [department, setDepartment] = useState();
  const [role, setRole] = useState();

  const firstInput=useRef(null)

  const handleSubmit = () => {
    
    if (!email && !name && !department && !role) {
        alert("Please fill form all required fields");
        return;
    }
    
    let formData=new Object();
    formData["name"]=name;
    formData["email"]=email;
    formData["department"]=department;
    formData["role"]=role;
    formData["id"]=user.length+1;
    
    // you can call database here
    console.log(formData);
    
    setAllEmployeeData((prev) => [...prev, formData]);
    onClose();
    toast.success("Data Added Successfully")
  };
  useEffect(()=>{
    firstInput.current.focus();
  },[])
  return (
    <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="absolute top-2 right-2">
          X
        </button>
        <form className="mx-auto">
          <div className="w-full mb-5">
            <label htmlFor="name" className="">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="block py-2.5  w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 px-2"
              placeholder=""
              ref={firstInput}
            />
          </div>
          <div className="w-full mb-5">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5  w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 px-2"
              placeholder=""
            />
          </div>
          <div className="w-full mb-5">
            <label htmlFor="department" className="">
              Department
            </label>
            <select onChange={(e)=>setDepartment(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200">
              <option >Choose a department</option>
              {DepartmentList.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full mb-5">
            <label htmlFor="role" className="">
              Role
            </label>
            <select onChange={(e)=>setRole(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200">
              <option defaultValue="employee">Choose a role</option>
              {rolesList.map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            </select>
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
  );
};

export default AddEmployee;
