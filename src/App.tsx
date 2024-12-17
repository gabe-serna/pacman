import { useEffect, useRef } from "react";
import createMaze from "./utils/maze";
import Renderer from "./utils/render";

function App() {
  const pre = useRef<HTMLPreElement>(null!);
  const maze = createMaze();

  useEffect(() => {
    // Load Map on First Render
    const map = new Renderer(maze, pre.current);
    map.render();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") map.moveY(-1);
      else if (event.key === "ArrowDown") map.moveY(1);
      else if (event.key === "ArrowLeft") map.moveX(-1);
      else if (event.key === "ArrowRight") map.moveX(1);
    };

    window.document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section
      id="game"
      className="flex min-h-screen items-center justify-center"
    >
      <pre ref={pre} className="w-fit text-2xl leading-[0.6]" />
    </section>
  );
}

export default App;
