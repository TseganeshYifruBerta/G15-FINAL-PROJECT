const  TeachersProfileSideBar : React.FC = () => {
    return (
      <div className="min-h-screen">
        <div className="font-bold ml-8 text-white p-16 pl-0 pt-4">Logo</div>
        <div className="text-white font-semibold p-2">
          <div className="mb-4">
            Profile
          </div>
          <div className="mb-4">Exams</div>
          <div className="mb-4">Questions</div>
        </div>
        <div className="bg-white text-primary m-2 shadow-xl rounded-md p-8 pl-2">
          <div>About</div>
          <div>Username</div>
          <div>Address</div>
          <div>Email</div>
          <div>Phone</div>
        </div>
      </div>
    );
}

export default TeachersProfileSideBar