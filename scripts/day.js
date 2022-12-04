import * as chokidar from "chokidar";
import "dotenv/config";
import * as fs from "fs";
import fetch from "node-fetch";
import * as path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
global.log = console.log;

const template = `export function part1(input) {
${"  "}
}

export const tests1 = [

];

export function part2(input) {
  throw new Error("Not implemented");
}

export const tests2 = [

];
`;

(async () => {
  const __root = path.resolve(`${__dirname}/..`);
  const __inputs = path.resolve(`${__root}/.inputs`);
  const __src = __root;

  const year = process.env.AOC_YEAR || new Date().getFullYear();
  const day = Number(process.argv[2]) || new Date().getDate();
  let input;

  if (!fs.existsSync(`${__inputs}/${year}/${day}.txt`)) {
    if (!process.env.AOC_SESSION) {
      console.error("AOC_SESSION not set");
      process.exit(1);
    }

    const data = await fetch(
      `https://adventofcode.com/${year}/day/${day}/input`,
      {
        headers: {
          cookie: `session=${process.env.AOC_SESSION}`,
        },
      }
    ).then((r) => r.text());

    let input = data.split("\n");
    if (input.length === 1 || (input.length === 2 && input[1] === ""))
      input = input[0].split(",");
    if (input.at(-1) === "") input.pop();
    const inputAsNumbers = input.map(Number);
    if (inputAsNumbers.every(Number.isFinite)) {
      // @ts-ignore
      input = inputAsNumbers;
    }

    fs.mkdirSync(`${__inputs}/${year}`, { recursive: true });
    fs.writeFileSync(`${__inputs}/${year}/${day}.txt`, JSON.stringify(input));
  } else {
    input = JSON.parse(
      fs.readFileSync(`${__inputs}/${year}/${day}.txt`, "utf8")
    );
  }

  if (!fs.existsSync(`${__src}/${year}/${day}.js`)) {
    fs.mkdirSync(`${__src}/${year}`, { recursive: true });
    fs.writeFileSync(`${__src}/${year}/${day}.js`, template);
  }
  console.log(
    `Find today's challenge at https://adventofcode.com/${year}/day/${day}`
  );
  console.log(`Find today's file at ${__src}/${year}/${day}.js:2:3\n`);

  let i = 1;
  while (true) {
    let imp;
    try {
      imp = await import(`${__src}/${year}/${day}.js?update=${Date.now()}`);
    } catch (e) {
      console.log(`Error`, e);
    }

    const startTime = Date.now();
    console.log(`Run ${i++}`);
    try {
      const p1 = imp?.part1?.(Array.isArray(input) ? [...input] : input);
      if (p1 === undefined) throw new Error("Not implemented");
      for (const test of imp.tests1 || []) {
        console.log("Running test");
        const val = imp.part1(test[0]);
        if (val !== test[1])
          console.error(
            `Test failed: ${JSON.stringify(test[0])} => ${val} (expected ${test[1]})`
          );
        else console.log("Test passed");
      }
      console.log("Part 1:", p1);
    } catch (e) {
      if (e.message !== "Not implemented") {
        console.error(e);
      } else {
        console.log("Part 1: Not implemented");
      }
    }
    const part1Time = Date.now();
    console.log(`Part 1: ${part1Time - startTime}ms`);
    try {
      const p2 = imp?.part2?.(Array.isArray(input) ? [...input] : input);
      if (p2 === undefined) throw new Error("Not implemented");
      for (const test of imp.tests2 || []) {
        console.log("Running test");
        const val = imp.part2(test[0]);
        if (val !== test[1])
          console.error(
            `Test failed: ${JSON.stringify(test[0])} => ${val} (expected ${test[1]})`
          );
        else console.log("Test passed");
      }
      console.log("Part 2:", p2);
    } catch (e) {
      if (e.message !== "Not implemented") {
        console.error(e);
      } else {
        console.log("Part 2: Not implemented");
      }
    }
    const part2Time = Date.now();
    console.log(`Part 2: ${part2Time - part1Time}ms`);
    console.log(`Total: ${part2Time - startTime}ms`);

    await new Promise((r) =>
      chokidar.watch(`${__src}/${year}/${day}.js`).on("change", r)
    );
    console.log("File change detected\n");
  }
})();
