// storage for bin packing problem preset values
export const binPresets = {
  // optimal number of items
  optimum: {
    capacity: 20,
    items:
      [
        [1],
        [1],
        [2],
        [2],
        [3],
        [3],
        [4],
        [4],
        [5],
        [8],
        [9],
        [10],
        [10],
        [18]
      ]
  },
  // many items to test hard computations
  big: {
    capacity: 30,
    items:
      [
        [2],
        [3],
        [5],
        [6],
        [7],
        [8],
        [9],
        [10],
        [12],
        [14],
        [15],
        [16],
        [18],
        [20],
        [22]
      ]
  },
  // few items to check if algorithm works alright
  small: {
    capacity: 10,
    items:
      [
        [1],
        [2],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7]
      ]
  },
  // no values defined
  own: {
    capacity: 0,
    items: []
  }
};
