import { clearCanvas, setCanvasSize, drawStroke } from "./utils/canvasUtils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { beginStroke, updateStroke } from "./modules/currentStroke/reducer";
import { currentStrokeSelector } from "./modules/currentStroke/reducer";
import { strokesSelector } from "./modules/strokes/reducer";
import { historyIndexSelector } from "./modules/historyIndex/reducer";
import { ColorPanel } from "./shared/ColorPanel";
import { EditPanel } from "./shared/EditPanel";
import { useCanvas } from "./CanvasContext";
import { FilePanel } from "./shared/FilePanel";
import { endStroke } from "./modules/sharedAction";
import { ModalLayer } from "./ModalLayer";
import { AppDispatch } from "./store";

const WIDTH = 1024;
const HEIGHT = 768;

function App() {
  const currentStroke = useSelector(currentStrokeSelector)
  const historyIndex = useSelector(historyIndexSelector)
  const strokes = useSelector(strokesSelector)

  const canvasRef = useCanvas()

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d") };
  };

  const isDrawing = !!currentStroke.points.length

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }

    setCanvasSize(canvas, WIDTH, HEIGHT);
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = "black";
    clearCanvas(canvas);
  }, []);

  useEffect(() => {
    const {context} = getCanvasWithContext()
    if(!context) return
    requestAnimationFrame(() => drawStroke(context, currentStroke.points, currentStroke.color))
  }, [currentStroke])

  useEffect(() => {
    const {canvas, context} = getCanvasWithContext()
    if (!context || !canvas) return
    requestAnimationFrame(() => {
      clearCanvas(canvas)
      strokes.slice(0, strokes.length - historyIndex).forEach((strokes) => {
        drawStroke(context, strokes.points, strokes.color)
      })
    })
  },[historyIndex, strokes])

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({x: offsetX, y: offsetY}));
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke({x: offsetX, y: offsetY}));
  };
  
  const endDrawing = () => {
    if(isDrawing){
      dispatch(endStroke({historyIndex, stroke: currentStroke}))
    }
  };

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <EditPanel />
      <ColorPanel />
      <FilePanel />
      <ModalLayer/>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
    </div>
  );
}

export default App;
