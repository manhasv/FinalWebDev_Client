import { FaPlus } from "react-icons/fa6";
import GreenCheckMark from "./GreenCheckMark";
import ModuleEditor from "./ModuleEditor";
import { useSelector } from "react-redux";

export default function ModulesControls({ moduleName, setModuleName, addModule }:
{ 
  moduleName: string; 
  setModuleName: (title: string) => void; 
  addModule: () => void; 
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <div className="d-flex flex-row-reverse pb-2">
        {isFaculty && 
        <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end"
        data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog" >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Module</button>}
        {isFaculty &&<div className="dropdown d-inline me-1 float-end">
          <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
            type="button" data-bs-toggle="dropdown">
            <GreenCheckMark />
            Publish All</button>
          <ul className="dropdown-menu">
            <li>
              <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
                <GreenCheckMark />
                Publish all modules and items</a>
            </li>
            <li>
              <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
                <GreenCheckMark />
                Publish modules only</a>
            </li>
            <li>
              <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
                <GreenCheckMark />
                Unpublish all modules and items</a>
            </li>
            <li>
              <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
                <GreenCheckMark />
                Unpublish modules only</a>
            </li>
          </ul>
        </div>}
        {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}
        <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1 float-end">
          View Progress</button>
        <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 float-end">
          Collapse All</button>
      </div>
      <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
                    setModuleName={setModuleName} addModule={addModule} />
    </div>
);}
