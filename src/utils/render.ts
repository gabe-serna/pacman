import { TileMap } from "labyrinthos";

export default class Renderer {
  private map: TileMap;
  private outputObject: HTMLPreElement;

  constructor(map: TileMap, outputObject: HTMLPreElement) {
    this.map = map;
    this.outputObject = outputObject;
  }

  moveY(value: number) {
    this.map.y += value;
    const isSuccess = this.render();
    if (!isSuccess) this.map.y -= value;
  }

  moveX(value: number) {
    this.map.x += value;
    const isSuccess = this.render();
    if (!isSuccess) this.map.x -= value;
  }

  render() {
    const VIEW_SIZE = 24;
    const mapMask = ["•", " "];

    const newMap = this.map.query({
      height: VIEW_SIZE,
      width: VIEW_SIZE,
      x: this.map.x,
      y: this.map.y,
    });

    newMap.defaultRogueLike = mapMask;
    const output = newMap.mask().toString();
    if (output.includes("undefined")) return false;

    this.outputObject.innerText = output;
    return true;
  }
}
