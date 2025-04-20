// storage for genetic algorithm preset values
export const geneticPresets = {
  // optimal values
  optimum: {
    iterations: 20,
    population: 100,
    mutation: 1,
    showNewInput: true,
    elitism: 3,
    choose: "tournament",
    tournamentSize: 2,
    crossing: "two",
  },
  // big population
  big: {
    iterations: 40,
    population: 200,
    mutation: 2,
    showNewInput: true,
    elitism: 4,
    choose: "roulette",
    tournamentSize: 0,
    crossing: "uni",
  },
  // small population
  small: {
    iterations: 15,
    population: 80,
    mutation: 1,
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
