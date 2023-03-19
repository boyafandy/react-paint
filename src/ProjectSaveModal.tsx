import { useDispatch } from "react-redux";
import { hide } from "./modules/modals/slice";
import { useState, ChangeEvent } from "react";
import { getCanvasImage } from "./utils/canvasUtils";
import { useCanvas } from "./CanvasContext";
import { getBase64Thumbnail } from "./utils/scaler";
import { saveProject } from "./modules/strokes/reducer";
import { AppDispatch } from "./store";

export const ProjectSaveModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const canvasRef = useCanvas();

  const [projectName, setProjectName] = useState("");

  const onProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const onProjectSave = async () => {
    console.log('save')
    const file = await getCanvasImage(canvasRef.current);
    if (!file) {
      return;
    }
    const thumbnail = await getBase64Thumbnail({ file, scale: 0.1 });
    console.log(thumbnail)
    dispatch(saveProject({projectName, thumbnail}));
    setProjectName("");
    dispatch(hide());
  };

  return (
    <div className="window modal-panel">
      <div className="title-bar">
        <div className="title-bar-text">Save</div>
      </div>
      <div className="window-body">
        <div className="field-row-stacked">
          <label htmlFor="projectName">Project Name</label>
          <input autoFocus type="text" id="projectName" onChange={onProjectNameChange} />
        </div>
        <div className="field-row">
          <button onClick={onProjectSave}>Save</button>
          <button onClick={() => dispatch(hide())}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
