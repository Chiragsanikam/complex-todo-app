//so we are creating a backend for todos
//get todo will just show all the todos in json format
//post todo will post them ,, take inputs from body
//delete todo will delete them from the array for that we have used TWO functions


// writing to json file use json.stringify(nameofthething)
//reading from json file use json.parse(data)


const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const port = 4000
const fs=require('fs')
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json())

let todos=loadTodosFromFile();

//loading data from json file


function loadTodosFromFile(){
  try{
    fs.readFileSync('app.json','utf8')
    return JSON.parse(data)||[]
  }
  catch(err){
    return []
  }
}

function saveTodoToFile(){
  fs.writeFileSync('app.json', JSON.stringify(todos),'utf8')
}


//^^^^ function which are used to read and write fro a json file mocking a database



//functions
function findIndex(arr,id){
  for(i=0;i<arr.length;i++){
    if(arr[i].id===id){
      return i
    }
  }
  return -1
}

function removeAtIndex(arr,index){
let newarray=[]
for(i=0;i<arr.length;i++){
  if(i!==index){
    newarray.push(arr[i])
  }

}
return newarray;


}

//

//getting the todos
app.get('/todos', (req, res) => {
  res.json(todos);
})

count =1 
//posting the todos
app.post('/todos', (req,res)=>{
  const newTodo={
    id: count, //unique random id
    title : req.body.title,
    description : req.body.description
  }
  todos.push(newTodo)
  saveTodoToFile()
  count = count +1
  res.json(todos)
})

//deleting the todos
app.delete('/todos',(req,res)=>{
  let todoIndex=findIndex(todos, parseInt(req.body.id))
  if(todoIndex=== -1){
    res.status(404).send()
  }
  else{
    todos= removeAtIndex(todos, todoIndex)
    saveTodoToFile()
    res.status(200).json(todos) //shows remaining todos
  }
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})