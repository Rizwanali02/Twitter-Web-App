import React, { useState } from "react";
import { Link } from "react-router-dom";
import useRegister from "../../hooks/userHook/useRegister";

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
              {loading ? (
                <div role="status" className="flex justify-center align-items-center gap-2">
                  <svg
                    aria-hidden="true"
                    class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <p>Sign up</p>
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
