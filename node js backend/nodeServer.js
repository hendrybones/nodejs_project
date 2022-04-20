const http = require("http");
const path =require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;



const logEvents = require("./logEvents");
const EventEmmiter = require("events");
const { parse } = require("path");
class Emitter extends EventEmmiter {};
//intailize the object
const myEmitter= new Emitter();
myEmitter.on("log",(msg, fileName) => logEvents(msg,fileName));
const PORT = process.env.PORT || 3500;

const serveFile= async (filePath,contentType,response) =>{
    try {

        const rawdata = await fsPromises.readFile(
            filePath,            
            !contentType.includes("image") ? "utf8" : ""
            );
        const data =contentType === "application/json"
            ? JSON.parse(rawdata) : rawdata;
        response.writeHead(
            filePath.includes("404.html") ? 404: 200,
            {"Content-Type": contentType});
        response.end(
            contentType ==="application/json" ? JSON.stringify(data) : data
        );
    }catch (err) {
        console.log(err);
        myEmitter.emit("log",`${err.name}\t ${err.message}`,"errLog.txt");
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) =>{

    console.log(req.url, req.method);
    myEmitter.emit("log",`${req.url}\t ${req.method}`,"reqLog.txt");

    const extension = path.extname(req.url);
    let contentType;

    switch (extension){
        case '.css':
            contentType ="text/css";
        case ".js":
            contentType ="text/javascript";
            break;
        case ".json":
            contentType ="application/json";
            break;
        case ".jpg":
            contentType ="image/jpeg";
            break;
        case ".jng":
                contentType ="image/png";
                break;
        case ".txt":
            contentType ="text/plain";
            break;
        default:
            contentType ="text/html";

        
    }
    let filePath =
        contentType ==="text/html" && req.url ==="/"
          ? path.join(__dirname, "views", req.url, "index.html")
           :contentType === "text/size"
             ? path.join(__dirname, "views", req.url)
             :path.join(__dirname, req.url);

        //makes .html extension not required in the browser
        if(!extension && req.url.slice(-1) !=="/") filePath += ".html";

        const fileExist = fs.existsSync(filePath);
        if(fileExist){
            //serve th file
            serveFile(filePath,contentType,res);
        }else {
            //404
            //301 redirect
            switch(path.parse(filePath).base){
                case "old-page.html":
                    res.writeHead(301, {"Location": "/"});
                    res.end();
                    break;
                default:
                    //serve 404 request
                    serveFile(path.join(__dirname,"views", "404.html"),"text/html",res);
            }
        }
});

server.listen(PORT, () =>console.log(`server running 
on port ${PORT}`));



//
 // let path;
    // switch (req.url){
    //     case "/":
    //         res.statusCode =200;
    //         path = path.join(__dirname,"views", "index.html");
    //         fs.readFile(path, "utf8",(err, data) =>{
    //             res.end(data);
    //         });
    //         break;
    // }

    // if(req.url==="/" || red.url=== "index.html"){
    //     res.statusCode = 200;
    //     res.setHeader("Content-Type", "text/html");
    //     path =path.join(__dirname,"views", "index.html");
    //     fs.readFile(path, "utf8", (err, data) =>{
    //         res.end(data);
    //     })
    // }
