import { forwardRef, memo } from "react";
import OverallProgress from "./OverallProgress";
import { useGetAllDifficultyDataPerUserApiQuery,  difficultyDataPerUser} from "../../../store/submissions/get-all-difficulty-data-per-user";
import { useCountAcceptedSubmissionsperDifficultyApiQuery } from "../../../store/submissions/count-Accepted-submissions-per-Difficulty";
import Loading from "./../../common/Loading";
import React from "react";

export type SubmitStats = {
    allQuestionsCount: { difficulty: string; count: number }[];
    acSubmissionNum: { difficulty: string; count: number }[];
};

export type Props = {
};

const SolvedProblemsStats = forwardRef<HTMLDivElement, Props>(() => {
    const { data: difficultyData, isLoading: difficultyLoading, isError: difficultyError } = useGetAllDifficultyDataPerUserApiQuery("");
    const { data: acceptedSubmissionData, isLoading: submissionLoading, isError: submissionError } = useCountAcceptedSubmissionsperDifficultyApiQuery("");
    if (difficultyLoading || submissionLoading) return <Loading />;
    if (difficultyError || submissionError) return <div>Error loading data</div>;
    const transformedData: any = {
        allQuestionsCount :  [
            { difficulty: "Easy", count: difficultyData?.easyQuestionCount },
            { difficulty: "Medium", count: difficultyData?.mediumQuestionCount },
            { difficulty: "Hard", count: difficultyData?.hardQuestionCount }
        ],
        acSubmissionNum: [
            { difficulty: "Easy", count: acceptedSubmissionData?.easyCount },
            { difficulty: "Medium", count: acceptedSubmissionData?.mediumCount },
            { difficulty: "Hard", count: acceptedSubmissionData?.hardCount }
        ],
    };


    const getColor = {
        "Easy": "bg-green-300",
        "Medium": "bg-amber-200",
        "Hard": "bg-red-300"
    } as Record<string, string>;

    return (
        <div
            id="solved_problems_stats_container"
            className="w-full flex flex-col items-center rounded-lg shadow-sm px-4 py-2 gap-2 bg-white"
        >
            <div id="solved_problems_stats_progress_deails" className="w-full flex justify-between items-center">
                <OverallProgress
                    totalQuestions={difficultyData?.easyQuestionCount + difficultyData?.mediumQuestionCount + difficultyData?.hardQuestionCount}
                    totalSolved={
                        (acceptedSubmissionData?.easyCount) +
                        (acceptedSubmissionData?.mediumCount) +
                        (acceptedSubmissionData?.hardCount)
                    }
                />
                <div id="linear_progress_container" className="w-full">
                    {transformedData.allQuestionsCount.map((difficulty:any, index:any) => {
                        const section = transformedData.acSubmissionNum[index];
                        const total = difficulty.count;
                        const solved = section.count;
                        const percentage = total === 0 ? 0 : (solved / total) * 100;

                        return (
                            <div id={`progress_bar_${difficulty.difficulty}`} key={difficulty.difficulty} className="progress_bar mt-3 first:mt-0 w-full">
                                <div className="flex justify-between px-1">
                                    <span className="text-sm">{difficulty.difficulty}</span>
                                    <span className="w-[4.5rem] text-end">
                                        <span className="font-semibold text-sm">{solved}</span>
                                        <span className="text-xs pb-2">{" /" + total}</span>
                                    </span>
                                </div>
                                <div className={`${getColor[difficulty.difficulty]} progress_label bg-opacity-20 w-full rounded-full h-2 dark:bg-gray-700`}>
                                    <div style={{ width: `${percentage}%` }}>
                                        <div className={`${getColor[difficulty.difficulty]} animate-slide h-2 rounded-full`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

SolvedProblemsStats.displayName = "SolvedProblemsStats";

const MemoizedSolvedProblemsStats = memo(SolvedProblemsStats);

export default MemoizedSolvedProblemsStats;
