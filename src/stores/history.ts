import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { HistoryEntry } from './individuals/HistoryEntry';

// storage for all history entries with results of computations
export const useHistory = defineStore('history', () => {
  const entries = ref<HistoryEntry[]>([]);
  return {
    entries
  };
});
