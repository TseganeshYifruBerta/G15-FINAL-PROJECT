import { useGetCountCodeSubmissionsForLastMonthQuery } from '@/store/submissions/get-all-last-month-submissions-by-id';
import { useGetAllDifficultyDataPerUserApiQuery } from "@/store/submissions/get-all-difficulty-data-per-user";
import { useCountAcceptedSubmissionsperDifficultyApiQuery } from "@/store/submissions/count-Accepted-submissions-per-Difficulty";
import { useGetAllSubmissionsByIdQuery } from '@/store/submissions/get-all-submissions-by-id';
import { useGetUpcomingExamsQuery } from '@/store/exam/upcoming-exam-api';

const useDashboardData = () => {
    const { data: consistencyChart, error: consistencyError, isLoading: consistencyLoading } = useGetCountCodeSubmissionsForLastMonthQuery();
    const { data: difficultyData, error: difficultyError, isLoading: difficultyLoading } = useGetAllDifficultyDataPerUserApiQuery("");
    const { data: acceptedSubmissionData, error: submissionError, isLoading: submissionLoading } = useCountAcceptedSubmissionsperDifficultyApiQuery("");
    const { data: submissions, error: submissionsError, isLoading: submissionsLoading } = useGetAllSubmissionsByIdQuery();
    const { data: upcomingExams, error: upcomingExamsError, isLoading: upcomingExamsLoading } = useGetUpcomingExamsQuery();

    const isLoading = consistencyLoading || difficultyLoading || submissionLoading || submissionsLoading || upcomingExamsLoading;
    const error = consistencyError || difficultyError || submissionError || submissionsError || upcomingExamsError;

    return {
        consistencyChart,
        difficultyData,
        acceptedSubmissionData,
        submissions,
        upcomingExams,
        isLoading,
        error
    };
};

export default useDashboardData;
