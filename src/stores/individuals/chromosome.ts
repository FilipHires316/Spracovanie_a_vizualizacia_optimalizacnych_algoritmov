// class for Chromosome (genetic algorithm solution)
export class Chromosome {
  solution: number[];
  fitness: number;
  visSolution: number[][];

  constructor(solution: number[]) {
    this.solution = solution;
    this.fitness = 0;
    this.visSolution = [];
  }
}
