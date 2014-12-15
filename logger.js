var log4js = require('log4js');

var logSize = 1024;
log4js.configure({

    appenders: [
        {
            type: 'console',
            category: "console"

        }, //控制台输出
        {
            type: "dateFile",
            filename: 'logs/node.log',
            pattern: "-yyyy-MM-dd",
            maxLogSize: logSize,
            backups: 3,
            category: 'normal',
        }, //日期文件格式
        {
            type: "dateFile",
            filename: 'logs/node.log',
            pattern: "-yyyy-MM-dd",
            maxLogSize: logSize,
            backups: 3,
            category: 'redis',
        },
        {
            type: "dateFile",
            filename: 'logs/node.log',
            pattern: "-yyyy-MM-dd",
            maxLogSize: logSize,
            backups: 3,
            category: 'rtc-signaler',
        },
        {
            type: "dateFile",
            filename: 'logs/node.log',
            pattern: "-yyyy-MM-dd",
            maxLogSize: logSize,
            backups: 3,
            category: 'http',
        },

    ],
    replaceConsole: true,   //替换console.log
    levels:{
        dateFileLog: 'debug',
        console: 'debug'
    }
});


var dateFileLog = log4js.getLogger('normal');
var consoleLog = log4js.getLogger('console');
var redisLog = log4js.getLogger('redis');
var rtcSignalerLog = log4js.getLogger('rtc-signaler');
var httpLog = log4js.getLogger('http');

dateFileLog.setLevel('INFO');
redisLog.setLevel('INFO');
rtcSignalerLog.setLevel('INFO');
httpLog.setLevel('INFO');

exports.logger = dateFileLog;
exports.redisLogger = redisLog;
exports.rtcSignalerLogger = rtcSignalerLog; 

exports.use = function(app) {
    app.use(log4js.connectLogger(httpLog, {level:'auto', format:':method :url'}));
}