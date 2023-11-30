"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { FaFingerprint, FaUser, FaEnvelope } from "react-icons/fa";
import { useEffect, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

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

  // if (!values.username) {
  //   errors.username = "Required";
  // } else if (values.username.length > 20) {
  //   errors.username = "Must be 20 characters or less";
  // } else if (values.username.includes(" ")) {
  //   errors.username = "Invalid Username";
  // }

  if (!values.email) {
    errors.email = "Required";
  } else if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  return errors;
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
  const [token, setToken] = useState(null);
  const [ReactCaptcha, setReactCaptcha] = useState(null);
  const [userPasswordInc, SetUserPasswordInc] = useState(undefined);
  const [emailRegd, SetEmailNameRegd] = useState(undefined);
  const [captchaNotValid, setCaptchaNotValid] = useState(undefined);

  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const canvasRef = useRef(null);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      // username: "",
      password: "",
      email: "",
      //   email: null,
      // captchaValid: "",
    },
    validate,
    onSubmit: async (values) => {
      // console.log("ran innn");
      const status = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/events",
      });
      console.log(status, " Stat");
      if (status.error) {
        console.log(status.error);
      }
      if (status.error === "userNamePasswordInc") {
        SetUserPasswordInc(true);
      }
      if (status.ok) {
        router.push(status.url);
      }
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Fffffff");
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
        {/* {userNotFound ? (
          <div className=" text-red-600 mt-[-15px] mb-4">
            Username Not Found
          </div>
        ) : null} */}

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

        {userPasswordInc ? (
          <div className=" text-red-600 mt-2 mb-4 ">
            Username or Password is Incorrect
          </div>
        ) : null}
        <span>
          By clicking complete Log In you agree to our Terms & Conditions and
          Privacy Policy.
        </span>
        <button
          className="bg-heart-yellow text-lg rounded-full p-2 font-Poppins mt-4  whitespace-nowrap"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
