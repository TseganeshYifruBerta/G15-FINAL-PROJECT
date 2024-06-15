import React, { useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "@/components/misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "@/utils/getScrollAnimation";
import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";
import SignInSide from "@/pages/signin/indexx";


interface ListUser {
  name: string;
  number: string;
  icon: string;
}

interface HeroProps {
  listUser?: ListUser[];
}

const Hero: React.FC<HeroProps> = ({
  listUser = [
    {
      name: "Users",
      number: "390",
      icon: "/assets/Icon/heroicons_sm-user.svg",
    },
    {
      name: "Institutions",
      number: "1",
      icon: "/assets/Icon/gridicons_location.svg",
    },
    {
      name: "Problems",
      number: "50",
      icon: "/assets/Icon/bx_bxs-server.svg",
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="max-w-screen-xl mt-32 px-8 xl:px-16 mx-auto" id="about">
      {/* Make sure to include className prop here */}
      <ScrollAnimationWrapper className="">
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 ml-10 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}
        >
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
             No more jumbling in sheets. 🎉 focus on your code,
              we will keep track of everything. 
                          </h1>
            <p className="text-black-500 mt-4 mb-6">
            Empower Collaboration and Efficiency: Experience Seamless Educational Endeavors with the  ሁሉ <span className="text-[#7983FB]">Code</span>, Your Centralized Solution for Streamlining Organization, Collaboration, and Knowledge Sharing.
            </p>
            <SignInSide/>
          </div>
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
            <Image
                src="/assets/Illustration1.png"
                alt="VPN Illustration"
                quality={100}
                width={612}
                height={383}

                style={{ objectFit: "cover" }} // Adjust this as necessary
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div className="relative w-full flex">
        {/* Make sure to include className prop here as well */}
        <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
          {listUser.map((listUsers, index) => (
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-[#d4d7fa] w-12 h-12 mr-6 rounded-full">
                  <Image src={listUsers.icon} className="h-6 w-6" alt="picture" width={52}
                height={53} />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">
                    {listUsers.number}+
                  </p>
                  <p className="text-lg text-black-500">{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollAnimationWrapper>
        <div
          className="absolute bg-black-600 opacity-5 w-11/12 rounded-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;