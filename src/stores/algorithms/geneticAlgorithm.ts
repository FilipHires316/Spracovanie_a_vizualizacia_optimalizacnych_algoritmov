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
                            | ReturnType<typeof useSalesmanProblem>) => {
  const solutions: void | number[][] = problemToSolve.createSolutions()
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
                             population: Chromosome[], iteration: number) => {
  population.forEach(individual => {
    const fitness = problemToSolve.calculateFitness(individual.solution, iteration)
    if (fitness) {
      individual.fitness = fitness
    }
  });
  return population;
}

const applyElitism = (population: Chromosome[], elitismRate: number) => {
  const eliteNumber = population.length / 100 * elitismRate
  population.sort((a, b) => b.fitness - a.fitness);
  return population.slice(0, eliteNumber);
}

const createNewGeneration = (population: Chromosome[], elitism: boolean, elitismRate: number) => {
  let newGeneration: Chromosome[] = []
  if (elitism) {
    newGeneration = applyElitism(population, elitismRate)
  }
  return newGeneration;
}

const mutate = (population: Chromosome[], mutationRate: number) => {
  population.forEach(individual => {
    for (let index = 0; index < individual.solution.length; index++) {
      if (Math.random() * 100 < mutationRate) {
        individual.solution[index] = individual.solution[index] === 0 ? 1 : 0;
      }
    }
  });
  return population;
};

const savePopulation = (populationHistory: Chromosome[][], population: Chromosome[]) => {
  populationHistory.push(population)
  return populationHistory;
}

const saveResult = (problemToSolve:
                      | ReturnType<typeof useKnapsackProblem>
                      | ReturnType<typeof useBinProblem>
                      | ReturnType<typeof useSalesmanProblem>,
                    populationHistory: Chromosome[][]) => {
  const history = useHistory();
  const { entries } = storeToRefs(history);
  const result = new HistoryEntry(populationHistory, 'genetic', problemToSolve.getProblemType())
  entries.value.push(result)
}

export const geneticAlgorithm = (problemToSolve:
                                   | ReturnType<typeof useKnapsackProblem>
                                   | ReturnType<typeof useBinProblem>
                                   | ReturnType<typeof useSalesmanProblem>) => {
  const paramStore = useParamStore()
  let populationHistory: Chromosome[][] = []

  let population = createPopulation(problemToSolve)
  population = evaluateIndividuals(problemToSolve, population, 1)
  if (paramStore.iterations && paramStore.elitism && paramStore.mutation) {
    for (let i = 0; i < paramStore.iterations; i++) {
      populationHistory = savePopulation(populationHistory, population)
      population = createNewGeneration(population, paramStore.showNewInput, paramStore.elitism)
      population = mutate(population, paramStore.mutation)
      population = evaluateIndividuals(problemToSolve, population, i + 2)
    }
    saveResult(problemToSolve, populationHistory)
  }
}
