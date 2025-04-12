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

const move = (lion: Lion, target: number[], probability: number): Lion => {
  const newSolution = [...lion.solution];
  const newLion: Lion = { ...lion, solution: newSolution };

  for (let i = 0; i < newLion.solution.length; i++) {
    const lionGene = newLion.solution[i];
    const targetGene = target[i];
    if (lionGene !== undefined && targetGene !== undefined) {
      if (probability > Math.random()) {
        if (lionGene > targetGene) {
          newLion.solution[i] = lionGene - 1;
        } else if (lionGene < targetGene) {
          newLion.solution[i] = lionGene + 1;
        }
      }
    }
  }
  return newLion;
};


const hunt = (population: Lion[][], huntersNumber: number) => {
  const newPopulation: Lion[][] = []
  population.forEach((pack, index) => {
    console.log(population)
    if (index < population.length - 1) {
      const newPack: Lion[] = []
      const males: Lion[] = []
      let females: Lion[] = []
      pack.forEach(individual => {
        if (individual.sex === 1) {
          males.push(individual)
        }
        else {
          females.push(individual)
        }
      })
      females = [...females].sort(() => Math.random() - 0.5);
      const hunters = females.slice(0, huntersNumber);
      const others = females.slice(huntersNumber);
      const third = Math.round(huntersNumber / 3);
      const group1 = hunters.slice(0, third);
      const group2 = hunters.slice(third, third * 2);
      const group3 = hunters.slice(third * 2);
      const group1fitness = group1.reduce((sum, h) => sum + h.fitness, 0);
      const group2fitness = group2.reduce((sum, h) => sum + h.fitness, 0);
      const group3fitness = group3.reduce((sum, h) => sum + h.fitness, 0);
      const groups = [
        { group: group1, fitness: group1fitness },
        { group: group2, fitness: group2fitness },
        { group: group3, fitness: group3fitness }
      ].sort((a, b) => b.fitness - a.fitness);
      let center: Lion[] = [], leftWing: Lion[] = [], rightWing: Lion[] = [];
      if (groups[0] && groups[1] && groups[2]) {
        center = [...groups[0].group];
        leftWing = [...groups[1].group];
        rightWing = [...groups[2].group];
      }
      const prey: number[] = [];
      if (females[0]) {
        for (let i = 0; i < females[0].solution.length; i++) {
          const randomHunter = females[Math.floor(Math.random() * huntersNumber)];
          prey.push(randomHunter?.solution[i] ?? 0);
        }
      }
      while (center.length !== 0 || leftWing.length !== 0 || rightWing.length !== 0) {
        const groupToAttack = Math.floor(Math.random() * 3);
        let attacker;
        // let fitnessBeforeHunt;
        if (groupToAttack === 0 && center.length > 0) {
          attacker = center.shift();
          if (attacker) {
            attacker = move(attacker, prey, 0.25)
            newPack.push(attacker)
          }
        } else if (groupToAttack === 1 && leftWing.length > 0) {
          attacker = leftWing.shift();
          if (attacker) {
            attacker = move(attacker, prey, 0.5)
            newPack.push(attacker)
          }
        } else if (groupToAttack === 2 && rightWing.length > 0) {
          attacker = rightWing.shift();
          if (attacker) {
            attacker = move(attacker, prey, 0.5)
            newPack.push(attacker)
          }
        }
      }
      others.forEach(individual => {
        newPack.push(individual);
      })
      males.forEach(individual => {
        newPack.push(individual);
      })
      newPopulation.push(newPack)
    }
    else {
      const newPack: Lion[] = []
      pack.forEach((individual) => {
        newPack.push(individual);
      })
      newPopulation.push(newPack)
    }
  })
  return newPopulation
};

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
  if (paramStore.packs != null && paramStore.males != null && paramStore.females != null && paramStore.hunters != null && paramStore.iterations) {
    let population = createPopulation(problemToSolve, paramStore.packs, paramStore.females, paramStore.males)
    population = evaluateIndividuals(problemToSolve, population)
    for (let i = 0; i < paramStore.iterations; i++) {
      populationHistory = savePopulation(populationHistory, population)
      population = hunt(population, paramStore.females / 100 * paramStore.hunters)
      population = evaluateIndividuals(problemToSolve, population)
    }
    saveResult(problemToSolve, populationHistory)
  }
}
