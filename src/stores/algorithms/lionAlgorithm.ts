import type { useKnapsackProblem } from 'stores/problems/knapsackProblem'
import type { useBinProblem } from 'stores/problems/binProblem'
import type { useSalesmanProblem } from 'stores/problems/salesmanProblem'
import { useParamStore } from 'stores/paramStore'
import { Lion } from 'stores/individuals/lion'
import { savePopulation } from 'stores/db'

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
        if (individual.fitness > individual.territoryValue) {
          individual.territoryValue = fitness;
          individual.territory = individual.solution
        }
      }
    });
  });
  return population;
}

const move = (problemToSolve:
                | ReturnType<typeof useKnapsackProblem>
                | ReturnType<typeof useBinProblem>
                | ReturnType<typeof useSalesmanProblem>,
              lion: Lion, target: number[], probability: number): Lion => {
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
  newLion.fitness = problemToSolve.calculateFitness(newLion.solution);
  if (newLion.fitness > newLion.territoryValue) {
    newLion.territoryValue = newLion.fitness;
    newLion.territory = newLion.solution
  }
  return newLion;
};


const hunt = (problemToSolve:
                | ReturnType<typeof useKnapsackProblem>
                | ReturnType<typeof useBinProblem>
                | ReturnType<typeof useSalesmanProblem>,
              population: Lion[][], huntersNumber: number) => {
  const newPopulation: Lion[][] = []
  population.forEach((pack, index) => {
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
            attacker = move(problemToSolve, attacker, prey, 0.25)
            newPack.push(attacker)
          }
        } else if (groupToAttack === 1 && leftWing.length > 0) {
          attacker = leftWing.shift();
          if (attacker) {
            attacker = move(problemToSolve, attacker, prey, 0.5)
            newPack.push(attacker)
          }
        } else if (groupToAttack === 2 && rightWing.length > 0) {
          attacker = rightWing.shift();
          if (attacker) {
            attacker = move(problemToSolve, attacker, prey, 0.5)
            newPack.push(attacker)
          }
        }
      }
      others.forEach(individual => {
        const direction = ([...pack].sort(() => Math.random() - 0.5)).slice(0, Math.ceil(pack.length / 10)).reduce((max, current) => current.territoryValue > max.territoryValue ? current : max);
        const strider = move(problemToSolve, individual, direction.territory, 0.75)
        newPack.push(strider);
      })
      males.forEach(individual => {
        let strider = { ...individual };
        const direction = ([...pack].sort(() => Math.random() - 0.5)).slice(0, Math.ceil(pack.length / 2))
        for (let i = 0; i < direction.length; i++) {
          strider = move(problemToSolve, strider, direction[i]?.territory ?? [], 0.75)
        }
        strider.solution = strider.territory
        strider.fitness = strider.territoryValue
        newPack.push(strider)
      })
      newPopulation.push(newPack)
    }
    else {
      const newPack: Lion[] = []
      pack.forEach((individual) => {
        const direction = problemToSolve.createSolutions(1)[0];
        if (direction) {
          const strider = move(problemToSolve, individual, direction, 0.75)
          newPack.push(strider);
        }
      })
      newPopulation.push(newPack)
    }
  })
  return newPopulation
};

const breed = (problemToSolve:
                      | ReturnType<typeof useKnapsackProblem>
                      | ReturnType<typeof useBinProblem>
                      | ReturnType<typeof useSalesmanProblem>,
                    population: Lion[][]) => {
  const newPopulation: Lion[][] = []
  population.forEach((pack) => {
    const newPack: Lion[] = []
    const males: Lion[] = []
    let females: Lion[] = []
    let father
    pack.forEach(individual => {
      if (individual.sex === 1) {
        males.push(individual)
      }
      else {
        females.push(individual)
      }
    })
    females = [...females].sort(() => Math.random() - 0.5);
    const mothers = [...females].slice(0, Math.ceil(females.length / 3))
    mothers.forEach(mother => {
      father = males[Math.floor(Math.random() * males.length)]
      if (father) {
        const crossoverPoint = Math.floor(Math.random() * (father.solution.length - 2)) + 1;
        const firstBreed = [...father.solution.slice(0, crossoverPoint), ...mother.solution.slice(crossoverPoint)]
        const secondBreed = [...mother.solution.slice(0, crossoverPoint), ...father.solution.slice(crossoverPoint)]
        const babyMale = new Lion(firstBreed, 1)
        const babyFemale = new Lion(secondBreed, 0)
        const babies = problemToSolve.mutate([babyFemale, babyMale], 3)
        babies.forEach(baby => {
          newPack.push(baby as Lion)
        })
      }
    })
    pack.forEach(individual => {
      newPack.push(individual)
    })
    newPopulation.push(newPack)
  })
  return newPopulation
}

const migration = (population: Lion[][], femalesNumber: number, malesNumber: number) => {
  const newPopulation: Lion[][] = []
  const newNewPopulation: Lion[][] = []
  const exiledFemales: Lion[] = []
  let exiledMales: Lion[] = []
  let nomadFemales: Lion[] = []
  let reExiledFemales: Lion[] = []
  population.forEach((pack, index) => {
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
    if (index < population.length - 1) {
      females = [...females].sort(() => Math.random() - 0.5);
      females.forEach((female, index) => {
        if (index < femalesNumber - Math.ceil(femalesNumber / 33)) {
          newPack.push(female)
        }
        else {
          exiledFemales.push(female)
        }
      })
      males.forEach(male => {
        newPack.push(male)
      })
      newPopulation.push(newPack)
    }
    else {
      females.forEach((female) => {
        nomadFemales.push(female)
      })
      exiledFemales.forEach(female => {
        nomadFemales.push(female)
      })
      nomadFemales.sort((a, b) => b.fitness - a.fitness);
      reExiledFemales = nomadFemales.slice(0, (Math.ceil(femalesNumber / 33) * newPopulation.length))
      reExiledFemales = [...reExiledFemales].sort(() => Math.random() - 0.5);
      nomadFemales = nomadFemales.slice((Math.ceil(femalesNumber / 33) * newPopulation.length), (Math.ceil(femalesNumber / 33) * newPopulation.length) + malesNumber)
      nomadFemales.forEach((female) => {
        newPack.push(female)
      })
      males.forEach(male => {
        const attackedPack = Math.floor(Math.random() * newPopulation.length);
        if (newPopulation[attackedPack]) {
          newPopulation[attackedPack].push(male)
        }
      })
      newPopulation.push(newPack)
    }
  })
  newPopulation.forEach((pack, index) => {
    const newPack: Lion[] = []
    const males: Lion[] = []
    const females: Lion[] = []
    pack.forEach(individual => {
      if (individual.sex === 1) {
        males.push(individual)
      }
      else {
        females.push(individual)
      }
    })
    if (index < population.length - 1) {
      while (females.length < femalesNumber) {
        females.push(reExiledFemales.shift() as Lion)
      }
      females.forEach(female => {
        newPack.push(female)
      })
      males.sort((a, b) => b.fitness - a.fitness);
      males.forEach((male, index) => {
        if (index < malesNumber) {
          newPack.push(male)
        }
        else {
          exiledMales.push(male)
        }
      })
      newNewPopulation.push(newPack)
    }
    else {
      exiledMales.sort((a, b) => b.fitness - a.fitness);
      exiledMales = exiledMales.slice(0, femalesNumber)
      females.forEach(female => {
        newPack.push(female)
      })
      exiledMales.forEach(male => {
        newPack.push(male)
      })
      newNewPopulation.push(newPack)
    }
  })
  return newNewPopulation
};

const unpack = (population: Lion[][]) => {
  const unpack: Lion[] = []
  population.forEach(pack => {
    pack.forEach(individual => {
      unpack.push(individual)
    });
  });
  return unpack
}

export const lionAlgorithm = async (problemToSolve:
                                   | ReturnType<typeof useKnapsackProblem>
                                   | ReturnType<typeof useBinProblem>
                                   | ReturnType<typeof useSalesmanProblem>) => {
  const paramStore = useParamStore()
  if (paramStore.packs != null && paramStore.males != null && paramStore.females != null && paramStore.hunters != null && paramStore.iterations) {
    let population = createPopulation(problemToSolve, paramStore.packs, paramStore.females, paramStore.males)
    population = evaluateIndividuals(problemToSolve, population)
    for (let i = 0; i < paramStore.iterations; i++) {
      population = hunt(problemToSolve, population, paramStore.females / 100 * paramStore.hunters)
      population = breed(problemToSolve, population)
      population = evaluateIndividuals(problemToSolve, population)
      population = migration(population, paramStore.females, paramStore.males)
      await savePopulation(i, unpack(population))
    }
  }
}
