import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Adminupdatemember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    skills: "",
    experience: "",
    joiningDate: "",
    address: "",
    profilePicture: null, // will hold a File only if user picks a new one
  });

  // Separate state just for showing the picture (existing URL or new file preview)
  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setMember((prev) => ({ ...prev, [name]: file }));
      if (file) {
        setPreviewUrl(URL.createObjectURL(file)); // instant local preview
      }
    } else {
      setMember((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (let key in member) {
        if (key === "profilePicture") {
          // Only send the file if the user actually picked a NEW one.
          // Otherwise skip it so the backend keeps the existing picture.
          if (member.profilePicture instanceof File) {
            formData.append("profilePicture", member.profilePicture);
          }
        } else {
          formData.append(key, member[key]);
        }
      }

      const response = await axios.post(
        `http://localhost:3000/updatemember/${id}`,
        formData
      );

      console.log(response.data);

      alert("Member updated Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  const getSingleMember = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/selectsingleemember/${id}`
      );

      const data = response.data.member;

      // <input type="date"> only accepts "YYYY-MM-DD", but MongoDB
      // returns a full ISO string (e.g. 2024-05-01T00:00:00.000Z),
      // so the field looks empty unless we trim it down.
      const formattedDate = data.joiningDate
        ? data.joiningDate.slice(0, 10)
        : "";

      setMember({ ...data, joiningDate: formattedDate });

      // profilePicture from the backend is a URL string — use it for preview
      if (data.profilePicture) {
        setPreviewUrl(data.profilePicture);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleMember();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-[500px]"
      >
        <h1 className="text-2xl font-bold mb-5 text-center">Update Member</h1>

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

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-24 h-24 object-cover rounded mb-3 border"
          />
        )}

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
          Update Member
        </button>
      </form>
    </div>
  );
}

export default Adminupdatemember;