function readScan(input) {
  let grid = [];
  let maxX = 0;
  let maxY = 0;
  for (const i of input) {
    const segments = i.split(" -> ").map((s) => s.split(",").map(Number));
    for (let i = 0; i < segments.length - 1; i++) {
      let [x1, y1] = segments[i];
      let [x2, y2] = segments[i + 1];
      if (x1 > x2) [x1, x2] = [x2, x1];
      if (y1 > y2) [y1, y2] = [y2, y1];
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          grid[x] ??= [];
          grid[x][y] = "#";
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
  }
  return [grid, maxX, maxY];
}

export function part1(input) {
  const [grid, maxX, maxY] = readScan(input);
  function g(x, y) {
    return (grid[x] ?? [])[y];
  }

  let x = 500;
  let y = 0;
  let c = 0;
  while (true) {
    if (y > maxY) {
      break;
    }
    if (g(x, y + 1) !== "#" && g(x, y + 1) !== "o") {
      y++;
      continue;
    }
    if (g(x - 1, y + 1) !== "#" && g(x - 1, y + 1) !== "o") {
      x--;
      y++;
      continue;
    }
    if (g(x + 1, y + 1) !== "#" && g(x + 1, y + 1) !== "o") {
      x++;
      y++;
      continue;
    }
    c++;
    grid[x] ??= [];
    grid[x][y] = "o";
    x = 500;
    y = 0;
  }
  return c;
}

export const tests1 = [
  [["498,4 -> 498,6 -> 496,6", "503,4 -> 502,4 -> 502,9 -> 494,9"], 24],
];

export function part2(input) {
  const [grid, maxX, maxY] = readScan(input);
  function g(x, y) {
    return (grid[x] ?? [])[y];
  }
  let x = 500;
  let y = 0;
  let c = 0;
  while (true) {
    if (y >= maxY + 1) {
      c++;
      grid[x] ??= [];
      grid[x][y] = "o";
      x = 500;
      y = 0;
    }
    if (g(x, y + 1) !== "#" && g(x, y + 1) !== "o") {
      y++;
      continue;
    }
    if (g(x - 1, y + 1) !== "#" && g(x - 1, y + 1) !== "o") {
      x--;
      y++;
      continue;
    }
    if (g(x + 1, y + 1) !== "#" && g(x + 1, y + 1) !== "o") {
      x++;
      y++;
      continue;
    }
    if (g(x, y) === "o") {
      break;
    }
    c++;
    grid[x] ??= [];
    grid[x][y] = "o";
    x = 500;
    y = 0;
  }
  return c;
}

export const tests2 = [
  [["498,4 -> 498,6 -> 496,6", "503,4 -> 502,4 -> 502,9 -> 494,9"], 93],
];
