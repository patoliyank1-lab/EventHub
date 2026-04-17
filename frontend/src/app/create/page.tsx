"use client";
import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EventContext } from "@/context/EventContext";
import { AuthContext } from "@/context/AuthContext";
import { defaultUser } from "@/utils";
import { EVENT } from "@/api-url";

const SimpleForm = () => {
  const { createEvent } = useContext(EventContext);
  const { user, isLogin } = useContext(AuthContext);
    const router = useRouter();

  const formik = useFormik({
    initialValues: { name: "", datetime: "", location: "" },
    onSubmit: async (values) => {
      await createEvent({
        name: values.name,
        eventTime: values.datetime,
        createdBy: user?._id || "",
        location: values.location
      });
      router.push("/");
    },
  });

  useEffect(()=>{
    if(!isLogin) router.push("/login")
  },[user])

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow-md p-6 w-80 flex flex-col gap-4">
        <h1 className="text-xl font-bold">Create Event</h1>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">Date & Time</label>
          <input
            id="datetime"
            name="datetime"
            type="datetime-local"
            onChange={formik.handleChange}
            value={formik.values.datetime}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <select
            id="location"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select location</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Surat">Surat</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button variant="default" type="submit">Submit</Button>
          <Button variant="outline" type="button" onClick={() => router.push("/")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default SimpleForm;
