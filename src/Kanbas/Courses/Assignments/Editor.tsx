import { FaXmark } from 'react-icons/fa6';
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { addAssignment, updateAssignment } from './reducer';
import { Link } from 'react-router-dom';
export default function AssignmentEditor(
  //{ assignmentName, setAssignmentName, addAssignment }:
  //{ assignmentName: string; setAssignmentName: (title: string) => void; addAssignment: () => void; }
) {
  
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const assignmentData = assignments.find((a: any) => a._id === aid) || {
    title: "",
    description: "",
    points: 0,
    dueDate: "",
    availableDate: "",
    course: cid,
  };

  const [assignment, setAssignment] = useState(assignmentData);

  const handleSave = () => {
    console.log("Trying to save", cid);
    console.log("Trying to save", aid);
    if (!cid) {
      console.error("Course ID is missing");
      return;
    }

    if (!aid || aid == "New") {
      console.log("Adding assignment", assignment);
      dispatch(addAssignment({ ...assignment, course: cid }));
    } else {
      console.log("Updating assignment", assignment);
      dispatch(updateAssignment({ ...assignment, _id: aid, course: cid }));
    }

    navigate(`/Kanbas/Courses/${cid}/Assignments`);
    console.log("Assignment saved", assignments);
  };

  const handleChange = (field: string, value: string) => {
    setAssignment({ ...assignment, [field]: value });
  };
  
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label fw-bold">Assignment Name</label>
        <input
          type="text"
          id="wd-name"
          className="form-control"
          value={assignment.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label fw-bold">Description</label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={10}
          value={assignment.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <table className="table table-borderless w-100">
        <tbody>
          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="wd-points">Points</label>
                </div>
                <div className="col-md-10">
                  <input
                    id="wd-points"
                    type="number"
                    className="form-control"
                    value={assignment.points}
                    onChange={(e) => handleChange("points", e.target.value)}
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="wd-due-date">Due Date</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="date"
                    id="wd-due-date"
                    className="form-control"
                    value={assignment.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="wd-start-date">Available from</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="date"
                    id="wd-start-date"
                    className="form-control"
                    value={assignment.availableDate}
                    onChange={(e) => handleChange("availableDate", e.target.value)}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="row g-3 mt-2">
        <hr />
        <div className="d-flex justify-content-end">
          <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary float-end me-3">
            Cancel
          </Link>
          <button onClick={handleSave} className="btn btn-danger float-end">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}