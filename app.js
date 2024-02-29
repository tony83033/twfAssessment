const express = require('express');
const { translate } = require('free-translate');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT ||  8000
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World 🎉')
})

app.get('/health',(req,res)=>{
    res.status(200).json({
        message:"Server is healthy"
    })
})


app.post  ("/french", async (req,res)=>{
  const text = req.body.text;
  if(text){
    const translatedText = await translate(text.toString(), { to: 'fr' });
   // console.log(translation)
    return res.status(200).json({
      translation: translatedText
    })
  }else{
    return res.status(200).json({
      error: "No text provided in the request body"
    })
  }
  
})


app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})