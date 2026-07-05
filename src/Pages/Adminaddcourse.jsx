import React, { useEffect, useState } from "react";
import axios from "axios";

function Adminaddcourse() {
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    fee: "",
    instructor: "",
    status: "open",
    image: null,
  });

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getmember");

      if (res.data.success) {
        setMembers(res.data.members);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("duration", formData.duration);
      data.append("fee", formData.fee);
      data.append("instructor", formData.instructor);
      data.append("status", formData.status);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.post(
        "http://localhost:3000/createcourse",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      setFormData({
        title: "",
        description: "",
        duration: "",
        fee: "",
        instructor: "",
        status: "open",
        image: null,
      });

      document.getElementById("image").value = "";
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Add Course
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              name="fee"
              placeholder="Fee"
              value={formData.fee}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

          </div>

          <select
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Instructor</option>

            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.fullName}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>

          <input
            id="image"
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Add Course
          </button>

        </form>
      </div>
    </div>
  );
}

export default Adminaddcourse;