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
  const { data: allstudents, isLoading, isError } = useGetAllStudentsQuery("");
  if (isLoading) {
    return <div>loading</div>;
  }
  // console.log(all)
  //   const { id, title, difficulty, description, example, createdAt, updatedAt } =
  //     allquestions;
  //   console.log(allquestions);
  console.log(allstudents);
  return (
    // <div className="flex w-full">
    //   <div className="w-full">
    //     <div className="min-h-screen bg-gray-100">
    //       <div className="flex justify-center">
    //         <div className="w-3/5 pb-6">
    //           <span className="font-bold text-2xl">
    //             List of All <span className="text-primary">Students</span>
    //           </span>
    //         </div>
    //       </div>

    //       <div>
    //         <div className="flex font-bold ml-10">
    //           <div className="flex rounded-md p-2 m-2 w-3/6">
    //             {/* <div className="w-1/5"><FaCode /></div> */}
    //             <div className="w-3/5 font-bold">{"Students Name"}</div>
    //             <div>{"Student ID"}</div>
    //             <div className="ml-6 ">{"Section"}</div>
    //             <div className="ml-6 ">{"Email"}</div>
    //           </div>
    //         </div>
    //         {allstudents.map((student: studentProps) => (
    //           <div key={student.id}>
    //             <StudentsListsCard
    //               id={student.id}
    //               name={student.name}
    //               userID={student.userID}
    //               email={student.email}
    //               section={student.section}
    //               createdAt={student.createdAt}
    //               updatedAt={student.updatedAt}
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="min-h-screen bg-gray-100 p-6 w-full">
    //   <div className="max-w-4xl mx-auto">
    //     <div className="text-2xl font-bold mb-4">
    //       List of All <span className="text-primary">Students</span>
    //     </div>
    //     {allstudents.map((student: studentProps) => (
    //       <StudentsListsCard
    //         key={student.id}
    //         id={student.id}
    //         name={student.name}
    //         userID={student.userID}
    //         email={student.email}
    //         section={student.section}
    //         createdAt={student.createdAt}
    //         updatedAt={student.updatedAt}
    //       />
    //     ))}
    //   </div>
    // </div>
    <div className="flex w-full">
      <div className="w-full">
        <div className="min-h-screen bg-gray-100">
          <div className="flex justify-center p-6">
            <div className="w-full max-w-md">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Search for students..."
                // value=""
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            {/* Render the list of students */}
            {allstudents.map((student: studentProps) => (
              <StudentsListsCard
                key={student.id}
                id={student.id}
                name={student.name}
                userID={student.userID}
                email={student.email}
                section={student.section}
                createdAt={student.createdAt}
                updatedAt={student.updatedAt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
