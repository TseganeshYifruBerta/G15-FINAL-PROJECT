import React, { forwardRef, memo, useRef, useState, useEffect } from "react";
import { useGetCountCodeSubmissionsForLastMonthQuery } from "./../../../store/submissions/get-all-last-month-submissions-by-id";

export type Props = {
    userName: string;
    loadingComponent?: JSX.Element;
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;
    };
    showUserName?: boolean;
};

const Block = ({
    count,
    width,
    height,
}: {
    count: number;
    width: number;
    height: number;
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{
                backgroundColor: `rgba(121, 131, 251, ${count})`,
                width: `${width}px`,
                height: `${height}px`,
                margin: "1px",
                position: "relative",
            }}
            className={`rounded-sm border border-primary border-opacity-80`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {hovered && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "4px",
                        borderRadius: "4px",
                    }}
                >
                    <div className="flex flex-row gap-2">
                        <div>{count}</div>
                        <div>submissions</div>
                    </div>
                </div>
            )}
        </div>
    );
};

const HeatMap = forwardRef<HTMLDivElement, Props>(
    (
        {
            userName,
            loadingComponent,
            theme = {
                primaryColor: "rgba(34,211,238,1)",
                secondaryColor: "rgba(209,213,219,1)",
                bgColor: "rgba(68,64,60,1)",
            },
            showUserName = false,
        },
        ref
    ) => {
        const [screenWidth, setScreenWidth] = useState(() => {
            return typeof window !== "undefined" ? window.innerWidth : 0;
        });
        const divRef = useRef<HTMLDivElement>(null);
        const { data, error, isLoading } = useGetCountCodeSubmissionsForLastMonthQuery();

        useEffect(() => {
            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            };

            if (typeof window !== "undefined") {
                window.addEventListener("resize", handleResize);
            }

            return () => {
                if (typeof window !== "undefined") {
                    window.removeEventListener("resize", handleResize);
                }
            };
        }, []);

        if (isLoading) return <>{loadingComponent}</>;

        if (error) return <>Error: Error</>;

        const totalSubmissionCount = data ? data.reduce((total, { count }) => total + count, 0) : 0;
        const blockWidth = screenWidth < 780 ? 20 : 50; // Adjusted block width
        const totalColumns = Math.max(Math.ceil((data?.length || 0) / 5), 1);
        const blockHeight = screenWidth < 780 ? (screenWidth - 60) / 30 : (screenWidth - 60) / 20; // Adjusted block height
        const columns: Array<Array<{ count: number; date: string }>> = Array.from({ length: totalColumns }, (_, index) =>
            data?.slice(index * 5, index * 5 + 5) || []
        );

        return (
            <div
                ref={divRef}
                className={`w-full bg-white shadow-md gap-1 rounded-lg p-4 flex flex-col items-center justify-center gap-4 ${
                    !data || data.length === 0 ? "border-2 border-black" : ""
                }`}
            >
                <h2 id="heat_map_title" className="flex text-black justify-between font-medium w-full">
                    <span className="text-sm">{totalSubmissionCount} Submissions</span>
                    {showUserName && <span>{userName}</span>}
                </h2>
                <div id="heat_map" className="w-full flex flex-row items-center justify-center">
                    {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className="flex flex-col">
                            {column.map((element, rowIndex) => (
                                <Block
                                    width={blockWidth/ 3}
                                    height={blockHeight / 3}
                                    key={rowIndex}
                                    count={element.count}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);

const MemoizedHeatMap = memo(HeatMap);

export default MemoizedHeatMap;
