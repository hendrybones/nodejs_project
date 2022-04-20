const {format} = require("@date-io/date-fns");
const { v4: uuid} = require("uuid");


const fs = require("fs");
const fsPromises =require("fs").promises;
const path = require("path");
var d = new Date,
    dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

const logEvents = async (message, logName) =>{
    const dateTime = `${d}`;
    const logItem = `${dateTime} \t${uuid()} \t${message}\n`;

    console.log(logItem);

    try{
        if(!fs.existsSync(path.join(__dirname,"..","logs"))){
            await fsPromises.mkdir(path.join(__dirname,"..","logs"));
        }
      //testing
        await fsPromises.appendFile(path.join(__dirname, "..","logs", logName),logItem);

    }catch (err){
        console.log(err);
    }
}

const logger=(req,res,next) =>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt")
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = {logger,logEvents};


// console.log(d)

// console.log(uuid())

// console.log(format(new Date(), 'yyyyMMdd\tHH:mn:ss'))