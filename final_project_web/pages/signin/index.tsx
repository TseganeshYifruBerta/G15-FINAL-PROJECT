const jwt = require("jsonwebtoken");
import Link from "next/link";
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { Input } from "@material-tailwind/react";
import { login } from "@/store/login/login-api";
import { useRouter } from "next/router";
import { showToast } from "@/components/popup";

function Copyright() {
  return (
    <p className="text-center text-sm text-gray-500">
      © {new Date().getFullYear()}{" "}
      <Link href={"/"} className="text-primary hover:text-primary-hover">
        Hulu Code
      </Link>
      . All rights reserved.
    </p>
  );
}

export default function SignInSide() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordd, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setPasswordError("");
    setIdError("");
    setId("");
    setPassword("");
  };

  // Effect to add an event listener to the document
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const validateId = (id: any) => {
    const regex = /^[A-Z]{3}\/\d{4}\/\d{2}$/;
    return regex.test(id);
  };
 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var error = false;
    const data = new FormData(event.currentTarget);
    if (!validateId(id)) {
      setIdError("Invalid ID format. Required format: ***/****/**");
      error = true;
    }
    if (validateId(id)) {
      setIdError("");
    }

    if (passwordd.length < 6) {
      setPasswordError("password length must be greater than 6");
      error = true;
    }
    if (passwordd.length >= 6) {
      setPasswordError("");
    }
    if (error) {
      return;
    }
setIsLoading(true);
    try {
      const response = await login({ userId: id, password: passwordd });

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("fullName", response.fullName); // Assuming fullName is part of the response
        localStorage.setItem("role", response.role); // Assuming role is part of the response

        if (response.role === "admin") {
          // If the user is an admin, navigate to the 'upload' page
          router.push("/admin/upload");
        } else {
          // For any other role, navigate to their respective dashboard
          router.push(`/${response.role}/dashboard`);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast('Login Error: ' + (error as Error).message, 'error');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="relative">
      <button
        className="border rounded-full text-white bg-primary p-2 px-6 transition duration-300 mr-10"
        onClick={() => setShowModal(true)}
      >
        Login
      </button>
      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div
            ref={modalRef} // Attach the ref to the modal content
            className="relative top-16 mx-auto p-5  w-96 shadow-lg rounded-md bg-white  left-96 infade "
          >
            <div className="mt-3 text-center">
              <div className="font-semi-bold text-xl">
                Login to your Account
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />

                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="pb-4">
                    <Input
                      id="id"
                      name="id"
                      label="User ID"
                      crossOrigin={true}
                      value={id}
                      color={idError ? "red" : "black"}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setId(e.target.value);
                      }}
                      type="text"
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    />

                    {idError && (
                      <p className="text-red-500 text-xs italic">{idError}</p>
                    )}
                  </div>

                  <div className="">
                    <Input
                      id="password"
                      name="password"
                      label="Password"
                      crossOrigin={true}
                      value={passwordd}
                      color={passwordError ? "red" : "black"}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    />
                    {passwordError && (
                      <p className="text-red-500 text-xs italic">
                        {passwordError}
                      </p>
                    )}
                  </div>
                </div>
                {/* <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none"
                >
                  Log in
                </button> */}
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Log in"
                  )}
                </button>
                <div className="mt-4"></div>
              </form>
              <Copyright />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}