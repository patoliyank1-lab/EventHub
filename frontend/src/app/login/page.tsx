"use client";
import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { EventContext } from "@/context/EventContext";
import { AuthContext } from "@/context/AuthContext";
import { defaultUser } from "@/utils";
import { EVENT } from "@/api-url";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password requires at least one lowercase letter")
    .matches(/[0-9]/, "Password requires at least one number")
});


const Login = () => {
  const { createEvent } = useContext(EventContext);
  const { user, isLogin, login, isError, massage } = useContext(AuthContext);
    const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "test@example.com",
      password: "password123",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
    login({email:values.email, password:values.password})
    },
  });

  useEffect(()=>{
    if(isLogin) router.push("/profile")
  },[user])

  useEffect(()=>{
    if(isError){
      alert(massage)
    }
  },[isError])

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form onSubmit={formik.handleSubmit} className="bg-gray-100 rounded-md w-md">
        <div className="p-5">
        <label htmlFor="">Login page</label>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Button variant="default" type="submit" className={"mt-5"}>
          Submit
        </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
