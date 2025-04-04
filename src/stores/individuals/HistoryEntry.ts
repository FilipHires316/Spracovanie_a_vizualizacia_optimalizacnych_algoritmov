export class HistoryEntry {
  algorithm: string;
  problem: string;
  solution: unknown;
  bestFitness: number[];
  averageFitness: number[];

  constructor(solution: unknown, algorithm: string, problem: string) {
    this.algorithm = algorithm;
    this.problem = problem;
    this.solution = solution;
    this.bestFitness = [];
    this.averageFitness = [];
  }
}
