import QuestionSet from "@/components/questions/QuestionSet";
import QuestionSetNav from "@/components/questions/QuestionSetNav";
import { useRouter } from "next/router";
const questions = [
  {
    id: 1,
    val: (
      <QuestionSetNav
        number={"1"}
        title={"Range Sum"}
        difficulty={"Medium"}
        tag={"Array"}
      />
    ),
  },
  {
    id: 2,
    val: (
      <QuestionSetNav
        number={"1"}
        title={"Range Sum"}
        difficulty={"Medium"}
        tag={"Array"}
      />
    ),
  },
  {
    id: 3,
    val: (
      <QuestionSetNav
        number={"1"}
        title={"Range Sum"}
        difficulty={"Medium"}
        tag={"Array"}
      />
    ),
  },
  {
    id: 4,
    val: (
      <QuestionSetNav
        number={"1"}
        title={"Range Sum"}
        difficulty={"Medium"}
        tag={"Array"}
      />
    ),
  },
  {
    id: 5,
    val: (
      <QuestionSetNav
        number={"1"}
        title={"Range Sum"}
        difficulty={"Medium"}
        tag={"Array"}
      />
    ),
  },
  {
    id: 6,
    val: (
      <QuestionSetNav
        number={"1"}
        title={"Range Sum"}
        difficulty={"Medium"}
        tag={"Array"}
      />
    ),
  },
  {
    id: 7,
    val: (
      <QuestionSetNav
        number={"1"}
        title={"Range Sum"}
        difficulty={"Medium"}
        tag={"Array"}
      />
    ),
  },
];
function Questions() {
       const router = useRouter();

    const handleUploadButton = () => {
setTimeout(() => {
    router.push("/questions/uploadquestion");
}, 400);
    }
    return (
      <div>
        <div>
          <button
            className="border-primary border-2 m-4 p-2 rounded-md"
            onClick={handleUploadButton}
          >
            Upload Questions
          </button>
        </div>
        <div className="border-2 bg-primary p-2 m-2 flex flex-wrap justify-between">
          <div>No</div>
          <div>Title</div>
          <div>difficulty</div>
          <div>tag</div>
        </div>
        <div>
          {questions.map((question) => (
            <div key={question.id}>{question.val}</div>
          ))}
        </div>
      </div>
    );
}
export default Questions