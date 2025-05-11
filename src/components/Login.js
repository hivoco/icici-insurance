"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import NameInput from "../components/NameInput";
import ScrollableCards from "@/components/ScrollableCards";

function Login(props) {
  // const [dob, setDob] = useState(new Date().toISOString().split("T")[0]); //today's date
  // const [name, setName] = useState("");
  const inputContainerRef = useRef(null);
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

    // if (selectedDateObj > currentDate) {
    //   setIsValid(false);
    //   setErrorMessage("Date of birth cannot be in the future");
    // } else if (selectedDateObj < new Date(minDate)) {
    //   setIsValid(false);
    //   setErrorMessage("Please select a valid date of birth");
    // } else {
    setIsValid(true);
    setErrorMessage("");

    setUserDetails({
      ...userDetails,
      dob: selectedDate,
    });
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

    // if (age < 20) {
    //   setErrorMessage("Age should be more than or equal to 20");
    //   return;
    // }

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

  useEffect(() => {
    const input = inputContainerRef.current;
    if (!input) return;
    let timer;
    input.addEventListener("click", () => {
      timer = setTimeout(() => {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300); // wait for keyboard to appear
    });
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    // grid-rows-[auto_1fr_1fr_auto]
    <div className="min-h-svh w-full mx-auto max-w-md py-11 pt-0 font-Mulish grid grid-rows-[auto_1fr]">
      <Header />

      {/* <div
        className=" bg-[#F0F1F1] h-full   px-5 pb-7 pt-2 flex flex-col justify-center"
      > */}
      {/* container of all elements */}
      {/* <div className=""> */}
      <div className="relative ">
        <div className="absolute top-4 left-6 font-Mulish font-bold text-white">
          <h2 className="text-base leading-5"> Your dream</h2>
          <h2 className="text-3xl leading-9"> retirement,</h2>
          <h2 className="text-base leading-5"> starts with the right</h2>
          <h2 className="text-3xl leading-9"> plan</h2>
        </div>

        <Image
          className="w-full h-auto"
          src={"/image/Page-1_Image.png"}
          width={375}
          height={254}
          alt="retirement-planning"
          priority={true}
        />
      </div>

      <div className=" font-bold text-sm leading-4.5 tracking-normal text-center text-[#004A80] pt-7 pb-8.5 px-6">
        Please share your details and we’ll guide you to choose the ICICI
        Prudential Life Retirement plan that best suits your retirement
      </div>

      <section className="w-4/5 mx-auto">
        <div className="border-t-2 border-black/30 w-4/5 mx-auto pb-7"></div>

        <div
          ref={inputContainerRef}
          className="w-full mx-auto  text-white space-y-7 p-6 borde border-black  rounded-3xl bg-[#F48120]"
        >
          <div
            className={`grid h-full
            ${showWarning ? "gap-1.5" : "gap-5"}`}
          >
            <div className="grid gap-2.5">
              <NameInput
                userDetails={userDetails}
                name={userDetails.name}
                setUserDetails={setUserDetails}
                showWarning={showWarning}
                setShowWarning={setShowWarning}
              />

              {/* DOB */}
              <div className={`space-y-0.5`}>
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
              </div>
            </div>

            <button
              onClick={handleClick}
              className="mt5 cursor-pointer bg-white h-10 mx-auto w-fit  text-[#004A80]  font-extrabold text-lg leading-[100%] tracking-normal  px-12 rounded-full transition "
            >
              Submit
            </button>
          </div>
        </div>

        <div className="border-b-2 border-black/30 w-4/5 mx-auto pt-8 mb-8"></div>
      </section>

      <div className="flex flex-col gap-8.5">
        <div className="text-center w-full flex flex-col gap-5">
          <h2 className="font-bold text-sm text-[#004A80]">Did you know?</h2>
          <ScrollableCards />
        </div>

        <button
          onClick={() => {}}
          className="cursor-pointer bg-[#E5E5E5] border !border-black/50 h-10 mx-auto w-fit min-w-36  text-[#004A80]  font-extrabold text-lg leading-[100%] tracking-normal  px-7 rounded-full transition "
        >
          Disclaimers{" "}
        </button>
      </div>
    </div>
  );
}

export default Login;
