function parseMonkeys(input) {
  const monkeys = [];
  let currentMonkey = null;
  for (let line of input) {
    line = line.trim();
    if (line.startsWith("Monkey")) {
      currentMonkey = {
        id: parseInt(line.split(" ")[1].split(":")[0]),
        startingItems: [],
        operation: null,
        divisible: null,
        ifTrue: null,
        ifFalse: null,
        inspections: 0,
      };
      monkeys.push(currentMonkey);
    } else if (line.startsWith("Starting items:")) {
      currentMonkey.startingItems = line
        .split(":")[1]
        .trim()
        .split(",")
        .map((x) => parseInt(x));
    } else if (line.startsWith("Operation:")) {
      currentMonkey.operation = line.split("new = ")[1].trim();
    } else if (line.startsWith("Test:")) {
      currentMonkey.divisible = line.split("by")[1].trim();
    } else if (line.startsWith("If true:")) {
      currentMonkey.ifTrue = parseInt(line.split(" ")[5]);
    } else if (line.startsWith("If false:")) {
      currentMonkey.ifFalse = parseInt(line.split(" ")[5]);
    }
  }
  return monkeys;
}

export function part1(input) {
  const monkeys = parseMonkeys(input);
  for (let r = 0; r < 20; r++) {
    for (const monkey of monkeys) {
      while (monkey.startingItems.length) {
        monkey.inspections++;
        let item = monkey.startingItems.shift();
        item = eval(monkey.operation.replace(/old/g, item));
        item = Math.floor(item / 3);

        const testOk = item % monkey.divisible === 0;
        monkeys[testOk ? monkey.ifTrue : monkey.ifFalse].startingItems.push(
          item
        );
      }
    }
  }
  return monkeys
    .map((x) => x.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1);
}

export const tests1 = [
  [
    [
      "Monkey 0:",
      "  Starting items: 79, 98",
      "  Operation: new = old * 19",
      "  Test: divisible by 23",
      "    If true: throw to monkey 2",
      "    If false: throw to monkey 3",
      "",
      "Monkey 1:",
      "  Starting items: 54, 65, 75, 74",
      "  Operation: new = old + 6",
      "  Test: divisible by 19",
      "    If true: throw to monkey 2",
      "    If false: throw to monkey 0",
      "",
      "Monkey 2:",
      "  Starting items: 79, 60, 97",
      "  Operation: new = old * old",
      "  Test: divisible by 13",
      "    If true: throw to monkey 1",
      "    If false: throw to monkey 3",
      "",
      "Monkey 3:",
      "  Starting items: 74",
      "  Operation: new = old + 3",
      "  Test: divisible by 17",
      "    If true: throw to monkey 0",
      "    If false: throw to monkey 1",
    ],
    10605,
  ],
];

export function part2(input) {
  const monkeys = parseMonkeys(input);
  const megaMod = monkeys.reduce((a, b) => a * b.divisible, 1);

  for (let r = 0; r < 10000; r++) {
    for (const monkey of monkeys) {
      while (monkey.startingItems.length) {
        monkey.inspections++;
        let item = monkey.startingItems.shift();
        item = eval(monkey.operation.replace(/old/g, item));
        item = item % megaMod;

        const testOk = item % monkey.divisible === 0;
        monkeys[testOk ? monkey.ifTrue : monkey.ifFalse].startingItems.push(
          item
        );
      }
    }
  }
  return monkeys
    .map((x) => x.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1);
}

export const tests2 = [
  [
    [
      "Monkey 0:",
      "  Starting items: 79, 98",
      "  Operation: new = old * 19",
      "  Test: divisible by 23",
      "    If true: throw to monkey 2",
      "    If false: throw to monkey 3",
      "",
      "Monkey 1:",
      "  Starting items: 54, 65, 75, 74",
      "  Operation: new = old + 6",
      "  Test: divisible by 19",
      "    If true: throw to monkey 2",
      "    If false: throw to monkey 0",
      "",
      "Monkey 2:",
      "  Starting items: 79, 60, 97",
      "  Operation: new = old * old",
      "  Test: divisible by 13",
      "    If true: throw to monkey 1",
      "    If false: throw to monkey 3",
      "",
      "Monkey 3:",
      "  Starting items: 74",
      "  Operation: new = old + 3",
      "  Test: divisible by 17",
      "    If true: throw to monkey 0",
      "    If false: throw to monkey 1",
    ],
    2713310158,
  ],
];
