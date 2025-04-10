import type { Lion } from 'stores/individuals/lion'
import type { Whale } from 'stores/individuals/whale'
import type { Chromosome } from 'stores/individuals/chromosome'

export class HistoryEntry {
  algorithm: string;
  problem: string;
  solution: Lion[][] | Whale[][] | Chromosome[][];
  bestFitness: number[];
  averageFitness: number[];

  constructor(solution: Lion[][] | Whale[][] | Chromosome[][], algorithm: string, problem: string) {
    this.algorithm = algorithm;
    this.problem = problem;
    this.solution = solution;
    this.bestFitness = [];
    this.averageFitness = [];
  }
}
