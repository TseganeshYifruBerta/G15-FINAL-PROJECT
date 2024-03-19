import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "@/utils/getScrollAnimation";
import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";
import LogoVPN from "@/public/assets/Icon/checklist.svg";

const features = [
  "Powerful online learning.",
  "Exercise without location boundary.",
  "Supercharged learning platform",
  "No specific time limits."
];

const Feature: React.FC = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 py-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
          <Image
              src="/assets/Illustration2.png"
              alt="VPN Illustration"
              quality={100}
              height={414} // Consider adjusting or removing these if relying on automatic sizing
              width={508}
         
              style={{ objectFit: 'cover' }} // Optional: Adjust object-fit as needed
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper className="">
          <motion.div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
              We Provide Many Features You Can Use
            </h3>
            <p className="my-2 text-black-500">
              You can explore the features that we provide with fun and have their
              own functions each feature.
            </p>
            <ul className="text-black-500 self-start   list-inside ml-8">
              {features.map((feature, index) => (
                <motion.li
                  className="relative circle-check custom-list gap-2"
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  key={feature}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2
                    }
                  }}
                >
                  <motion.div className="flex flex-row gap-2">
                  <LogoVPN className="h-6 w-auto " />
                  {feature}
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Feature;
