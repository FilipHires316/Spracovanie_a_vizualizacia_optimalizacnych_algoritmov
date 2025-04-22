import { defineStore } from 'pinia';
import { useParamStore } from 'stores/paramStore'
import { Chromosome } from 'stores/individuals/chromosome'
import type { Lion } from 'stores/individuals/lion'

export const useBinProblem = defineStore('binProblem', () => {

  const paramStore = useParamStore();

  const rearrange = (solution: number[]): number[] => {
    let maxNumber = Math.max(...solution);
    for (let i = 1; i <= maxNumber; i++) {
      if (!solution.includes(i)) {
        solution = solution.map(num => num === maxNumber ? i : num);
        maxNumber = Math.max(...solution);
      }
    }
    return solution;
  };

  const createSolutions = (size: number): number[][] => {
    const solutions: number[][] = [];
    let counter: number = 0;
    while (solutions.length < size) {
      let currentSolution: number[] = [];
      for (let i = 0; i < paramStore.binItems.length; i++) {
        currentSolution.push(Math.round(Math.random() * paramStore.binItems.length) + 1);
      }
      currentSolution = rearrange(currentSolution);
      if (!solutions.some(sol => sol.every((val, index) => val === currentSolution[index]))) {
        solutions.push(currentSolution);
        counter = 0;
      }
      else {
        counter++
        if (counter > 100) {
          return solutions;
        }
      }
    }
    return solutions;
  };

  const calculateFitness = (solution: number[]) => {
    const sizes = new Array(Math.max(...solution)).fill(0);
    for (let i = 0; i < solution.length; i++) {
      sizes[solution[i] as number - 1] += paramStore.binItems[i]?.size ?? 0;
    }
    let totalOverflow = 0
    let totalUnderflow = 0
    if (paramStore.capacity) {
      for (let j = 0; j < sizes.length; j++) {
        if (sizes[j] > paramStore.capacity) {
          totalOverflow += sizes[j] - paramStore.capacity;
        }
        else {
          totalUnderflow += paramStore.capacity - sizes[j];
        }
      }
    }
    const fitness = (solution.length - Math.max(...solution)) * 100 - totalUnderflow - totalOverflow * 50;
    if (fitness < 1) {
      return 1
    }
    return fitness
  }

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

  const mutate = (population: Chromosome[] | Lion[], mutationRate: number) => {
    population.forEach(individual => {
      for (let index = 0; index < individual.solution.length; index++) {
        if (Math.random() * 100 < mutationRate) {
          let newValue;
          do {
            newValue = Math.round(Math.random() * paramStore.binItems.length) + 1;
          } while (newValue === individual.solution[index]);
          individual.solution[index] = newValue;
        }
      }
      individual.solution = rearrange(individual.solution);
    });
    return population;
  };

  const getProblemType = () => {
    return 'Koše'
  };

  return {
    mutate,
    createSolutions,
    calculateFitness,
    getProblemType,
    rearrange,
    onePointCrossover,
    twoPointCrossover,
    uniformCrossover,
  };
});
