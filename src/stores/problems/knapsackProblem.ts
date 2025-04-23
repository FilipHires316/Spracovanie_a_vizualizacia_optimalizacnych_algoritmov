import { defineStore } from 'pinia';
import { useParamStore } from 'stores/paramStore'
import { Chromosome } from 'stores/individuals/chromosome'
import { Lion } from 'stores/individuals/lion'

export const useKnapsackProblem = defineStore('knapsackProblem', () => {

  const paramStore = useParamStore();

  const createSolutions = (size: number): number[][] => {
    const solutions: number[][] = [];
    while (solutions.length < size) {
      const currentSolution: number[] = [];
      for (let i = 0; i < paramStore.knapsackItems.length; i++) {
        currentSolution.push(Math.random() < 0.5 ? 0 : 1);
      }
      solutions.push(currentSolution);
    }
    return solutions;
  };

  const calculateFitness = (solution: number[]) => {
    let totalSize = 0;
    let totalPrice = 0;
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] === 1) {
        totalSize += paramStore.knapsackItems[i]?.size ?? 0;
        totalPrice += paramStore.knapsackItems[i]?.price ?? 0;
      }
    }
    if (paramStore.capacity && paramStore.capacity < totalSize) {
      return 1
    }
    return (totalPrice * 100) - totalSize
  };

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

  const move = (solution: number[], target: number[], probability: number): number[] => {
    const moved = [...solution]; // Clone input
    for (let i = 0; i < moved.length; i++) {
      if (Math.random() < probability) {
        moved[i] = target[i] as number;
      }
    }
    return moved;
  };


  const spiralMove = (target: number[]): number[] => {
    const mutated = [...target];
    for (let i = 0; i < mutated.length; i++) {
      if (Math.random() < 0.1) {
        mutated[i] = 1 - mutated[i]!;
      }
    }
    return mutated;
  };

  const mutate = (population: Chromosome[] | Lion[], mutationRate: number) => {
    population.forEach(individual => {
      for (let index = 0; index < individual.solution.length; index++) {
        if (Math.random() * 100 < mutationRate) {
          individual.solution[index] = individual.solution[index] === 0 ? 1 : 0;
        }
      }
    });
    return population;
  };


  const getProblemType = () => {
    return 'Batoh'
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
    spiralMove
  };
});
