import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPasswordClick = async () => {
    // console.warn("Data: ", user, password);
    let data = { email };

    let result = await fetch(
      "http://localhost:8000/api/v1/forgotpassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    result = await result.json();
    console.warn("Result=====", result);
    if (result.status === "success") {
      alert(result.message);
      navigate(`/login`);
    } else {
      alert("Email not found. Try Again with correct email.");
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
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Forgot Password
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <div className="space-y-10">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
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
                      Reset Password
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

export default ForgotPasswordPage;