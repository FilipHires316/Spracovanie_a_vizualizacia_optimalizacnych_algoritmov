import { openDB } from 'idb'
import type { Chromosome } from 'stores/individuals/chromosome'

// DB create
export const getDB = async () => {
  return await openDB('geneticAlgorithmDB', 1, {
    upgrade(db) {
      // Create an object store for generations if it doesn't already exist
      if (!db.objectStoreNames.contains('generations')) {
        db.createObjectStore('generations', { keyPath: 'generation' })
      }
    },
  })
}

// Function to save generation to DB
export const savePopulation = async (generationIndex: number, population: Chromosome[]) => {
  const db = await getDB()
  const transaction = db.transaction('generations', 'readwrite')
  const store = transaction.objectStore('generations')
  await store.put({
    generation: generationIndex,
    data: population.map((ind) => ({
      solution: ind.solution,
      fitness: ind.fitness,
    })),
  })
  await transaction.done
}

// Function to retrieve all generations from the database
export const getGenerationsFromDB = async () => {
  const db = await getDB()
  const transaction = db.transaction('generations', 'readonly')
  const store = transaction.objectStore('generations')
  return await store.getAll()
}

// Function to get one generation by index
export const getGenerationFromDB = async (generationIndex: number) => {
  const db = await getDB()
  const transaction = db.transaction('generations', 'readonly')
  const store = transaction.objectStore('generations')
  return await store.get(generationIndex)
}

// Function to get all generation indexes
export const getAllGenerationIndexes = async (): Promise<number[]> => {
  const db = await getDB()
  const transaction = db.transaction('generations', 'readonly')
  const store = transaction.objectStore('generations')
  const keys = await store.getAllKeys()
  return keys as number[]
}

// Function to clear all generations from the database
export const clearGenerations = async () => {
  const db = await getDB()
  const transaction = db.transaction('generations', 'readwrite')
  const store = transaction.objectStore('generations')
  await store.clear()
  await transaction.done
}
