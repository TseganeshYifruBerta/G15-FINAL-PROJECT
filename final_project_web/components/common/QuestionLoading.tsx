const QuestionLoading: React.FC = () => {
  return (
    <div className="flex justify-center bg-slate-200">
      <div className=" bg-gray-200 rounded-md p-2 m-2 w-full">
        <div className="mx-1 font-bold">{}</div>

        <div className="w-2/6 font-bold flex justify-start">
          {}
        </div>
        <div ></div>
        <div ></div>
        <div className="w-1/6 flex mx-1">{}</div>
      </div>
    </div>
  );
};

export default QuestionLoading;
