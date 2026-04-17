"use client";
import { AuthContext } from "@/context/AuthContext";
import { defaultUser } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Profile ()  {

    const { user, isLogin } = useContext(AuthContext);
     const router = useRouter();

    useEffect(()=>{
      if(!isLogin) router.push("/login")
    },[user])

    console.log(user, isLogin)

  return (<>
<div className="h-screen w-full flex flex-col justify-center items-center">
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-3 w-80">
    <h1 className="text-xl font-bold">Profile</h1>
    <p><span className="font-medium">ID: </span>{user?._id}</p>
    <p><span className="font-medium">Name: </span>{user?.name}</p>
    <p><span className="font-medium">Email: </span>{user?.email}</p>
    <button onClick={() => router.push("/")} className="mt-2 py-2 rounded-md bg-black text-white text-sm">Back</button>
  </div>
</div>
  </>);
};
