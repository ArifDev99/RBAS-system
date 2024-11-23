import { useEffect, useState } from "react";
import { user } from "../Data/users";
import AddEmployee from "../Components/AddEmployee";
import { DeletePopup } from "../Components/DeletePopup";
import { EditPopup } from "../Components/EditPopup";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const [addEmployeePopup, setaddEmployeePopup] = useState(false);
  const [allEmployeeData, setAllEmployeeData] = useState(user);
  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const [showEditPopup, setshowEditPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(allEmployeeData);
  const [employeeCounts, setEmployeeCounts] = useState({
    total: 0,
    departments: {},
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const calculateEmployeeCounts = () => {
    const departmentCounts = allEmployeeData.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});

    setEmployeeCounts({
      total: user.length,
      departments: departmentCounts,
    });
  };

  useEffect(() => {
    calculateEmployeeCounts(allEmployeeData);
    setFilteredEmployees(allEmployeeData);
  }, [allEmployeeData]);
  const departmentList = Object.keys(employeeCounts.departments);
  console.log(departmentList);

  const getEmployeedata = (dept) => {
    const data = allEmployeeData.filter((u) => u.department === dept);
    setFilteredEmployees(data);
  };

  const handleDelete = () => {
    console.log(selectedEmployee);
    const updatedEmployees = allEmployeeData.filter(
      (emp) => emp.id !== selectedEmployee.id
    );
    setAllEmployeeData(updatedEmployees);
    setshowDeletePopup(false);
    toast.success("Data Deleted Successfully");
  };
  return (
    <>
      <div className="bg-slate-100">
        <div className="flex-col sm:flex sm:flex-row  ">
          <button
            onClick={toggleSidebar}
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <div
            className={`w-[400px] fixed z-40 sm:relative transition-transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0`}
          >
            <div className="px-2 py-1">
              {departmentList.map((dept) => (
                <div
                  onClick={() => getEmployeedata(dept)}
                  key={dept}
                  className="text-center rounded-lg bg-slate-400 border-b-2 p-4 cursor-pointer hover:bg-slate-600 focus:bg-slate-600"
                >
                  {dept}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center w-full px-4 py-4">
              <h1 className="font-semibold">Admin Dashboard</h1>
              <button
                className="px-4 py-2 bg-purple-500 rounded-md"
                onClick={() => setaddEmployeePopup(true)}
              >
                Add Employee
              </button>
            </div>
            <div className="p-4 grid grid-flow-row grid-cols-2 md:grid-cols-4  gap-4 justify-evenly">
              <div className="bg-green-500 w-full h-24 flex flex-col justify-center items-center">
                <p>Employee</p>
                <p>{employeeCounts.total}</p>
              </div>

              {departmentList.map((dept) => (
                <div
                  key={dept}
                  className="bg-purple-400 w-full h-24 flex flex-col justify-center items-center"
                >
                  <p className="text-md md:text-xl font-semibold">{dept}</p>
                  <p>{employeeCounts.departments[dept]}</p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto sm:rounded-lg p-4">
              <table className="w-full tex-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Dpartment</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees?.map((u) => (
                    <tr
                      className="bg-white border-b hover:bg-gray-200 "
                      key={u.id}
                    >
                      <td className="px-6 py-4">{u.name}</td>
                      <td className="px-6 py-4">{u.department}</td>
                      <td className="px-6 py-4">{u.role}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <div
                            onClick={() => {
                              setSelectedEmployee(u);
                              setshowEditPopup(true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </div>
                          <div
                            onClick={() => {
                              setSelectedEmployee(u);
                              setshowDeletePopup(true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="text-red-500 size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {addEmployeePopup && (
        <AddEmployee
          onClose={() => setaddEmployeePopup(false)}
          setAllEmployeeData={setAllEmployeeData}
        />
      )}

      {showDeletePopup && (
        <DeletePopup
          onClose={() => setshowDeletePopup(false)}
          handleDelete={() => handleDelete()}
        />
      )}
      {showEditPopup && (
        <EditPopup
          onClose={() => setshowEditPopup(false)}
          selectedEmployee={selectedEmployee}
          allEmployeeData={allEmployeeData}
          setAllEmployeeData={setAllEmployeeData}
        />
      )}
    </>
  );
};
