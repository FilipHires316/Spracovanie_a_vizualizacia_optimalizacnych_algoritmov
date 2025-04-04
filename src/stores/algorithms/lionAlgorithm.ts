import type { useKnapsackProblem } from 'stores/problems/knapsackProblem'
import type { useBinProblem } from 'stores/problems/binProblem'
import type { useSalesmanProblem } from 'stores/problems/salesmanProblem'
import { useParamStore } from 'stores/paramStore'
import { HistoryEntry } from 'stores/individuals/HistoryEntry'
import { useHistory } from 'stores/history'
import { storeToRefs } from 'pinia'
import { Lion } from 'stores/individuals/lion'

const createPopulation = (problemToSolve:
                            | ReturnType<typeof useKnapsackProblem>
                            | ReturnType<typeof useBinProblem>
                            | ReturnType<typeof useSalesmanProblem>,
                          packsNumber: number, femalesNumber: number, malesNumber: number) => {
  const solutions: void | number[][] = problemToSolve.createSolutions(((packsNumber + 1) * (malesNumber + femalesNumber)))
  const population: Lion[][] = []
  if (solutions) {
    let i = 0
    while (population.length < packsNumber) {
      const pack = []
      while (pack.length < femalesNumber + malesNumber) {
        if (pack.length < femalesNumber) {
          pack.push(new Lion(solutions[i] as number[], 0))
        }
        else {
          pack.push(new Lion(solutions[i] as number[], 1))
        }
        i++
      }
      population.push(pack)
      console.log(population)
    }
    const pack = []
    while (pack.length < femalesNumber + malesNumber) {
      if (pack.length < femalesNumber) {
        pack.push(new Lion(solutions[i] as number[], 1))
      }
      else {
        pack.push(new Lion(solutions[i] as number[], 0))
      }
      i++
    }
    population.push(pack)
  }
  return population
}

const evaluateIndividuals = (problemToSolve:
                               | ReturnType<typeof useKnapsackProblem>
                               | ReturnType<typeof useBinProblem>
                               | ReturnType<typeof useSalesmanProblem>,
                             population: Lion[][]) => {
  population.forEach(pack => {
    pack.forEach(individual => {
      const fitness = problemToSolve.calculateFitness(individual.solution);
      if (fitness) {
        individual.fitness = fitness;
      }
    });
  });
  return population;

}

const savePopulation = (populationHistory: Lion[][][], population: Lion[][]) => {
  populationHistory.push(population)
  return populationHistory;
}

const saveResult = (problemToSolve:
                      | ReturnType<typeof useKnapsackProblem>
                      | ReturnType<typeof useBinProblem>
                      | ReturnType<typeof useSalesmanProblem>,
                    populationHistory: Lion[][][]) => {
  const history = useHistory();
  const unpack2: Lion[][] = []
  populationHistory.forEach(generation => {
    const unpack1: Lion[] = []
    generation.forEach(pack => {
      pack.forEach(individual => {
        unpack1.push(individual)
      });
    });
    unpack2.push(unpack1)
  });
  const { entries } = storeToRefs(history);
  const result = new HistoryEntry(unpack2, 'lion', problemToSolve.getProblemType())
  unpack2.forEach(entry => {
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

export const lionAlgorithm = (problemToSolve:
                                   | ReturnType<typeof useKnapsackProblem>
                                   | ReturnType<typeof useBinProblem>
                                   | ReturnType<typeof useSalesmanProblem>) => {
  const paramStore = useParamStore()
  let populationHistory: Lion[][][] = []
  if (paramStore.packs != null && paramStore.males != null && paramStore.females != null && paramStore.iterations) {
    let population = createPopulation(problemToSolve, paramStore.packs, paramStore.females, paramStore.males)
    population = evaluateIndividuals(problemToSolve, population)
    for (let i = 0; i < paramStore.iterations; i++) {
      populationHistory = savePopulation(populationHistory, population)
      population = evaluateIndividuals(problemToSolve, population)
    }
    saveResult(problemToSolve, populationHistory)
  }
}
