import { defineStore } from 'pinia';
import { useParamStore } from 'stores/paramStore'
import { Chromosome } from 'stores/individuals/chromosome'
import { Lion } from 'stores/individuals/lion'

export const useSalesmanProblem = defineStore('salesmanProblem', () => {

  const paramStore = useParamStore();

  // generating solutions as sequence of cities in visit order
  const createSolutions = (size: number): number[][] => {
    const solutions: number[][] = [];
    while (solutions.length < size) {
      const currentSolution: number[] = Array.from({ length: paramStore.cities.length }, (_, index) => index);
      for (let i = currentSolution.length - 1; i > 0; i--) {
        const j = Math.round(Math.random() * (i + 1));
        const valueI = currentSolution[i] ?? 0;
        const valueJ = currentSolution[j] ?? 0;
        [currentSolution[i], currentSolution[j]] = [valueJ, valueI];
      }
      solutions.push(currentSolution);
    }
    return solutions;
  };

  // calculating fitness as 1 / total distance traveled
  const calculateFitness = (solution: number[]) => {
    let totalDistance = 0
    let previousCity = paramStore.start[0]
    for (let i = 0; i < solution.length; i++) {
      const currentCity = paramStore.cities[solution[i] ?? 0]
      if (currentCity && previousCity) {
        const deltaX = currentCity.x - previousCity.x;
        const deltaY = currentCity.y - previousCity.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        totalDistance += distance
        previousCity = currentCity
      }
    }
    const currentCity = paramStore.start[0]
    if (currentCity && previousCity) {
      const deltaX = currentCity.x - previousCity.x;
      const deltaY = currentCity.y - previousCity.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      totalDistance += distance
    }
    return Math.round((1 / totalDistance) * 10000000);
  }

  // crossover with one point
  const onePointCrossover = (parent1: Chromosome, parent2: Chromosome) => {
    const len = parent1.solution.length;
    const point = Math.floor(Math.random() * (len - 1)) + 1;
    const firstPart1 = parent1.solution.slice(0, point);
    const child1Rest = parent2.solution.filter(city => !firstPart1.includes(city));
    const child1 = [...firstPart1, ...child1Rest];
    const firstPart2 = parent2.solution.slice(0, point);
    const child2Rest = parent1.solution.filter(city => !firstPart2.includes(city));
    const child2 = [...firstPart2, ...child2Rest];

    return [new Chromosome(child1), new Chromosome(child2)];
  }

  // crossover with two points
  const twoPointCrossover = (parent1: Chromosome, parent2: Chromosome) => {
    const len = parent1.solution.length;
    const start = Math.floor(Math.random() * len);
    const end = Math.floor(Math.random() * (len - start)) + start;
    const slice1 = parent1.solution.slice(start, end);
    const fillFromParent2 = parent2.solution.filter(city => !slice1.includes(city));
    const child1 = [
      ...fillFromParent2.slice(0, start),
      ...slice1,
      ...fillFromParent2.slice(start)
    ];
    const slice2 = parent2.solution.slice(start, end);
    const fillFromParent1 = parent1.solution.filter(city => !slice2.includes(city));
    const child2 = [
      ...fillFromParent1.slice(0, start),
      ...slice2,
      ...fillFromParent1.slice(start)
    ];
    return [new Chromosome(child1), new Chromosome(child2)];
  }

  // randomly based crossover
  const uniformCrossover = (parent1: Chromosome, parent2: Chromosome) => {
    const len = parent1.solution.length;
    const child1 = Array(len).fill(null);
    const child2 = Array(len).fill(null);
    const positions = [];
    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.5) {
        child1[i] = parent1.solution[i];
        child2[i] = parent2.solution[i];
        positions.push(i);
      }
    }
    let fillIndex1 = 0;
    let fillIndex2 = 0;
    for (let i = 0; i < len; i++) {
      if (!positions.includes(i)) {
        while (child1.includes(parent2.solution[fillIndex1])) fillIndex1++;
        child1[i] = parent2.solution[fillIndex1++];
        while (child2.includes(parent1.solution[fillIndex2])) fillIndex2++;
        child2[i] = parent1.solution[fillIndex2++];
      }
    }
    return [new Chromosome(child1 as number[]), new Chromosome(child2 as number[])];
  };

  // breeding function used for lion inspired algorithm
  const breed = (parent1: Lion, parent2: Lion) => {
    const len = parent1.solution.length;
    const start = Math.floor(Math.random() * len);
    const end = Math.floor(Math.random() * (len - start)) + start;
    const slice1 = parent1.solution.slice(start, end);
    const fillFromParent2 = parent2.solution.filter(city => !slice1.includes(city));
    const child1 = [
      ...fillFromParent2.slice(0, start),
      ...slice1,
      ...fillFromParent2.slice(start)
    ];
    const slice2 = parent2.solution.slice(start, end);
    const fillFromParent1 = parent1.solution.filter(city => !slice2.includes(city));
    const child2 = [
      ...fillFromParent1.slice(0, start),
      ...slice2,
      ...fillFromParent1.slice(start)
    ];
    return [new Lion(child1, 1), new Lion(child2, 0)];
  }

  // moving solution closer to a solution
  const move = (solution: number[], target: number[], probability: number): number[] => {
    const len = solution.length;
    const newSolution = Array(len).fill(null);
    const positions = [];
    for (let i = 0; i < len; i++) {
      if (Math.random() < probability) {
        newSolution[i] = target[i];
        positions.push(i);
      }
    }
    let fillIndex1 = 0;
    for (let i = 0; i < len; i++) {
      if (!positions.includes(i)) {
        while (newSolution.includes(solution[fillIndex1])) fillIndex1++;
        newSolution[i] = solution[fillIndex1++];
      }
    }
    return newSolution;
  };

  // generating solution around a solution to simulate whale movement or determining where the prey is
  const spiralMove = (solution: number[]): number[] => {
    const len = solution.length;
    const i = Math.floor(Math.random() * (len - 1));
    let j = Math.floor(Math.random() * (len - 1));
    if (j <= i) j = i + 1; // j must be greater than i
    const newSolution = [...solution];
    const subArray = newSolution.slice(i + 1, j + 1).reverse();
    newSolution.splice(i + 1, j - i, ...subArray);
    return newSolution;
  };

  // small mutation of each solution to maintain diversity - swapping cities
  const mutate = (population: Chromosome[] | Lion[], mutationRate: number) => {
    population.forEach(individual => {
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

  // returning problems name
  const getProblemType = () => {
    return 'Obchodný cestujúci'
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
