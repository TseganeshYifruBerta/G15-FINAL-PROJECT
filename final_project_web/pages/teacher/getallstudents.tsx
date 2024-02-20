import NavigationTeacher from "@/components/layout/NavigationTeacher";
import QuestionCard from "@/components/questions/QuestionCard";
import QuestionCardStudent from "@/components/questions/QuestionCardStudent";
import StudentsListsCard from "@/components/student/StudentsListsCard";
import { useGetAllStudentsQuery } from "@/store/teacherprofile/get-all-students";
export interface studentProps {
  id: number;
  name: string;
  userID: string;
  email: string;
  section: string;
  createdAt: string;
  updatedAt: string;
}
function Students() {
  const {
    data: allstudents,
    isLoading,
    isError,
  } = useGetAllStudentsQuery("");
  if (isLoading) {
    return <div>loading</div>;
  }
  // console.log(all)
//   const { id, title, difficulty, description, example, createdAt, updatedAt } =
//     allquestions;
//   console.log(allquestions);
console.log(allstudents)
  return (
    <div className="flex">
      <div className="w-2/6">
        <NavigationTeacher />
      </div>
      <div className="w-4/6">
        <div className="-ml-60 min-h-screen bg-gray-100">
          <div className="flex justify-center">
            <div className="w-3/5 pb-6">
              <span className="font-bold text-2xl">
                List of All <span className="text-primary">Students</span>
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-center w-full font-bold">
              <div className="flex rounded-md p-2 m-2 w-3/5">
                {/* <div className="w-1/5"><FaCode /></div> */}
                <div className="w-3/5 font-bold">
                  {"Students Name"}
                </div>
                <div>{"Student ID"}</div>
                <div className="ml-6 ">{"Section"}</div>
                <div className="ml-6 ">{"Email"}</div>
              </div>
            </div>
            {allstudents.map((student: studentProps) => (
              <div key={student.id}>
                {/* <QuestionCardStudent
              id={question.id}
              title={question.title}
              difficulty={question.difficulty}
              description={question.description}
              example={question.example}
              createdAt={question.createdAt}
              updatedAt={question.updatedAt}
            /> */}
                <StudentsListsCard
                  id={student.id}
                  name={student.name}
                  userID={student.userID}
                  email={student.email}
                  section={student.section}
                  createdAt={student.createdAt}
                  updatedAt={student.updatedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
