import type { useKnapsackProblem } from 'stores/problems/knapsackProblem'
import type { useBinProblem } from 'stores/problems/binProblem'
import type { useSalesmanProblem } from 'stores/problems/salesmanProblem'
import { Chromosome } from 'stores/individuals/chromosome'
import { useParamStore } from 'stores/paramStore'
import { savePopulation } from 'stores/db'

// Creating starting population based on its size
const createPopulation = (
  problemToSolve:
    | ReturnType<typeof useKnapsackProblem>
    | ReturnType<typeof useBinProblem>
    | ReturnType<typeof useSalesmanProblem>,
  size: number,
) => {
  const solutions: void | number[][] = problemToSolve.createSolutions(size)
  const population: Chromosome[] = []
  if (solutions) {
    solutions.forEach((solution) => {
      population.push(new Chromosome(solution))
    })
  }
  return population
}

// evaluating solutions to determine which are best
const evaluateIndividuals = (
  problemToSolve:
    | ReturnType<typeof useKnapsackProblem>
    | ReturnType<typeof useBinProblem>
    | ReturnType<typeof useSalesmanProblem>,
  population: Chromosome[],
) => {
  population.forEach((individual) => {
    const fitness = problemToSolve.calculateFitness(individual.solution)
    if (fitness) {
      individual.fitness = fitness
    }
  })
  return population
}


// Elitism function to preserve best solutions
const applyElitism = (population: Chromosome[], elitismRate: number) => {
  const eliteNumber = Math.ceil((population.length / 100) * elitismRate)
  const sortedPopulation = [...population].sort((a, b) => b.fitness - a.fitness)
  return sortedPopulation.slice(0, eliteNumber)
}


// Choosing best solution from X solutions
const tournamentSelection = (population: Chromosome[], tournamentSize: number) => {
  const shuffled = [...population]
  let currentIndex = shuffled.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    const temp = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex] as Chromosome;
    shuffled[randomIndex] = temp as Chromosome;
  }
  const selected = shuffled.slice(0, tournamentSize)
  return selected.reduce((best, current) => (current.fitness > best.fitness ? current : best))
}

// Choosing solution randomly but better fitness has higher chance to be chosen
const rouletteSelection = (population: Chromosome[]) => {
  const available = [...population]
  const totalFitness = available.reduce((sum, chromosome) => sum + chromosome.fitness, 0)
  const threshold = Math.random() * totalFitness
  let cumulativeFitness = 0
  for (const chromosome of available) {
    cumulativeFitness += chromosome.fitness
    if (cumulativeFitness >= threshold) {
      return chromosome
    }
  }
}

// making new generation by crossing parents
const crossover = (
  problemToSolve:
    | ReturnType<typeof useKnapsackProblem>
    | ReturnType<typeof useBinProblem>
    | ReturnType<typeof useSalesmanProblem>,
  population: Chromosome[],
  newGeneration: Chromosome[],
  choose: string,
  tournamentSize: number | null,
  crossing: string,
  size: number,
  mutation: number,
) => {
  let parent1 = null
  let parent2 = null
  while (newGeneration.length != population.length) {
    if (choose == 'tournament' && tournamentSize) {
      parent1 = tournamentSelection(population, tournamentSize)
    } else if (choose == 'roulette') {
      parent1 = rouletteSelection(population)
    }
    while (parent2 == null || parent2 == parent1) {
      if (choose == 'tournament' && tournamentSize) {
        parent2 = tournamentSelection(population, tournamentSize)
      } else if (choose == 'roulette') {
        parent2 = rouletteSelection(population)
      }
    }
    if (parent1 && parent2) {
      let breeds: Chromosome[] = []
      if (crossing == 'one') {
        breeds = problemToSolve.onePointCrossover(parent1, parent2)
      } else if (crossing == 'two') {
        breeds = problemToSolve.twoPointCrossover(parent1, parent2)
      } else if (crossing == 'uni') {
        breeds = problemToSolve.uniformCrossover(parent1, parent2)
      }
      breeds = problemToSolve.mutate(breeds, mutation)
      for (let i = 0; i < breeds.length; i++) {
        if (newGeneration.length != size) {
          newGeneration.push(breeds[i] as Chromosome)
        }
      }
    }
  }
  return newGeneration
}

// Function that maintains entire evolutionary process from one generation to another by calling functions above
const createNewGeneration = (
  problemToSolve:
    | ReturnType<typeof useKnapsackProblem>
    | ReturnType<typeof useBinProblem>
    | ReturnType<typeof useSalesmanProblem>,
  population: Chromosome[],
  elitism: boolean,
  elitismRate: number,
  choose: string,
  tournamentSize: number | null,
  crossing: string,
  size: number,
  mutation: number,
) => {
  let newGeneration: Chromosome[] = []
  if (elitism) {
    newGeneration = applyElitism(population, elitismRate)
  }
  newGeneration = crossover(
    problemToSolve,
    population,
    newGeneration,
    choose,
    tournamentSize,
    crossing,
    size,
    mutation,
  )
  return newGeneration
}

// Main layout of genetic algorithm process
export const geneticAlgorithm = async (
  problemToSolve:
    | ReturnType<typeof useKnapsackProblem>
    | ReturnType<typeof useBinProblem>
    | ReturnType<typeof useSalesmanProblem>,
) => {
  const paramStore = useParamStore()
  let population = createPopulation(problemToSolve, paramStore.population as number)
  population = evaluateIndividuals(problemToSolve, population)
  if (
    paramStore.iterations &&
    paramStore.elitism !== null &&
    paramStore.mutation !== null &&
    paramStore.choose &&
    paramStore.crossing &&
    paramStore.population
  ) {
    for (let i = 0; i < paramStore.iterations; i++) {
      population = createNewGeneration(
        problemToSolve,
        population,
        paramStore.showNewInput,
        paramStore.elitism,
        paramStore.choose,
        paramStore.tournamentSize,
        paramStore.crossing,
        paramStore.population,
        paramStore.mutation,
      )
      population = evaluateIndividuals(problemToSolve, population)
      await savePopulation(i, population)
    }
  }
}
