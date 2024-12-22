import 'dotenv/config'
import express from 'express'

const app =express();

const port =process.env.PORT||3000;

app.use(express.json())

let teaData= [];
let nextId =1

//Add a new tea
app.post('/teas', (req,res)=>{
    const {name, price } = req.body //req.body.price
    const newTea ={
        id: nextId++,
        name,
        price
    }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//Get all teas
app.get("/teas", (req,res)=>{
    res.status(200).send(teaData)
})

//Get singel tea with id 
app.get("/teas/:id", (req,res)=>{
  const tea =  teaData.find(t => t.id === parseInt(req.params.id))
   if(!tea){
    return res.status(404).send('Tea Not Found')
   }
   res.status(200).send(tea)
})

//Update 
app.put('/teas/:id',(req,res)=>{
    const teaId = req.params.id
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        res.status(404).send('Tea Not Found')
    }
    const {name,price}= req.body
    tea.name = name
    tea.price = price

    res.status(200).send(tea)

})

//Delete

app.delete("/teas/:id",(req,res)=>{
   const index =  teaData.findIndex(t => t.id === parseInt(req.params.id))
   if(index === -1){
    return res.status(404).send('tea not found ')
   }
   teaData.splice(index, 1)
   res.status(200).send('deleted')
})
app.listen(port,()=>{
    console.log('Server is live , What !')
})