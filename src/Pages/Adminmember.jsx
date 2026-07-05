import React, { useState } from "react";
import axios from "axios";

function Adminmember() {
  const [member, setMember] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    skills: "",
    experience: "",
    joiningDate: "",
    address: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setMember((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (let key in member) {
        formData.append(key, member[key]);
      }

      const response = await axios.post(
        "http://localhost:3000/addmember",
        formData
      );

      console.log(response.data);

      alert("Member Added Successfully");

      setMember({
        fullName: "",
        email: "",
        phoneNo: "",
        skills: "",
        experience: "",
        joiningDate: "",
        address: "",
        profilePicture: null,
      });
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-[500px]"
      >
        <h1 className="text-2xl font-bold mb-5 text-center">
          Add Member
        </h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={member.fullName}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={member.email}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="number"
          name="phoneNo"
          placeholder="Phone Number"
          value={member.phoneNo}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={member.skills}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={member.experience}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="date"
          name="joiningDate"
          value={member.joiningDate}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={member.address}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="file"
          name="profilePicture"
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Member
        </button>
      </form>
    </div>
  );
}

export default Adminmember;