export function part1([input]) {
  for (let i = 3; i < input.length; i++) {
    const prev = new Set(input.slice(i - 3, i));
    if (prev.size === 3 && !prev.has(input[i])) {
      return i + 1;
    }
  }
}

export const tests1 = [
  [["mjqjpqmgbljsphdztnvjfqwrcgsmlb"], 7],
  [["bvwbjplbgvbhsrlpgdmjqwftvncz"], 5],
  [["nppdvjthqldpwncqszvftbrmjlhg"], 6],
  [["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"], 10],
  [["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"], 11],
];

export function part2([input]) {
  for (let i = 13; i < input.length; i++) {
    const prev = new Set(input.slice(i - 13, i));
    if (prev.size === 13 && !prev.has(input[i])) {
      return i + 1;
    }
  }
}

export const tests2 = [
  [["mjqjpqmgbljsphdztnvjfqwrcgsmlb"], 19],
  [["bvwbjplbgvbhsrlpgdmjqwftvncz"], 23],
  [["nppdvjthqldpwncqszvftbrmjlhg"], 23],
  [["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"], 29],
  [["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"], 26],
];
