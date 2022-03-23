import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import { useNavigate } from "react-router-dom";

const initializeState = {
  email: "",
  password: "",
};

export default function Login({ setUser }) {
  let navigate = useNavigate();
  const [state, setState] = useState(initializeState);
  const [error, setError] = useState("");

  const handleUserInput = (e) => {
    const value = { [e.target.name]: e.target.value.trim() };
    setState((prevState) => ({ ...prevState, ...value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://couriax-saas-api.eba-huvccy4z.us-east-1.elasticbeanstalk.com/api/v1/auth/login/",
        {
          method: "POST",

          body: JSON.stringify(state),

          // Adding headers to the request
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      if (data.message === "success") {
        setError("");
        setUser(data);
        setState(initializeState);
        navigate("/welcome");
      } else {
        console.log(data);
        if (!data.error.email)
          setError("email or password does not match a user");

        setError(data.error.email);
      }
    } catch (e) {}
  };
  return (
    <div className="w-screen h-screen bg-gray-800 ">
      <div className="max-w-xs md:max-w-md mx-auto flex">
        <form
          onSubmit={submit}
          className="bg-white rounded-lg flex flex-col justify-center mt-20 mb-10  shadow-xl p-5"
        >
          <div>
            <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in
            </h2>
          </div>
          <div className="flex items-center text-center justify-center">
            <span className="text-red-600 my-5 text-sm text-center">
              {error}
            </span>
          </div>
          {/* Form details */}
          <div className="space-y-2 flex flex-col text-black">
            <div>
              <label
                htmlFor="email"
                className="text-gray-700 font-medium text-sm"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                className="py-2 px-4 w-full outline-none focus:ring-2 ring-indigo-600 rounded-md bg-gray-200 focus:bg-white"
                placeholder="someone@example.com"
                required
                name="email"
                value={state.email}
                onChange={handleUserInput}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-gray-700 font-medium text-sm"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                className="py-2 px-4 w-full outline-none focus:ring-2 ring-indigo-600 rounded-md bg-gray-200 focus:bg-white"
                required
                name="password"
                value={state.password}
                onChange={handleUserInput}
              />
            </div>

            {/*  */}
          </div>

          <button className="inline-flex mt-5  items-center justify-center px-4 py-2 shadow-blue-900 shadow-md space-x-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white outline-none focus:bg-indigo-900 focus-ring ">
            <span className="text-sm">Submit</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 50 50"
            >
              <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
            </svg>
          </button>
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center">
              <p className="ml-2 block text-sm text-gray-900">
                create new account{" "}
                <Link to="/register">
                  <span className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                    sign up
                  </span>
                </Link>
              </p>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
