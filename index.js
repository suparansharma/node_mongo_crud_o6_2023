const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000; 
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Simple Node Server Running');
})

app.listen(port,()=>{
    console.log(`Simple node server running on port ${port}`);
})


const users = [
    {id:1,name:'Sabana',email:'sabana@gmail.com'},
    {id:2,name:'Sabina',email:'sabina@gmail.com'},
    {id:3,name:'Salma',email:'salma@gmail.com'},
]
const categories = [ 
    {id:1,name:'Bangla',status:"true"},
    {id:2,name:'English',status:"true"},
    {id:3,name:'Hindi',status:"true"}
    
]




const uri = "mongodb+srv://newsadmin:newsadmin@cluster0.eilfw7v.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const categoryCollection = client.db('newsadmin').collection('category');
    const category = {name:'Bangla',status:"true"};
    app.post('/user',async(req,res)=>{
        const category = req.body;
        const result = await categoryCollection.insertOne(category);
        console.log(result);
        category.id = result.insertedId;
        res.send(category)
    })
    
  } finally {
   
  }
}
run().catch(err =>console.log(err));


// run().catch(console.dir);


// async function run(){
//     try{
//         const categoryCollection = client.db('newsadmin').collection('category');
//         const category = {name:'Bangla',status:"true"};
//         const result = await categoryCollection.insertOne(category);
//         console.log(object);
//     }
// }

// run().catch(err =>console.log(err));



app.get('/user',(req,res)=>{
    
    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >=0);
        res.send(filtered);
        
    }
    else{
        res.send(users);
    }
})
// app.post('/user',(req,res)=>{
//     console.log('Post Api Call');
//     // console.log(req.body);
//     const category = req.body;
//     category.id = categories.length + 1;
//     categories.push(category);
//     console.log(category);
//     res.send(category)
// })


// newsadmin