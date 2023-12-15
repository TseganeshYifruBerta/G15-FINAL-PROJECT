const QuestionSet: React.FC = () => {
  return (
    <div className="m-6 p-4 bg-gray-200">
      <div>
        <h1 className="text-3xl font-bold mb-6">Question Title</h1>
      </div>
      <div>
        <p className="pb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint neque
          veritatis numquam, aliquam repellat, quidem distinctio ab magnam eum
          asperiores expedita consectetur nisi nobis quam optio dignissimos,
          modi veniam iure maxime qui sed natus. Vel a cumque, quaerat
          repellendus itaque sit cum soluta dignissimos quidem velit minus quae
          culpa? Repudiandae perspiciatis rerum possimus porro, quasi cumque
        </p>
        <p className="pb-10">
          quisquam, assumenda aliquid distinctio officia natus accusamus quod
          voluptas repellat provident odit culpa sed minus sint id rem
          repellendus. Animi, architecto. Doloremque consectetur quo expedita,
          voluptates optio alias aliquam unde dolor quibusdam corrupti deleniti
        </p>
        <p>
          quidem fugiat, dolore possimus ratione consequatur dignissimos qui
          laboriosam doloribus.
        </p>
      </div>
      <div className="mt-10">
        <h1 className="font-semibold text-xl mb-2">Constraints</h1>
        <p>
          <span className="font-extrabold text-2xl mr-2">.</span> 1 - n - 1000
        </p>
        <p>
          {" "}
          <span className="font-extrabold text-2xl mr-2">.</span>all the elements are
          unique
        </p>
        <p>
          {" "}
          <span className="font-extrabold text-2xl mr-2">.</span>guaranted that the
          answer will always exist
        </p>
      </div>
    </div>
  );
};

export default QuestionSet;
