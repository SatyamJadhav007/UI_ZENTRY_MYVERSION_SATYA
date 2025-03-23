import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
const About = () => {
  const AizenBlockRef = useRef(null);
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        // +800 pixels from the start
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        toggleActions: "play none none reverse",
      },
    });
    clipAnimation
      .to(".mask-clip-path", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      })
      .to(
        ".about-image__hidden",
        {
          opacity: 1,
        },
        ">" //This > indicates that the animation will happen only in linear fastion
      );
  });
  return (
    <div id="about" className="min-h-screen w-screen">
      {/* This div has the contents of the about page and not the animated image */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* This the First Text of the Second section (small) */}
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />
        {/* This is the text after the animation title This Div is absolutely positioned in the About card */}
        <div className="about-subtext">
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      <div ref={AizenBlockRef} className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/Vecho_Mundo.png"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
        <div className=" about-image__hidden sm:opacity-0">
          <img
            src="img/Friend.png"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default About;
