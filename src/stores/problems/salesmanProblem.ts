import { defineStore } from 'pinia';
import type { Chromosome } from 'stores/individuals/chromosome'
import { useParamStore } from 'stores/paramStore'

export const useSalesmanProblem = defineStore('salesmanProblem', () => {

  const paramStore = useParamStore();

  const rearrange = (solution: number[]): number[] => {
    let missingNumbers = Array.from({ length: paramStore.cities.length }, (_, index) => index);
    missingNumbers = missingNumbers.filter(num => !solution.includes(num));
    for (let i = missingNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const valueI = missingNumbers[i] ?? 0;
      const valueJ = missingNumbers[j] ?? 0;
      [missingNumbers[i], missingNumbers[j]] = [valueJ, valueI];
    }
    const seen = new Set<number>();
    for (let i = 0; i < solution.length; i++) {
      const x = solution[i];
      if (x) {
        if (seen.has(x) && missingNumbers.length > 0) {
          solution[i] = missingNumbers.shift()!;
        }
        seen.add(x);
      }
    }
    return solution;
  };

  const createSolutions = (): number[][] => {
    const solutions: number[][] = [];
    let counter: number = 0;
    if (paramStore.population) {
      while (solutions.length < paramStore.population) {
        const currentSolution: number[] = Array.from({ length: paramStore.cities.length }, (_, index) => index);
        for (let i = currentSolution.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const valueI = currentSolution[i] ?? 0;
          const valueJ = currentSolution[j] ?? 0;
          [currentSolution[i], currentSolution[j]] = [valueJ, valueI];
        }
        if (!solutions.some(sol => sol.every((val, index) => val === currentSolution[index]))) {
          solutions.push(currentSolution);
          counter = 0;
        } else {
          counter++;
          if (counter > 100) {
            return solutions;
          }
        }
      }
    }
    return solutions;
  };

  const calculateFitness = (solution: number[], iteration: number) => {
    console.log(iteration)
    let fitness = 0
    let previousCity = paramStore.start[0]
    for (let i = 0; i < solution.length; i++) {
      const currentCity = paramStore.cities[i]
      if (currentCity && previousCity) {
        const deltaX = currentCity.x - previousCity.x;
        const deltaY = currentCity.y - previousCity.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        fitness += distance
        previousCity = paramStore.cities[i]
      }
    }
    return fitness
  }

  const getProblemType = () => {
    return 'salesman'
  };

  const mutate = (population: Chromosome[], mutationRate: number) => {
    population.forEach(individual => {
      individual.solution = rearrange(individual.solution);
      for (let index = 0; index < individual.solution.length; index++) {
        if (Math.random() * 100 < mutationRate) {
          let j = index
          while (index == j)
          j = Math.floor(Math.random() * (index + 1));
          const valueI = solution[index] ?? 0;
          const valueJ = solution[j] ?? 0;
          [solution[index], solution[j]] = [valueJ, valueI];
        }
      }
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
