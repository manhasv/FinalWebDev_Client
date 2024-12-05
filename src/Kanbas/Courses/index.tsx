// import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Route, Routes, useParams, useLocation  } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizz";
import QuizDetails from "./Quizz/QuizDetail";
import QuizEditor from "./Quizz/Editors/QuizDetailEditor";
import Quiz from "./Quizz/Quiz";
import QuizQuestionsEditor from "./Quizz/Editors/QuizQuestionsEditor";
import { useEffect, useState } from "react";
import * as client from "./client";

export default function Courses() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const course = { name: "COURSE NAME NOT BEING SOURCED FROM SERVER"}; // courses.find((course) => course._id === cid);
  
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const users = await client.findUsersForCourse(cid ?? '');
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      {course && course.name}  &gt; {pathname.split("/")[4]}
      </h2> <hr />
    <div className="d-flex">
      <div className="d-none d-md-block">
        <CoursesNavigation />
      </div>
      <div className="flex-fill">
      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="Modules" element={<Modules />} />
        <Route path="Assignments" element={<Assignments />} />
        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
        <Route path="Quizzes" element={<Quizzes />} />
        <Route path="Quizzes/:qid" element={<QuizDetails />} />
        <Route path="Quizzes/:qid/Edit" element={<QuizEditor />} />
        <Route path="Quizzes/:qid/Questions" element={<QuizQuestionsEditor />} />
        <Route path="Quizzes/New" element={<QuizEditor />} />
        <Route path="Quizzes/:qid/Take" element={<Quiz isPreview={false} />} />
        <Route path="Quizzes/:qid/Take/:questionNum" element={<Quiz isPreview={false} />} />
        <Route path="Quizzes/:qid/Preview" element={<Quiz isPreview={true} />} />
        <Route path="People" element={<PeopleTable users={users}/>} />
      </Routes>
      </div>
    </div>
  </div>
);}

