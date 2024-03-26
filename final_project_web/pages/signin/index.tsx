import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";

import { Input, Typography } from "@material-tailwind/react";
import { error } from "console";
import { LoginFormData, login } from "@/store/login/login-api";
import { useRouter } from "next/router";

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

  const handleSubmit = async (event: any) => {
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

    const values: LoginFormData = {
      userId: data.get("id") as string,
      password: data.get("password") as string,
    };
    await login(values);
    router.push("/home/home");
    // Proceed with authentication...
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
                      color={`${idError ? "red" : "black"}`}
                      onChange={(e) => {
                        setId(e.target.value);
                      }}
                    />

                    {idError && (
                      <p className="text-red-500 text-xs italic">{idError}</p>
                    )}
                  </div>

                  <div className="">
                    <Input
                      id="password"
                      name="password"
                      color={`${passwordError ? "red" : "black"}`}
                      type="password"
                      label="Password"
                      crossOrigin={undefined}
                      value={passwordd}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    {passwordError && (
                      <p className="text-red-500 text-xs italic">
                        {passwordError}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none"
                >
                  Log in
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
