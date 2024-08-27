"use client";

import { useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/signin`,
        {
          email,
          password,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const token = data.token || "";
      setUser(token);
      localStorage.setItem("token", token);
      setEmail("");
      setPassword("");
      setRole("");
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.back();
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg">
        <div className="p-6 md:w-1/2">
          <h3 className="text-2xl md:ml-20 font-semibold mb-10">
            Login to your account
          </h3>
          <form>
            <div className="mb-4">
              <label className="block mb-1">Login As</label>
              <div className="flex items-center border rounded-lg px-2">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full py-2 focus:outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
                <FaRegUser className="text-gray-500 ml-2" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email Address</label>
              <div className="flex items-center border rounded-lg px-2">
                <input
                  type="email"
                  placeholder="enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 focus:outline-none"
                />
                <MdOutlineMailOutline className="text-gray-500 ml-2" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <div className="flex items-center border rounded-lg px-2">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 focus:outline-none"
                />
                <RiLock2Fill className="text-gray-500 ml-2" />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            <a href="/Auth/Register" className="text-blue-600 hover:underline">
              Register Now
            </a>
          </p>
        </div>
        <div className="hidden md:block md:w-1/2 p-6">
          <img
            src="/login.png"
            alt="login illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
