import TeachersProfileSideBar from "@/components/teachersprofile/TeachersProfileSideBar";

function TeachersProfileById () {
    return (
      <div className="flex">
        <div className="w-1/5 bg-primary"><TeachersProfileSideBar /></div>
        <div className="w-3/5">Middle</div>
        <div className="w-1/5">leftside</div>
      </div>
    );
}

export default TeachersProfileById