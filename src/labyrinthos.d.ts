declare module "labyrinthos" {
  // TileMap
  interface TileMapOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    depth?: number;
    tileWidth?: number;
    tileHeight?: number;
  }

  declare class TileMap {
    x: number;
    y: number;
    width: number;
    height: number;
    depth: number;
    tileWidth: number;
    tileHeight: number;
    data: number[][] | number[];
    defaultRogueLike: string[];

    constructor(options?: TileMapOptions);

    initializeDataArray(): number[][] | number[];
    fill(value: number): void;
    fill2D(value: number): void;
    fill3D(value: number, z: number): void;
    random(max: number): number;
    seed(value: number): void;
    seedRandom(): void;
    use(subMap: TileMap, offsetX: number, offsetY: number): void;
    scaleToTileRange(tileSetRange: number): void;
    mask(format?: string[]): string[];
    applyBiome(biome: Biome): void;
    getTileAt(x: number, y: number, z?: number): number;
    toJSON(): string;
    toTiledJSON(): any;
    query(options: {
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      z?: number;
      tileName?: string;
    }): TileMap;
    query3D(options: {
      x?: number;
      y?: number;
      z?: number;
      width?: number;
      height?: number;
      depth?: number;
      tileName?: string;
    }): any[];
    findTilesById(tileId: number): Array<{ x: number; y: number; z?: number }>;
    getTileIdByName(tileName: string): number;
  }

  // TileSet
  interface Tile {
    id: number;
    name: string;
  }

  interface TileSetOptions {
    tiles?: Tile[];
  }

  declare class TileSet {
    tiles: Tile[];

    constructor(options?: TileSetOptions);
    addTile(tile: Tile): void;
    getTile(id: number): Tile | undefined;
    getTileByName(name: string): Tile | undefined;
  }

  // LSystem
  interface LSystemOptions {
    tileset: TileSet;
    axiom: string;
    rules: { [tileName: string]: string | ((context: RuleContext) => string) };
    generations: number;
  }

  interface RuleContext {
    tileId: number;
    tileName: string;
    getTileId: (tileName: string) => number | null;
    random: (max: number, min?: number) => number;
    tileMap: {
      width: number;
      height: number;
      depth: number;
    };
    getNeighbors: (x: number, y: number) => (number | undefined)[];
    position: {
      x: number;
      y: number;
      z: number;
    };
  }

  declare class LSystem {
    tileset: TileSet;
    axiom: string;
    rules: { [tileName: string]: string | ((context: RuleContext) => string) };
    generations: number;

    constructor(options: LSystemOptions);
    getTileId(tileName: string): number | null;
    applyRule(tileId: number, tileMap: TileMap): number;
    applyTo(tileMap: TileMap): void;
  }

  // Biome
  interface BiomeOptions {
    name: string;
    tileset: TileSet;
    distribution?: { [tileId: number]: number };
  }

  declare class Biome {
    name: string;
    tileset: TileSet;
    distribution: { [tileId: number]: number };

    constructor(options: BiomeOptions);
    setDistribution(distribution: { [tileId: number]: number }): void;
  }

  // labyrinthos
  export type MazeGeneratorFunction = (tileMap: TileMap, options: any) => void;

  interface mazelist {
    AldousBroder: MazeGeneratorFunction;
    AldousBroder3D: MazeGeneratorFunction;
    BinaryTree: MazeGeneratorFunction;
    CellularAutomata: MazeGeneratorFunction;
    EllersAlgorithm: MazeGeneratorFunction;
    GrowingTree: MazeGeneratorFunction;
    RecursiveBacktrack: MazeGeneratorFunction;
    RecursiveDivision: MazeGeneratorFunction;
    ThomasHunter: MazeGeneratorFunction;
    BeattieSchoberth: MazeGeneratorFunction;
    Metroidvania: MazeGeneratorFunction;
    // Add other mazes here following the same pattern
  }

  interface shapes {
    Circle: MazeGeneratorFunction;
    Square: MazeGeneratorFunction;
    Triangle: MazeGeneratorFunction;
  }

  interface terrains {
    FaultLine: MazeGeneratorFunction;
    PerlinNoise: MazeGeneratorFunction;
    // Define additional terrain generators here if they have a similar signature
  }

  interface labyrinthos {
    TileMap: typeof TileMap;
    TileSet: typeof TileSet;
    Biome: typeof Biome;
    LSystem: typeof LSystem;
    mazes: mazelist;
    shapes: shapes;
    terrains: terrains;
    utils: utils;
  }

  export { TileMap, TileSet, Biome, LSystem, mazes, labyrinthos };
}
