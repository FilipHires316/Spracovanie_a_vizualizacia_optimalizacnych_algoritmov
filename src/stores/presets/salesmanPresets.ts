// storage for knapsack problem preset values
export const salesmanPresets = {
  // optimal number of cities
  optimum: {
    start: [[250, 250]],
    cities: [
      [50, 100],
      [120, 250],
      [200, 320],
      [300, 450],
      [150, 400],
      [400, 150],
      [280, 380],
      [350, 500],
      [420, 280],
      [480, 100],
      [500, 450],
      [100, 50],
      [250, 200],
      [370, 370]
    ]
  },
  // many cities to test hard computations
  big: {
    start: [[100, 400]],
    cities: [
      [20, 30],
      [60, 80],
      [90, 250],
      [110, 120],
      [150, 200],
      [180, 400],
      [220, 350],
      [260, 450],
      [300, 150],
      [340, 220],
      [380, 320],
      [420, 180],
      [450, 400],
      [480, 50],
      [500, 500]
    ]
  },
  // few cities to check if algorithm works alright
  small: {
    start: [[50, 50]],
    cities: [
      [10, 40],
      [80, 150],
      [120, 300],
      [200, 250],
      [250, 450],
      [330, 370],
      [400, 100],
      [460, 500]
    ]
  },
  // no values defined
  own: {
    start: [[0, 0]],
    cities: []
  }
};
