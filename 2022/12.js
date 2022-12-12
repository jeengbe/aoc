function* yieldTopLeftBottomRight(visited) {
  yield {
    x: visited.x - 1,
    y: visited.y,
    previous: visited,
  };
  yield {
    x: visited.x + 1,
    y: visited.y,
    previous: visited,
  };
  yield {
    x: visited.x,
    y: visited.y - 1,
    previous: visited,
  };
  yield {
    x: visited.x,
    y: visited.y + 1,
    previous: visited,
  };
}

function visit(p, visited, heights, goal) {
  visited.add(p.x + "," + p.y);
  const queue = [];
  while (true) {
    for (const n of yieldTopLeftBottomRight(p)) {
      if (visited.has(n.x + "," + n.y)) continue;
      if (
        n.x < 0 ||
        n.y < 0 ||
        n.x >= heights.length ||
        n.y >= heights[0].length
      )
        continue;
      if (heights[n.x][n.y] - heights[p.x][p.y] > 1) continue;
      if (n.x === goal[0] && n.y === goal[1]) {
        return getDistance(n);
      }
      visited.add(n.x + "," + n.y);
      queue.push(n);
    }
    if (queue.length === 0) break;
    p = queue.shift();
  }
}

function getDistance(p) {
  let d = -1;
  while (p) {
    d++;
    p = p.previous;
  }
  return d;
}

export function part1(input) {
  const heights = input.map((c) =>
    c.split("").map((r) => r.charCodeAt(0) - 97)
  );

  const goalX = input.findIndex((c) => c.includes("E"));
  const goalY = input[goalX].indexOf("E");
  const startX = input.findIndex((c) => c.includes("S"));
  const startY = input[startX].indexOf("S");
  const goal = [goalX, goalY];
  heights[goalX][goalY] = "z".charCodeAt(0) - 97;
  heights[startX][startY] = "a".charCodeAt(0) - 97;

  const visited = new Set();

  return visit(
    {
      x: startX,
      y: startY,
      previous: null,
    },
    visited,
    heights,
    goal
  );
}

export const tests1 = [
  [["Sabqponm", "abcryxxl", "accszExk", "acctuvwj", "abdefghi"], 31],
  [["cdmnwx", "belovy", "afkpuz", "agjqtz", "ShirsE"], 29],
];

export function part2(input) {
  const heights = input.map((c) =>
    c.split("").map((r) => r.charCodeAt(0) - 97)
  );

  const goalX = input.findIndex((c) => c.includes("E"));
  const goalY = input[goalX].indexOf("E");
  const startX = input.findIndex((c) => c.includes("S"));
  const startY = input[startX].indexOf("S");
  const goal = [goalX, goalY];
  heights[goalX][goalY] = "z".charCodeAt(0) - 97;
  heights[startX][startY] = "a".charCodeAt(0) - 97;

  let min = Infinity;
  for (let x = 0; x < heights.length; x++) {
    for (let y = 0; y < heights[0].length; y++) {
      if (heights[x][y] !== "a".charCodeAt(0) - 97) continue;

      const visited = new Set();
      const v = visit(
        {
          x,
          y,
          previous: null,
        },
        visited,
        heights,
        goal
      );
      if(v < min) min = v;
    }
  }

  return min;
}

export const tests2 = [
  [["Sabqponm", "abcryxxl", "accszExk", "acctuvwj", "abdefghi"], 29],
];
