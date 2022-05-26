console.log('Record 1'); //выводится первым
setTimeout(() => {
    console.log('Record 2'); // выводится четвертым
    Promise.resolve().then(() => {
        setTimeout(() => {
            console.log('Record 3'); //выводится пятым
            Promise.resolve().then(() => {
                console.log('Record 4'); // выводится шестым
            });
        });
    });
});
console.log('Record 5'); // выводится вторым
Promise.resolve().then(() =>
    Promise.resolve().then(() =>
        console.log('Record 6'))); // выводится третьим, микрозадача