import labyrinthos from "labyrinthos";

export default function createMaze() {
  const mainMap = new labyrinthos.TileMap({ width: 64, height: 64 });
  mainMap.fill(1);
  mainMap.seed(1794841256);
  mainMap.defaultRogueLike = ["•", " "];

  labyrinthos.mazes.AldousBroder(mainMap);

  return mainMap;
}
