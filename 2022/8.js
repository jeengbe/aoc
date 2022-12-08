function isTreeVisible(grid, x, y, dir) {
  if (dir === "l") {
    for (let i = y - 1; i >= 0; i--) {
      if (grid[x][i] >= grid[x][y]) return false;
    }
  }
  if (dir === "r") {
    for (let i = y + 1; i < grid[0].length; i++) {
      if (grid[x][i] >= grid[x][y]) return false;
    }
  }
  if (dir === "u") {
    for (let i = x - 1; i >= 0; i--) {
      if (grid[i][y] >= grid[x][y]) return false;
    }
  }
  if (dir === "d") {
    for (let i = x + 1; i < grid.length; i++) {
      if (grid[i][y] >= grid[x][y]) return false;
    }
  }
  return true;
}

export function part1(input) {
  const grid = input.map((line) => line.split("").map(Number));
  let visible = 2 * grid.length + 2 * grid[0].length - 4;
  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[0].length - 1; y++) {
      if (
        isTreeVisible(grid, x, y, "l") ||
        isTreeVisible(grid, x, y, "r") ||
        isTreeVisible(grid, x, y, "u") ||
        isTreeVisible(grid, x, y, "d")
      ) {
        visible++;
      }
    }
  }
  return visible;
}

export const tests1 = [[["30373", "25512", "65332", "33549", "35390"], 21]];

function getScenic(grid, x, y, dir) {
  if (dir === "l") {
    for (let i = y - 1; i >= 0; i--) {
      if (grid[x][i] >= grid[x][y]) return y - i;
    }
    return y;
  }
  if (dir === "r") {
    for (let i = y + 1; i < grid[0].length; i++) {
      if (grid[x][i] >= grid[x][y]) return i - y;
    }
    return grid[0].length - y - 1;
  }
  if (dir === "u") {
    for (let i = x - 1; i >= 0; i--) {
      if (grid[i][y] >= grid[x][y]) return x - i;
    }
    return x;
  }
  if (dir === "d") {
    for (let i = x + 1; i < grid.length; i++) {
      if (grid[i][y] >= grid[x][y]) return i - x;
    }
    return grid.length - x - 1;
  }
}

export function part2(input) {
  const grid = input.map((line) => line.split("").map(Number));
  const gridScenic = grid.map((line) => line.map(() => 0));
  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[0].length - 1; y++) {
      gridScenic[x][y] =
        getScenic(grid, x, y, "l") *
        getScenic(grid, x, y, "r") *
        getScenic(grid, x, y, "u") *
        getScenic(grid, x, y, "d");
    }
  }
  return Math.max(...gridScenic.flat());
}

export const tests2 = [[["30373", "25512", "65332", "33549", "35390"], 8]];
