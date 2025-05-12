import AudioControls from "@/components/audio-controls-component-animated";
import FloatingBackButton from "@/components/FloatingBackButton";
import Header from "@/components/Header";
import Login from "@/components/Login";
import { useAudio } from "@/context/AudioContext";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";

function index() {
  const router = useRouter();
  const { setShouldPlayAudio } = useAudio();
  const handleNavigation = (path) => {
    router.push(path);
  };

  const audioRef = useRef(null);
  const secondAudioRef = useRef(null);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [firstAudioLink, setFirstAudioLink] = useState(null);
  const [secondAudioLink, setSecondAudioLink] = useState(
    "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/audio_age_41_50/2.mp3"
  );
  const [showController, setShowController] = useState(false);
  const [isPlayingFirst, setIsPlayingFirst] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const handlePostRequest = async (lang = "english", name) => {
    // Set up the data to be sent in the body of the POST request
    const data = {
      name: `Hey ${name}, `,
      lang: lang?.toLowerCase(),
    };

    try {
      const response = await fetch(
        "https://interactive.hivoco.com/api/get_audio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Handle the response
      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();
      setFirstAudioLink(`data:audio/wav;base64,${result.audio}`);
    } catch (err) {
      console.error("Error fetching audio:", err.message);
    }
  };

  const [username, setUsername] = useState("");

  // Handle login completion
  const handleLoginComplete = (name) => {
    setUsername(name);
    setIsOpenLogin(false);

    // Now fetch the audio with the user's name
    handlePostRequest("english", name);
    setShowController(true);
    setShouldPlayAudio(true);
    // Set a small timeout to ensure the audio is loaded before playing
    setTimeout(() => {
      if (audioRef.current && firstAudioLink) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlayingFirst(true);
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("Playing audio failed:", error);
          });
      }
    }, 1000); // Give it a second to load the audio
  };

  // Update useEffect to play audio when firstAudioLink changes
  useEffect(() => {
    if (firstAudioLink && audioRef.current && !isOpenLogin) {
      audioRef.current.src = firstAudioLink;
      audioRef.current.load();

      // Try to play the audio
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingFirst(true);
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Playing first audio failed:", error);
        });
    }
  }, [firstAudioLink]);

  const handleFirstAudioEnd = () => {
    if (secondAudioRef.current) {
      secondAudioRef.current.play().catch((error) => {
        console.warn("Playing second audio was prevented:", error);
      });
      setIsPlayingFirst(false);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    console.log(":");
    if (!audioRef.current || !firstAudioLink) return;

    if (isPlaying) {
      // If audio is playing, pause it
      if (isPlayingFirst && audioRef.current) {
        audioRef.current.pause();
      } else if (secondAudioRef.current) {
        secondAudioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // If audio is paused, play it
      if (!isPlayingFirst && secondAudioRef.current) {
        // If we're on the second audio
        secondAudioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("Playing audio failed:", error);
          });
      } else {
        // If we're on the first audio
        audioRef.current
          .play()
          .then(() => {
            setIsPlayingFirst(true);
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("Playing audio failed:", error);
          });
      }
    }
  };

  useEffect(() => {
    const userDetails = sessionStorage.getItem("iciciUserDetails");
    if (userDetails) {
      setUserDetails(JSON.parse(userDetails));
      setIsOpenLogin(false);
    } else {
      setIsOpenLogin(true);
    }
    // console.log(user,"user");
  }, [isOpenLogin]);

  const headerFunction = () => {
    sessionStorage.removeItem("iciciUserDetails");
    setIsOpenLogin(true);
  };
  const arr = [
    {
      image: "gold",
      strong: "For guaranteed growth with bonus potential over the long term.",
      small:
        "Build your retirement steadily with assured benefits and yearly bonuses from day one.",
    },
    {
      image: "gpl",
      strong:
        "For lifelong income with the flexibility to start when you’re ready",
      small:
        "For lifelong income with the flexibility to start when you’re ready",
    },
  ];
  return (
    <>
      {isOpenLogin ? (
        <Login onLoginComplete={handleLoginComplete} />
      ) : (
        <div className="max-w-md mx-auto  text-white  mulish-font">
          <Header onClick={headerFunction} />
          <div
            className="bg-[url('/dev/bg-2.png')] bg-cover bg-no-repeat bg-left h-52 flex items-center justify-end  px-4"
          >
            <div className=" w-fit text-right ">
              {" "}
              <h3 className="text-2xl font-bold">Retirement Plans,</h3>
              <p className="text-lg font-medium">
                Picked Just <br /> for You
              </p>
            </div>
          </div>
          <h4 className="font-bold text-sm text-[#004A80]  text-center  p-6">
            Based on your inputs, we’ve selected the retirement plans that best
            match your life stage and goals.
          </h4>
          <div className="p-6 flex flex-col gap-4">
            {arr?.map((e,id) => {
              return (
                <div
                key={id}
                  onClick={() => router.push("/home")}
                  className="bg-[#F2F2F2] flex items-center  p-3 py-8 rounded-xl  gap-4 cursor-pointer "
                >
                  <Image
                  className="object-cover"
                    src={`/dev/${e.image}.png`}
                    alt="Picture of the author"
                    width={152}
                    height={77}
                    priority={true}
                    quality={100}
                  />
                  <div className=" flex flex-col text-left ">
                    <strong className="font-extrabold text-xs text-[#004A80]">
                      {e.strong}
                    </strong>
                    <small className="font-medium text-[8px] text-[#004A80] mt-1 mb-4">
                      {e.small}
                    </small>
                    <span className="text-[#F48120] text-xs font-extrabold ">
                      Know More
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center w-full mt-8">
            {" "}
            <button
              onClick={() => {}}
              className="cursor-pointer  bg-[#E5E5E5] border !border-black/50 h-10  w-fit min-w-36  text-[#004A80]  font-extrabold text-lg leading-[100%] tracking-normal  px-7 rounded-full transition mb-10 "
            >
              Disclaimers{" "}
            </button>
          </div>
          {showController && (
            <AudioControls
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying}
            />
          )}
        </div>
      )}
      <div className="hidden">
        <audio ref={audioRef} onEnded={handleFirstAudioEnd} controls>
          Your browser does not support the audio tag.
        </audio>

        <audio
          ref={secondAudioRef}
          src={secondAudioLink}
          onEnded={() => {
            setIsPlaying(false);
            setShowController(false);
          }}
          controls
          className={isPlayingFirst ? "hidden" : "block"}
        >
          Your browser does not support the audio tag.
        </audio>
      </div>
      {!isOpenLogin && <FloatingBackButton onClick={() => headerFunction()} />}
    </>
  );
}

export default index;

// import AgeCard from "@/components/AgeCard";
// import AudioControls from "@/components/audio-controls-component-animated";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import Login from "@/components/Login";
// import SmallCard from "@/components/SmallCard";
// import Button from "@/element/Button";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import React, { useEffect, useRef, useState } from "react";
// function Home() {
//   const router = useRouter();

//   const handleNavigation = (path) => {
//     router.push(path);
//   };

//   const ageGroups = [
//     {
//       year: "20-30 Years",
//       heading: "Young Adults",
//       subtext1:
//         "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
//       subtext2:
//         "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
//       href: "#",
//       min_age: 20,
//       max_age: 35,
//     },
//     {
//       year: "35-45 Years",
//       heading: "Mid-Career",
//       subtext1:
//         "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
//       subtext2:
//         "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
//       href: "#",
//       min_age: 35,
//       max_age: 45,
//     },
//     {
//       year: "45-55 Years",
//       heading: "Pre-Retirement",
//       subtext1:
//         "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
//       subtext2:
//         "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
//       href: "/home",
//       min_age: 45,
//       max_age: 55,
//     },
//     {
//       year: "55+ Years",
//       heading: "Senior Citizens",
//       subtext1:
//         "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
//       subtext2:
//         "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
//       href: "#",
//       min_age: 55,
//       max_age: 120,
//     },
//   ];

//   const audioRef = useRef(null);
//   const secondAudioRef = useRef(null);
//   const [isOpenLogin, setIsOpenLogin] = useState(false);
//   const [firstAudioLink, setFirstAudioLink] = useState(null);
//   const [secondAudioLink, setSecondAudioLink] = useState(
//     "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/introline.mp3"
//   );
//   const [showController, setShowController] = useState(false);
//   const [isPlayingFirst, setIsPlayingFirst] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const handlePostRequest = async (lang = "english", name) => {
//     // Set up the data to be sent in the body of the POST request
//     const data = {
//       name: `Hey ${name}, `,
//       lang: lang?.toLowerCase(),
//     };

//     try {
//       const response = await fetch(
//         "https://interactive.hivoco.com/api/get_audio",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       // Handle the response
//       if (!response.ok) {
//         throw new Error("Request failed");
//       }

//       const result = await response.json();
//       setFirstAudioLink(`data:audio/wav;base64,${result.audio}`);
//     } catch (err) {
//       console.error("Error fetching audio:", err.message);
//     }
//   };

//   const [username, setUsername] = useState("");

//   // Handle login completion
//   const handleLoginComplete = (name) => {
//     setUsername(name);
//     setIsOpenLogin(false);

//     // Now fetch the audio with the user's name
//     handlePostRequest("english", name);
//     setShowController(true);

//     // Set a small timeout to ensure the audio is loaded before playing
//     setTimeout(() => {
//       if (audioRef.current && firstAudioLink) {
//         audioRef.current
//           .play()
//           .then(() => {
//             setIsPlayingFirst(true);
//             setIsPlaying(true);
//           })
//           .catch((error) => {
//             console.warn("Playing audio failed:", error);
//           });
//       }
//     }, 1000); // Give it a second to load the audio
//   };

//   // Update useEffect to play audio when firstAudioLink changes
//   useEffect(() => {
//     if (firstAudioLink && audioRef.current && !isOpenLogin) {
//       audioRef.current.src = firstAudioLink;
//       audioRef.current.load();

//       // Try to play the audio
//       audioRef.current
//         .play()
//         .then(() => {
//           setIsPlayingFirst(true);
//           setIsPlaying(true);
//         })
//         .catch((error) => {
//           console.warn("Playing first audio failed:", error);
//         });
//     }
//   }, [firstAudioLink]);

//   const handleFirstAudioEnd = () => {
//     if (secondAudioRef.current) {
//       secondAudioRef.current.play().catch((error) => {
//         console.warn("Playing second audio was prevented:", error);
//       });
//       setIsPlayingFirst(false);
//       setIsPlaying(true);
//     }
//   };

//   const togglePlayPause = () => {
//     console.log(":");
//     if (!audioRef.current || !firstAudioLink) return;

//     if (isPlaying) {
//       // If audio is playing, pause it
//       if (isPlayingFirst && audioRef.current) {
//         audioRef.current.pause();
//       } else if (secondAudioRef.current) {
//         secondAudioRef.current.pause();
//       }
//       setIsPlaying(false);
//     } else {
//       // If audio is paused, play it
//       if (!isPlayingFirst && secondAudioRef.current) {
//         // If we're on the second audio
//         secondAudioRef.current
//           .play()
//           .then(() => {
//             setIsPlaying(true);
//           })
//           .catch((error) => {
//             console.warn("Playing audio failed:", error);
//           });
//       } else {
//         // If we're on the first audio
//         audioRef.current
//           .play()
//           .then(() => {
//             setIsPlayingFirst(true);
//             setIsPlaying(true);
//           })
//           .catch((error) => {
//             console.warn("Playing audio failed:", error);
//           });
//       }
//     }
//   };

//   useEffect(() => {
//     const userDetails = sessionStorage.getItem("iciciUserDetails");
//     if (userDetails) {
//       setUserDetails(JSON.parse(userDetails));
//       setIsOpenLogin(false);
//     } else {
//       setIsOpenLogin(true);
//     }
//     // console.log(user,"user");
//   }, [isOpenLogin]);

// const headerFunction = () => {
//   sessionStorage.removeItem("iciciUserDetails");
//   setIsOpenLogin(true);
// };
//   return (
//     <>
// {isOpenLogin ? (
//   <Login onLoginComplete={handleLoginComplete} />
// ) : (
//         <div className="max-w-md mx-auto  text-white text-center mulish-font bg-gradient-to-b from-[#EDEEE2] to-[#FFFFFF]">
//           <Header text={"Return to login page"} onClick={headerFunction} />
//           <div
//             // style={{ height: "calc(100vh - 170px)" }}
//             className="  rounded-b-3xl px-4 py-11 pb-4 bg-white"
//           >
//             <h3 className="font-bold text-4xl  mx-auto w-fit  tracking-normal text-[#004A80]">
//               Secure your future <br /> with the right
//               <br /> retirement plan
//             </h3>

//             <div className=" py-8">
//               <div className="flex justify-center gap-3 mb-2">
//                 <Image
//                   src="/image/1.png"
//                   alt="Picture of the author"
//                   width={96}
//                   height={96}
//                 />
//                 <Image
//                   src="/image/2.png"
//                   alt="Picture of the author"
//                   width={96}
//                   height={96}
//                 />
//               </div>

//               <div className="flex justify-center gap-3 mb-2">
//                 <Image
//                   src="/image/5.png"
//                   alt="Picture of the author"
//                   width={96}
//                   height={96}
//                 />
//                 <Image
//                   src="/image/4.png"
//                   alt="Picture of the author"
//                   width={96}
//                   height={96}
//                 />
//                 <Image
//                   src="/image/3.png"
//                   alt="Picture of the author"
//                   width={96}
//                   height={96}
//                 />
//               </div>

//               <div className="flex justify-center gap-3 mb-2">
//                 <Image
//                   src="/image/7.png"
//                   alt="Picture of the author"
//                   width={96}
//                   height={96}
//                 />
//                 <Image
//                   src="/image/6.png"
//                   alt="Picture of the author"
//                   width={96}
//                   height={96}
//                 />
//               </div>
//             </div>

//             <div className="text-center">
//               <Button bg="#AF292F" title={"Read more"} />
//             </div>
//           </div>
//           <div className="px-8 py-16 flex mx-auto flex-col gap-8 ">
//             {ageGroups.map((card, index) => {
//               return (
//                 userDetails?.age >= card.min_age &&
//                 userDetails?.age <= card.max_age && (
//                   <AgeCard
//                     key={index}
//                     onClick={() => handleNavigation(card.href)}
//                     year={card.year}
//                     heading={card.heading}
//                     subtext1={card.subtext1}
//                     subtext2={card.subtext2}
//                   />
//                 )
//               );
//             })}
//           </div>

//           <div className="px-8  flex mx-auto flex-col gap-8  ">
//             <SmallCard
//               image={"bulb.svg"}
//               p1={"99.3%"}
//               p2={"Claim Settlement Ratio* "}
//               p3={"for 9M-FY2025"}
//               first={true}
//             />
//             <SmallCard
//               image={"star.svg"}
//               p1={"₹40,006 crores"}
//               p2={"Assets Under Management"}
//               p3={" as on March 31, 2024"}
//             />
//             <SmallCard
//               image={"pie.svg"}
//               p1={"₹2.9 lakh crore"}
//               p2={"Assets Under Management"}
//               p3={" as on March 31, 2024"}
//             />
//             <SmallCard
//               image={"umbrella.svg"}
//               p1={"9.69 crores"}
//               p2={"Assets Under Management"}
//               p3={" as on March 31, 2024"}
//             />
//           </div>
//           {/* <button onClick={() => handleManualPlay()}>hello</button> */}
//           <div className=" pt-20">
//             <Footer />
//           </div>

// {showController && (
//   <AudioControls
//     togglePlayPause={togglePlayPause}
//     isPlaying={isPlaying}
//   />
// )}
//   </div>
// )}
// <div className="hidden">
//   <audio ref={audioRef} onEnded={handleFirstAudioEnd} controls>
//     Your browser does not support the audio tag.
//   </audio>

//   <audio
//     ref={secondAudioRef}
//     src={secondAudioLink}
//     onEnded={() => {
//       setIsPlaying(false);
//       setShowController(false);
//     }}
//     controls
//     className={isPlayingFirst ? "hidden" : "block"}
//   >
//     Your browser does not support the audio tag.
//   </audio>
// </div>
//     </>
//   );
// }

// export default Home;
