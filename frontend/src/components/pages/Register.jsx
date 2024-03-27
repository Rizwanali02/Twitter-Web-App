import React, { useState } from "react";
import { Link } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, loading } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Entered ");
    signUp({ name, username, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto flex justify-center bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Sign up
          </div>
          <h2 className="mt-4 text-lg leading-tight font-medium text-black">
            Create your account
          </h2>
          <p className="mt-2 text-gray-500">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-indigo-500 hover:text-orange-500"
            >
              Log in
            </Link>
            .
          </p>
          <div className="mt-6">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block h-8 pl-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              required
            />
          </div>
          <div className="mt-6">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block h-8 pl-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              required
            />
          </div>
          <div className="mt-6">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block h-8 pl-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              required
            />
          </div>
          <div className="mt-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block h-8 pl-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 text-white font-semibold bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
