"use client";
import { useEffect, useContext } from "react";
import { redirect } from "next/navigation";
import { AdminContext } from '@/app/providers/Admin/AdminProvider';

// Maybe we can delete. Middleware should handle this
export default function isAuth(Component) {
  return function IsAuth(props) {
    const isAdmin = useContext(AdminContext);


    useEffect(() => {
      if (!isAdmin) {
        return redirect("/");
      }
    }, [isAdmin]);


    if (!isAdmin) {
      return null;
    }

    return <Component {...props} />;
  };
}