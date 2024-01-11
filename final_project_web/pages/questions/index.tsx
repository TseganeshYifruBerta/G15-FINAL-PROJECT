import QuestionSet from "@/components/questions/QuestionSet";
import QuestionSetNav from "@/components/questions/QuestionSetNav";
import { useRouter } from "next/router";
const questions = [
  <QuestionSetNav
    number={"1"}
    title={"Range Sum"}
    difficulty={"Medium"}
    tag={"Array"}
  />,
  <QuestionSetNav
    number={"2"}
    title={"Fizz Buzz"}
    difficulty={"Easy"}
    tag={"Array"}
  />,
  <QuestionSetNav
    number={"3"}
    title={"Two Sum"}
    difficulty={"Hard"}
    tag={"Array"}
  />,
  <QuestionSetNav
    number={"4"}
    title={"Range Sum"}
    difficulty={"Medium"}
    tag={"Array"}
  />,
  <QuestionSetNav
    number={"5"}
    title={"Fizz Buzz"}
    difficulty={"Easy"}
    tag={"Array"}
  />,
  <QuestionSetNav
    number={"6"}
    title={"Two Sum"}
    difficulty={"Hard"}
    tag={"Array"}
  />,
  <QuestionSetNav
    number={"7"}
    title={"Range Sum"}
    difficulty={"Medium"}
    tag={"Array"}
  />,
  <QuestionSetNav
    number={"8"}
    title={"Fizz Buzz"}
    difficulty={"Easy"}
    tag={"Array"}
  />,
  <QuestionSetNav
    number={"9"}
    title={"Two Sum"}
    difficulty={"Hard"}
    tag={"Array"}
  />,
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
        <div className="border-2 bg-primary p-4 m-4 flex flex-wrap justify-between">
          <div>No</div>
          <div>Title</div>
          <div>difficulty</div>
          <div>tag</div>
        </div>
        <div>
          {questions.map((question) => (
            <div key={question.key}>{question}</div>
          ))}
        </div>
      </div>
    );
}
export default Questions