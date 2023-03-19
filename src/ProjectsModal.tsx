import { useDispatch } from "react-redux";
import { hide } from "./modules/modals/slice";
import { useEffect } from "react";
import { getProjectsList, projectsListSelector } from "./modules/projectList/slice";
import { loadProject } from "./modules/strokes/reducer";
import { AppDispatch } from "./store";
import { useSelector } from "react-redux";

export const ProjectsModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const projectsList = useSelector(projectsListSelector)

  useEffect(() => {
    dispatch(getProjectsList())
  },[])

  const onLoadProject= (projectId: string) => {
    dispatch(loadProject(projectId))
    dispatch(hide())
  }  
  return (
    <div className="window modal-panel">
      <div className="title-bar">
        <div className="title-bar-text">Load Project</div>
        <div className="title-bar-control">
          <button aria-label="Close" onClick={() => dispatch(hide())}></button>
        </div>
      </div>
      <div className="projects-container">
          {(projectsList || []).map((project) => {
            return (
              <div 
                key={project.id}
                onClick={() => onLoadProject(project.id)}
                className="project-card">
                <img src={project.image} alt="thumbnail" />
              <div>{project.name}</div>
            </div>
            )
          })}
        </div>
    </div>
  )
}