import type { useKnapsackProblem } from 'stores/problems/knapsackProblem'
import type { useBinProblem } from 'stores/problems/binProblem'
import type { useSalesmanProblem } from 'stores/problems/salesmanProblem'
import { useParamStore } from 'stores/paramStore'
import { Whale } from 'stores/individuals/whale'
import { savePopulation } from 'stores/db'

// creating starting population based on its size
const createPopulation = (
  problemToSolve:
    | ReturnType<typeof useKnapsackProblem>
    | ReturnType<typeof useBinProblem>
    | ReturnType<typeof useSalesmanProblem>,
  size: number,
) => {
  const solutions: void | number[][] = problemToSolve.createSolutions(size)
  const population: Whale[] = []
  if (solutions) {
    solutions.forEach((solution) => {
      population.push(new Whale(solution))
    })
  }
  return population
}

// Creating starting population based on its size
const evaluateIndividuals = (
  problemToSolve:
    | ReturnType<typeof useKnapsackProblem>
    | ReturnType<typeof useBinProblem>
    | ReturnType<typeof useSalesmanProblem>,
  population: Whale[],
) => {
  population.forEach((individual) => {
    individual.fitness = problemToSolve.calculateFitness(individual.solution)
  })
  return population
}

// Logic for moving whales trough search space each whale make 1 out of 3 possible moves
const relocate = (problemToSolve:
                    | ReturnType<typeof useKnapsackProblem>
                    | ReturnType<typeof useBinProblem>
                    | ReturnType<typeof useSalesmanProblem>,
                  population: Whale[],
                  iteration: number,
                  maxIteration: number) => {
  const newPopulation: Whale[] = []
  const bestIndividual = population.reduce((best, current) => {
    if (!best || current.fitness > best.fitness) {
      return current;
    }
    return best;
  }, population[0]);
  population.forEach((individual) => {
    if (individual !== bestIndividual) {
      const p = Math.random()
      if (p < 0.5) {
        const a = 2 - iteration * (2 / maxIteration)
        const r = Math.random()
        const A = 2 * a * r - a
        let target = population[Math.floor(Math.random() * population.length)]
        if (A < 1) {
          target = bestIndividual;
        }
        // moving towards best or random solution - later iterations supports moving to best while sooner are supporting exploration more
        if (target) {
          individual.solution = problemToSolve.move(individual.solution, target.solution, 0.3)
          newPopulation.push(individual)
        }
      }
      //or making spiral movement around target
      else {
        const target = bestIndividual
        if (target) {
          individual.solution = problemToSolve.spiralMove(target.solution)
          newPopulation.push(individual)
        }
      }
    } else {
      newPopulation.push(individual)
    }
  })
  return newPopulation
}

// main layout for whale inspired algorithm
export const whaleAlgorithm = async (
  problemToSolve:
    | ReturnType<typeof useKnapsackProblem>
    | ReturnType<typeof useBinProblem>
    | ReturnType<typeof useSalesmanProblem>,
) => {
  const paramStore = useParamStore()
  if (paramStore.population && paramStore.iterations) {
    let population = createPopulation(problemToSolve, paramStore.population)
    population = evaluateIndividuals(problemToSolve, population)
    for (let i = 0; i < paramStore.iterations; i++) {
      population = relocate(problemToSolve, population, i, paramStore.iterations)
      population = evaluateIndividuals(problemToSolve, population)
      await savePopulation(i, population)
    }
  }
}
