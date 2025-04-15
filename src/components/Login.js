"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Header from "./Header";
import NameInput from "./NameInput";

function Login(props) {
  // const [dob, setDob] = useState(new Date().toISOString().split("T")[0]); //today's date
  // const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [userDetails, setUserDetails] = useState({
    name: "",
    dob: new Date().toISOString().split("T")[0],
  });

  // console.log(userDetails,"userDetails");

  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [isDateSelected, setIsDateSelected] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // const [nameError, setNameError] = useState("");
  // const [phoneError, setPhoneError] = useState("");

  // Calculate minimum and maximum dates
  const today = new Date();
  const maxDate = new Date().toISOString().split("T")[0]; // Today
  const minDate = new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0]; // 120 years ago

  const handleDateChange = (e) => {
    setIsDateSelected(true);
    const selectedDate = e.target.value;
    // setDob(selectedDate);

    // Validate the selected date
    const selectedDateObj = new Date(selectedDate);
    const currentDate = new Date();

    if (selectedDateObj > currentDate) {
      setIsValid(false);
      setErrorMessage("Date of birth cannot be in the future");
    } else if (selectedDateObj < new Date(minDate)) {
      setIsValid(false);
      setErrorMessage("Please select a valid date of birth");
    } else {
      setIsValid(true);
      setErrorMessage("");

      setUserDetails({
        ...userDetails,
        dob: selectedDate,
      });
    }
  };

  // In Login.js - modify the handleClick function
  const handleClick = (e) => {
    e.preventDefault();

    // Form validation
    const errors = {
      name: !userDetails.name.trim(),
      dob: !userDetails.dob.trim(),
      // phone: phone.length !== 10,
    };

    const age = calculateAge(userDetails.dob);

    if (age < 20) {
      setErrorMessage("Age should be more than or equal to 20");
      return;
    }

    if (!errors.name && !errors.dob && !showWarning) {
      // Calculate age from DOB to suggest appropriate section

      // Store user data
      sessionStorage.setItem(
        "iciciUserDetails",
        JSON.stringify({
          ...userDetails,
          age,
        })
      );

      // Pass the user data back to parent component

      props.onLoginComplete(userDetails.name);
    } else {
      // if (showWarning) {
      //   setErrorMessage("Please enter another name");
      // }

      // Show appropriate error message
      if (errors.name) {
        setErrorMessage("Please enter your name");
      } else if (errors.dob) {
        setErrorMessage("Please enter your date of birth");
      }
      // else if (errors.phone) {
      //   setErrorMessage("Please enter a valid phone number");
      // }
    }
  };

  // Calculate age based on selected DOB
  const calculateAge = () => {
    if (!userDetails.dob) return null;

    const birthDate = new Date(userDetails.dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    // grid-rows-[auto_1fr_1fr_auto]
    <div className="h-svh w-full mx-auto max-w-md pt-6 font-Mulish grid grid-rows-[auto_1fr]">
      <Header />

      {/* // wrapper */}
      <div
        // style={{ height: "calc(100vh - 18vh)" }}
        className=" bg-[#F0F1F1] h-full   px-5 pb-7 pt-2 flex flex-col justify-center"
      >
        {/* container of all elemets */}
        <div className="">
          <div className=" flex items-center w-full hfull justify-center">
            <h2 className="font-Mulish font-medium text-2xl leading-[] tracking-normal text-[#004A80]">
              Unlock the <br /> secrets to <br />{" "}
              <span className="font-extrabold"> securing</span> your <br />
              <span className="font-extrabold"> retirement</span>
            </h2>

            <Image
              src={"/image/retirement-planning.png"}
              width={162}
              height={231}
              alt="retirement-planning"
              priority={true}
            />
          </div>

          <div
            style={{
              background:
                "linear-gradient(180deg, #F48120 0%, #F48120 63.46%, #FCB62E 100%)",
            }}
            className="text-white  space-y-7 py-7 px-8 borde border-black  rounded-2xl"
          >
            <h2 className="font-normal text-lg leading-[100%] tracking-normal text-center">
              Share your details to help us
              <br />
              tailor your retirement planning
            </h2>

            <div
              className={`grid h-full
            ${showWarning ? "gap-1.5" : "gap-4"}`}
            >
              <NameInput
                userDetails={userDetails}
                name={userDetails.name}
                setUserDetails={setUserDetails}
                showWarning={showWarning}
                setShowWarning={setShowWarning}
              />

              {/* DOB */}
              <div className={`space-y-0.5`}>
                {/* <label
              htmlFor="dob"
              className="font-medium text-lg leading-[100%] tracking-normal"
            >
              Date of Birth
            </label> */}

                <input
                  type="date"
                  placeholder="01-04-2025"
                  id="dob"
                  name="dob"
                  // value={dob}
                  value={userDetails.dob}
                  onChange={handleDateChange}
                  min={minDate}
                  max={maxDate}
                  // className="rounded-full border border-[#9C9C9C] px-3.5 py-3 text-[15px] leading-[100%] tracking-normal text-[#9C9C9C] placeholder-[#9C9C9C] focus:outline-2 font-semibold"

                  className={`rounded-full w-full px-3.5 py-3 border text-[15px] leading-[100%] tracking-normal placeholder-[#fff]  font-semibold
              !border-[#D5D5D5] focus:outline-none focus:ring-2
             ${
               isDateSelected
                 ? "text-[#F48120] bg-white"
                 : "text-[#fff] bg-transparent"
             }
             ${
               !isValid
                 ? "border-red-500 focus:ring-red-200"
                 : "border-[#D5D5D5] focus:ring-blue-200"
             }`}
                />

                <p
                  className={` text-xs text-[#AF292F] leading-[100%] font-medium -bottom-3 left-2 
                ${errorMessage ? "block" : "hidden"}
                `}
                >
                  {errorMessage}{" "}
                </p>

                {/* {!isValid && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )} */}
                {/* 
          {dob && isValid && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-blue-800">
                Selected date:{" "}
                <span className="font-medium">
                  {new Date(dob).toLocaleDateString() }
                </span>
              </p>
              <p className="text-blue-800">
                Age: <span className="font-medium">{calculateAge()} years</span>
              </p>
            </div>
          )} */}
              </div>

              <div className=" mx-auto ">
                <button
                  onClick={handleClick}
                  className="mt5 cursor-pointer bg-white h-12 mx-auto w-fit  text-[#AF292F]  font-extrabold text-[22px] leading-[100%] tracking-normal py-3 px-12 rounded-full transition "
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Phone Number */}
            {/* <div className="flex flex-col space-y-0.5">
            <label
              htmlFor="phone"
              className="font-Mulish font-medium text-lg leading-[100%] tracking-normal"
            >
              Phone Number{" "}
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={phone}
              // onChange={e=>setPhone(e.target.value)}
              onBlur={() => {
                if (phone.length !== 10) {
                  // setPhoneError("Phone number must be exactly 10 digits");
                  setErrorMessage("Phone number must be exactly 10 digits");
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                if (/\D/.test(value)) {
                  // setPhoneError("Only numbers are allowed");
                  setErrorMessage("Only numbers are allowed");
                } else {
                  setPhone(value.replace(/\D/g, ""));
                  // setPhoneError("");
                  setErrorMessage("");
                }
              }}
              autoComplete="tel"
              minLength={10}
              maxLength={10}
              inputMode="numeric"
              placeholder="Enter Your Mobile No."
              className="rounded-full h-11 border border-[#9C9C9C] px-3.5 py-3 text-[15px] leading-[100%] tracking-normal placeholder-[#9C9C9C] focus:outline-2 font-semibold"
            />
          </div> */}
            {/* 
          <p
            className={`absolute text-xs text-[#AF292F] leading-[100%] font-medium -bottom-0 left-10
          ${errorMessage ? "opacity-100" : "opacity-0"}
          `}
          >
            {errorMessage}
          </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
