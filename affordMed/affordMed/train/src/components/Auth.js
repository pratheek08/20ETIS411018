import React, { useState } from "react";

const Auth = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    rollNo: "",
    ownerEmail: "",
    accessCode: "pKEhWv",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://20.244.56.144/train/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 409) {
          throw new Error("Conflict: Data already exists.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Post Created", data);
      })
      .catch((error) => {
        console.error("Error creating post", error.message);
      });
    setFormData({
      companyName: "",
      ownerName: "",
      rollNo: "",
      ownerEmail: "",
    });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-purple-200 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Authentication Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="companyName" className="block font-medium">
                Company Name:
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none  focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="ownerName" className="block font-medium">
                Owner Name:
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none  focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="rollNo" className="block font-medium">
                Roll No:
              </label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none  focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="ownerEmail" className="block font-medium">
                Owner Email:
              </label>
              <input
                type="email"
                id="ownerEmail"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none  focus:border-black"
              />
            </div>
            {/* Other input fields go here */}
            <button
              type="submit"
              className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
