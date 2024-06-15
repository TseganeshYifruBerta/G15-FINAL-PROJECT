import React, { useMemo } from "react";
import Image from "next/image";
import Testimoni from "@/components/Testimoni";
import ButtonPrimary from "@/components/misc/ButtonPrimary";
import LogoVPN from "@/public/assets/Icon/checklist.svg";
import ButtonOutline from "@/components/misc/ButtonOutline";
import Maps from "@/public/assets/HugeGlobal.svg";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";
import SignInSide from "@/pages/signin/indexx";

const Pricing = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
    className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
    id="pricing"
  >
    <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
      <div className="flex flex-col w-full">
        <ScrollAnimationWrapper>
          <motion.h3 variants={scrollAnimation} className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed">
  Level up your education phase a <span className="text-shadow-blue">step head.</span>
</motion.h3>

          <motion.p
            variants={scrollAnimation}
            className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center"
          >
            Elevate Your Learning Journey: Discover the Next Level of Education with Enhanced Features
          </motion.p>
        </ScrollAnimationWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-6 py-8 px-6 sm:px-0">
  <ScrollAnimationWrapper className="flex ">
    <motion.div
      variants={scrollAnimation}
      className="flex flex-col border-2 border-[#a4acfc] rounded-xl py-4"
      whileHover={{
        opacity: 1,
        scale: 1.1,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <p className="text-lg text-black-600 font-medium capitalize px-4">
        Wide range pool of problems
      </p>
      <span className="px-4 mb-2">Wide pool of problems waiting for you.</span>
      <div className="flex justify-center p-4"> {/* Adjusted for centering and larger image */}
        <Image
          src="/assets/listquestion.jpg"
          width={504} // Adjusted image size
          height={294} // Adjusted image size
          alt="Free Plan"
        />
      </div>

      <ul className="flex flex-col list-inside items-start justify-start text-left text-black-500 flex-grow px-4">
        <li className="relative check custom-list my-2 flex gap-2">
          <LogoVPN className="h-6 w-auto " />
          Works on All Devices
        </li>
      </ul>
    </motion.div>
  </ScrollAnimationWrapper>
  <ScrollAnimationWrapper className="flex ">
    <motion.div
      variants={scrollAnimation}
      className="flex flex-col border-2 border-[#a4acfc] rounded-xl py-4"
      whileHover={{
        opacity: 1,
        scale: 1.1,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <p className="text-lg text-black-600 font-medium capitalize px-4">
        Wide range pool of problems
      </p>
      <span className="px-4 mb-2">Wide pool of problems waiting for you.</span>
      <div className="flex justify-center p-4"> {/* Adjusted for centering and larger image */}
        <Image
          src="/assets/listquestion.jpg"
          width={504} // Adjusted image size
          height={294} // Adjusted image size
          alt="Free Plan"
        />
      </div>

      <ul className="flex flex-col list-inside items-start justify-start text-left text-black-500 flex-grow px-4">
        <li className="relative check custom-list my-2 flex gap-2">
          <LogoVPN className="h-6 w-auto " />
          Works on All Devices
        </li>
      </ul>
    </motion.div>
  </ScrollAnimationWrapper>


  <ScrollAnimationWrapper className="flex ">
    <motion.div
      variants={scrollAnimation}
      className="flex flex-col border-2 border-[#a4acfc] rounded-xl py-4"
      whileHover={{
        opacity: 1,
        scale: 1.1,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <p className="text-lg text-black-600 font-medium capitalize px-4">
        Wide range pool of problems
      </p>
      <span className="px-4 mb-2">Wide pool of problems waiting for you.</span>
      <div className="flex justify-center p-4"> {/* Adjusted for centering and larger image */}
        <Image
          src="/assets/listquestion.jpg"
          width={504} // Adjusted image size
          height={294} // Adjusted image size
          alt="Free Plan"
        />
      </div>

      <ul className="flex flex-col list-inside items-start justify-start text-left text-black-500 flex-grow px-4">
        <li className="relative check custom-list my-2 flex gap-2">
          <LogoVPN className="h-6 w-auto " />
          Works on All Devices
        </li>
      </ul>
    </motion.div>
  </ScrollAnimationWrapper>
  <ScrollAnimationWrapper className="flex ">
    <motion.div
      variants={scrollAnimation}
      className="flex flex-col border-2 border-[#a4acfc] rounded-xl py-4"
      whileHover={{
        opacity: 1,
        scale: 1.1,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <p className="text-lg text-black-600 font-medium capitalize px-4">
        Wide range pool of problems
      </p>
      <span className="px-4 mb-2">Wide pool of problems waiting for you.</span>
      <div className="flex justify-center p-4"> {/* Adjusted for centering and larger image */}
        <Image
          src="/assets/listquestion.jpg"
          width={504} // Adjusted image size
          height={294} // Adjusted image size
          alt="Free Plan"
        />
      </div>

      <ul className="flex flex-col list-inside items-start justify-start text-left text-black-500 flex-grow px-4">
        <li className="relative check custom-list my-2 flex gap-2">
          <LogoVPN className="h-6 w-auto " />
          Works on All Devices
        </li>
      </ul>
    </motion.div>
  </ScrollAnimationWrapper>
        </div>
      </div>
      
      <div className="flex flex-col w-full my-16" id="testimoni">
        <ScrollAnimationWrapper>
          <motion.h3
            variants={scrollAnimation}
            className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
           More Features{" "}
          </motion.h3>
          <motion.p
            variants={scrollAnimation}
            className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12"
          >
            Continuously Enhancing Your Experience: Our Commitment to Innovation Means We are Hard at Work Developing and Integrating a Host of Exciting New Features, Stay Tuned for Even More Ways to Elevate Your Journey.
          </motion.p>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper className="w-full flex flex-col py-12">
         
            <Testimoni />
         
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper className="relative w-full mt-16">
          <motion.div variants={scrollAnimation} custom={{duration: 3}}>
            <div className="absolute rounded-xl  py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-white-500">
              <div className="flex flex-col text-left w-10/12 sm:w-7/12 lg:w-5/12 mb-6 sm:mb-0">
                <h5 className="text-black-600 text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium">
                  Subscribe Now for <br /> to experience interesting Features!
                </h5>
                <p>Let us subscribe with us and find the fun.</p>
              </div>
              <SignInSide/>
            </div>
            <div
              className="absolute bg-black-600 opacity-5 w-11/12 rounded-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
              style={{ filter: "blur(114px)" }}
              ></div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  </div>
  );
};

export default Pricing;
