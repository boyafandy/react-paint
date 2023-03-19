import { useSelector } from "react-redux";
import { ProjectsModal } from "./ProjectsModal";
import { ProjectSaveModal } from "./ProjectSaveModal";
import { modalNameSelector } from "./modules/modals/slice";

export const ModalLayer = () => {
  console.log("modal layer");
  const modalName = useSelector(modalNameSelector)
  console.log(modalName);
  switch(modalName) {
    case "PROJECTS_MODAL": {
      return <ProjectsModal />
    }
    case "PROJECTS_SAVE_MODAL": {
      return <ProjectSaveModal />
    }
    default: {
      return null
    }
  }
}