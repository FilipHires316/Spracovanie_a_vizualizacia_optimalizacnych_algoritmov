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

function spiralMove(type: string, whale: Whale, target: number[], spiralProb: number) {
  const newSolution = [...whale.solution];
  const b = 1;
  const l = Math.random() * 2 - 1; // l in [-1, 1]

  for (let i = 0; i < newSolution.length; i++) {
    const whaleGene = newSolution[i];
    const targetGene = target[i];

    if (whaleGene != undefined && targetGene != undefined && Math.random() < spiralProb) {
      const D = Math.abs(whaleGene - targetGene) + 1e-6; // avoid zero distance
      const spiralStep = Math.floor(D * Math.exp(b * l) * Math.cos(2 * Math.PI * l));

      if (type === 'Batoh') {
        const flipProb = Math.min(1, Math.abs(spiralStep) / (D + 1));
        if (Math.random() < flipProb) {
          newSolution[i] = whaleGene === 1 ? 0 : 1;
        }

      } else if (type === 'Koše') {
        let updatedGene = whaleGene;
        if (whaleGene < targetGene) {
          updatedGene += Math.min(spiralStep, targetGene - whaleGene);
        } else if (whaleGene > targetGene) {
          updatedGene -= Math.min(spiralStep, whaleGene - targetGene);
        }
        newSolution[i] = updatedGene;

      } else if (type === 'Obchodný cestujúci') {
        const j = (i + spiralStep + newSolution.length) % newSolution.length;
        if (i !== j && newSolution[i] !== newSolution[j]) {
          const temp = newSolution[i];
          newSolution[i] = newSolution[j] as number;
          newSolution[j] = temp as number;
        }
      }
    }
  }
  return { ...whale, solution: newSolution };
}

const move = (problemToSolve:
                | ReturnType<typeof useKnapsackProblem>
                | ReturnType<typeof useBinProblem>
                | ReturnType<typeof useSalesmanProblem>,
              whale: Whale, target: number[], probability: number): Whale => {
  const newSolution = [...whale.solution];
  const newWhale: Whale = { ...whale, solution: newSolution };
  for (let i = 0; i < newWhale.solution.length; i++) {
    const whaleGene = newWhale.solution[i];
    const targetGene = target[i];
    if (whaleGene !== undefined && targetGene !== undefined) {
      if (probability > Math.random()) {
        if (whaleGene > targetGene) {
          newWhale.solution[i] = whaleGene - 1;
        } else if (whaleGene < targetGene) {
          newWhale.solution[i] = whaleGene + 1;
        }
      }
    }
  }
  newWhale.solution = problemToSolve.rearrange(newWhale.solution);
  return newWhale;
};

const relocate = (problemToSolve:
                 | ReturnType<typeof useKnapsackProblem>
                 | ReturnType<typeof useBinProblem>
                 | ReturnType<typeof useSalesmanProblem>,
               population: Whale[], iteration: number, maxIteration: number) => {
  const newPopulation: Whale[] = []
  population.forEach((individual) => {
    if (individual !== [...population].sort((a, b) => b.fitness - a.fitness)[0]) {
      const p = Math.random()
      if (p < 0.5) {
        const a = 2 - iteration * (2 / maxIteration)
        const r = Math.random()
        const A = 2*a * r - a
        let target = population[Math.floor(Math.random() * population.length)]
        if (A < 1) {
          target = [...population].sort((a, b) => b.fitness - a.fitness)[0];
        }
        if (target) {
          newPopulation.push(move(problemToSolve, individual, target.solution, r))
        }
      }
      else {
        const target = [...population].sort((a, b) => b.fitness - a.fitness)[0]
        const spiralProb = (2 - iteration * (2 / maxIteration)) / 2
        if (target) {
          newPopulation.push(spiralMove(problemToSolve.getProblemType(), individual, target.solution, spiralProb))
        }
      }
    }
    else {
      newPopulation.push(individual)
    }
  })
  return newPopulation
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
  const paramStore = useParamStore()
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
  }
  const result = new HistoryEntry(populationHistory, 'Veľryby', problemToSolve.getProblemType(), {count: count, capacity: capacity, averageWeight: averageWeight, averagePrice: averagePrice})
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
      population = relocate(problemToSolve, population, i, paramStore.iterations)
      population = evaluateIndividuals(problemToSolve, population)
    }
    saveResult(problemToSolve, populationHistory)
  }
}
