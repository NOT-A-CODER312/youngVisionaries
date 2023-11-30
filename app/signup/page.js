"use client";
import { useFormik } from "formik";
import { useState, useMemo } from "react";
import { FaFingerprint, FaUser, FaEnvelope } from "react-icons/fa";
import { useEffect, useRef, useLayoutEffect } from "react";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 30) {
    errors.password = "Password too long";
  } else if (values.password.length < 6) {
    errors.password = "Password too short";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  if (!values.cPassword) {
    errors.cPassword = "Required";
  } else if (values.cPassword != values.password) {
    errors.cPassword = "Password does not match ";
  } else if (values.cPassword.length > 30) {
    errors.cPassword = "Password too long";
  } else if (values.cPassword.length < 6) {
    errors.cPassword = "Password too short";
  } else if (values.cPassword.includes(" ")) {
    errors.cPassword = "Invalid Password";
  }

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length > 20) {
    errors.username = "Must be 20 characters or less";
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid Username";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (values.email && !values.cEmail) {
    errors.cEmail = "Required";
  } else if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.cEmail = "Invalid email address";
  } else if (values.email != values.cEmail) {
    errors.cEmail = "Emails does not match";
  }

  return errors;
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
  const [token, setToken] = useState(null);
  const [ReactCaptcha, setReactCaptcha] = useState(null);
  const [userNameRegd, SetUserNameRegd] = useState(undefined);
  const [emailRegd, SetEmailNameRegd] = useState(undefined);
  const [captchaNotValid, setCaptchaNotValid] = useState(undefined);

  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const canvasRef = useRef(null);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      cPassword: "",
      email: null,
      cEmail: null,
      // captchaValid: "",
    },
    validate,
    onSubmit: (values) => {
      fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok: ");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data, " data");
          if (data.userNameTaken === true) {
            SetUserNameRegd(true);
          }
          if (data.emailNameTaken === true) {
            SetEmailRegd(true);
          }

          if (data.registered) {
            router.push("/login");
          }
        })
        .catch((error) => {
          console.error("There was a problem with the request error:", error);
        });
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Perform captcha validation

    // After captcha validation, proceed with form submission
    formik.handleSubmit();
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* <div className="my-6 text-4xl font-Poppins font-bold text-white">
        Register
      </div> */}
      <form
        onSubmit={onSubmit}
        className="flex flex-col mt-8 border-heart-yellow border-1  max-w-[500px] max-[600px]:w-[85%] bg-[#9f9fa3] p-5 mb-10  rounded-lg text-black"
      >
        <div className=" relative w-[50px] h-[50px] ml-4 mt-2 self-center">
          <Image src={"/logo/logoCircle.webp"} fill alt="logo p" />
        </div>
        <label htmlFor="userName" className="text-lg  font-Poppins mb-1 ">
          Username * <span className=" text-xs">visible to all members</span>
        </label>
        <div className="relative w-full">
          <input
            className="mb-4 h-7 text-sm rounded-sm relative w-full pr-8 bg-[#2f374c] "
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <FaUser className="absolute top-[33%] transform -translate-y-1/2 right-2 text-gray-500 hover:text-heart-pink" />
        </div>
        {formik.errors.username ? (
          <div className=" text-red-600 mt-[-15px] mb-4">
            {formik.errors.username}
          </div>
        ) : null}
        {userNameRegd ? (
          <div className=" text-red-600 mt-[-15px] mb-4">
            Username is not available
          </div>
        ) : null}
        <label htmlFor="email" className="text-lg  font-Poppins mb-1">
          Email Address * <span className=" text-xs"> not visible members</span>
        </label>
        <div className="relative w-full">
          <input
            className="mb-4  h-7 text-sm  rounded-sm relative w-full pr-8 bg-[#2f374c]"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <FaEnvelope className="absolute top-[33%] transform -translate-y-1/2 right-2 text-gray-500 hover:text-heart-pink" />
        </div>
        {formik.errors.email ? (
          <div className=" text-red-600 mt-[-15px] mb-4">
            {formik.errors.email}
          </div>
        ) : null}
        <label htmlFor="cEmail" className="text-lg  font-Poppins mb-1">
          Confirm Email Address
        </label>
        <div className="relative w-full">
          <input
            className="mb-4 h-7  text-sm  rounded-sm relative w-full pr-8 bg-[#2f374c]"
            id="cEmail"
            name="cEmail"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.cEmail}
          />
          <FaEnvelope className="absolute top-[33%] transform -translate-y-1/2 right-2 text-gray-500 hover:text-heart-pink" />
        </div>
        {formik.errors.cEmail ? (
          <div className=" text-red-600 mt-[-15px] mb-4">
            {formik.errors.cEmail}
          </div>
        ) : null}
        {emailRegd ? (
          <div className=" text-red-600 mt-[-15px] mb-4">
            Email is not available
          </div>
        ) : null}
        <label htmlFor="password" className="text-lg  font-Poppins mb-1">
          Password
        </label>
        <div className="relative w-full">
          <input
            className="mb-4 h-7  text-sm  rounded-sm relative w-full pr-8 bg-[#2f374c]"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button onClick={() => !setShowPassword(!showPassword)}>
            <FaFingerprint className="absolute top-[33%] transform -translate-y-1/2 right-2 text-gray-500 hover:text-heart-pink" />
          </button>
        </div>
        {formik.errors.password ? (
          <div className=" text-red-600 mt-[-15px] mb-4">
            {formik.errors.password}
          </div>
        ) : null}
        <label htmlFor="cPassword" className="text-lg  font-Poppins mb-1">
          Confirm Password
        </label>
        <div className="relative w-full">
          <input
            className="mb-4 h-7 text-sm  rounded-sm relative w-full pr-8 bg-[#2f374c]"
            id="cPassword"
            name="cPassword"
            type={showcPassword ? "text" : "password"}
            onChange={formik.handleChange}
            value={formik.values.cPassword}
          />
          <button onClick={() => !setShowcPassword(!showcPassword)}>
            <FaFingerprint className="absolute top-[33%] transform -translate-y-1/2 right-2 text-gray-500 hover:text-heart-pink" />
          </button>
        </div>
        {formik.errors.cPassword ? (
          <div className=" text-red-600 mt-[-15px] mb-4">
            {formik.errors.cPassword}
          </div>
        ) : null}

        <span>
          By clicking complete sign up you agree to our Terms & Conditions and
          Privacy Policy.
        </span>
        <button
          className="bg-heart-yellow text-lg rounded-full p-2 font-Poppins mt-4  whitespace-nowrap"
          type="submit"
        >
          COMPLETE SIGN UP
        </button>
      </form>
    </div>
  );
}
