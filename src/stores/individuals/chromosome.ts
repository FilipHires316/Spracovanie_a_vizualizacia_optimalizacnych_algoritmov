export class Chromosome {
  solution: number[];
  fitness: number;
  timesCrossed: number;

  constructor(solution: number[]) {
    this.solution = solution;
    this.fitness = 0;
    this.timesCrossed = 0;
  }
}
