function moveHead(head, direction) {
  const [x, y] = head;
  switch (direction) {
    case "U":
      return [x, y - 1];
    case "D":
      return [x, y + 1];
    case "L":
      return [x - 1, y];
    case "R":
      return [x + 1, y];
  }
}

function updateTail(head, oldTail) {
  const [hx, hy] = head;
  const [tx, ty] = oldTail;
  if (Math.abs(hx - tx) < 2 && Math.abs(hy - ty) < 2) return oldTail;

  if (hx === tx) {
    return [hx, hy > ty ? ty + 1 : ty - 1];
  }
  if (hy === ty) {
    return [hx > tx ? tx + 1 : tx - 1, hy];
  }
  return [hx > tx ? tx + 1 : tx - 1, hy > ty ? ty + 1 : ty - 1];
}

export function part1(input) {
  let head = [0, 0];
  let tail = [0, 0];
  const visited = new Set();
  for (const i of input) {
    const [direction, distance] = i.split(" ");
    for (let j = 0; j < distance; j++) {
      head = moveHead(head, direction);
      tail = updateTail(head, tail);
      visited.add(tail.join(","));
    }
  }
  return visited.size;
}

export const tests1 = [
  [["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"], 13],
];

export function part2(input) {
  let head = [0, 0];
  const knots = Array(8).fill([0, 0]);
  let tail = [0, 0];
  const visited = new Set();
  for (const i of input) {
    const [direction, distance] = i.split(" ");
    for (let j = 0; j < distance; j++) {
      head = moveHead(head, direction);
      knots[0] = updateTail(head, knots[0]);
      for (let k = 1; k < knots.length; k++) {
        knots[k] = updateTail(knots[k - 1], knots[k]);
      }
      tail = updateTail(knots[knots.length - 1], tail);
      visited.add(tail.join(","));
    }
  }
  return visited.size;
}

export const tests2 = [
  [["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"], 1],
  [["R 5", "U 8", "L 8", "D 3", "R 17", "D 10", "L 25", "U 20"], 36],
];
