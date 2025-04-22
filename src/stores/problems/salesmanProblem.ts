import { defineStore } from 'pinia';
import { useParamStore } from 'stores/paramStore'
import { Chromosome } from 'stores/individuals/chromosome'
import type { Lion } from 'stores/individuals/lion'

export const useSalesmanProblem = defineStore('salesmanProblem', () => {

  const paramStore = useParamStore();

  const rearrange = (solution: number[]): number[] => {
    let missingNumbers = Array.from({ length: paramStore.cities.length }, (_, index) => index);
    missingNumbers = missingNumbers.filter(num => !solution.includes(num));
    for (let i = missingNumbers.length - 1; i > 0; i--) {
      const j = Math.round(Math.random() * (i + 1));
      const valueI = missingNumbers[i] ?? 0;
      const valueJ = missingNumbers[j] ?? 0;
      [missingNumbers[i], missingNumbers[j]] = [valueJ, valueI];
    }
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
    return solution;
  };

  const createSolutions = (size: number): number[][] => {
    const solutions: number[][] = [];
    let counter: number = 0;
    while (solutions.length < size) {
      const currentSolution: number[] = Array.from({ length: paramStore.cities.length }, (_, index) => index);
      for (let i = currentSolution.length - 1; i > 0; i--) {
        const j = Math.round(Math.random() * (i + 1));
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

  const calculateFitness = (solution: number[]) => {
    let fitness = 0
    let previousCity = paramStore.start[0]
    for (let i = 0; i < solution.length; i++) {
      const currentCity = paramStore.cities[solution[i] ?? 0]
      if (currentCity && previousCity) {
        const deltaX = currentCity.x - previousCity.x;
        const deltaY = currentCity.y - previousCity.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        fitness += distance
        previousCity = currentCity
      }
    }
    const currentCity = paramStore.start[0]
    if (currentCity && previousCity) {
      const deltaX = currentCity.x - previousCity.x;
      const deltaY = currentCity.y - previousCity.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      fitness += distance
    }
    fitness = Math.round(10000 - fitness)
    if (fitness < 1)
      return 1
    return fitness;
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
      individual.solution = rearrange(individual.solution);
      for (let index = 0; index < individual.solution.length; index++) {
        if (Math.random() * 100 < mutationRate) {
          let j = index
          while (index == j)
            j = Math.floor(Math.random() * individual.solution.length);
          const valueI = individual.solution[index] ?? 0;
          const valueJ = individual.solution[j] ?? 0;
          [individual.solution[index], individual.solution[j]] = [valueJ, valueI];
        }
      }
    });
    return population;
  };

  const getProblemType = () => {
    return 'Obchodný cestujúci'
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
