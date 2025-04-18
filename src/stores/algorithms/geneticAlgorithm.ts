import type { useKnapsackProblem } from 'stores/problems/knapsackProblem'
import type { useBinProblem } from 'stores/problems/binProblem'
import type { useSalesmanProblem } from 'stores/problems/salesmanProblem'
import { Chromosome } from 'stores/individuals/chromosome'
import { useParamStore } from 'stores/paramStore'
import { HistoryEntry } from 'stores/individuals/HistoryEntry'
import { useHistory } from 'stores/history'
import { storeToRefs } from 'pinia'

const createPopulation = (problemToSolve:
                            | ReturnType<typeof useKnapsackProblem>
                            | ReturnType<typeof useBinProblem>
                            | ReturnType<typeof useSalesmanProblem>,
                          size: number) => {
  const solutions: void | number[][] = problemToSolve.createSolutions(size)
  const population: Chromosome[] = []
  if (solutions) {
    solutions.forEach(solution => {
      population.push(new Chromosome(solution));
    });
  }
  return population
}

const evaluateIndividuals = (problemToSolve:
                               | ReturnType<typeof useKnapsackProblem>
                               | ReturnType<typeof useBinProblem>
                               | ReturnType<typeof useSalesmanProblem>,
                             population: Chromosome[]) => {
  population.forEach(individual => {
    const fitness = problemToSolve.calculateFitness(individual.solution)
    if (fitness) {
      individual.fitness = fitness
    }
  });
  return population;
}

const applyElitism = (population: Chromosome[], elitismRate: number) => {
  const eliteNumber = population.length / 100 * elitismRate
  const sortedPopulation = [...population].sort((a, b) => b.fitness - a.fitness);
  return sortedPopulation.slice(0, eliteNumber);
}

const tournamentSelection = (population: Chromosome[], tournamentSize: number) => {
  const available = population.filter(chromosome => chromosome.timesCrossed < 4);
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, tournamentSize);
  const parent = selected.reduce((best, current) => (current.fitness > best.fitness ? current : best));
  parent.timesCrossed++;
  return parent;
};

const rouletteSelection = (population: Chromosome[]) => {
  const available = population.filter(chromosome => chromosome.timesCrossed < 4);
  const totalFitness = available.reduce((sum, chromosome) => sum + chromosome.fitness, 0);
  const threshold = Math.random() * totalFitness;
  let cumulativeFitness = 0;
  for (const chromosome of available) {
    cumulativeFitness += chromosome.fitness;
    if (cumulativeFitness >= threshold) {
      chromosome.timesCrossed++;
      return chromosome;
    }
  }
};

const onePointCrossover = (parent1: Chromosome, parent2: Chromosome) => {
  const crossoverPoint = Math.floor(Math.random() * (parent1.solution.length - 2)) + 1;
  const firstBreed = [...parent1.solution.slice(0, crossoverPoint), ...parent2.solution.slice(crossoverPoint)]
  const secondBreed = [...parent2.solution.slice(0, crossoverPoint), ...parent1.solution.slice(crossoverPoint)]
  return [new Chromosome(firstBreed), new Chromosome(secondBreed)]
};

const twoPointCrossover = (parent1: Chromosome, parent2: Chromosome) => {
  const firstCrossoverPoint = Math.floor(Math.random() * (parent1.solution.length - 3)) + 1;
  let secondCrossoverPoint = 0
  while (secondCrossoverPoint < firstCrossoverPoint) {
    secondCrossoverPoint = Math.floor(Math.random() * (parent1.solution.length - 2)) + 1;
  }
  const firstBreed = [...parent1.solution.slice(0, firstCrossoverPoint), ...parent2.solution.slice(firstCrossoverPoint, secondCrossoverPoint), ...parent1.solution.slice(secondCrossoverPoint)]
  const secondBreed = [...parent2.solution.slice(0, firstCrossoverPoint), ...parent1.solution.slice(firstCrossoverPoint, secondCrossoverPoint), ...parent2.solution.slice(secondCrossoverPoint)]
  return [new Chromosome(firstBreed), new Chromosome(secondBreed)]
};

const uniformCrossover = (parent1: Chromosome, parent2: Chromosome) => {
  const firstBreed = []
  const secondBreed = []
  for (let i = 0; i < parent1.solution.length; i++) {
    const uniform = Math.floor(Math.random() * 2);
    if (uniform === 0) {
      firstBreed.push(parent1.solution[i])
      secondBreed.push(parent2.solution[i])
    }
    else {
      firstBreed.push(parent2.solution[i])
      secondBreed.push(parent1.solution[i])
    }
  }
  return [new Chromosome(firstBreed as number[]), new Chromosome(secondBreed as number[])]
};

const crossover = (problemToSolve:
                     | ReturnType<typeof useKnapsackProblem>
                     | ReturnType<typeof useBinProblem>
                     | ReturnType<typeof useSalesmanProblem>,
                   population: Chromosome[], newGeneration: Chromosome[], choose: string, tournamentSize: number | null, crossing: string, size: number, mutation: number) => {
  let parent1 = null
  let parent2 = null
  while (newGeneration.length != population.length) {
    if (choose == 'tournament' && tournamentSize) {
      parent1 = tournamentSelection(population, tournamentSize)
    }
    else if (choose == 'roulette') {
      parent1 = rouletteSelection(population)
    }
    while (parent2 == null || parent2 == parent1) {
      if (choose == 'tournament' && tournamentSize) {
        parent2 = tournamentSelection(population, tournamentSize)
      }
      else if (choose == 'roulette') {
        parent2 = rouletteSelection(population)
      }
    }
    if (parent1 && parent2) {
      let breeds: Chromosome[] = []
      if (crossing == 'one') {
        breeds = onePointCrossover(parent1, parent2)
      }
      else if (crossing == 'two') {
        breeds = twoPointCrossover(parent1, parent2)
      }
      else if (crossing == 'uni') {
        breeds = uniformCrossover(parent1, parent2)
      }
      breeds = problemToSolve.mutate(breeds, mutation) as Chromosome[];
      for (let i = 0; i < breeds.length; i++) {
        if (newGeneration.length != size) {
          newGeneration.push(breeds[i] as Chromosome)
        }
      }
    }
  }
  return newGeneration
}

const createNewGeneration = (problemToSolve:
                               | ReturnType<typeof useKnapsackProblem>
                               | ReturnType<typeof useBinProblem>
                               | ReturnType<typeof useSalesmanProblem>,
                             population: Chromosome[], elitism: boolean, elitismRate: number, choose: string, tournamentSize: number | null , crossing: string, size: number, mutation: number) => {
  let newGeneration: Chromosome[] = []
  if (elitism) {
    newGeneration = applyElitism(population, elitismRate)
  }
  newGeneration = crossover(problemToSolve, population, newGeneration, choose, tournamentSize, crossing, size, mutation)
  console.log("check")
  return newGeneration;
}

const savePopulation = (populationHistory: Chromosome[][], population: Chromosome[]) => {
  populationHistory.push(population)
  return populationHistory;
}

const saveResult = (problemToSolve:
                      | ReturnType<typeof useKnapsackProblem>
                      | ReturnType<typeof useBinProblem>
                      | ReturnType<typeof useSalesmanProblem>,
                    populationHistory: Chromosome[][]) => {
  const paramStore = useParamStore()
  const history = useHistory();
  const { entries } = storeToRefs(history);
  const visSolution: number[][][][] = []
  let count = 0;
  let capacity = 0;
  let averageWeight = 0;
  let averagePrice = 0;
  if (problemToSolve.getProblemType() == 'Batoh') {
    count = paramStore.knapsackItems.length;
    capacity = paramStore.capacity as number
    let totalWeight = 0;
    let totalPrice = 0;
    paramStore.knapsackItems.forEach(item => {
      totalPrice += item.price;
      totalWeight += item.size;
    })
    averageWeight = Math.round((totalWeight / paramStore.knapsackItems.length) * 100) / 100;
    averagePrice = Math.round((totalPrice / paramStore.knapsackItems.length) * 100) / 100;
    populationHistory.forEach(generation => {
      const gen: number[][][] = []
      generation.forEach(individual => {
        const sol: number[][] = []
        individual.solution.forEach((index, i) => {
          if (index == 1) {
            sol.push([paramStore.knapsackItems[i]?.price ?? 0, paramStore.knapsackItems[i]?.size ?? 0]);
          }
        })
        gen.push(sol)
      })
      visSolution.push(gen)
    })
  }
  if (problemToSolve.getProblemType() == 'Koše') {
    count = paramStore.binItems.length;
    capacity = paramStore.capacity as number
    let totalWeight = 0;
    paramStore.binItems.forEach(item => {
      totalWeight += item.size;
    })
    averageWeight = Math.round((totalWeight / paramStore.binItems.length) * 100) / 100;
  }
  if (problemToSolve.getProblemType() == 'Obchodný cestujúci') {
    count = paramStore.cities.length + 1;
    populationHistory.forEach(generation => {
      const gen: number[][][] = []
      generation.forEach(individual => {
        const sol: number[][] = [[paramStore.start[0]?.x ?? 0, paramStore.start[0]?.y ?? 0]]
        individual.solution.forEach(index => {
          sol.push([paramStore.cities[index]?.x ?? 0, paramStore.cities[index]?.y ?? 0]);
        })
        gen.push(sol)
      })
      visSolution.push(gen)
    })
  }
  const fitness: number[][] = []
  populationHistory.forEach(generation => {
    const currentFitness: number[] = []
    generation.forEach(individual => {
      currentFitness.push(individual.fitness);
    })
    fitness.push(currentFitness)
  })
  const result = new HistoryEntry(visSolution, 'Genetický', problemToSolve.getProblemType(), fitness, { mutation: paramStore.mutation as number, elitism: paramStore.showNewInput, elitismRate: paramStore.elitism as number, choose: paramStore.choose as string, crossing: paramStore.crossing as string, count: count, capacity: capacity, averageWeight: averageWeight, averagePrice: averagePrice});
  populationHistory.forEach(entry => {
    let max = 0
    let average = 0
    entry.forEach(individual => {
      if (individual.fitness > max)
        max = individual.fitness
      average += individual.fitness
    })
    average = average / entry.length
    result.bestFitness.push(max)
    result.averageFitness.push(average)
    max = 0
    average = 0
  })
  entries.value.push(result)
  console.log(result)
}

export const geneticAlgorithm = (problemToSolve:
                                   | ReturnType<typeof useKnapsackProblem>
                                   | ReturnType<typeof useBinProblem>
                                   | ReturnType<typeof useSalesmanProblem>) => {
  const paramStore = useParamStore()
  let populationHistory: Chromosome[][] = []

  let population = createPopulation(problemToSolve, paramStore.population as number)
  population = evaluateIndividuals(problemToSolve, population)
  if (paramStore.iterations && paramStore.elitism !== null && paramStore.mutation !== null && paramStore.choose && paramStore.crossing && paramStore.population) {
    for (let i = 0; i < paramStore.iterations; i++) {
      populationHistory = savePopulation(populationHistory, population)
      population = createNewGeneration(problemToSolve, population, paramStore.showNewInput, paramStore.elitism, paramStore.choose, paramStore.tournamentSize, paramStore.crossing, paramStore.population, paramStore.mutation)
      population = evaluateIndividuals(problemToSolve, population)
    }
    saveResult(problemToSolve, populationHistory)
  }
}
