import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams(); // Get the reset token from the URL
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleForgotPasswordClick = async () => {
    // console.warn("Data: ", user, password);
    let data = { password, passwordConfirm };

    let result = await axios.patch(
      `http://localhost:8000/api/v1/resetpassword/${token}`,
      {
        ...data,
      }
    );

    if (result.status === 201) {
      alert("Password Updated successfully.");
      navigate(`/login`);
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex  justify-center">
        <div className="absolute inset-0 flex-1 lg:block">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
        <div className="relative flex-1 flex justify-center px-4 py-10 sm:px-6 lg:px-20 xl:px-40 z-10 mt-10">
          <div className="mx-auto w-full max-w-sm">
            <div>
              <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900">
                Reset Password
              </h2>
            </div>

            <div className="">
              <div className="mt-6">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Confirm Password"
                        value={passwordConfirm}
                        onChange={(e) => {
                          setPasswordConfirm(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleForgotPasswordClick}
                    >
                      Reset My Password
                    </button>
                  </div>
                  <p>
                    Remember Password?{" "}
                    <a
                      href="/login"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span className="font-semibold">Log In here</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;