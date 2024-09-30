var express = require('express');
var router = express.Router();

const usuarios = [
  {id: 1, nome: 'vinicius', email:'vtorg.martins'},
  {id: 2, nome: 'vinicius', email:'vtorg.martins'},
  {id: 3, nome: 'vinicius', email:'vtorg.martins'}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!testaApiKey(req,res)){
    return
  }
  res.send(usuarios);
});

router.get('/:id', function(req, res, next) {
  if (!testaApiKey(req,res)){
    return
  }
  const id = req.params.id;
  const user = usuarios.find(user => user.id == id);
  if (user != undefined) {
    res.send(user)
  }
  else{
    res.status(404).send(`Usuário com o id: ${id} não encontrado`);
  }
});

router.post("/", function(req,res){
  if (!testaApiKey(req,res)){
    return
  }
  const user = req.body;
  if (user.id == 0){
    user.id = usuarios.length + 1; 
  }
  usuarios.push(user);
  res.status(201).send(user);
});


function testaApiKey(req, res){
  if (req.get('api_key' != '123')){
    res.status(401).send("API Key inválida");
    return false;
  }
  return true;
}
module.exports = router;
