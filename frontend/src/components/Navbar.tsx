"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { logout } from "../app/services/axiosClient";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem("accessToken");
      const tempRole = localStorage.getItem("role");
      if (tempRole) setRole(tempRole);
      setHasLoggedIn(token !== null);
    };

    checkToken(); // Initial check
    const intervalId = setInterval(checkToken, 1000); // Check every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <nav className="flex justify-between bg-slate-800 text-gray-100">
      <Link className="m-2 p-2" href="/">
        <img src="" alt="Fiesta'24" />
      </Link>
      <div className="m-2 p-2 flex gap-6">
        {role == "coordinator" ? (
          <Link
            href="/CoordinatorDashboard"
            className="px-4 rounded-3xl hover:bg-green-400 hover:text-black"
          >
            Coordinator Dashboard
          </Link>
        ) : (
          <></>
        )}
        <Link
          href="/#events"
          className="px-4 rounded-3xl hover:bg-green-400 hover:text-black"
        >
          Events
        </Link>

        {!hasLoggedIn ? (
          <>
            <Link
              href="/Login"
              className="px-4 rounded-3xl hover:bg-green-400 hover:text-black"
            >
              Login
            </Link>
            <Link
              href="/Register"
              className="px-4 rounded-3xl hover:bg-green-400 hover:text-black"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/ChangePassword"
              className="px-4 rounded-3xl hover:bg-green-400 hover:text-black"
            >
              Change Password
            </Link>
            <button
              className="px-4 rounded-3xl hover:bg-green-400 hover:text-black"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
