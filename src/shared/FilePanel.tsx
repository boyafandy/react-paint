import { useCanvas } from "../CanvasContext";
import { saveAs } from "file-saver";
import { getCanvasImage } from "../utils/canvasUtils";
import { useDispatch } from "react-redux";
import { show } from "../modules/modals/slice";
import { AppDispatch } from "../store";

export const FilePanel = () => {
  const dispatch = useDispatch<AppDispatch>()
  const canvasRef = useCanvas()

  const exportToFile = async () => {
    const file = await getCanvasImage(canvasRef.current)
    if(!file){
      return
    }
    saveAs(file, 'drawing.png')
  }

  return (
    <div className="window file">
      <div className="title-bar">
        <div className="title-bar-text">File</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button className="save-button" onClick={exportToFile}>Export</button>
          <button className="save-button" onClick={() => dispatch(show('PROJECTS_SAVE_MODAL'))}>Save</button>

          <button className="save-button" onClick={() => dispatch(show('PROJECTS_MODAL'))}>Load</button>

        </div>
      </div>
    </div>
  )
}