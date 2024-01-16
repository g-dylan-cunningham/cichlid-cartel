"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminLink from "./AdminLink";
import { enumArr, enumMap } from "@/app/config";
import styles from "./styles.module.css";

const NavBar = ({}) => {
  const [isFishExpanded, setIsFishExpanded] = useState(false);
  const toggle = () => {
    console.log("toggling"), isFishExpanded, setIsFishExpanded(!isFishExpanded);
  };
  const { categoryList } = enumArr;
  const { categoryMap } = enumMap;

  return (
    <div className="navbar w-screen bg-base-100 p-0">
      <div
        className="w-screen bg-blue-400"
        style={{
          height: "64px",
          zIndex: "1000",
          opacity: "1",
        }}
      >
        <div className="w-1/5">
          <Link href="/" className="hidden md:block">
            <Image
              style={{ margin: "-10px -20px 0px 10px" }}
              src="/icon.png"
              alt="me"
              width="44"
              height="44"
              className="pt-5"
            />
          </Link>

          <div className="dropdown block md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              open={isFishExpanded}
              onClick={toggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isFishExpanded && (
              <ul
                tabIndex={0}
                className={`${styles.mobileNavMenu} menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow`}
              >
                <AdminLink classes={styles.link} toggle={toggle} />
                <li>
                  <Link href="/shop" className={styles.link} onClick={toggle}>
                    Fish
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className={styles.link} onClick={toggle}>
                    Ordering
                  </Link>
                </li>

                <li>
                  <Link href="/faqs" className={styles.link} onClick={toggle}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={styles.link} onClick={toggle}>
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/connect"
                    className={styles.link}
                    onClick={toggle}
                  >
                    Connect
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* NON MOBILE */}
        <div className="navbar-center md:w-3/5 hidden md:flex">
          <ul className="menu menu-horizontal px-1 w-full justify-evenly lg:justify-center">
            <AdminLink classes={styles.link} toggle={toggle} />
            <li>
              <Link href="/shop" className={styles.link} onClick={toggle}>
                Fish
              </Link>
            </li>
            <li>
              <Link href="/orders" className={styles.link} onClick={toggle}>
                Ordering
              </Link>
            </li>

            <li>
              <Link href="/faqs" className={styles.link} onClick={toggle}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.link} onClick={toggle}>
                About
              </Link>
            </li>
            <li>
              <Link href="/connect" className={styles.link} onClick={toggle}>
                Connect
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className='navbar-end'>
      </div> */}
      </div>
    </div>
  );
};

export default NavBar;
