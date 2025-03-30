export class Chromosome {
  solution: number[];
  fitness: number;

  constructor(solution: number[]) {
    this.solution = solution;
    this.fitness = 0;
  }
}
