import { forwardRef, memo } from "react";
import OverallProgress from "./OverallProgress";
import { useGetAllDifficultyDataPerUserApiQuery, difficultyDataPerUser } from "./../../../store/submissions/get-all-difficulty-data-per-user"; // Update the path

export type SubmitStats = {
    allQuestionsCount: { difficulty: string; count: number }[];
    acSubmissionNum: { difficulty: string; count: number }[];
    rank: number;
};

export type Props = {
    userName: string;
    loadingComponent?: React.ReactNode;
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;
    };
    showUserName?: boolean;
}

const SolvedProblemsStats = forwardRef<HTMLDivElement, Props>(({
    userName,
    loadingComponent,
    theme = {
        primaryColor: "rgba(34,211,238,1)",
        secondaryColor: "rgba(209,213,219,1)",
        bgColor: "rgba(68,64,60,1)"
    },
    showUserName = true
}, ref) => {

    // Dummy data for demonstration
    const data: SubmitStats = {
        allQuestionsCount: [
            { difficulty: "Easy", count: 100 },
            { difficulty: "Medium", count: 50 },
            { difficulty: "Hard", count: 25 }
        ],
        acSubmissionNum: [
            { difficulty: "Easy", count: 70 },
            { difficulty: "Medium", count: 30 },
            { difficulty: "Hard", count: 15 }
        ],
        rank: 1 
    };

    const getColor = {
        "Easy": "bg-green-300",
        "Medium": "bg-amber-200",
        "Hard": "bg-red-300"
    } as Record<string, string>;

    return (
        <div
            id="solved_problems_stats_container"
            ref={ref}
            className="w-full flex flex-col items-center  rounded-2xl  shadow-md px-4 py-2 gap-2"
        >

            <div id="solved_problems_stats_progress_deails" className="w-full flex justify-between items-center">
                <OverallProgress
                    totalQuestions={data.allQuestionsCount.reduce((acc, cur) => acc + cur.count, 0)}
                    totalSolved={data.acSubmissionNum.reduce((acc, cur) => acc + cur.count, 0)}
                />

                <div id="linear_progress_container" className="w-full">
                    {
                        data.allQuestionsCount.map((difficulty, index) => {
                            const section = data.acSubmissionNum[index];
                            const total = difficulty.count!;
                            const solved = section.count!;
                            const percentage = (solved / total) * 100;

                            return (
                                <div id={`progress_bar_${difficulty.difficulty}`} key={difficulty.difficulty} className="progress_bar mt-3 first:mt-0 w-full">
                                    <div className="flex justify-between px-1">
                                        <span className="text-sm">{difficulty.difficulty}</span>
                                        <span className="w-[4.5rem] text-end">
                                            <span className="font-semibold text-sm">{section.count}</span>
                                            <span className="text-xs pb-2" >{" /" + difficulty.count}</span>
                                        </span>
                                    </div>
                                    <div className={`${getColor[difficulty.difficulty]} progress_label bg-opacity-20 w-full  rounded-full h-2 dark:bg-gray-700`}>
                                        <div style={{ width: `${percentage}%` }}>
                                            <div className={`${getColor[difficulty.difficulty]} animate-slide h-2 rounded-full dark:bg-blue-500`} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
})

const MemoizedSolvedProblemsStats = memo(SolvedProblemsStats);

export default MemoizedSolvedProblemsStats;
