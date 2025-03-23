import { useState, useEffect } from "react";
import { useRef } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
// The Users actions determine the state of the web page
// Registered the plugin (important step)
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  // CHANGER ELEMENTS IN THE HERO PAGE ARE THESE
  // WHERE CHANGE IN THERE VALUES LEAD TO  CHANGE OF THE WEBPAGE
  // THESE INCLUDE:CURRENTINDEX,{CHECKING FOR THE BUTTON IS CLICKED OR NOT{WHICH INDEED CHANGES THE VIDEO}}
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const TotalVideos = 3;
  // this is not necessary as it only plays the current video while the animation
  const nextVideoRef = useRef(null);
  //FLOW OF THE STATES::
  // isLoading =>(Baddal) by the loadedVideos()
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  // MODDED SO TO ACHIEVE A LOOP BEHAVIOUR
  const upcomingVideoIndex = (currentIndex % TotalVideos) + 1;
  const handleMiniVdClick = () => {
    // 2 STATES ARE UPDATED BY THIS FUNCTION
    setHasClicked(true);
    // BY clicking the button there is a change in the currentIndex
    // Which is responsible for also changing the videoSrc thus loading a different video
    setCurrentIndex(upcomingVideoIndex);
  };
  useEffect(() => {
    // IT'S LIKE KI WHEN ALL THE THREE VIDEOS WILL BE LOADED (THE NEXT AND THE CURRENT ONE) THE VALUE OF THE
    // LOADED VIDEOS WILL CHANGE AND THE LOADING SPINNER WILL DISAPPEAR
    console.log(loadedVideos);
    if (loadedVideos === TotalVideos - 1) {
      setisLoading(false);
    }
  }, [loadedVideos]);
  useGSAP(
    () => {
      if (hasClicked) {
        // Ha tho second video ahe code madye jho invisible ahe
        gsap.set("#next-video", { visibility: "visible" });
        // Click varti tho parent cche width ani height jheun pasaratho
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        // Center wala video ahe ha
        gsap.from("#current-video", {
          transformOrigin: "center center",
          // By using scale 0 the button will start from absolute nothing (in reverse  as from is used)
          // So it will go big to absolute zero
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );
  useGSAP(() => {
    //Targeting the frame and setting it's default state to the result that we want.....
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%,72% 0%, 90% 90%,0% 100%)",
      borderRadius: "0 0 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%,100% 0%, 100% 100%,0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        //Trigger the  frame to it's normal condition when We are at the center of the frame and the end it at bottom of the page
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });
  const getVidSrc = (index) => `videos/hero-${index}.mp4`;
  console.log(isLoading);
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* If the page is not loaded then show the circular loading screen to the user */}
      {isLoading && (
        //As the z-index of this page is high then it will appear over the hero
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* This is the video of divs <Main-No-Name-Dabba> =>{<Center walya video wala dabba>} */}
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            {/* THIS IS THE DIV WHICH IS CENTERED AND IS INVISIBLE TILL NOT HOVERED */}
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 "
            >
              {/* THIS IS THE CENTER WALA VIDEO ON THE PAGE */}
              <video
                ref={nextVideoRef}
                //Giving the VideoIndex(circular wala to the getVidSrc Funtion to get the link of the video to play it here)
                src={getVidSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                //   SO the onLoadedData's event is fired when the first frame of the video is loaded on the page
                onLoadedData={handleVideoLoad}
              ></video>
            </div>
          </div>
          {/* THERE ARE THREE VIDEOS AND THE SECOND ONE IS INVISIBLE (IT IS USED FOR ZOOM ANIMATION)*/}
          <video
            ref={nextVideoRef}
            src={getVidSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />
          {/* Background-Video */}
          <video
            src={getVidSrc(currentIndex === TotalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        {/* THE DIV WITH NO CLASSNAME ENDS HERE */}
        {/* MOVING THE GAMING FONT TO THE BOTTOM RIGHT CORNER OF THE WEBPAGE */}
        {/* This is the overlapping text of the bottom-right font */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>
        {/* MOVING THE "Redefine" and some data to the top left side of the webpage */}
        <div className="absolute left-0 top-0 z-40 size-full">
          {/* SM is used for MOBILE/SMALLER devices interface manipulation of the website */}
          <div className="mt-24 px-5 sm:px-10 ">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy{" "}
            </p>
            <Button
              id="watch-trailer"
              title="COUR-4"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      {/* This is the black-text behind the video frame to make it appear like the text is changing  */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
