export function part1(input) {
  const inventories = [0];
  for (const i of input) {
    if (i === "") {
      inventories.push(0);
    } else {
      inventories[inventories.length - 1] += Number(i);
    }
  }
  return Math.max(...inventories);
}

export const tests1 = [];

export function part2(input) {
  const inventories = [0];
  for (const i of input) {
    if (i === "") {
      inventories.push(0);
    } else {
      inventories[inventories.length - 1] += Number(i);
    }
  }
  const topIndices = [];
  for (let j = 0; j < 3; j++) {
    topIndices.push(
      inventories.indexOf(
        Math.max(
          ...inventories.filter((_, index) => !topIndices.includes(index))
        )
      )
    );
  }
  return topIndices.reduce((total, i) => total + inventories[i], 0);
}

export const tests2 = [];
