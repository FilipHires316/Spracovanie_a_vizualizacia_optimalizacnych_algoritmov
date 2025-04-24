import type { useKnapsackProblem } from 'stores/problems/knapsackProblem'
import type { useBinProblem } from 'stores/problems/binProblem'
import type { useSalesmanProblem } from 'stores/problems/salesmanProblem'
import { useParamStore } from 'stores/paramStore'
import { Lion } from 'stores/individuals/lion'
import { savePopulation } from 'stores/db'

// Creating starting population based on its size including pack size and number of males and females
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

// Evaluating individuals by fitness also if the lion has better fitness than it has before it updates its territory value
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

// Entire movement of lions including hunt, roaming of males and females and also nomads
const hunt = (problemToSolve:
                | ReturnType<typeof useKnapsackProblem>
                | ReturnType<typeof useBinProblem>
                | ReturnType<typeof useSalesmanProblem>,
              population: Lion[][], hunterRate: number) => {
  const newPopulation: Lion[][] = []
  const packs: Lion[][] = population.slice(0, - 1)
  const [nomad] = population.slice(-1);
  packs.forEach(pack => {
    // moving hunting females
    const newPack: Lion[] = []
    const females = pack.filter(ind => ind.sex === 0)
    const males = pack.filter(ind => ind.sex === 1)
    const shuffled = [...females]
    let currentIndex = shuffled.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      const temp = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex] as Lion;
      shuffled[randomIndex] = temp as Lion;
    }
    const hunters = shuffled.slice(0, hunterRate)
    const others = shuffled.slice(hunterRate)
    const possibleTargets = [...hunters];
    possibleTargets.forEach(target => {
      target.solution = problemToSolve.spiralMove(target.solution)
      target.fitness = problemToSolve.calculateFitness(target.solution)
    })
    possibleTargets.sort((a, b) => b.fitness - a.fitness);
    const target = possibleTargets[0];
    const splitSize = Math.ceil(hunterRate / 3);
    const divide = []
    divide.push(hunters.slice(0, splitSize));
    divide.push(hunters.slice(splitSize, splitSize * 2));
    divide.push(hunters.slice(splitSize * 2));
    divide.sort((a, b) => {
      const sumA = a.reduce((acc, lion) => acc + lion.fitness, 0);
      const sumB = b.reduce((acc, lion) => acc + lion.fitness, 0);
      return sumB - sumA;
    });
    while (divide.some(sub => sub.length > 0)) {
      const index = Math.floor(Math.random() * divide.length);
      if (divide[index]!.length > 0) {
        const attacker = divide[index]!.shift()
        if (index == 0) {
          attacker!.solution = problemToSolve.move(attacker!.solution, target!.solution, 0.3)
        }
        else {
          attacker!.solution = problemToSolve.move(attacker!.solution, target!.solution, 0.4)
        }
        newPack.push(attacker as Lion);
      }
    }
    // moving non hunting females
    others.forEach((lion) => {
      const shuffled = [...pack]
      let currentIndex = shuffled.length;
      while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        const temp = shuffled[currentIndex];
        shuffled[currentIndex] = shuffled[randomIndex] as Lion;
        shuffled[randomIndex] = temp as Lion;
      }
      const possibleTargets = shuffled.slice(0, 3);
      possibleTargets.sort((a, b) => b.territoryValue - a.territoryValue);
      const target = possibleTargets[0]
      lion.solution = problemToSolve.move(lion.solution, target!.territory, 0.4)
      newPack.push(lion);
    })
    // moving males in territory
    males.forEach((lion) => {
      const shuffled = [...pack]
      let currentIndex = shuffled.length;
      while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        const temp = shuffled[currentIndex];
        shuffled[currentIndex] = shuffled[randomIndex] as Lion;
        shuffled[randomIndex] = temp as Lion;
      }
      const targets = shuffled.slice(0, shuffled.length / 2);
      targets.forEach((target) => {
        lion.solution = problemToSolve.move(lion.solution, target.territory, 0.6)
        lion.fitness = problemToSolve.calculateFitness(lion.solution)
        if (lion.fitness > lion.territoryValue) {
          lion.territoryValue = lion.fitness;
          lion.territory = lion.solution
        }
      })
      lion.solution = lion.territory
      lion.fitness = lion.territoryValue
      newPack.push(lion);
    })
    newPopulation.push(newPack)
  })
  // exploring search space by nomads
  const newNomad: Lion[] = []
  nomad!.forEach(ind => {
    const target = (problemToSolve.createSolutions(1))[0]
    ind.solution = problemToSolve.move(ind.solution, target as number[], 0.5)
    newNomad.push(ind)
  })
  newPopulation.push(newNomad)
  return newPopulation;
}

// breeding lions to create new offsprings
const breed = (problemToSolve:
                | ReturnType<typeof useKnapsackProblem>
                | ReturnType<typeof useBinProblem>
                | ReturnType<typeof useSalesmanProblem>,
              population: Lion[][]) => {
  const newPopulation: Lion[][] = []
  const packs: Lion[][] = population.slice(0, - 1)
  const [nomad] = population.slice(-1);
  packs.forEach(pack => {
    const newPack = [...pack]
    const females = pack.filter(ind => ind.sex === 0)
    const males = pack.filter(ind => ind.sex === 1)
    const shuffled = [...females]
    let currentIndex = shuffled.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      const temp = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex] as Lion;
      shuffled[randomIndex] = temp as Lion;
    }
    const mothers = shuffled.slice(0, shuffled.length / 2);
    mothers.forEach(mother => {
      const father = males[Math.floor(Math.random() * males.length)] as Lion;
      let breeds = problemToSolve.breed(mother, father)
      breeds = problemToSolve.mutate(breeds, 3) as Lion[]
      newPack.push(...breeds)
    })
    newPopulation.push(newPack)
  })
  const newPack = [...nomad!]
  const females = nomad!.filter(ind => ind.sex === 0)
  const males = nomad!.filter(ind => ind.sex === 1)
  females.forEach(mother => {
    const father = males[Math.floor(Math.random() * males.length)] as Lion;
    let breeds = problemToSolve.breed(mother, father)
    breeds = problemToSolve.mutate(breeds, 3) as Lion[]
    newPack.push(...breeds)
  })
  newPopulation.push(newPack)
  return newPopulation;
}

// Recreating generation structure for visualisation purposes
const unpack = (population: Lion[][]) => {
  const unpack: Lion[] = []
  population.forEach(pack => {
    pack.forEach(individual => {
      unpack.push(individual)
    });
  });
  return unpack
}

// Logic for maintaining population size, only strongest will survive
const migration = (population: Lion[][], malesNumber: number, femalesNumber: number) => {
  const newPopulation: Lion[][] = []
  const tempPopulation: Lion[][] = []
  const packs: Lion[][] = population.slice(0, - 1)
  const [nomad] = population.slice(-1);
  let newNomad = [...nomad!]
  packs.forEach(pack => {
    //each pack gives some females to other packs and nomads to support diversity
    const females = pack.filter(ind => ind.sex === 0)
    const males = pack.filter(ind => ind.sex === 1)
    const newPack: Lion[] = [...males]
    const shuffled = [...females]
    let currentIndex = shuffled.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      const temp = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex] as Lion;
      shuffled[randomIndex] = temp as Lion;
    }
    const separator = femalesNumber - Math.ceil(femalesNumber * 0.1)
    const kept = shuffled.slice(0, separator);
    const exiled = shuffled.slice(separator);
    newPack.push(...kept)
    newNomad.push(...exiled)
    tempPopulation.push(newPack)
  })
  const females = newNomad.filter(ind => ind.sex === 0)
  const males = newNomad.filter(ind => ind.sex === 1)
  // nomad males are distributed to packs to simulate attacks
  males.forEach(male => {
    tempPopulation[Math.floor(Math.random() * tempPopulation.length)]!.push(male)
  })
  // weakest individuals are eliminated
  females.sort((a, b) => b.fitness - a.fitness);
  const renew = females.slice(0, tempPopulation.length * Math.ceil(femalesNumber * 0.9))
  let currentIndex = renew.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    const temp = renew[currentIndex];
    renew[currentIndex] = renew[randomIndex] as Lion;
    renew[randomIndex] = temp as Lion;
  }
  newNomad = females.slice(tempPopulation.length * Math.ceil(femalesNumber * 0.9), tempPopulation.length * Math.ceil(femalesNumber * 0.9) + malesNumber)
  const exiled: Lion[] = []
  tempPopulation.forEach(pack => {
    const females = pack.filter(ind => ind.sex === 0)
    const males = pack.filter(ind => ind.sex === 1)
    males.sort((a, b) => b.fitness - a.fitness);
    while (females.length < femalesNumber) {
      females.push(renew.shift() as Lion)
    }
    const newPack: Lion[] = [...females]
    newPack.push(...males.slice(0, malesNumber))
    exiled.push(...males.slice(malesNumber))
    newPopulation.push(newPack)
  })
  exiled.sort((a, b) => b.fitness - a.fitness);
  newNomad.push(...exiled.slice(0, femalesNumber))
  newPopulation.push(newNomad)
  return newPopulation
}

// main layout for lion inspired algorithm
export const lionAlgorithm = async (problemToSolve:
                                   | ReturnType<typeof useKnapsackProblem>
                                   | ReturnType<typeof useBinProblem>
                                   | ReturnType<typeof useSalesmanProblem>) => {
  const paramStore = useParamStore()
  if (paramStore.packs != null && paramStore.males != null && paramStore.females != null && paramStore.hunters != null && paramStore.iterations) {
    let population = createPopulation(problemToSolve, paramStore.packs, paramStore.females, paramStore.males)
    population = evaluateIndividuals(problemToSolve, population)
    for (let i = 0; i < paramStore.iterations; i++) {
      population = hunt(problemToSolve, population, Math.ceil(paramStore.females / 100 * paramStore.hunters))
      population = breed(problemToSolve, population)
      population = evaluateIndividuals(problemToSolve, population)
      population = migration(population, paramStore.males, paramStore.females)
      await savePopulation(i, unpack(population))
    }
  }
}
