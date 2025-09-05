import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import PostLeaves from "../components/PostLeaves";
import toast from "react-hot-toast";

const LeaveForm = () => {

  const [formData, setFormData] = useState({
    reason: "",
    from: "",
    to: "",
    leaveType: "",
  });

  const [fieldError , setFieldError] = useState(false)

  const {jwtToken} = useContext(UserContext)


  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    console.log(jwtToken)
    const userDetails = jwtDecode(jwtToken)
    console.log("from the handle submit button",userDetails)
    const valuesOfFormData = Object.values(formData).some(item=>item==='')
    if(valuesOfFormData){
      setFieldError(true)
    }else{
      setFieldError(false)
       const apiurl =` ${import.meta.env.VITE_BACKEND_URL}/api/leave/apply`

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "content-type": "application/json",
        
      },
      body: JSON.stringify({
        name: userDetails.username,
        employeeId: userDetails.userId,
        email:userDetails.email,
        ...formData,
      }),
    };
    const response = await fetch(apiurl, options);

    if (response.ok) {
      console.log("Successfully posted data to backend");
      toast.success("submited successfully")
    } else {
      console.log("Unable to post data to backend");
      toast.error("Unable to post data to backend")
    }

    }

  }
   
  


  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center   p-6">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
          <p className="text-2xl font-bold text-center text-[#00a99d] mb-6">
            Leave Form
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-sm text-black">From</label>
                <input
                  type="date"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className="border rounded-lg p-2 "
                />
              </div>

              <div className="flex flex-col flex-1">
                <label className="text-sm text-black">To</label>
                <input
                  type="date"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="border rounded-lg p-2 "
                />
              </div>
            </div>

            <select
              name="leaveType"
              value={formData.LeaveType}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal">Personal</option>
              <option value="Others">Others</option>
            </select>

            <textarea
            placeholder="Reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="border rounded-lg p-3  h-24 "
          />
          {fieldError && <p className='text-red-400'>All fields are mandatory</p>}
          <button
            type="submit"
            className="bg-[#00a99d] text-white py-3 rounded-lg font-semibold  hover:bg-[#2a9992] "
          >
            Submit
          </button>
        </form>

      </div>
        </div>
              <PostLeaves />

    </>
  );
};

export default LeaveForm;
