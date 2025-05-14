import Feature from "@/components/Feature";
import FloatingBackButton from "@/components/FloatingBackButton";
import FloatingDownButton from "@/components/FloatingDownButton";
import Header from "@/components/Header";
import Life from "@/components/Life";
import Login from "@/components/Login";
import SortComponents from "@/components/SortComponents";
import { useAudio } from "@/context/AudioContext";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { X } from "lucide-react";
import AudioControls from "@/components/audio-controls-component-animated";

function index() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const { shouldPlayAudio, setShouldPlayAudio } = useAudio();
  const [youtubeVideo, setYoutubeVideo] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    // If we navigated here with the intent to play audio
    if (shouldPlayAudio && audioRef.current) {
      audioRef.current.src =
        "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/audio_age_41_50/3.mp3";
      // Try to play the audio
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio started playing successfully
            setIsPlaying(true);
            console.log("Audio is playing");
          })
          .catch((error) => {
            // Auto-play was prevented
            console.error("Audio play failed:", error);
          })
          .finally(() => {
            // Reset the flag after attempting to play
            // setIsPlaying(false);
            setShouldPlayAudio(false);
          });
      }
    }
  }, [shouldPlayAudio, setShouldPlayAudio, audioRef]);

  async function getAudioLink(audioNumber) {
    try {
      const response = await fetch(
        "https://interactive.hivoco.com/api/get_audio_link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audio_number: audioNumber,
            age_range: "41-50",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Extract the audio URL from the response
      // Adjust this based on your actual API response structure
      const audioUrl = data.answer || data.audio_url || data.url || data.link;

      if (audioUrl && audioRef.current) {
        audioRef.current.src = audioUrl;

        // Try to play the audio
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              console.log("Audio is playing from API");
            })
            .catch((error) => {
              console.error("Audio play failed:", error);
            })
        }
      } else {
        console.error("No audio URL found in API response");
      }
    } catch (error) {
      console.error("Error fetching audio link:", error);
      throw error;
    }
  }

  const headerFunction = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    // sessionStorage.removeItem("iciciUserDetails");
    router.push("/");
  };

  const arr = [
    {
      image: "timer",
      text: "Perfect Timing",
      number: 4,
    },
    {
      image: "hand",
      text: "Financial Fit",
      number: 5,
    },
    {
      image: "flex",
      text: "Built-in-Flexibility",
      number: 6,
    },
  ];

  const feature = [
    {
      image: "guaranteed",
      text: "Guaranteed<br/> Lifelong Income",
      number: 8,
    },
    {
      image: "customised",
      text: "Customised <br/> income",
      number: 9,
    },
    {
      image: "waiver",
      text: "Waiver of <br/> Premium",
      number: 10,
    },
    {
      image: "return",
      text: "Return of <br/> premium option",
      number: 11,
    },
    {
      image: "withdrawal",
      text: "Withdrawal <br/> benefit",
      number: 12,
    },
    {
      image: "top",
      text: "Top-up <br/> options",
      number: 13,
    },
  ];

  const life = [
    {
      image: "lives",
      strong: "9.69 crores",
      small: "Lives Covered",
      span: "Lives Covered",
    },
    {
      image: "hand+",
      strong: "₹40,006 crores",
      small: "Benefits Paid",
      span: "Benefits Paid",
    },
    {
      image: "hand-home",
      strong: "₹2.9 lakh crore",
      small: "Assets Under Management",
      span: "as on March 31, 2024",
    },
    {
      image: "judge",
      strong: "99.3%",
      small: "Claim Settlement Ratio",
      span: "for FY 2025",
    },
  ];

  const security = [
    {
      image: "know",
      url: "https://www.iciciprulife.com/campaign/retirement-planning-calculator-v1.html?UID=49074",
    },
    {
      image: "explain",
      url: "https://youtu.be/8KkJgp5M7Bs?si=JFsGOngIwhsW0ogj?UID=49075",
    },
    {
      image: "download",
      url: "https://www.iciciprulife.com/content/dam/icicipru/brochures/ICICI_Pru_GPP_Flexi_Brochure.pdf?UID=49076",
    },
    {
      image: "contact",
      url: "https://www.iciciprulife.com/retirement-pension-plans/guaranteed-pension-plan-flexi.html?UID=49077",
    },
  ];
  function openInNewTab(url) {
    // Open the URL in a new tab
    window.open(url, "_blank");
  }

  // Example usage:
  // openInNewTab('https://www.example.com');

  const keyFeatureRef = useRef(null);
  const secureRef = useRef(null);
  const whyRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function isValidNonYouTubeUrl(input) {
    try {
      // Check if input is a string
      if (typeof input !== "string") {
        return false;
      }

      // Create a URL object to validate the URL
      const url = new URL(input);

      // Check if the protocol is http or https
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return false;
      }

      // Check if it's NOT a YouTube URL
      const youtubeHostnames = [
        "youtube.com",
        "www.youtube.com",
        "youtu.be",
        "m.youtube.com",
      ];

      return !youtubeHostnames.some(
        (hostname) =>
          url.hostname === hostname || url.hostname.endsWith("." + hostname)
      );
    } catch (error) {
      // If URL constructor throws an error, it's an invalid URL
      return false;
    }
  }

  const handleCardAction = (target) => {
    if (isValidNonYouTubeUrl(target)) {
      window.open(target, "_blank");
    }

    if (typeof target === "string" && target.startsWith("022")) {
      window.location.href = `tel:${target}`;
    }
    if (typeof target === "string" && target === "openqr") {
      setIsQRPopupOpen(true);
    }

    // Check if the target is a YouTube link
    if (
      typeof target === "string" &&
      (target.includes("youtube.com") || target.includes("youtu.be"))
    ) {
      // Extract video ID
      let videoId = "";

      if (target.includes("youtube.com/watch?v=")) {
        videoId = target.split("v=")[1].split("&")[0];
      } else if (target.includes("youtu.be/")) {
        videoId = target.split("youtu.be/")[1].split("?")[0];
      }

      if (videoId) {
        // Set the YouTube video ID to show the player
        setYoutubeVideo(videoId);
        return;
      }

      // Fallback to opening in new tab if we couldn't extract the ID
      window.open(target, "_blank", "noopener,noreferrer");
    }
    // Check if it's a section ID on the page
    else if (typeof target === "string" && target.startsWith("#")) {
      // Remove the # if it exists at the beginning
      const sectionId = target.startsWith("#") ? target.substring(1) : target;
      const element = document.getElementById(sectionId);

      if (element) {
        // Smooth scroll to the element
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    // Directly use element ID without # prefix
    else if (typeof target === "string") {
      const element = document.getElementById(target);

      if (element) {
        // Smooth scroll to the element
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    // else if (typeof target === "string" && target.startsWith("022")) {
    //   console.log("miss call");
    // }
    else if (typeof target === "boolean") {
      setIsPopupOpen(true);
    }
  };

  const togglePlayPause = () => {
    console.log(":");
    if (!audioRef.current ) return;

    if (isPlaying) {
      // If audio is playing, pause it
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // If audio is paused, play it
     
        // If we're on the first audio
        audioRef.current
          .play()
          .then(() => {
            
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("Playing audio failed:", error);
          });
          
      
    }
  };

  // Make sure your opts are set correctly
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  return (
    <>
      {isOpenLogin ? (
        <Login />
      ) : (
        <div className="max-w-md mx-auto  text-white  mulish-font">
          <Header onClick={headerFunction} />
          <div
           
            className="bg-[url('/dev/bg-3.png')] bg-cover  bg-no-repeat bg-left h-40 flex items-center justify-end px-4 pt-20 pb-20   min-h-[254px]"
          >
            <div className=" w-fit text-right   border-white  ">
              {" "}
              <p className="text-xl leading-6 font-medium">
                You've chosen
                <br />
                <strong className="text-2xl leading-7.5 font-bold">
                  balance
                </strong>
                <br />
                We've found the
                <br />
                <strong className="text-2xl leading-7.5 font-bold">
                  perfect fit.
                </strong>
              </p>
            </div>
          </div>
          <section className="p-6">
            <div className=" flex items-center  p-3 rounded-xl gap-5 ">
              <Image
                className="self-center"
                src="/dev/gpl.png"
                alt="Picture of the author"
                width={152}
                height={98}
              />

              <strong className="font-bold text-xs leading-3.5 text-[#004A80] text-left ">
                Based on your inputs, we recommend the ICICI Pru Life Guaranteed
                Pension Plan Flexi. A smart, stable way to convert your savings
                into lifelong income with flexibility built in.
              </strong>
            </div>
          </section>
          {/* <p className="font-bold text-sm text-[#004A80]  text-center  p-6 py-1">
            Why{" "}
            <strong className="font-extrabold  ">
              ICICI Pru Life GPP Flexi Plan
            </strong>{" "}
            suits your dream retirement?
          </p>

          <section className="p-6 flex justify-between items-center">
            {arr?.map((e, id) => {
              return (
                <SortComponents
                  key={id}
                  onClick={() => getAudioLink(e.number)}
                  image={e.image}
                  text={e.text}
                />
              );
            })}
          </section> */}
          {/* <FloatingDownButton onClick={() => scrollToRef(keyFeatureRef)} /> */}
          <div className="border-t-2 border-gray-200 w-4/5 mx-auto py-3"></div>


          <section ref={keyFeatureRef} className="p-6">
            <h3 className="text-[#F48120] text-xl font-extrabold mx-auto text-center">
              Key Features
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {feature?.map((e, id) => {
                return (
                  <Feature
                    key={id}
                    id={id}
                    image={e.image}
                    text={e.text}
                    selectedFeature={selectedFeature}
                    setSelectedFeature={setSelectedFeature}
                    onClick={() => getAudioLink(e.number)}
                  />
                );
              })}
            </div>
          </section>
          {/* <FloatingDownButton onClick={() => scrollToRef(secureRef)} /> */}
          <div className="border-t-2 border-gray-200 w-4/5 mx-auto py-3"></div>

          <section ref={secureRef} className="p-6">
            <p className="text-[#F48120] text-base font-mediun mx-auto text-center">
              Take a step towards <br />{" "}
              <strong>securing your dream retirement</strong>
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {security?.map((e, id) => {
                return (
                  <div
                    onClick={() => handleCardAction(e.url)}
                    key={id}
                    className="w-full"
                  >
                    <Image
                      src={`/dev/${e.image}.png`}
                      alt={"Picture of the author"}
                      width={147}
                      height={90}
                      className="w-full h-auto object-contain cursor-pointer "
                    />
                  </div>
                );
              })}
            </div>
          </section>
          {/* <FloatingDownButton onClick={() => scrollToRef(whyRef)} /> */}
          <div className="border-t-2 border-gray-200 w-4/5 mx-auto py-3"></div>
          <section ref={whyRef} className="p-6">
            <p className="text-[#F48120] text-base font-mediun mx-auto text-center">
              Why choose <br />{" "}
              <strong>ICICI Prudential Life Insurance?</strong>
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {life?.map((e, id) => {
                return (
                  <Life
                    key={id}
                    image={e.image}
                    strong={e.strong}
                    small={e.small}
                    span={e.span}
                  />
                );
              })}
            </div>
          </section>
          <div className="text-center w-full mt-8">
            {" "}
            <button
              onClick={() => {}}
              className="cursor-pointer  bg-[#E5E5E5] border !border-black/50 h-10  w-fit min-w-36  text-[#004A80]  font-extrabold text-lg leading-[100%] tracking-normal  px-7 rounded-full transition mb-10 "
            >
              Disclaimers{" "}
            </button>
          </div>

          {youtubeVideo && (
            <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 flex flex-col items-center z-50">
              <div className="relative w-full max-w-md">
                <button
                  className="absolute -top-10 right-0 bg-orange-600 text-white p-2 rounded-full"
                  onClick={() => setYoutubeVideo(null)}
                >
                  <X size={24} />
                </button>
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "62%" }}
                >
                  <YouTube
                    videoId={youtubeVideo}
                    opts={opts}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}

          <FloatingBackButton onClick={() => headerFunction()} />

          <audio onEnded={() => {
            setIsPlaying(false);
            // setShowController(false);
          }} ref={audioRef} className="hidden">
            <source type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          {/* {showController && ( */}
          <AudioControls
            togglePlayPause={togglePlayPause}
            isPlaying={isPlaying}
          />
          {/* )} */}
        </div>
      )}
    </>
  );
}

export default index;

// import Feature from "@/components/Feature";
// import FloatingBackButton from "@/components/FloatingBackButton";
// import FloatingDownButton from "@/components/FloatingDownButton";
// import Header from "@/components/Header";
// import Life from "@/components/Life";
// import Login from "@/components/Login";
// import SortComponents from "@/components/SortComponents";
// import { useAudio } from "@/context/AudioContext";
// import Image from "next/image";
// import React, { useEffect, useRef, useState } from "react";

// function index() {
//   const [isOpenLogin, setIsOpenLogin] = useState(false);
//   const { shouldPlayAudio, setShouldPlayAudio } = useAudio();
//   const audioRef = useRef(null);
//   useEffect(() => {
//     // If we navigated here with the intent to play audio
//     if (shouldPlayAudio && audioRef.current) {
//       audioRef.current.src =
//         "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/audio_age_41_50/3.mp3";
//       // Try to play the audio
//       const playPromise = audioRef.current.play();

//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             // Audio started playing successfully
//             console.log("Audio is playing");
//           })
//           .catch((error) => {
//             // Auto-play was prevented
//             console.error("Audio play failed:", error);
//           })
//           .finally(() => {
//             // Reset the flag after attempting to play
//             setShouldPlayAudio(false);
//           });
//       }
//     }
//   }, [shouldPlayAudio, setShouldPlayAudio, audioRef]);

//   async function getAudioLink(audioNumber) {
//     try {
//       const response = await fetch(
//         "https://interactive.hivoco.com/api/get_audio_link",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             audio_number: audioNumber,
//             age_range: "41-50",
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       audioRef.current.src = data.answer;
//     } catch (error) {
//       console.error("Error fetching audio link:", error);
//       throw error;
//     }
//   }

//   // Example usage:
//   // getAudioLink("3").then(data => console.log(data));

//   const headerFunction = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//     }
//     // sessionStorage.removeItem("iciciUserDetails");
//     router.push("/");
//   };

//   const arr = [
//     {
//       image: "timer",
//       text: "Perfect Timing",
//       number: 4,
//     },
//     {
//       image: "hand",
//       text: "Financial Fit",
//       number: 5,
//     },
//     {
//       image: "flex",
//       text: "Built-in-Flexibility",
//       number: 5,
//     },
//   ];

//   const feature = [
//     {
//       image: "guaranteed",
//       text: "Guaranteed<br/> Lifelong Income",
//     },
//     {
//       image: "customised",
//       text: "Customised <br/> income",
//     },
//     {
//       image: "waiver",
//       text: "Waiver of <br/> Premium",
//     },
//     {
//       image: "return",
//       text: "Return of <br/> premium option",
//     },
//     {
//       image: "withdrawal",
//       text: "Withdrawal <br/> benefit",
//     },
//     {
//       image: "top",
//       text: "Top-up <br/> options",
//     },
//   ];

//   const life = [
//     {
//       image: "lives",
//       strong: "9.69 crores",
//       small: "Lives Covered",
//       span: "Lives Covered",
//     },
//     {
//       image: "hand+",
//       strong: "₹40,006 crores",
//       small: "Benefits Paid",
//       span: "Benefits Paid",
//     },
//     {
//       image: "hand-home",
//       strong: "₹2.9 lakh crore",
//       small: "Assets Under Management",
//       span: "as on March 31, 2024",
//     },
//     {
//       image: "judge",
//       strong: "99.3%",
//       small: "Claim Settlement Ratio",
//       span: "for FY 2025",
//     },
//   ];

//   const security = ["know", "explain", "download", "contact"];
//   return (
//     <>
//       {isOpenLogin ? (
//         <Login />
//       ) : (
//         <div className="max-w-md mx-auto  text-white  mulish-font">
//           <Header onClick={headerFunction} />
//           <div
//             bg
//             className="bg-[url('/dev/bg-3.png')] bg-cover bg-no-repeat bg-center h-40 flex items-center justify-end px-4 pt-20 pb-20 min-h-[254px]"
//           >
//             <div className=" w-fit text-right   border-white  ">
//               {" "}
//               <p className="text-lg font-medium">
//                 You’ve chosen <br />
//                 <strong className="text-2xl font-bold">balance</strong>
//                 <br />
//                 We’ve found the <br />
//                 <strong className="text-2xl font-bold">perfect fit.</strong>
//               </p>
//             </div>
//           </div>
//           <section className="p-6">
//             <div className=" flex  p-3 rounded-xl gap-10 ">
//               <Image
//                 src="/dev/gpl.png"
//                 alt="Picture of the author"
//                 width={157}
//                 height={97}
//               />

//               <strong className="font-bold text-xs text-[#004A80] w-32">
//                 Based on your inputs, we recommend the ICICI Pru Life Guaranteed
//                 Pension Plan Flexi. A smart, stable way to convert your savings
//                 into lifelong income with flexibility built in.
//               </strong>
//             </div>
//           </section>
//           <p className="font-bold text-sm text-[#004A80]  text-center  p-6">
//             Why{" "}
//             <strong className="font-extrabold  ">
//               ICICI Pru Life GPP Flexi Plan
//             </strong>{" "}
//             suits your dream retirement?
//           </p>

//           <section className="p-6 flex justify-between items-center">
//             {arr?.map((e) => {
//               return (
//                 <SortComponents
//                   onClick={() => getAudioLink(e.number)}
//                   image={e.image}
//                   text={e.text}
//                 />
//               );
//             })}
//           </section>
//           <FloatingDownButton />

//           <section className="p-6">
//             <h3 className="text-[#F48120] text-xl font-extrabold mx-auto text-center">
//               Key Features
//             </h3>
//             <div className="mt-6  flex-wrap justify-between gap-6 flex">
//               {feature?.map((e, id) => {
//                 return <Feature key={id} image={e.image} text={e.text} />;
//               })}
//             </div>
//           </section>
//           <FloatingDownButton />
//           <section className="p-6">
//             <p className="text-[#F48120] text-base font-mediun mx-auto text-center">
//               Take a step towards <br />{" "}
//               <strong>securing your dream retirement</strong>
//             </p>
//             <div className="mt-6  flex-wrap justify-between gap-6 flex">
//               {security?.map((e, id) => {
//                 return (
//                   <div key={id} className="">
//                     <Image
//                       src={`/dev/${e}.png`}
//                       alt={"Picture of the author"}
//                       width={147}
//                       height={90}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//           <FloatingDownButton />
//           <section className="p-6">
//             <p className="text-[#F48120] text-base font-mediun mx-auto text-center">
//               Why choose <br />{" "}
//               <strong>ICICI Prudential Life Insurance?</strong>
//             </p>
//             <div className="mt-6  flex-wrap justify-between gap-6 flex">
//               {life?.map((e, id) => {
//                 return (
//                   <Life
//                     image={e.image}
//                     strong={e.strong}
//                     small={e.small}
//                     span={e.span}
//                   />
//                 );
//               })}
//             </div>
//           </section>
//           <div className="text-center w-full mt-8">
//             {" "}
//             <button
//               onClick={() => {}}
//               className="cursor-pointer  bg-[#E5E5E5] border !border-black/50 h-10  w-fit min-w-36  text-[#004A80]  font-extrabold text-lg leading-[100%] tracking-normal  px-7 rounded-full transition "
//             >
//               Disclaimers{" "}
//             </button>
//           </div>

//           <FloatingBackButton onClick={() => headerFunction()} />

//           <audio ref={audioRef} className="hidden">
//             <source type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       )}
//     </>
//   );
// }

// export default index;
// import ExploreCard from "@/components/ExploreCard";
// import FloatingBackButton from "@/components/FloatingBackButton";
// import Header from "@/components/Header";
// import Popup from "@/components/Popup";

// import PulseCard from "@/components/PulseCard";
// import { useAudio } from "@/context/AudioContext";
// import { X } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/router";

// import React, { useEffect, useRef, useState } from "react";
// import YouTube from "react-youtube";

// function Home() {
//   const router = useRouter();
//   const [selected, setSelected] = useState(null);
//   const [activePulseCard, setActivePulseCard] = useState(null);
//   const [youtubeVideo, setYoutubeVideo] = useState(null);
//   const audioRef = useRef(null);
//   const handlePulseCardClick = (audioSrc, index) => {
//     setActivePulseCard(index);

//     if (audioSrc) {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.src = audioSrc;
//         audioRef.current.load();
//         audioRef.current.play().catch((error) => {
//           console.error("Audio playback failed:", error);
//         });
//       }
//     }
//   };

//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isQRPopupOpen, setIsQRPopupOpen] = useState(false);
//   const { shouldPlayAudio, setShouldPlayAudio } = useAudio();

//   useEffect(() => {
//     // If we navigated here with the intent to play audio
//     if (shouldPlayAudio && audioRef.current) {
//       audioRef.current.src =
//         "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/retirement.mp3";
//       // Try to play the audio
//       const playPromise = audioRef.current.play();

//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             // Audio started playing successfully
//             console.log("Audio is playing");
//           })
//           .catch((error) => {
//             // Auto-play was prevented
//             console.error("Audio play failed:", error);
//           })
//           .finally(() => {
//             // Reset the flag after attempting to play
//             setShouldPlayAudio(false);
//           });
//       }
//     }
//   }, [shouldPlayAudio, setShouldPlayAudio]);

//   const closePopup = () => setIsPopupOpen(false);
//   const closePopupQR = () => setIsQRPopupOpen(false);
//   const cards = [
//     { image: "key-feature.svg", title: "Key feature", target: "key-feature" },
//     {
//       image: "illustration.svg",
//       title: "Illustrations",
//       target: "https://youtu.be/PL39I9PqVqI?si=Bf79Adwn9cJFgMRP",
//     },
//     {
//       image: "video.svg",
//       title: "Videos",
//       target: "https://youtu.be/8KkJgp5M7Bs?si=cWWdEHCGf1O200tp",
//     },
//     {
//       image: "annuity-option.svg",
//       title: "Buy Online",
//       target:
//         "https://www.iciciprulife.com/money-back-endowment-plans/future-perfect-savings-plan-calculator.html?UID=1060",
//     },
//     {
//       image: "calculator.svg",
//       title: "Calculator",
//       // target: "https://youtu.be/Kc78BCOw4I4?si=CPtuTMyOSIgU9cIm",
//     },
//     {
//       image: "headset.svg",
//       title: "Contact Us",
//       target: true,
//     },
//     {
//       image: "qr.png",
//       title: "Scan QR",
//       target: "openqr",
//     },
//   ];
//   const contact = [
//     {
//       image: "note.svg",
//       title: "Book an Appointment",
//       target: "https://www.iciciprulife.com/contact-us/send-me-an-advisor.html",
//     },
//     {
//       image: "customer-care.svg",
//       title: "Speak with an Agent",
//       target: "https://www.iciciprulife.com/contact-us/send-me-an-advisor.html",
//     },
//     {
//       image: "missed-call.svg",
//       title: "Give a Missed call",
//       target: "022-33811777",
//     },
//   ];
//   const pulsecards = [
//     {
//       image: "first-pulse.svg",
//       title:
//         "<strong>Guaranteed income</strong> for life with return of premium option",
//       audio:
//         "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/1.mp3",
//     },
//     {
//       image: "first-pulse.svg",
//       title:
//         "<strong>Extended income to your spouse with Joint Life option</strong> ",
//       audio:
//         "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/2.mp3",
//     },

//     {
//       image: "third-pulse.svg",
//       title: "<strong>waiver of future premium</strong>",
//       audio:
//         "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/3.mp3",
//     },
//     {
//       image: "six-pulse.svg",
//       title: "<strong>Guaranteed increasing income of 5% every year</strong>",
//       audio:
//         "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/4.mp3",
//     },

//   function isValidNonYouTubeUrl(input) {
//     try {
//       // Check if input is a string
//       if (typeof input !== "string") {
//         return false;
//       }

//       // Create a URL object to validate the URL
//       const url = new URL(input);

//       // Check if the protocol is http or https
//       if (url.protocol !== "http:" && url.protocol !== "https:") {
//         return false;
//       }

//       // Check if it's NOT a YouTube URL
//       const youtubeHostnames = [
//         "youtube.com",
//         "www.youtube.com",
//         "youtu.be",
//         "m.youtube.com",
//       ];

//       return !youtubeHostnames.some(
//         (hostname) =>
//           url.hostname === hostname || url.hostname.endsWith("." + hostname)
//       );
//     } catch (error) {
//       // If URL constructor throws an error, it's an invalid URL
//       return false;
//     }
//   }

//   const handleCardAction = (target) => {
//     if (isValidNonYouTubeUrl(target)) {
//       window.open(target, "_blank");
//     }

//     if (typeof target === "string" && target.startsWith("022")) {
//       window.location.href = `tel:${target}`;
//     }
//     if (typeof target === "string" && target === "openqr") {
//       setIsQRPopupOpen(true);
//     }

//     // Check if the target is a YouTube link
//     if (
//       typeof target === "string" &&
//       (target.includes("youtube.com") || target.includes("youtu.be"))
//     ) {
//       // Extract video ID
//       let videoId = "";

//       if (target.includes("youtube.com/watch?v=")) {
//         videoId = target.split("v=")[1].split("&")[0];
//       } else if (target.includes("youtu.be/")) {
//         videoId = target.split("youtu.be/")[1].split("?")[0];
//       }

//       if (videoId) {
//         // Set the YouTube video ID to show the player
//         setYoutubeVideo(videoId);
//         return;
//       }

//       // Fallback to opening in new tab if we couldn't extract the ID
//       window.open(target, "_blank", "noopener,noreferrer");
//     }
//     // Check if it's a section ID on the page
//     else if (typeof target === "string" && target.startsWith("#")) {
//       // Remove the # if it exists at the beginning
//       const sectionId = target.startsWith("#") ? target.substring(1) : target;
//       const element = document.getElementById(sectionId);

//       if (element) {
//         // Smooth scroll to the element
//         element.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }
//     }
//     // Directly use element ID without # prefix
//     else if (typeof target === "string") {
//       const element = document.getElementById(target);

//       if (element) {
//         // Smooth scroll to the element
//         element.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }
//     }

//     // else if (typeof target === "string" && target.startsWith("022")) {
//     //   console.log("miss call");
//     // }
//     else if (typeof target === "boolean") {
//       setIsPopupOpen(true);
//     }
//   };

//   // Make sure your opts are set correctly
//   const opts = {
//     width: "100%",
//     height: "100%",
//     playerVars: {
//       autoplay: 1,
//       controls: 1,
//     },
//   };

//   const headerFunction = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//     }
//     // sessionStorage.removeItem("iciciUserDetails");
//     router.push("/");
//   };

//   return (
//     <div className="max-w-md mx-auto  text-white text-center mulish-font bg-white">
//       <Header text={"Return to home page"} onClick={headerFunction} />
//       <div
//         style={{ height: "calc(100vh - 300px)" }}
//         className="relative bg-[url('/image/second-bg.png')] bg-contain bg-no-repeat bg-center  px-4 py-11 pb-4 "
//       ></div>
//       <h2 className="px-6 pt-8 pb-8 text-[22px] font-bold text-[#AF292F]">
//         Guaranteed retirement income that grows year after year
//       </h2>
//       <div className="px-6">
//         <div className="bg-white px-6 py-2 rounded-3xl">
//           <div className="grid grid-cols-2 gap-4">
//             {cards.map((card, index) => {
//               const isLastItemInOddGroup =
//                 index === cards.length - 1 && cards.length % 2 !== 0;

//               return (
//                 <div
//                   key={index}
//                   className={
//                     isLastItemInOddGroup ? "col-span-2 flex justify-center" : ""
//                   }
//                 >
//                   <ExploreCard
//                     image={card.image}
//                     title={card.title}
//                     isActive={selected === index}
//                     onClick={() => {
//                       setSelected(index);
//                       handleCardAction(card.target);
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       x
//       {isPopupOpen && (
//         <Popup isOpen={isPopupOpen} onClose={closePopup} title="Sample Popup">
//           <h3 className="text-[#AF292F] text-2xl font-bold pb-5">Contact Us</h3>
//           <div className="grid grid-cols-2 gap-2">
//             {contact.map((card, index) => {
//               const isLastItemInOddGroup =
//                 index === cards.length - 1 && cards.length % 2 !== 0;

//               return (
//                 <div
//                   key={index}
//                   className={
//                     isLastItemInOddGroup ? "col-span-2 flex justify-center" : ""
//                   }
//                 >
//                   <ExploreCard
//                     image={card.image}
//                     title={card.title}
//                     isActive={selected === index}
//                     onClick={() => {
//                       setSelected(index);
//                       handleCardAction(card.target);
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </Popup>
//       )}
//       {isQRPopupOpen && (
//         <Popup
//           isOpen={isQRPopupOpen}
//           onClose={closePopupQR}
//           title="Sample Popup"
//         >
//           <Image
//             src={`/image/QR.jpg`}
//             alt="Picture of the author"
//             width={300}
//             height={300}
//             className="object-contain rounded-lg pb-4"
//           />
//         </Popup>
//       )}
//       {youtubeVideo && (
//         <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 flex flex-col items-center z-50">
//           <div className="relative w-full max-w-md">
//             <button
//               className="absolute -top-10 right-0 bg-orange-600 text-white p-2 rounded-full"
//               onClick={() => setYoutubeVideo(null)}
//             >
//               <X size={24} />
//             </button>
//             <div className="relative w-full" style={{ paddingBottom: "62%" }}>
//               <YouTube
//                 videoId={youtubeVideo}
//                 opts={opts}
//                 className="absolute top-0 left-0 w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//       <div id="key-feature" className="px-6 py-5">
//         <div className={`flex items-center w-full pb-11 `}>
//           <div
//             className={`flex-grow h-px bg-gradient-to-r from-[#F48120] to-[#FCB62E]`}
//           ></div>
//           <span
//             className={`px-4 whitespace-nowrap text-[#AF292F] font-extrabold text-3xl`}
//           >
//             Key Features
//           </span>
//           <div
//             className={`flex-grow h-px bg-gradient-to-r from-[#F48120] to-[#FCB62E]`}
//           ></div>
//         </div>
//         <div className="flex flex-col gap-6">
//           {pulsecards.map((card, index) => (
//             <div
//               key={index}
//               onClick={() => handlePulseCardClick(card.audio, index)}
//               className={`cursor-pointer transition-transform duration-300 ease-in-out ${
//                 activePulseCard === index
//                   ? "scale-110 shadow-lg shadow-gray-300  bg-orange-200"
//                   : "scale-100"
//               }`}
//             >
//               <PulseCard
//                 image={card.image}
//                 title={card.title}
//                 isActive={activePulseCard === index}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       <FloatingBackButton onClick={() => headerFunction()} />
//       <audio ref={audioRef} className="hidden">
//         <source type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>
//     </div>
//   );
// }

// export default Home;
