export class Lion {
  solution: number[];
  fitness: number;
  sex: number;

  constructor(solution: number[], sex: number) {
    this.solution = solution;
    this.fitness = 0;
    this.sex = sex;
  }
}
