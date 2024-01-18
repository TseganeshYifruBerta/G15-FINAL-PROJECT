import Link from "next/link";

interface QuestionSetProps {
    number: string,
    title: string,
    difficulty: string,
    tag: string
}
const QuestionSetNav: React.FC<QuestionSetProps> = ({number, title, difficulty, tag}) => {
    return (
      <Link href={"/question/id"}>
        <div className="border-2  p-2 m-2 flex flex-wrap justify-between">
          <div>{number}</div>
          <div>{title}</div>
          <div>{difficulty}</div>
          <div>{tag}</div>
        </div>
      </Link>
    );
}

export default QuestionSetNav