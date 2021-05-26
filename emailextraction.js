const fs = require("fs");
const prompt = require("prompt-sync")();

const file = fs.readFileSync("test.txt", "utf8");
const regex = /\S+@(?<domain>\S+)\b/g;

const matches = [...file.matchAll(regex)];

const domains = {};

matches.forEach(match => {
    const domain = match["groups"].domain;
    if (domains[domain]) {
        domains[domain] += 1;
    } else {
        domains[domain] = 1;
    }
});

const domainMap = Object.entries(domains).sort((a, b) => b[1] - a[1]);

console.log("Modes: \r\n(1) All domains\r\n(2) Top 10 domains\r\n(3) Frequency domains");
const mode = prompt("Choose a mode: ");

switch (mode) {
    case "1":
        console.log(domainMap);
        break;
    case "2":
        console.log(domainMap.splice(0, 10));
        break;
    case "3":
        // eslint-disable-next-line no-case-declarations
        const frequency = prompt("Frequency: ");
        // eslint-disable-next-line no-case-declarations
        const domainMapFilters = domainMap.filter(x => x[1] > frequency);
        console.log(domainMapFilters);
        break;
}