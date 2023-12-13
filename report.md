# WEEK 4 - LOGGING
## Setting Up Winston Logging
### Install package
```bash
npm i winston
```
### Using 
*create file utils/logger.util.*
```bash
import  winston from "winston";

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
```
- Creating a logger using Winston.createLogger() method

- returning to our file **controllers/actor.controller.ts**. Here we can create newly created logger:
```bash
logger.log("info", "getActor");
logger.error("error get actor by id");
```
then we can log in json format
```bash
{"level":"info","message":"getActor"}
{"level":"error","message":"error get actor by id"}
```
### Winston levels
- 0 - error: is a serious problem or failure, that halts current activity but leaves the application in a recoverable state with no effect on other operations. The application can continue working.
- 1 - warn: A non-blocking warning about an unusual system exception. These logs provide context for a possible error. It logs warning signs that should be investigated.
- 2 - Info: This denotes major events and informative messages about the application’s current state. Useful For tracking the flow of the application.
- 3 - http: This logs out HTTP request-related messages. HTTP transactions ranging from the host, path, response, requests, etc.
- 4 - verbose: Records detailed messages that may contain sensitive information.
- 5 - debug: Developers and internal teams should be the only ones to see these log messages. They should be disabled in production environments. These logs will help us debug our code.
- 6 - silly: The current stack trace of the calling function should be printed out when silly messages are called. This information can be used to help developers and internal teams debug problems.
### Winston format
#### printf()
```bash
import winston, { format } from "winston";

export const logger = winston.createLogger({
    level: "debug",
    format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.json(),
        format.printf((info) => {
            console.log(info);
            return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
    ),
    transports: [new winston.transports.Console()]
})
```
#### prettyPrint()
```bash
import winston, { format } from "winston";

export const logger = winston.createLogger({
    level: "debug",
    format: format.combine(
        format.timestamp({
            format: "yyyy-MM-dd hh:mm:ss"
        }),
        format.json(),
        format.prettyPrint()
    ),
    transports: [new winston.transports.Console()]
})
```

### Winston Transports
Here are the built-in transport options in Winston:
- Console
- File
- Http
- Stream
#### Storing Winston Logs to File
Using the File transport option, we can save generated log messages to any file we want.
To accomplish this, the transport field in our code must either point to or generate a file.
```bash
transports: [
    //new transports:
    new transports.File({
      filename: "logs/example.log",
    }),
  ]
```
we can seperate file
***When we specify a logging level for our Winston logger, it will only log anything at that level or higher.***
```bash
const errorFilter = winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
    return info.level === 'info' ? info : false;
});
```
```bash
  transports: [
        new winston.transports.File({
            filename: './src/logs/all.log',
            format: combine( timestamp({
                format: "MMM-DD-YYYY HH:mm:ss",
            }), json()),
        }),
        new winston.transports.File({
            filename: './src/logs/error.log',
            level: 'error',
            format: combine(errorFilter(), timestamp({
                format: "MMM-DD-YYYY HH:mm:ss",
            }), json()),
        }),
        new winston.transports.File({
            filename: './src/logs/info.log',
            level: 'info',
            format: combine(infoFilter(), timestamp({
                format: "MMM-DD-YYYY HH:mm:ss",
            }), json()),
        }),]
```
### Log Rotation with Winston
In the production environment, a lot of activity occurs, and storing log messages in files can get out of hand very quickly, even when using multiple transports. Over time log messages become large and bulky to manage.
To solve these issues logs can be rotated based on size, limit, and date. log rotation removes old logs based on count, relevance or elapsed day.
Winston provides the winston-daily-rotate-file module. It is an external transport used for file rotation, To keep our logs up to date.
*Let’s go ahead and install it:*
```bash
npm install winston-daily-rotate-file
```
```bash
const fileRotateTransport = new transports.DailyRotateFile({
    filename: `src/logs/rotate-%DATE%.log`, 
    datePattern: 'YYYY-MM-DD-HH-mm', // Use 'YYYY-MM-DD-HH-mm' to rotate logs every minute
    maxSize: '2k', // Optional: Maximum log file size before rotation
    // maxFiles: '1m', // Optional: Maximum log files to keep (1 minute of logs)
});
```

- frequency: A string representing the frequency of rotation. This is useful if you want to have timed rotations, as opposed to rotations that happen at specific moments in time. Valid values are '#m' or '#h' (e.g., '5m' or '3h'). Leaving this null relies on datePattern for the rotation times. (default: null)
- datePattern: A string representing the moment.js date format to be used for rotating. The meta characters used in this string will dictate the frequency of the file rotation. For example, if your datePattern is simply 'HH' you will end up with 24 log files that are picked up and appended to every day. (default: 'YYYY-MM-DD')
- zippedArchive: A boolean to define whether or not to gzip archived log files. (default: 'false')
- filename: Filename to be used to log to. This filename can include the %DATE% placeholder which will include the formatted datePattern at that point in the filename. (default: 'winston.log.%DATE%')
- dirname: The directory name to save log files to. (default: '.')
- stream: Write directly to a custom stream and bypass the rotation capabilities. (default: null)
- maxSize: Maximum size of the file after which it will rotate. This can be a number of bytes, or units of kb, mb, and gb. If using the units, add 'k', 'm', or 'g' as the suffix. The units need to directly follow the number. (default: null)
- maxFiles: Maximum number of logs to keep. If not set, no logs will be removed. This can be a number of files or number of days. If using days, add 'd' as the suffix. It uses auditFile to keep track of the log files in a json format. It won't delete any file not contained in it. It can be a number of files or number of days (default: null)
### save log mongodb
```bash
npm install winston-mongodb
```