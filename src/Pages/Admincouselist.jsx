import React, { useEffect, useState } from "react";
import axios from "axios";

function Admincourselist() {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getcourses");

      if (res.data.success) {
        setCourses(res.data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );

  if (!confirmDelete) return;

  try {

    const res = await axios.delete(
      `http://localhost:3000/deletecourse/${id}`
    );

    alert(res.data.message);

    getCourses();

  } catch (error) {

    console.log(error);

    alert("Something went wrong.");

  }

};  




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-8">

      <div className="max-w-7xl mx-auto">

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">

          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Course List
          </h1>

          <div className="overflow-x-auto">

            <table className="w-full text-white">

              <thead>

                <tr className="bg-white/20">

                  <th className="p-4 text-left">#</th>

                  <th className="p-4 text-left">Image</th>

                  <th className="p-4 text-left">Title</th>

                  <th className="p-4 text-left">Description</th>

                  <th className="p-4 text-left">Duration</th>

                  <th className="p-4 text-left">Fee</th>

                  <th className="p-4 text-left">Instructor</th>

                  <th className="p-4 text-left">Skill</th>

                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Actions</th>

                </tr>

              </thead>

              <tbody>

                {courses.length > 0 ? (

                  courses.map((course, index) => (

                    <tr
                      key={course._id}
                      className="border-b border-white/10 hover:bg-white/10 duration-300"
                    >

                      <td className="p-4">{index + 1}</td>

                      <td className="p-4">

                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-20 h-20 rounded-lg object-cover border border-white"
                        />

                      </td>

                      <td className="p-4 font-semibold">
                        {course.title}
                      </td>

                      <td className="p-4 max-w-xs">
                        {course.description}
                      </td>

                      <td className="p-4">
                        {course.duration}
                      </td>

                      <td className="p-4">
                        Rs. {course.fee}
                      </td>

                      <td className="p-4">
                        {course.instructor?.fullName}
                      </td>

                      <td className="p-4">
                        {course.instructor?.skills}
                      </td>

                      <td className="p-4">

                        <td className="p-4">

                          {course.status === "open" ? (
                            <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                              Open
                            </span>
                          ) : (
                            <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                              Closed
                            </span>
                          )}

                        </td>

                        <td className="p-4">

                          <div className="flex gap-3">

                            <button
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg duration-300"
                            >
                              Update
                            </button>

                            <button
                              onClick={() => handleDelete(course._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg duration-300"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="10"
                      className="text-center text-gray-300 py-10 text-xl"
                    >
                      No Courses Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admincourselist;