import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { addAssignment, deleteAssignment, updateAssignment, editAssignment }from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function AssignmentControls(
  
  //{ assignmentName, setAssignmentName, addAssignment }:
  //{ assignmentName: string; setAssignmentName: (title: string) => void; addAssignment: () => void; }
) {
  const { cid } = useParams();
  const navigate = useNavigate();
  
    return (
      <div id="wd-assignment-controls" className="d-flex justify-content-between align-items-center">
        <form className="d-flex me-1" role="search" style={{ width: '700px', height: '50px' }}>
        <div className="input-group">
          <div className="input-group-text">
            <FaSearch />
          </div>
          <input
            className="form-control"
            type="search"
            placeholder="Search for Assignment"
            aria-label="Search"/>
        </div>
      </form>
  
        {/* Buttons floated to the right */}
        <div className="d-flex">
          <button
            id="wd-add-assignment"
            className="btn btn-lg btn-danger me-1"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}>
            
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </button>
          <button
            id="wd-add-assignment-group"
            className="btn btn-lg btn-secondary">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </button>
        </div>
      </div>
    );
  }