// class for Whale (whale inspired algorithm solution)
export class Whale {
  solution: number[];
  fitness: number;
  visSolution: number[][];

  constructor(solution: number[]) {
    this.solution = solution;
    this.fitness = 0;
    this.visSolution = [];
  }
}
