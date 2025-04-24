import { openDB } from 'idb'
import type { Chromosome } from 'stores/individuals/chromosome'
import type { Lion } from 'stores/individuals/lion'
import type { Whale } from 'stores/individuals/whale'
import type { HistoryEntry } from 'stores/individuals/HistoryEntry'

// DB create
export const getDB = async () => {
  return await openDB('geneticAlgorithmDB', 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('generations')) {
        db.createObjectStore('generations', { keyPath: 'generation' })
      }
      if (!db.objectStoreNames.contains('entries')) {
        db.createObjectStore('entries', { keyPath: 'entry', autoIncrement: true })
      }
    },
  })
}

// Function to save generation to DB
export const savePopulation = async (generationIndex: number, population: Chromosome[] | Lion[] | Whale[]) => {
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

// Function to save entry to DB
export const saveEntry = async (entry: HistoryEntry) => {
  const db = await getDB()
  const transaction = db.transaction('entries', 'readwrite')
  const store = transaction.objectStore('entries')
  const id = await store.add(entry)
  await transaction.done
  return id
}

// Function to get one entry by index
export const getEntryFromDB = async (entryIndex: number): Promise<HistoryEntry> => {
  const db = await getDB()
  const transaction = db.transaction('entries', 'readonly')
  const store = transaction.objectStore('entries')
  return await store.get(entryIndex)
}

// Function to get all entries indexes
export const getAllEntryIndexes = async (): Promise<number[]> => {
  const db = await getDB()
  const transaction = db.transaction('entries', 'readonly')
  const store = transaction.objectStore('entries')
  const keys = await store.getAllKeys()
  return keys as number[]
}
