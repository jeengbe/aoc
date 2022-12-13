function parsePacket(i) {
  if (i === "") return null;
  try {
    return JSON.parse(i);
  } catch (e) {
    console.error(i);
    throw e;
  }
}

function isInRightOrder([a, b]) {
  if (typeof a === "number" && typeof b === "number") {
    if (a < b) return true;
    if (a > b) return false;
    return undefined;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const result = isInRightOrder([a[i], b[i]]);
      if (result !== undefined) return result;
    }
    if (a.length < b.length) return true;
    if (a.length > b.length) return false;
    return undefined;
  }
  if (typeof a === "number" && Array.isArray(b)) {
    return isInRightOrder([[a], b]);
  }
  if (Array.isArray(a) && typeof b === "number") {
    return isInRightOrder([a, [b]]);
  }
  console.error(a, b);
  throw new Error("Unknown case");
}

export function part1(input) {
  const packets = input.map(parsePacket).filter((x) => x !== null);
  const pairs = packets
    .map((p, i) => [p, packets[i + 1]])
    .filter((x, i) => i % 2 === 0);
  const indices = [];
  for (let i = 0; i < pairs.length; i++) {
    if (isInRightOrder(pairs[i])) indices.push(i + 1);
  }
  return indices.reduce((sum, i) => sum + i, 0);
}

export const tests1 = [
  [
    [
      "[1,1,3,1,1]",
      "[1,1,5,1,1]",
      "",
      "[[1],[2,3,4]]",
      "[[1],4]",
      "",
      "[9]",
      "[[8,7,6]]",
      "",
      "[[4,4],4,4]",
      "[[4,4],4,4,4]",
      "",
      "[7,7,7,7]",
      "[7,7,7]",
      "",
      "[]",
      "[3]",
      "",
      "[[[]]]",
      "[[]]",
      "",
      "[1,[2,[3,[4,[5,6,7]]]],8,9]",
      "[1,[2,[3,[4,[5,6,0]]]],8,9]",
    ],
    13,
  ],
];

export function part2(input) {
  const packets = input.map(parsePacket).filter((x) => x !== null);
  packets.push([[2]], [[6]]);
  const sortedPackets = packets.sort((a, b) =>
    isInRightOrder([a, b]) ? -1 : 1
  );
  const dividerAIndex = sortedPackets.findIndex((p) => {
    try {
      return p.length === 1 && p[0].length === 1 && p[0][0] === 2;
    } catch (e) {}
  });
  const dividerBIndex = sortedPackets.findIndex((p) => {
    try {
      return p.length === 1 && p[0].length === 1 && p[0][0] === 6;
    } catch (e) {}
  });
  return (dividerAIndex + 1) * (dividerBIndex + 1);
}

export const tests2 = [
  [
    [
      "[1,1,3,1,1]",
      "[1,1,5,1,1]",
      "",
      "[[1],[2,3,4]]",
      "[[1],4]",
      "",
      "[9]",
      "[[8,7,6]]",
      "",
      "[[4,4],4,4]",
      "[[4,4],4,4,4]",
      "",
      "[7,7,7,7]",
      "[7,7,7]",
      "",
      "[]",
      "[3]",
      "",
      "[[[]]]",
      "[[]]",
      "",
      "[1,[2,[3,[4,[5,6,7]]]],8,9]",
      "[1,[2,[3,[4,[5,6,0]]]],8,9]",
    ],
    140,
  ],
];
