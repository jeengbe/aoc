const l = 0,
  d = 3,
  w = 6;

function pointsForInput1(b) {
  return [, "R", "P", "S"].indexOf(b);
}

function pointsForGame1(a, b) {
  switch (a) {
    case "R":
      return {
        R: d,
        P: w,
        S: l,
      }[b];
    case "P":
      return {
        R: l,
        P: d,
        S: w,
      }[b];
    case "S":
      return {
        R: w,
        P: l,
        S: d,
      }[b];
  }
}

export function part1(input) {
  return input.reduce((sum, i) => {
    let [a, b] = i.split(" ");
    a = ["R", "P", "S"][["A", "B", "C"].indexOf(a)];
    b = ["R", "P", "S"][["X", "Y", "Z"].indexOf(b)];

    return sum + pointsForGame1(a, b) + pointsForInput1(b);
  }, 0);
}

export const tests1 = [[["A Y", "B X", "C Z"], 15]];

function pointsForInput2(a, b) {
  let play;
  switch (b) {
    case "L":
      play = {
        R: "S",
        P: "R",
        S: "P",
      }[a];
      break;
    case "D":
      play = a;
      break;
    case "W":
      play = {
        R: "P",
        P: "S",
        S: "R",
      }[a];
      break;
  }
  return [, "R", "P", "S"].indexOf(play);
}

function pointsForGame2(b) {
  return {
    L: l,
    D: d,
    W: w,
  }[b];
}

export function part2(input) {
  return input.reduce((sum, i) => {
    let [a, b] = i.split(" ");
    a = ["R", "P", "S"][["A", "B", "C"].indexOf(a)];
    b = ["L", "D", "W"][["X", "Y", "Z"].indexOf(b)];

    return sum + pointsForGame2(b) + pointsForInput2(a, b);
  }, 0);
}

export const tests2 = [[["A Y", "B X", "C Z"], 12]];
