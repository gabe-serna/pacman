import { useEffect, useRef } from "react";
import createMaze from "./scripts/maze";

function App() {
  const pre = useRef<HTMLPreElement>(null!);
  const maze = createMaze();

  useEffect(() => {
    pre.current.innerText = maze.toString();
  }, [maze]);

  return (
    <>
      <pre ref={pre} className="mx-auto w-fit" />
    </>
  );
}

export default App;
