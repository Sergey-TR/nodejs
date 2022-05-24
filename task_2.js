const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

const timers = process.argv.slice(2);
const handler = (payload) => {
  console.log(payload);
};
eventEmitter.on("timers", handler);
eventEmitter.emit("timers", "СЕЙЧАС: " + new Date());


    for (let idx = 0; idx < timers.length; idx++) {
        if (!timers[idx][12]) {
            console.log('В таймере-' + (idx + 1) + ' не верно указан формат ввода даты и время');
            console.log('формат ввода: hh-yyyy-mm-dd')
        }
        let year = timers[idx][3]+timers[idx][4]+timers[idx][5]+timers[idx][6];
        let month = timers[idx][8]+timers[idx][9];
        let day = timers[idx][11]+timers[idx][12];
        let hour = timers[idx][0]+timers[idx][1];
        let endDate = year + '-' + month + '-' + day + 'T' + hour + ':00' + ':00';
        let endDateMs = Date.parse(endDate);

        let timer = setInterval(function () {
            let now = Date.now();

            if ((endDateMs - now) <= 0) {
                clearInterval(timer);
                eventEmitter.emit("timers", 'ТАЙМЕР-' + (idx + 1 ) + ' СТОП')
            } else {
                let timerWork = new Date((endDateMs - now));
                let stopSeconds = Math.floor((timerWork/1000) % 60);
                let stopMinutes = Math.floor((timerWork/1000/60) % 60);
                let stopHours = Math.floor((timerWork/(1000*60*60)) % 24);
                let stopDays = Math.floor(timerWork/(1000*60*60*24));

                eventEmitter.emit("timers", 'ТАЙМЕР-' + (idx + 1 ) + ' СРАБОТАЕТ ЧЕРЕЗ: D_'
                    + stopDays + ' H_' + stopHours + ' M_' + stopMinutes + ' S_' + stopSeconds);
            }
        }, 1000);

    };





