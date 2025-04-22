// storage for genetic algorithm preset values
export const geneticPresets = {
  // optimal values
  optimum: {
    iterations: 200,
    population: 100,
    mutation: 5,
    showNewInput: true,
    elitism: 1,
    choose: "tournament",
    tournamentSize: 3,
    crossing: "two",
  },
  // big population
  big: {
    iterations: 400,
    population: 200,
    mutation: 4,
    showNewInput: true,
    elitism: 2,
    choose: "roulette",
    tournamentSize: 0,
    crossing: "uni",
  },
  // small population
  small: {
    iterations: 100,
    population: 80,
    mutation: 6,
    showNewInput: false,
    elitism: 0,
    choose: "tournament",
    tournamentSize: 2,
    crossing: "one",
  },
  // no values defined
  own: {
    iterations: 0,
    population: 0,
    mutation: 0,
    showNewInput: false,
    elitism: 0,
    choose: null,
    tournamentSize: 0,
    crossing: null,
  }
};
