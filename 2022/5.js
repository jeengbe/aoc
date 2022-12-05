function getCrateStacks(input) {
  const stacks = [];
  for (const i of input) {
    for (let j = 0; j < i.length / 4; j++) {
      stacks[j] ??= [];

      if (i[j * 4 + 1] !== " ") {
        stacks[j].push(i[j * 4 + 1]);
      }
    }
  }
  for (let i = 0; i < stacks.length; i++) {
    stacks[i] = stacks[i].reverse();
  }
  return stacks;
}

function performAction1(i, stacks) {
  const [, c, a, b] = i.match(/move (\d+) from (\d+) to (\d+)/).map(Number);
  for (let i = 0; i < c; i++) {
    stacks[b - 1].push(stacks[a - 1].pop());
  }
}

export function part1(input) {
  const cratesInput = [];
  while (input[0] !== "") {
    cratesInput.push(input.shift());
  }
  input.shift();
  const crates = getCrateStacks(cratesInput);
  for (const i of input) {
    performAction1(i, crates);
  }
  return crates.map((c) => c[c.length - 1]).join("");
}

export const tests1 = [
  [
    `    [D]
[N] [C]
[Z] [M] [P]
  1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split("\n"),
    "CMZ",
  ],
];

/**
 * @param {string[][]} stacks
 */
function performAction2(i, stacks) {
  const [, c, a, b] = i.match(/move (\d+) from (\d+) to (\d+)/).map(Number);
  const moved = stacks[a - 1].splice(-c);
  stacks[b - 1] = [...stacks[b - 1], ...moved];
}

export function part2(input) {
  const cratesInput = [];
  while (input[0] !== "") {
    cratesInput.push(input.shift());
  }
  input.shift();
  const crates = getCrateStacks(cratesInput);
  for (const i of input) {
    performAction2(i, crates);
  }
  return crates.map((c) => c[c.length - 1]).join("");
}

export const tests2 = [
  [
    `    [D]
[N] [C]
[Z] [M] [P]
1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split("\n"),
    "MCD",
  ],
];
