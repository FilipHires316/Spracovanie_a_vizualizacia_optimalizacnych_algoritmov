import type { useKnapsackProblem } from 'stores/problems/knapsackProblem'
import type { useBinProblem } from 'stores/problems/binProblem'
import type { useSalesmanProblem } from 'stores/problems/salesmanProblem'
import { useParamStore } from 'stores/paramStore'
import { HistoryEntry } from 'stores/individuals/HistoryEntry'
import { useHistory } from 'stores/history'
import { storeToRefs } from 'pinia'
import { Whale } from 'stores/individuals/whale'

const createPopulation = (problemToSolve:
                            | ReturnType<typeof useKnapsackProblem>
                            | ReturnType<typeof useBinProblem>
                            | ReturnType<typeof useSalesmanProblem>,
                          size: number) => {
  const solutions: void | number[][] = problemToSolve.createSolutions(size)
  const population: Whale[] = []
  if (solutions) {
    solutions.forEach(solution => {
      population.push(new Whale(solution));
    });
  }
  return population
}

const evaluateIndividuals = (problemToSolve:
                               | ReturnType<typeof useKnapsackProblem>
                               | ReturnType<typeof useBinProblem>
                               | ReturnType<typeof useSalesmanProblem>,
                             population: Whale[]) => {
  population.forEach(individual => {
    const fitness = problemToSolve.calculateFitness(individual.solution)
    if (fitness) {
      individual.fitness = fitness
    }
  });
  return population;
}

const savePopulation = (populationHistory: Whale[][], population: Whale[]) => {
  populationHistory.push(population)
  return populationHistory;
}

const saveResult = (problemToSolve:
                      | ReturnType<typeof useKnapsackProblem>
                      | ReturnType<typeof useBinProblem>
                      | ReturnType<typeof useSalesmanProblem>,
                    populationHistory: Whale[][]) => {
  const history = useHistory();
  const { entries } = storeToRefs(history);
  const result = new HistoryEntry(populationHistory, 'genetic', problemToSolve.getProblemType())
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
}

export const whaleAlgorithm = (problemToSolve:
                                | ReturnType<typeof useKnapsackProblem>
                                | ReturnType<typeof useBinProblem>
                                | ReturnType<typeof useSalesmanProblem>) => {
  const paramStore = useParamStore()
  let populationHistory: Whale[][] = []
  if (paramStore.population && paramStore.iterations) {
    let population = createPopulation(problemToSolve, paramStore.population)
    population = evaluateIndividuals(problemToSolve, population)
    for (let i = 0; i < paramStore.iterations; i++) {
      populationHistory = savePopulation(populationHistory, population)
      population = evaluateIndividuals(problemToSolve, population)
    }
    saveResult(problemToSolve, populationHistory)
  }
}
