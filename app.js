const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


app.get('/',(req,res)=>{

  res.send('Hello World!');

})

app.post('/api',(req,res)=>{
const user={
  name: 'manish',
  lname:'vishwakarma',
  email:'manish@gmail.com',
  password: '123456',
  role: 'admin'
}
jwt.sign({user},'privatekey',{expiresIn:'3600s'},(err,token)=>{
console.log("token==>"+token)
res.json({
  token
})
});
});

app.post('/api/verify',verifytoken,(req,res)=>{
 console.log("token==>"+req.token)
 jwt.verify(req.token, 'privatekey',(err,data)=>{
  console.log("err ",err)
  console.log(data)
  if(err)
  {
    res.sendStatus(403)
  }
  else
  {
    res.json({
      message: 'Post created...',
      data
    })}
 })



})


function verifytoken(req, res, next){
  const ms=req.headers['authorization'];
  console.log(ms)
if( typeof ms!=='undefined'){

  const sk =ms.split(' ')
  console.log(sk)
  const jb=sk[1]
  console.log(jb)
  req.token = jb
  next();
}
else
{
  res.status(401).json({
    message: 'Unauthorized'
  })
}


}

app.listen(3000,console.log("app starting at port 3000"));
