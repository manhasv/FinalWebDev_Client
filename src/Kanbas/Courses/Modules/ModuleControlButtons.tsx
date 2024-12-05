import { IoEllipsisVertical,   } from "react-icons/io5";
import {BsPlus} from "react-icons/bs";
import GreenCheckMark from "./GreenCheckMark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
export default function ModuleControlButtons(
  { 
  moduleId, 
  deleteModule, 
  editModule 
}: {
  moduleId: string; 
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void 
}){
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  return (
    <div className="float-end">
      {isFaculty && <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />}
      {isFaculty && <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>}
      <GreenCheckMark />
      <BsPlus size={24} />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
