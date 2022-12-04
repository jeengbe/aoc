export function part1(input) {
  let c = 0;
  for (const i of input) {
    const [a, b] = i.split(",");
    const [aa, ab] = a.split("-").map(Number);
    const [ba, bb] = b.split("-").map(Number);

    if ((ba >= aa && bb <= ab) || (ba <= aa && bb >= ab)) {
      c++;
    }
  }
  return c;
}

export const tests1 = [
  [["2-4,6-8", "2-3,4-5", "5-7,7-9", "2-8,3-7", "6-6,4-6", "2-6,4-8"], 2],
];

export function part2(input) {
  let c = 0;
  for (const i of input) {
    const [a, b] = i.split(",");
    const [aa, ab] = a.split("-").map(Number);
    const [ba, bb] = b.split("-").map(Number);

    if (
      (ba >= aa && ba <= ab) ||
      (bb <= ab && bb >= aa) ||
      (aa >= ba && aa <= bb) ||
      (ab <= bb && ab >= ba)
    ) {
      c++;
    }
  }
  return c;
}

export const tests2 = [
  [["2-4,6-8", "2-3,4-5", "5-7,7-9", "2-8,3-7", "6-6,4-6", "2-6,4-8"], 4],
];
