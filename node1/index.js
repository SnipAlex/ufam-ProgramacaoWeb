import http from "http";

http.createServer((req, res) => {
    console.log(`Counter ${++counter}`);
    
}).listen(3000)