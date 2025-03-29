import { storeToRefs } from 'pinia';
import { useKnapsackProblem } from 'stores/problems/knapsackProblem';
import { useBinProblem } from 'stores/problems/binProblem';
import { useSalesmanProblem } from 'stores/problems/salesmanProblem';
import { geneticAlgorithm } from 'stores/algorithms/geneticAlgorithm';
import { lionAlgorithm } from 'stores/algorithms/lionAlgorithm';
import { whaleAlgorithm } from 'stores/algorithms/whaleAlgorithm';
import { useParamStore } from 'stores/paramStore'

let problemToSolve:
  | ReturnType<typeof useKnapsackProblem>
  | ReturnType<typeof useBinProblem>
  | ReturnType<typeof useSalesmanProblem>
  | null = null;

export const solve = () => {
  const paramStore = useParamStore();  // Moved inside the solve function
  const { algorithm, problem } = storeToRefs(paramStore);

  if (problem.value === 'knapsack') {
    problemToSolve = useKnapsackProblem();
  } else if (problem.value === 'bin') {
    problemToSolve = useBinProblem();
  } else if (problem.value === 'salesman') {
    problemToSolve = useSalesmanProblem();
  }
  if (problemToSolve) {
    if (algorithm.value === 'genetic') {
      geneticAlgorithm(problemToSolve);
    } else if (algorithm.value === 'lion') {
      lionAlgorithm(problemToSolve);
    } else if (algorithm.value === 'whale') {
      whaleAlgorithm(problemToSolve);
    }
  }
};
