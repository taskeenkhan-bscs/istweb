import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Adminmembershowlist() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers();
  }, []);

  async function getMembers() {
    try {
      const res = await axios.get("http://localhost:3000/getmember");

      if (res.data.success) {
        setMembers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMember(id) {

    const memberId = id;

    try {

      const res = await axios.post(
        `http://localhost:3000/deletemember/${memberId}`
      );

      if (res.data.success) {
        alert("Member Deleted Successfully");
        getMembers();
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Team Members
            </h1>
            <p className="text-slate-500 mt-1">
              Manage and view all members
            </p>
          </div>

          <div className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold">
            Total Members: {members.length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Skills</th>
                <th className="px-6 py-4 text-left">Experience</th>
                <th className="px-6 py-4 text-left">Joining Date</th>
                <th className="px-6 py-4 text-left">Address</th>
                <th className="px-6 py-4 text-left">Profile</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {members.length > 0 ? (
                members.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {index + 1}
                    </td>



                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {item.fullName}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {item.email}
                    </td>

                    <td className="px-6 py-4">
                      {item.phoneNo}
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {item.skills}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {item.experience}
                    </td>

                    <td className="px-6 py-4">
                      {item.joiningDate}
                    </td>

                    <td className="px-6 py-4 max-w-xs truncate">
                      {item.address}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={item.profilePicture || "https://via.placeholder.com/60"}
                        alt="Profile"
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">

                        <button
                          onClick={() => deleteMember(item._id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg"
                        >
                          🗑
                        </button>

                        <button onClick={() => {
                         navigate(`/updatemember/${item._id}`);
                        }
                        }
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg shadow-md transition-all duration-300"
                        >
                          ✏
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center py-10 text-slate-500"
                  >
                    No Members Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Adminmembershowlist;