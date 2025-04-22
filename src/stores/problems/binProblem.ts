import { defineStore } from 'pinia';
import { useParamStore } from 'stores/paramStore'
import { Chromosome } from 'stores/individuals/chromosome'
import type { Lion } from 'stores/individuals/lion'

export const useBinProblem = defineStore('binProblem', () => {

  const paramStore = useParamStore();

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
            newValue = Math.round(Math.random() * (paramStore.binItems.length - 1));
          } while (newValue === individual.solution[index]);
          individual.solution[index] = newValue;
        }
      }
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
    onePointCrossover,
    twoPointCrossover,
    uniformCrossover,
  };
});
