import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import axios from "axios";
import gsap from "gsap";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  // GSAP Animations
  useEffect(() => {
    gsap.fromTo(
      ".head",
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        delay: 0.3,
        stagger: 0.4,
        ease: "power1.inOut",
      }
    );
  }, []);

  const { user, isSignedIn, isLoaded } = useUser();
  const registerUser = async () => {
    if (isSignedIn && user && isLoaded) {
      try {
        const user_data = {
          emailId: user.primaryEmailAddress?.emailAddress || "",
          phoneNum: user.primaryPhoneNumber?.toString() || "",
        };

        const response = await axios.post(
          "http://localhost:8080/user/createUser",
          user_data
        );
        console.log("User created successfully:", response.data);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };
  useEffect(() => {
    registerUser();
  }, [isLoaded, isSignedIn, user]);
  return (
    <div className="z-[999] shadow-sm top-0 bg-white opacity-90  sticky p-6  flex justify-between items-center">
      <div className="flex gap-6 uppercase">
        <Link to={"/"}>
          <img
            className="h-[30px]"
            src="https://www.goindigo.in/content/dam/s6web/in/en/assets/logo/IndiGo_logo_2x.png"
            alt="Indigo logo"
          />
        </Link>
        <Link
          to={"/"}
          className="head cursor-pointer transition-all duration-300 hover:border-b hover:border-blue-800"
        >
          Home
        </Link>
        <Link
          to={"/flights"}
          className="head cursor-pointer transition-all duration-300 hover:border-b hover:border-blue-800"
        >
          Flights
        </Link>
      </div>
      <div className="uppercase">
        <div className="cursor-pointer transition-all duration-300 hover:border-b hover:border-blue-800">
          {!isSignedIn ? (
            <SignInButton className=" uppercase" />
          ) : (
            <SignOutButton className=" uppercase" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
