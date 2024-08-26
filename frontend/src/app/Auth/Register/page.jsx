"use client";

import { useState, useContext } from "react";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const { setUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/signup`,
        { name, email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = data.token || "";
      setUser(token);
      localStorage.setItem("token", token);
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen">
      <div className="md:w-1/2 px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mt-4">Create a new account</h3>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Register As</label>
            <div className="relative">
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
              <FaRegUser className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <FaPencilAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <div className="relative">
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <MdOutlineMailOutline className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <RiLock2Fill className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            onClick={handleRegister}
            className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 transition-colors"
          >
            Register
          </button>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/Auth/Login" className="text-green-700">
              Login Now
            </a>
          </p>
        </form>
      </div>
      <div className="hidden md:block md:w-1/2">
        <Image src="/register.png" alt="register" width={500} height={500} />
      </div>
    </div>
  );
};

export default Register;
