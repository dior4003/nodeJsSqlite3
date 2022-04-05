const app =require("./server/index");
const port = 8080;
app.listen(port , ()=>{
    console.log(`server started as port ${port}`);
});