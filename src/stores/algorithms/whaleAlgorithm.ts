import type { useKnapsackProblem } from 'stores/problems/knapsackProblem'
import type { useBinProblem } from 'stores/problems/binProblem'
import type { useSalesmanProblem } from 'stores/problems/salesmanProblem'
import { useParamStore } from 'stores/paramStore'
import { Whale } from 'stores/individuals/whale'
import { savePopulation } from 'stores/db'

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

export const whaleAlgorithm = async (problemToSolve:
                                | ReturnType<typeof useKnapsackProblem>
                                | ReturnType<typeof useBinProblem>
                                | ReturnType<typeof useSalesmanProblem>) => {
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
