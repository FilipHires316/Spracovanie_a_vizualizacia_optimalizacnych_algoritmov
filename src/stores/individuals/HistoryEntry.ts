import type { Lion } from 'stores/individuals/lion'
import type { Whale } from 'stores/individuals/whale'
import type { Chromosome } from 'stores/individuals/chromosome'

export class HistoryEntry {
  algorithm: string;
  problem: string;
  solution: Lion[][] | Whale[][] | Chromosome[][];
  bestFitness: number[];
  averageFitness: number[];
  mutation: number;
  elitism: boolean;
  elitismRate: number;
  choose: string;
  crossing: string;

  constructor(solution: Lion[][] | Whale[][] | Chromosome[][], algorithm: string, problem: string, mutation: number, elitism: boolean, elitismRate: number, choose: string, crossing: string) {
    this.algorithm = algorithm;
    this.problem = problem;
    this.solution = solution;
    this.bestFitness = [];
    this.averageFitness = [];
    this.mutation = mutation;
    this.elitism = elitism;
    this.elitismRate = elitismRate;
    this.choose = choose;
    this.crossing = crossing;
  }
}
