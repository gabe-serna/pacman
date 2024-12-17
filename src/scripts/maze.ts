import labyrinthos from "labyrinthos";

export default function createMaze() {
  const mainMap = new labyrinthos.TileMap({ width: 32, height: 32 });
  mainMap.fill(1);

  console.log(labyrinthos.mazes);
  labyrinthos.mazes.AldousBroder(mainMap, 0, 0);

  return mainMap.mask();
}
