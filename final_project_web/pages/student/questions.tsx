import StudentQuestionTable from "@/components/components/Tables/StudentQuestionTable";

export default function Questions() {
  return (
    <div className="dark:bg-boxdark h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <StudentQuestionTable />
          </div>
        </div>
      </div>
    </div>
  );
}
