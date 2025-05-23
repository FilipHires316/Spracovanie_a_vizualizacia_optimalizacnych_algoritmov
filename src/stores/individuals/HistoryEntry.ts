// class for storing information about computing process (including input parameters and output solution)
interface HistoryEntryOptions {
  mutation?: number;
  elitism?: boolean;
  elitismRate?: number;
  choose?: string;
  crossing?: string;
  packs?: number;
  females?: number;
  males?: number;
  hunters?: number;
  capacity?: number;
  averageWeight?: number;
  averagePrice?: number;
  count?: number;
}

export class HistoryEntry {
  algorithm: string;
  problem: string;
  solution: number[][][][];
  fitness: number[][];
  bestFitness: number[];
  averageFitness: number[];
  mutation: number;
  elitism: boolean;
  elitismRate: number;
  choose: string;
  crossing: string;
  packs: number;
  females: number;
  males: number;
  hunters: number;
  capacity: number;
  averageWeight: number;
  averagePrice: number;
  count: number;

  constructor(
    solution: number[][][][],
    algorithm: string,
    problem: string,
    fitness: number[][],
    options: HistoryEntryOptions = {}
  ) {
    this.algorithm = algorithm;
    this.problem = problem;
    this.solution = solution;
    this.fitness = fitness;
    this.bestFitness = [];
    this.averageFitness = [];

    this.mutation = options.mutation ?? 0;
    this.elitism = options.elitism ?? false;
    this.elitismRate = options.elitismRate ?? 0;
    this.choose = options.choose ?? 'none';
    this.crossing = options.crossing ?? 'none';
    this.packs = options.packs ?? 0;
    this.females = options.females ?? 0;
    this.males = options.males ?? 0;
    this.hunters = options.hunters ?? 0;
    this.capacity = options.capacity ?? 0;
    this.averageWeight = options.averageWeight ?? 0;
    this.averagePrice = options.averagePrice ?? 0;
    this.count = options.count ?? 0;
  }
}
