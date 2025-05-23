import { defineStore } from 'pinia';
import { useParamStore } from 'stores/paramStore'
import { Chromosome } from 'stores/individuals/chromosome'
import { Lion } from 'stores/individuals/lion'

export const useBinProblem = defineStore('binProblem', () => {

  const paramStore = useParamStore();

  // generating solutions - each solution is set of items paired with bin number in which they are assigned
  const createSolutions = (size: number): number[][] => {
    const solutions: number[][] = [];
    while (solutions.length < size) {
      const currentSolution: number[] = [];
      for (let i = 0; i < paramStore.binItems.length; i++) {
        currentSolution.push(Math.round(Math.random() * (paramStore.binItems.length - 1)));
      }
      solutions.push(currentSolution);
    }
    return solutions;
  };

  // calculating fitness as 1 / number of bins used
  const calculateFitness = (solution: number[]) => {
    let binsUsed = 0;
    const sizes = new Array(solution.length).fill(0);
    for (let i = 0; i < solution.length; i++) {
      sizes[solution[i] as number] += paramStore.binItems[i]?.size;
    }
    if (paramStore.capacity) {
      for (let j = 0; j < sizes.length; j++) {
        if (sizes[j] > paramStore.capacity) {
          return 1
        }
        else if (sizes[j] != 0) {
          binsUsed++
        }
      }
    }
    return Math.round((1 / binsUsed) * 10000);
  }

  // crossover with one point
  const onePointCrossover = (parent1: Chromosome, parent2: Chromosome) => {
    const crossoverPoint = Math.floor(Math.random() * (parent1.solution.length - 2)) + 1
    const firstBreed = [
      ...parent1.solution.slice(0, crossoverPoint),
      ...parent2.solution.slice(crossoverPoint),
    ]
    const secondBreed = [
      ...parent2.solution.slice(0, crossoverPoint),
      ...parent1.solution.slice(crossoverPoint),
    ]
    return [new Chromosome(firstBreed), new Chromosome(secondBreed)]
  }

  // crossover with two points
  const twoPointCrossover = (parent1: Chromosome, parent2: Chromosome) => {
    const firstCrossoverPoint = Math.floor(Math.random() * (parent1.solution.length - 3)) + 1
    let secondCrossoverPoint = 0
    while (secondCrossoverPoint < firstCrossoverPoint) {
      secondCrossoverPoint = Math.floor(Math.random() * (parent1.solution.length - 1)) + 1
    }
    const firstBreed = [
      ...parent1.solution.slice(0, firstCrossoverPoint),
      ...parent2.solution.slice(firstCrossoverPoint, secondCrossoverPoint),
      ...parent1.solution.slice(secondCrossoverPoint),
    ]
    const secondBreed = [
      ...parent2.solution.slice(0, firstCrossoverPoint),
      ...parent1.solution.slice(firstCrossoverPoint, secondCrossoverPoint),
      ...parent2.solution.slice(secondCrossoverPoint),
    ]
    return [new Chromosome(firstBreed), new Chromosome(secondBreed)]
  }

  // randomly based crossover
  const uniformCrossover = (parent1: Chromosome, parent2: Chromosome) => {
    const firstBreed = []
    const secondBreed = []
    for (let i = 0; i < parent1.solution.length; i++) {
      const uniform = Math.floor(Math.random() * 2)
      if (uniform === 0) {
        firstBreed.push(parent1.solution[i])
        secondBreed.push(parent2.solution[i])
      } else {
        firstBreed.push(parent2.solution[i])
        secondBreed.push(parent1.solution[i])
      }
    }
    return [new Chromosome(firstBreed as number[]), new Chromosome(secondBreed as number[])]
  }

  // breeding function used for lion inspired algorithm
  const breed = (parent1: Lion, parent2: Lion) => {
    const firstCrossoverPoint = Math.floor(Math.random() * (parent1.solution.length - 3)) + 1
    let secondCrossoverPoint = 0
    while (secondCrossoverPoint < firstCrossoverPoint) {
      secondCrossoverPoint = Math.floor(Math.random() * (parent1.solution.length - 1)) + 1
    }
    const firstBreed = [
      ...parent1.solution.slice(0, firstCrossoverPoint),
      ...parent2.solution.slice(firstCrossoverPoint, secondCrossoverPoint),
      ...parent1.solution.slice(secondCrossoverPoint),
    ]
    const secondBreed = [
      ...parent2.solution.slice(0, firstCrossoverPoint),
      ...parent1.solution.slice(firstCrossoverPoint, secondCrossoverPoint),
      ...parent2.solution.slice(secondCrossoverPoint),
    ]
    return [new Lion(firstBreed, 1), new Lion(secondBreed, 0)]
  }

  // moving solution closer to a solution
  const move = (solution: number[], target: number[], probability: number): number[] => {
    const moved = [...solution]; // Clone input
    for (let i = 0; i < moved.length; i++) {
      if (Math.random() < probability) {
        moved[i] = target[i] as number;
      }
    }
    return moved;
  };

  // generating solution around a solution to simulate whale movement or determining where the prey is
  const spiralMove = (target: number[]): number[] => {
    const mutated = [...target];
    const sizes = new Array(mutated.length).fill(0);
    for (let i = 0; i < mutated.length; i++) {
      sizes[mutated[i] as number] += paramStore.binItems[i]?.size;
    }
    for (let i = 0; i < mutated.length; i++) {
      if (Math.random() < 0.1) {
        const nonZeroSizes = sizes
          .map((val, idx) => ({ val, idx }))
          .filter(item => item.val !== 0);
        const newBin = nonZeroSizes.reduce((min, curr) =>
          curr.val < min.val ? curr : min
        ).idx;
        sizes[mutated[i]!] -= paramStore.binItems[i]!.size;
        sizes[newBin] += paramStore.binItems[i]!.size;
        mutated[i] = newBin
      }
    }
    return mutated;
  };

  // small mutation of each solution to maintain diversity - relocating items between bins
  const mutate = (population: Chromosome[] | Lion[], mutationRate: number) => {
    population.forEach(individual => {
      const sizes = new Array(individual.solution.length).fill(0);
      for (let i = 0; i < individual.solution.length; i++) {
        sizes[individual.solution[i] as number] += paramStore.binItems[i]?.size;
      }
      for (let index = 0; index < individual.solution.length; index++) {
        if (Math.random() * 100 < mutationRate) {
          const nonZeroSizes = sizes
            .map((val, idx) => ({ val, idx }))
            .filter(item => item.val !== 0);
          const newBin = nonZeroSizes.reduce((min, curr) =>
            curr.val < min.val ? curr : min
          ).idx;
          sizes[individual.solution[index]!] -= paramStore.binItems[index]!.size;
          sizes[newBin] += paramStore.binItems[index]!.size;
          individual.solution[index] = newBin
        }
      }
    });
    return population;
  };

  // returning problems name
  const getProblemType = () => {
    return 'Koše'
  };

  return {
    mutate,
    createSolutions,
    calculateFitness,
    getProblemType,
    onePointCrossover,
    twoPointCrossover,
    uniformCrossover,
    breed,
    move,
    spiralMove,
  };
});
