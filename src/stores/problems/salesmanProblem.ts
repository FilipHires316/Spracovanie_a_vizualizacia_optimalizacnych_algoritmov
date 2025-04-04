import { defineStore } from 'pinia';
import type { Chromosome } from 'stores/individuals/chromosome'
import { useParamStore } from 'stores/paramStore'
import type { Lion } from 'stores/individuals/lion'

export const useSalesmanProblem = defineStore('salesmanProblem', () => {

  const paramStore = useParamStore();

  const rearrange = (solution: number[]): number[] => {
    console.log (solution);
    let missingNumbers = Array.from({ length: paramStore.cities.length }, (_, index) => index);
    missingNumbers = missingNumbers.filter(num => !solution.includes(num));
    for (let i = missingNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const valueI = missingNumbers[i] ?? 0;
      const valueJ = missingNumbers[j] ?? 0;
      [missingNumbers[i], missingNumbers[j]] = [valueJ, valueI];
    }
    console.log(missingNumbers);
    const seen = new Set<number>();
    for (let i = 0; i < solution.length; i++) {
      const x = solution[i];
      if (x !== undefined) {
        if (seen.has(x)) {
          solution[i] = missingNumbers.shift()!;
        }
        seen.add(x);
      }
    }
    console.log(solution ,seen);
    return solution;
  };

  const createSolutions = (size: number): number[][] => {
    const solutions: number[][] = [];
    let counter: number = 0;
    while (solutions.length < size) {
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
    return solutions;
  };

  const calculateFitness = (solution: number[], iteration: number) => {
    console.log(iteration)
    let fitness = 0
    let previousCity = paramStore.start[0]
    for (let i = 0; i < solution.length; i++) {
      const currentCity = paramStore.cities[solution[i] ?? 0]
      if (currentCity && previousCity) {
        const deltaX = currentCity.x - previousCity.x;
        const deltaY = currentCity.y - previousCity.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        fitness += distance
        previousCity = paramStore.cities[i]
      }
    }
    const currentCity = paramStore.start[0]
    if (currentCity && previousCity) {
      const deltaX = currentCity.x - previousCity.x;
      const deltaY = currentCity.y - previousCity.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      fitness += distance
    }
    return Math.floor(1 / (fitness + 0.0001))
  }

  const getProblemType = () => {
    return 'salesman'
  };

  const mutate = (population: Chromosome[] | Lion[], mutationRate: number) => {
    population.forEach(individual => {
      individual.solution = rearrange(individual.solution);
      for (let index = 0; index < individual.solution.length; index++) {
        if (Math.random() * 100 < mutationRate) {
          let j = index
          while (index == j)
            j = Math.floor(Math.random() * (individual.solution.length));
          const valueI = individual.solution[index] ?? 0;
          const valueJ = individual.solution[j] ?? 0;
          [individual.solution[index], individual.solution[j]] = [valueJ, valueI];
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
