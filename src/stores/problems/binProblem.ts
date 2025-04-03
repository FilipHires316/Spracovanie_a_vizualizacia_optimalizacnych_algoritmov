import { defineStore } from 'pinia';
import type { Chromosome } from 'stores/individuals/chromosome'
import { useParamStore } from 'stores/paramStore'

export const useBinProblem = defineStore('binProblem', () => {

  const paramStore = useParamStore();

  const rearrange = (solution: number[]): number[] => {
    console.log("Initial solution:", solution);
    let maxNumber = Math.max(...solution);
    for (let i = 1; i <= maxNumber; i++) {
      if (!solution.includes(i)) {
        solution = solution.map(num => num === maxNumber ? i : num);
        maxNumber = Math.max(...solution);
      }
    }
    console.log("Transformed solution:", solution);
    return solution;
  };

  const createSolutions = (): number[][] => {
    const solutions: number[][] = [];
    let counter: number = 0;
    if (paramStore.population) {
      while (solutions.length < paramStore.population) {
        let currentSolution: number[] = [];
        for (let i = 0; i < paramStore.binItems.length; i++) {
          currentSolution.push(Math.floor(Math.random() * paramStore.binItems.length) + 1);
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
    }
    return solutions;
  };

  const calculateFitness = (solution: number[], iteration: number) => {
    const sizes = new Array(Math.max(...solution)).fill(0);
    for (let i = 0; i < solution.length; i++) {
      sizes[solution[i] as number - 1] += paramStore.binItems[i]?.size ?? 0;
    }
    let totalOverflow = 0
    if (paramStore.capacity) {
      for (let j = 0; j < sizes.length; j++) {
        if (sizes[j] > paramStore.capacity) {
          totalOverflow += sizes[j] - paramStore.capacity;
        }
      }
    }
    return (solution.length - Math.max(...solution)) * 100 - totalOverflow * iteration;
  }

  const getProblemType = () => {
    return 'bin'
  };

  const mutate = (population: Chromosome[], mutationRate: number) => {
    population.forEach(individual => {
      for (let index = 0; index < individual.solution.length; index++) {
        if (Math.random() * 100 < mutationRate) {
          let newValue;
          do {
            newValue = Math.floor(Math.random() * paramStore.binItems.length) + 1;
          } while (newValue === individual.solution[index]);
          individual.solution[index] = newValue;
        }
      }
      individual.solution = rearrange(individual.solution);
    });
    return population;
  };

  return {
    mutate,
    createSolutions,
    calculateFitness,
    getProblemType,
  };
});
