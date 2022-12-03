/**
 * @param {string} c
 */
function getPriority(c) {
  return c.charCodeAt(0) - (c === c.toUpperCase() ? 38 : 96);
}

/**
 * @param {string[]} input
 */
export function part1(input) {
  let sum = 0;
  for (const i of input) {
    const [a, b] = [i.slice(0, i.length / 2), i.slice(i.length / 2, i.length)];
    const common = [...new Set(a.split("").filter((c) => b.includes(c)))];
    for (const c of common) {
      sum += getPriority(c);
    }
  }
  return sum;
}

export const tests1 = [
  [
    [
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ],
    157,
  ],
  [["aa"], 1],
];

export function part2(input) {
  let sum = 0;
  for (let j = 0; j < input.length; j += 3) {
    const a = input[j];
    const b = input[j + 1];
    const c = input[j + 2];
    const common = [
      ...new Set(a.split("").filter((x) => b.includes(x) && c.includes(x))),
    ];
    for (const c of common) {
      sum += getPriority(c);
    }
  }
  return sum;
}

export const tests2 = [
  [
    [
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ],
    70,
  ],
];
