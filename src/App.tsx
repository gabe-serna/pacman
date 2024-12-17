import { useEffect, useRef } from "react";
import createMaze from "./scripts/maze";

function App() {
  const pre = useRef<HTMLPreElement>(null!);
  const map = createMaze();

  useEffect(() => {
    pre.current.innerText = map
      .query({ height: 32, width: 32, x: map.x, y: map.y })
      .mask()
      .toString();
  }, [map]);

  window.document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      map.y += 1;
      console.log(map.y);
      pre.current.innerText = map
        .query({ height: 32, width: 32, x: map.x, y: map.y })
        .mask()
        .toString();
    }
  });

  return (
    <section
      id="game"
      className="flex min-h-screen items-center justify-center"
    >
      <pre ref={pre} className="w-fit leading-[0.6]" />
    </section>
  );
}

export default App;
