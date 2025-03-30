import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { HistoryEntry } from './individuals/HistoryEntry';

export const useHistory = defineStore('history', () => {
  const entries = ref<HistoryEntry[]>([]);

  return {
    entries
  };
});
