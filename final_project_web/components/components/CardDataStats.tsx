import React, { ReactNode } from "react";
import Image from "next/image";
interface CardDataStatsProps {
  title: string;
  total: any;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  icon: string;
  bg: string;
  text:string
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
  icon,
  bg,
  text
}) => {
  return (
    <div
      style={{
        backgroundImage: `url('/images/${bg}.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.8,
      }}
      className="rounded-xl border bg-primary bg-opacity-5 px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark h-[150px] "
    >
      {/* <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"> */}
      <div>{children}</div>

      <div className="flex">
        <div className="flex items-end justify-between w-1/2">
          <div>
            <span
              className={`text-lg font-bold ${
                title == "Easy" ? "text-green-500" : ""
              } ${title == "Medium" ? "text-yellow-700" : ""} ${
                title == "Hard" ? "text-red-500" : ""
              }`}
            >
              {title}
            </span>
            <h4 className="text-xl text-white dark:text-white">{total}</h4>
          </div>

          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              levelUp && "text-meta-3"
            } ${levelDown && "text-meta-5"} `}
          >
            {rate}

            {levelUp && (
              <svg
                className="fill-meta-3"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                  fill=""
                />
              </svg>
            )}
            {levelDown && (
              <svg
                className="fill-meta-5"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                  fill=""
                />
              </svg>
            )}
          </span>
        </div>

        <div className="w-1/2 justify-end flex">
          <Image src={`/images/${icon}.png`} alt={""} width={60} height={60} />
        </div>
      </div>
      <div className="text-white text-sm text-opacity-80 w-4/5">
        Perfect for beginners or those looking for a
        quick refresher.
      </div>
    </div>
  );
};

export default CardDataStats;
