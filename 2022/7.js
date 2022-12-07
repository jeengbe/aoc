function mapDirs(input) {
  let cwd = "/";
  let dirs = [];
  dirs.push(["/", "dir", null]);

  for (const i of input) {
    if (i.startsWith("$ cd ")) {
      const cd = i.replace("$ cd ", "");
      if (cd.startsWith("/")) {
        cwd = cd;
      } else if (cd === "..") {
        cwd = cwd
          .split("/")
          .splice(0, cwd.split("/").length - 1)
          .join("/");
      } else {
        cwd += `/${cd}`;
      }
      if (cwd.endsWith("/")) cwd = cwd.slice(0, -1);
    } else if (i === "$ ls") {
    } else {
      if (i.startsWith("dir")) {
        dirs.push([cwd + "/" + i.replace("dir ", "") + "/", "dir", null]);
      } else {
        dirs.push([
          cwd + "/" + i.replace(/\d+ /, ""),
          "file",
          Number(i.replace(/\D+/, "")),
        ]);
      }
    }
  }

  dirs = dirs.map((dir) => {
    const [path, type, size] = dir;
    if (type === "file") return dir;
    return [
      path,
      type,
      dirs
        .filter((d) => d[0].startsWith(path))
        .reduce((sum, d) => sum + d[2], 0),
    ];
  });

  return dirs;
}

export function part1(input) {
  const dirs = mapDirs(input);

  return dirs
    .filter(([, type]) => type === "dir")
    .filter(([, , size]) => size <= 100000)
    .reduce((sum, [, , size]) => sum + size, 0);
}

export const tests1 = [
  [
    [
      "$ cd /",
      "$ ls",
      "dir a",
      "14848514 b.txt",
      "8504156 c.dat",
      "dir d",
      "$ cd a",
      "$ ls",
      "dir e",
      "29116 f",
      "2557 g",
      "62596 h.lst",
      "$ cd e",
      "$ ls",
      "584 i",
      "$ cd ..",
      "$ cd ..",
      "$ cd d",
      "$ ls",
      "4060174 j",
      "8033020 d.log",
      "5626152 d.ext",
      "7214296 k",
    ],
    95437,
  ],
];

export function part2(input) {
  const dirs = mapDirs(input);

  const root = dirs[0];
  const rootSize = root[2];
  const free = 70000000 - rootSize;
  const toBeFreed = 30000000 - free;

  return dirs
    .filter(([, type]) => type === "dir")
    .sort((a, b) => a[2] - b[2])
    .filter(([, , size]) => size >= toBeFreed)[0][2];
}

export const tests2 = [
  [
    [
      "$ cd /",
      "$ ls",
      "dir a",
      "14848514 b.txt",
      "8504156 c.dat",
      "dir d",
      "$ cd a",
      "$ ls",
      "dir e",
      "29116 f",
      "2557 g",
      "62596 h.lst",
      "$ cd e",
      "$ ls",
      "584 i",
      "$ cd ..",
      "$ cd ..",
      "$ cd d",
      "$ ls",
      "4060174 j",
      "8033020 d.log",
      "5626152 d.ext",
      "7214296 k",
    ],
    24933642,
  ],
];
