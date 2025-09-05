import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { UserContext } from "../context/UserContext";
import DateFormater from "../utils/DateFormate";
import toast from "react-hot-toast";
// import Search from '../components/Search';
// import Table from '../assets/Employee/Book.png'
// import Delete from '../assets/Employee/Book.png'
// import Book from '../assets/Employee/Book.png'
// import Linkedin from '../assets/Employee/linkedin.png'

const statusColors  = {
  Pending:'#F5C983' , 
  Approved:"#A8F583" , 
  Cancelled:"#F08080"
}

function Mangemployee() {
  const [data, setData] = useState([]);
  const [allDept, setAllDept] = useState([]);
  const [showform, setShowForm] = useState(false);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit , setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [showData, setShowData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const {jwtToken} = useContext(UserContext)


  useEffect(() => {
    async function getLeaves(){
        const token = localStorage.getItem("jwt_token")
        console.log(token , jwtToken)
        try{
            const options = {
                method:"GET" , 
                headers:{
                    "Content-Type":"application/json" , 
                    "Authorization":`Bearer ${token}`
                }
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/leavebyuser?page=${page}&limit=${limit}` , options)
            const data = await response.json()
            setData(data.leaves)
            setTotalPages(Math.ceil(data.leaves.length/limit))
        }catch(error){
            console.log(error)
            toast.success("Submited Successfuly")        }
    }

    getLeaves()
  }, [page ,  limit]);

  console.log("....data", data);

  function handleDelete() {}

  function handleCheckboxDelete() {}

  function handleSearchChange() {}

  function handleActiveJob() {}

  

  const columns = [
    { id: "leaveType", header: "Leave Type" },
    {
      id: "reason",
      header: "Reason",
      cell:(row)=><p>{row.reason.slice(0 ,10)}...</p>
    },
    // { id: "_id", header: "Leave Id" },
    // { id: "name", header: "Name" },

    {
       id: "from", 
       header: "From" ,
       cell:(row)=>{
        console.log("this is from date from", row)
        return DateFormater(row.from)
       }
      },

    {
      id: "to",
      header: "To",
      cell:(row)=>{
        console.log("this is from date from", row)
        return DateFormater(row.to)
       }
      
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => {
        console.log(statusColors[row.status])
        return(
        <span style={{background:statusColors[row.status] , padding:5 ,borderRadius:12 ,paddingRight:8 , paddingLeft:8,  fontWeight:"bold"}}>
          {row.status}
        </span>
      )},
    },

    {
      id: "actions",
      header: "Approved by",
    },
    { id: "AppliedAt", header: "Applied At",
      cell:(row)=>{
        console.log("this is from date from", row)
        return DateFormater(row.AppliedAt)
       }
     },
  ];

  function handleInc()
  {
    console.log(totalPages , page)
    
      setPage(page+1)
  }


  function handleDec()
  {
    if(page>1)
    setPage(page-1)
  }
  
  return (
    
    <>
     

      <div className="flex justify-between py-4 px-4">
        <div>
          <p className="text-center text-[#00a99d] font-semibold text-2xl ">
            Manage Leaves
          </p>
        </div>
        <div className="flex gap-4">
          
        </div>
      </div>

      <div className="flex justify-between px-5 py-3">
        {/* <p>Total {totalResponses} Responses</p> */}
        {/* <p>No filters applied</p>
        <button
          onClick={handleCheckboxDelete}
          className="  flex px-2 py-2 bg-white-500 text-red-800 rounded-lg gap-2   border-red-800 group border"
        >
          Delete Selections
          <img src="/public/Delete.png" alt="delete" className=" w-5 h-5" />
        </button> */}
      </div>

      <div id="jobs" className="p-4 w-screen">
        <Table data={data} columns={columns} />

        <div className="flex justify-center items-center mt-10 gap-4 px-7 flex-row">
          <span className="text-lg flex-1 text-[#444444] font-medium">
            
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleDec}
             
              className={`p-2 bg-[#00a99d] rounded-full ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
             Prev
            </button>
            <button
             onClick={handleInc}
              className={`p-2 bg-[#00a99d] rounded-full ${
                page === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
       
      </div>
    </>
  );
}

export default Mangemployee;
