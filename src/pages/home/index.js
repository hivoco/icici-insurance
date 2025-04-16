import ExploreCard from "@/components/ExploreCard";
import Header from "@/components/Header";
import Popup from "@/components/Popup";

import PulseCard from "@/components/PulseCard";
import { X } from "lucide-react";
import { useRouter } from "next/router";

import React, { useRef, useState } from "react";
import YouTube from "react-youtube";

function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [activePulseCard, setActivePulseCard] = useState(null);
  const [youtubeVideo, setYoutubeVideo] = useState(null);
  const audioRef = useRef(null);
  const handlePulseCardClick = (audioSrc, index) => {
    setActivePulseCard(index);

    if (audioSrc) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = audioSrc;
        audioRef.current.load();
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const cards = [
    { image: "key-feature.svg", title: "Key feature", target: "key-feature" },
    {
      image: "illustration.svg",
      title: "Illustrations",
      target: "https://youtu.be/PL39I9PqVqI?si=Bf79Adwn9cJFgMRP",
    },
    {
      image: "video.svg",
      title: "Videos",
      target: "https://youtu.be/8KkJgp5M7Bs?si=cWWdEHCGf1O200tp",
    },
    {
      image: "annuity-option.svg",
      title: "Annuity options",
      target: "https://youtu.be/Kc78BCOw4I4?si=CPtuTMyOSIgU9cIm",
    },
    {
      image: "calculator.svg",
      title: "Calculator",
      // target: "https://youtu.be/Kc78BCOw4I4?si=CPtuTMyOSIgU9cIm",
    },
    {
      image: "headset.svg",
      title: "Contact Us",
      target: true,
    },
    // {
    //   image: "terms.svg",
    //   title: "Terms and Conditions",
    //   target: "https://youtu.be/PL39I9PqVqI?si=Bf79Adwn9cJFgMRP",
    // },
  ];
  const contact = [
    {
      image: "note.svg",
      title: "Book an Appointment",
      //  target: "key-feature"
    },
    {
      image: "customer-care.svg",
      title: "Speak with an Agent",
      target: "https://www.iciciprulife.com/contact-us/send-me-an-advisor.html",
    },
    {
      image: "missed-call.svg",
      title: "Give a Missed call",
      target: "022-33811777",
    },
  ];
  const pulsecards = [
    {
      image: "first-pulse.svg",
      title:
        "<strong>Guaranteed income</strong> for life with return of premium option",
      audio:
        "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/1.mp3",
    },
    {
      image: "first-pulse.svg",
      title:
        "<strong>Extended income to your spouse with Joint Life option</strong> ",
      audio:
        "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/2.mp3",
    },

    {
      image: "third-pulse.svg",
      title: "<strong>waiver of future premium</strong>",
      audio:
        "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/3.mp3",
    },
    {
      image: "six-pulse.svg",
      title: "<strong>Guaranteed increasing income of 5% every year</strong>",
      audio:
        "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/4.mp3",
    },
    // {
    //   image: "five-pulse.svg",
    //   title:
    //     "Option to <strong>withdraw funds</strong> after retirement begins",
    //   audio:
    //     "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/5.mp3",
    // },
    // {
    //   image: "six-pulse.svg",
    //   title:
    //     "Option to receive annuity amount on a <strong>monthly, quarterly, half-yearly or yearly</strong> basis",
    //   audio:
    //     "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/6.mp3",
    // },
    // {
    //   image: "seven-pulse.svg",
    //   title:
    //     "<strong>Save the date</strong> feature to receive annuity on any date of your choice",
    //   audio:
    //     "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/7.mp3",
    // },
    // {
    //   image: "eigth-pulse.svg",
    //   title: "<strong>Top up</strong> option to save more",
    //   audio:
    //     "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/8.mp3",
    // },
  ];

  // Add this function to your component or utils
  // const handleCardAction = (target) => {
  //   // Check if the target is a YouTube link
  //   if (
  //     typeof target === "string" &&
  //     (target.includes("youtube.com") || target.includes("youtu.be"))
  //   ) {
  //     // Open YouTube link in a new tab
  //     window.open(target, "_blank", "noopener,noreferrer");
  //   }
  //   // Check if it's a section ID on the page
  //   else if (typeof target === "string" && target.startsWith("#")) {
  //     // Remove the # if it exists at the beginning
  //     const sectionId = target.startsWith("#") ? target.substring(1) : target;
  //     const element = document.getElementById(sectionId);

  //     if (element) {
  //       // Smooth scroll to the element
  //       element.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }
  //   }
  //   // Directly use element ID without # prefix
  //   else if (typeof target === "string") {
  //     const element = document.getElementById(target);

  //     if (element) {
  //       // Smooth scroll to the element
  //       element.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }
  //   }
  // };

  function isValidNonYouTubeUrl(input) {
    try {
      // Check if input is a string
      if (typeof input !== 'string') {
        return false;
      }
  
      // Create a URL object to validate the URL
      const url = new URL(input);
  
      // Check if the protocol is http or https
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return false;
      }
  
      // Check if it's NOT a YouTube URL
      const youtubeHostnames = [
        'youtube.com', 
        'www.youtube.com', 
        'youtu.be', 
        'm.youtube.com'
      ];
  
      return !youtubeHostnames.some(hostname => 
        url.hostname === hostname || url.hostname.endsWith('.' + hostname)
      );
    } catch (error) {
      // If URL constructor throws an error, it's an invalid URL
      return false;
    }
  }
  

  const handleCardAction = (target) => {

    if (isValidNonYouTubeUrl(target)) {
      // console.log(target);
      // console.log(typeof target, "target");
      window.open(target, "_blank");
    }

    if (typeof target === "string" && target.startsWith("022")) {
      window.location.href = `tel:${target}`;
      console.log("miss call");
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

  // Make sure your opts are set correctly
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  const headerFunction = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto  text-white text-center mulish-font bg-white">
      <Header text={"Return to home page"} onClick={headerFunction} />
      <div
        style={{ height: "calc(100vh - 170px)" }}
        className="relative bg-[url('/image/second-bg.png')] bg-contain bg-no-repeat bg-center  px-4 py-11 pb-4 "
      ></div>
      <h2 className="px-6 pt-20 pb-10 text-[22px] font-bold text-[#AF292F]">
        Guaranteed retirement income that grows year after year
      </h2>
      <div className="px-6">
        <div className="bg-white px-6 py-9 rounded-3xl">
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, index) => {
              const isLastItemInOddGroup =
                index === cards.length - 1 && cards.length % 2 !== 0;

              return (
                <div
                  key={index}
                  className={
                    isLastItemInOddGroup ? "col-span-2 flex justify-center" : ""
                  }
                >
                  <ExploreCard
                    image={card.image}
                    title={card.title}
                    isActive={selected === index}
                    onClick={() => {
                      setSelected(index);
                      handleCardAction(card.target);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      x
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={closePopup} title="Sample Popup">
          <h3 className="text-[#AF292F] text-2xl font-bold pb-5">Contact Us</h3>
          <div className="grid grid-cols-2 gap-2">
            {contact.map((card, index) => {
              const isLastItemInOddGroup =
                index === cards.length - 1 && cards.length % 2 !== 0;

              return (
                <div
                  key={index}
                  className={
                    isLastItemInOddGroup ? "col-span-2 flex justify-center" : ""
                  }
                >
                  <ExploreCard
                    image={card.image}
                    title={card.title}
                    isActive={selected === index}
                    onClick={() => {
                      setSelected(index);
                      handleCardAction(card.target);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Popup>
      )}
      {youtubeVideo && (
        <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 flex flex-col items-center z-50">
          <div className="relative w-full max-w-md">
            <button
              className="absolute -top-10 right-0 bg-orange-600 text-white p-2 rounded-full"
              onClick={() => setYoutubeVideo(null)}
            >
              <X size={24} />
            </button>
            <div className="relative w-full" style={{ paddingBottom: "62%" }}>
              <YouTube
                videoId={youtubeVideo}
                opts={opts}
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
      <div id="key-feature" className="px-6 py-20">
        <div className={`flex items-center w-full pb-11 `}>
          <div
            className={`flex-grow h-px bg-gradient-to-r from-[#F48120] to-[#FCB62E]`}
          ></div>
          <span
            className={`px-4 whitespace-nowrap text-[#AF292F] font-extrabold text-3xl`}
          >
            Key Features
          </span>
          <div
            className={`flex-grow h-px bg-gradient-to-r from-[#F48120] to-[#FCB62E]`}
          ></div>
        </div>
        <div className="flex flex-col gap-6">
          {pulsecards.map((card, index) => (
            <div
              key={index}
              onClick={() => handlePulseCardClick(card.audio, index)}
              className={`cursor-pointer transition-transform duration-300 ease-in-out ${
                activePulseCard === index
                  ? "scale-110 shadow-lg shadow-gray-300  bg-orange-200"
                  : "scale-100"
              }`}
            >
              <PulseCard
                image={card.image}
                title={card.title}
                isActive={activePulseCard === index}
              />
            </div>
          ))}
        </div>
      </div>
      <audio ref={audioRef} className="hidden">
        <source  type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Home;
