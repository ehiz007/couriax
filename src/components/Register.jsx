import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Package from "./Package";
import Modal from "./Modal";
import logo from "../logo.svg";

const initializeState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  business_name: "",
  package_name: "select package",
  password: "",
  confirm_password: "",
};
export default function Login() {
  const errorRef = useRef(null);
  const [state, setState] = useState(initializeState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUserInput = (e) => {
    const value = { [e.target.name]: e.target.value.trim() };
    setState((prevState) => ({ ...prevState, ...value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (state.package_name === "select package") {
      setError("Please select a package type !!");
      errorRef.current.scrollIntoView();
    } else if (state.password !== state.confirm_password) {
      setError("Passwords do not match !!");
      errorRef.current.scrollIntoView();
    } else {
      try {
        const response = await fetch(
          "http://couriax-saas-api.eba-huvccy4z.us-east-1.elasticbeanstalk.com/api/v1/auth/register/",
          {
            method: "POST",

            body: JSON.stringify({ ...state, phone: state.phone.toString() }),

            // Adding headers to the request
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const data = await response.json();
        if (data.message === "success") {
          setSuccess(true);
          setError("");
          setState(initializeState);
        } else {
          if (data.business_name) setError(data.business_name[0]);
          else if (data.email) setError(data.email[0]);
        }
      } catch (e) {}
    }
  };
  return (
    <div className="w-screen h-full bg-gray-800 ">
      <div className="max-w-xs md:max-w-md mx-auto flex">
        <form
          onSubmit={submit}
          className="bg-white border rounded-lg flex flex-col justify-center mt-10 mb-10  shadow-xl p-5"
        >
          <div>
            <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign up a new account
            </h2>
          </div>
          <div className="text-sm text-center my-2">
            <Link to="/">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Already registered? login
              </span>
            </Link>
          </div>
          <div className="flex items-center text-center justify-center">
            <span
              ref={errorRef}
              className="text-red-600 my-2 text-sm text-center"
            >
              {error}
            </span>
          </div>
          <Modal success={success} />
          {/* Form details */}
          <div className="space-y-2 flex flex-col text-black">
            <div>
              <label
                htmlFor="first-name"
                className="text-gray-700 font-medium text-sm"
              >
                First Name
              </label>

              <input
                type="text"
                id="first-name"
                className="py-2 px-4 w-full outline-none focus:ring-2 ring-indigo-600 rounded-md bg-gray-200 focus:bg-white"
                required
                name="first_name"
                value={state.first_name}
                onChange={handleUserInput}
              />
            </div>
            <div>
              <label
                htmlFor="firstname"
                className="text-gray-700 font-medium text-sm"
              >
                Last Name
              </label>

              <input
                type="text"
                id="lastname"
                className="py-2 px-4 w-full outline-none focus:ring-2 ring-indigo-600 rounded-md bg-gray-200 focus:bg-white"
                required
                name="last_name"
                value={state.last_name}
                onChange={handleUserInput}
              />
            </div>
            <div>
              <label
                htmlFor="businessname"
                className="text-gray-700 font-medium text-sm"
              >
                Business Name
              </label>

              <input
                type="text"
                id="businessname"
                className="py-2 px-4 w-full outline-none focus:ring-2 ring-indigo-600 rounded-md bg-gray-200 focus:bg-white"
                required
                name="business_name"
                value={state.business_name}
                onChange={handleUserInput}
              />
            </div>
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
                htmlFor="phone"
                className="text-gray-700 font-medium text-sm"
              >
                Phone no.
              </label>

              <input
                type="tel"
                id="phone"
                className="py-2 px-4 w-full outline-none focus:ring-2 ring-indigo-600 rounded-md bg-gray-200 focus:bg-white"
                placeholder="08100000000"
                required
                name="phone"
                value={state.phone}
                onChange={handleUserInput}
              />
            </div>
            <Package setError={setError} setState={setState} />
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
            <div>
              <label
                htmlFor="confirm-password"
                className="text-gray-700 font-medium text-sm"
              >
                Confirm password
              </label>

              <input
                type="password"
                id="confirm-password"
                className="py-2 px-4 w-full outline-none focus:ring-2 ring-indigo-600 rounded-md bg-gray-200 focus:bg-white"
                required
                name="confirm_password"
                value={state.confirm_password}
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
        </form>
      </div>
    </div>
  );
}
