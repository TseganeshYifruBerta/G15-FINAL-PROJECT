import React, { useMemo ,useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";

import Slider from "react-slick";
import Image from "next/image";
import Stars from "@/public/assets/Icon/stars.svg";
import ArrowBack from "@/public/assets/Icon/eva_arrow-back-fill.svg";
import ArrowNext from "@/public/assets/Icon/eva_arrow-next-fill.svg";

interface TestimoniProps {
  listTestimoni?: Array<{
    name: string;
    image: string;
    city: string;
    country: string;
    rating: string;
    testimoni: string;
  }>;
}

const Testimoni: React.FC<TestimoniProps> = ({
  listTestimoni = [
    {
      name: "Grading",
      image: "/assets/Premium.png",
      testimoni:
        "Delve into Data: Harness the Power of Comprehensive Statistical Analysis to Gain Deeper Insights, Uncover Trends, and Track Performance Metrics for Informed Decision-Making and Continuous Improvement",
    },
    {
      name: "Plagiarism",
      image: "/assets/Premium.png",

      testimoni:
        "Transform Your Operations and Boost Productivity with Our Automated Workflow Solutions, Allowing You to Streamline Processes, Eliminate Redundancy, and Focus on What Truly Matters.",
    },
    {
      name: "Code Execution",
      image: "/assets/Premium.png",

      testimoni:
        "Dive into Our Dynamic Forum Community, Where Enriching Discussions, Insightful Exchanges, and Collaborative Learning Opportunities Await, Empowering You to Engage, Learn, and Grow Together.",
    },
    {
      name: "Problem solving",
      image: "/assets/Premium.png",
      testimoni:
        "Dive into Our Dynamic Forum Community, Where Enriching Discussions, Insightful Exchanges, and Collaborative Learning Opportunities Await, Empowering You to Engage, Learn, and Grow Together.",
    },
  ],
}) => {
  const settings = {
    dots: true,
    customPaging: function (_i: number) {
      return (
        <a className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </a>
      );
    },
    dotsClass: "slick-dots w-max absolute mt-20  ",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef = useRef<Slider>(null); 
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <>
       <Slider
        {...settings}
        arrows={false}
        ref={sliderRef} // Pass the ref directly
        className="flex items-stretch justify-items-stretch"
      >
        {listTestimoni.map((listTestimonis, index) => (
          <motion.div   variants={scrollAnimation} className="px-3 flex items-stretch" key={index}>
            <div className="border-2 border-[#a4acfc] hover:border-[#7983FB] transition-all rounded-lg p-8 flex flex-col">
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
                <div className="flex order-2 xl:order-1">
                  <Image
                    src={listTestimonis.image}
                    height={50}
                    width={50}
                    alt="Icon People"
                  />
                  <div className="flex flex-col ml-5 text-left">
                    <p className="text-lg font-bold text-black-600 capitalize">
                      {listTestimonis.name}
                    </p>

                  </div>
                </div>
                <div className="flex flex-none items-center ml-auto order-1 xl:order-2">

                  <span className="flex ml-4">
                    <Stars className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <p className="mt-5 text-left">{listTestimonis.testimoni}.</p>
            </div>
          </motion.div>
        ))}
      </Slider>
      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-[#7983FB] border hover:bg-[#7983FB] hover:text-white-500 transition-all text-[#7983FB] cursor-pointer"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ArrowBack className="h-6 w-6 " />
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-[#7983FB] border hover:bg-[#7983FB] hover:text-white-500 transition-all text-[#7983FB] cursor-pointer"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ArrowNext className="h-6 w-6" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimoni;