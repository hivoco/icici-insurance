import AgeCard from "@/components/AgeCard";
import AudioControls from "@/components/audio-controls-component-animated";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/components/Login";
import SmallCard from "@/components/SmallCard";
import Button from "@/element/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

function Home() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const ageGroups = [
    {
      year: "20-30 Years",
      heading: "Young Adults",
      subtext1:
        "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
      subtext2:
        "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
      href: "#",
    },
    {
      year: "35-45 Years",
      heading: "Mid-Career",
      subtext1:
        "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
      subtext2:
        "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
      href: "#",
    },
    {
      year: "45-55 Years",
      heading: "Pre-Retirement",
      subtext1:
        "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
      subtext2:
        "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
      href: "/home",
    },
    {
      year: "55+ Years",
      heading: "Senior Citizens",
      subtext1:
        "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
      subtext2:
        "Foram ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate leo et velit mattis, ac dapibus odio mattis.",
      href: "#",
    },
  ];

  const audioRef = useRef(null);
  const secondAudioRef = useRef(null);
  const [isOpenLogin, setIsOpenLogin] = useState(true);
  const [firstAudioLink, setFirstAudioLink] = useState(null);
  const [secondAudioLink, setSecondAudioLink] = useState(
    "https://videoforinteractivedemons.s3.ap-south-1.amazonaws.com/bank_audio/introline.mp3"
  );
  const [showController, setShowController] = useState(true);
  const [isPlayingFirst, setIsPlayingFirst] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
  return (
    <>
      {isOpenLogin ? (
        <Login onLoginComplete={handleLoginComplete} />
      ) : (
        <div className="max-w-md mx-auto  text-white text-center mulish-font bg-[#EEEEE2]">
          <Header />
          <div
            style={{ height: "calc(100vh - 170px)" }}
            className="relative bg-[url('/image/home-bg_1.png')] bg-cover bg-center rounded-b-3xl px-4 py-11 pb-4 "
          >
            <h3 className="font-bold text-4xl  mx-auto w-fit  tracking-normal">
              Secure your future <br /> with the right
              <br /> retirement plan
            </h3>

            <div className="absolute bottom-4  left-1/2 transform -translate-x-1/2">
              <Button title={"Read more"} />
            </div>
          </div>
          <div className="px-8 py-16 flex mx-auto flex-col gap-8">
            {ageGroups.map((card, index) => (
              <AgeCard
                key={index}
                onClick={() => handleNavigation(card.href)}
                year={card.year}
                heading={card.heading}
                subtext1={card.subtext1}
                subtext2={card.subtext2}
              />
            ))}
          </div>

          <div className="px-8  flex mx-auto flex-col gap-8 ">
            <SmallCard
              image={"bulb.svg"}
              p1={"₹2.9 lakh crore"}
              p2={"Assets Under Management"}
              p3={" as on March 31, 2024"}
              first={true}
            />
            <SmallCard
              image={"star.svg"}
              p1={"₹2.9 lakh crore"}
              p2={"Assets Under Management"}
              p3={" as on March 31, 2024"}
            />
            <SmallCard
              image={"pie.svg"}
              p1={"₹2.9 lakh crore"}
              p2={"Assets Under Management"}
              p3={" as on March 31, 2024"}
            />
            <SmallCard
              image={"umbrella.svg"}
              p1={"₹2.9 lakh crore"}
              p2={"Assets Under Management"}
              p3={" as on March 31, 2024"}
            />
          </div>
          {/* <button onClick={() => handleManualPlay()}>hello</button> */}
          <div className=" pt-20">
            <Footer />
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
    </>
  );
}

export default Home;
