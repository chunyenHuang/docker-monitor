const { exec } = require('child_process');


const commands = {
    stats: `docker stats --no-stream`,
    statsName: `docker stats --no-stream $(docker ps --format={{.Names}})`
};

const interval = process.env.INTERVAL || 1000;

exports.logStats = function logStats(interval) {
    setInterval(() => {
        printStats();
    }, interval);
}

exports.printStats = function printStats() {
    return new Promise((resolve, reject) => {
        exec(commands.statsName, (err, stdout, stderr) => {
            if (err || stderr) {
                return reject(err);
            }
            if (stdout) {
                const data = parseStats(stdout);
                return resolve(data);
            }
        });
    });

}

function parseStats(stats = '') {
    let data = [];
    let lastId;
    let current = [];

    const ignores = ['', '%', 'USAGE', '/'];
    stats
        .split(' ')
        .filter(item => !ignores.includes(item))
        .forEach((item) => {
            if (item.includes('\n')) {
                current.push(item.split('\n')[0]);
                data.push(current);
                current = [];
                lastId = item.split('\n')[1];
                current.push(item.split('\n')[1]);
            } else {
                current.push(item);
            }
        });
    // const template = {};
    // data = data.map((item, index) => {
    //     if (index != 0) {
    //         item = item.reduce((obj, subItem, index) => {
    //             obj[data[0][index]] = subItem;
    //             return obj;
    //         }, {});
    //     }
    //     return item
    // });
    return data;
}
