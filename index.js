const colors = require("colors/safe");
let start = Number(process.argv[2]);
let end = Number(process.argv[3]);
if (!start || !end) {
    console.log(colors.red("Не указан диапазон!"));
    return;
}

if (isNaN(start) || isNaN(end) || start <= 1 || end <= 1){
    console.log(colors.red("В качестве параметров должны быть положительные числа больше 1"));
    return;
}

if (start > end) {
    start = start + end - (end = start);
}

let result = [];
for (let i = start; i <= end; i++) {
    let j = 2;
    const max = Math.sqrt(i);

    for (j; j < max; j++)
    {
        if (i % j === 0) {
            break;
        }
    }
    if (j > max) {
        result.push(i);
    }
}

if (result.length === 0) {
    console.log(colors.red('в данном диапазоне нет простых чисел.'))
}

console.log(result.map((item, key) => {
    if (key % 3 === 0) return colors.green(item);
    if (key % 3 === 1) return colors.yellow(item);
    return colors.red(item);
}).join(', '));