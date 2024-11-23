export const ROUTES = Object.freeze({
    HOME:"/",
    DASHBOARD: "/dashboard",
    SIGNUP: "/signup",
    LOGIN: "/login",
  });

export const DepartmentList=["Management","Human Resources","IT","Marketing","Sales","Support","Product"]
export const rolesList = ["Admin", "Manager", "Employee", "Engineer", "Specialist"];

export const Menu = [

  {
      id:0,
      displayName:'Home',
      path:'/',
      role:['EMPLOYEE', 'ADMIN','MANAGER','ENGINEER','SPECIALIST'] //access role
  },
  {
      id:1,
      displayName:'Admin Dashboard',
      path:'/dashboard',
      role:['ADMIN'] //access role
  },
  {
      id:2,
      displayName:'Management',
      path:'/hr',
      role:['MANAGER','ADMIN'] //access role
  },
  {
      id:3,
      displayName:'Engineering Service',
      path:'/service',
      role:['ADMIN','ENGINEER'] //access role
  },
  {
      id:4,
      displayName:'Sales Service',
      path:'/sales',
      role:['ADMIN',"SPECIALIST"] //access role
  },
 
]

// Function to get menu items based on the user role base 
export const getMenu =(userRole)=>{
  //filter the menu itmes based on the user role 
  return Menu.filter((item)=> item.role.includes(userRole.toUpperCase()))
}