const { name } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const article = require('./models/Article');
const Article = require('./models/Article');
//mongodb+srv://<db_username>:<db_password>@firstnodejs.itikx.mongodb.net/?retryWrites=true&w=majority&appName=FirstNodejs
mongoose.connect("mongodb+srv://kmarah:kmarahemarahkmarahkmarah@firstnodejs.itikx.mongodb.net/?retryWrites=true&w=majority&appName=FirstNodejs")//لو حصل مشكلة روح لي الداتا بيز واعمل اكسس لل ip address
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log("error with connecting to MongoDB"));

const app = express();
app.use(express.json());

app.get("/hello",function (req, res) {
    res.send("Hello World!");//لو دخل على موقع /heelo يظهرله هذا الكلام


    //لو دخل على موقع /hi يظهرله هذا الكلام
   //لو عايز تعمل تغيير روح لي التيرمنل وروح للبورت واضعت كنترول+c واكتب

    app.get("/",function(req,res){
        res.send("hey Worlld!");
    })
});

app.get("/numbers",function(req,res){
let numbers= ""
;for(let i=0;i<=100;i++)
numbers+=i+"--- ";
// res.send(numbers);

// res.sendFile(__dirname+"/firstindex/numbers.html");
res.render(__dirname + "/views/numbers.ejs",
    
    
    {name:"khaled",age:25,numbers:numbers
});
});





app.get("/test/:number1/:number2/:title",function(req,res){
console.log(req.params);
let title=req.params;
let number1=parseInt(req.params.number1);
let number2=parseInt(req.params.number2);
let result=number1+number2;
res.send("The result is "+result + " "+title.title);


})

app.get("/say",function(req,res){
//     console.log(req.body);
//    console.log(req.query);
   
//     res.send("hello"+" "+ req.body.name + " "+ req.query.age);
res.json({name:req.body.name
    ,age:req.query.age
    ,language:"Arabic"
});
  
    
    })

    // ============ Article Endpoints ============
    app.post("/articles", async/*to add awaits*/(req,res)=>{


const newArticle = new Article();
const artTittle = req.body.ArticleTitle;
const artBody = req.body.ArticleBody;
const artLikes = req.body.ArticleLikes;


newArticle.tittle = artTittle;
newArticle.body = artBody;
newArticle.NumberOfLikes = artLikes;
await/*awaits هي لجعل الفانكشن تتكمل لازم الشيء الي بعدها الأول*/ newArticle.save()




        res.json({message:"Article has been added successfully",data:newArticle});
    })
;

app.get("/articles",async(req,res)=>{
    const articles = await Article.find();
    res.json(articles);
})



app.get("/articles/:articleid",async(req,res)=>{
    const id = req.params.articleid;
try{
    const article = await Article.findById(id);
    res.json(article);
    return;
}catch(err){console.log("error ",id);res.json({message:"Article not found",error:err})};
    res.json(article);

  ;
    
})
app.delete("/articles/:articleid",async(req,res)=>{
    const id = req.params.articleid;
    try{
        const article = await Article.findByIdAndDelete(id);
        res.json({message:"Article has been deleted successfully",data:article});
        return;
    }catch(err){console.log("error ",id);res.json({message:"Article has error in app.delete",error:err})};
        res.json(article);})
    
      ;
      app.get("/ShowArticles",async(req,res)=>{
        const articles = await Article.find();
        res.render(__dirname + "/views/articles.ejs",{allarticles:articles});

      }) 

app.listen(3000, () => {
    console.log("Server is running on port 3000");//localhost:3000
})