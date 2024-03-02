const express = require('express');
const axios = require('axios');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World 🎉')
})

app.get('/health',(req,res)=>{
    res.status(200).json({
        message:"Server is healthy"
    })
})


app.post  ("/french", async  (req,res)=>{
  const text = req.body.text;
  if(text){
    
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', 'fr');
    encodedParams.set('text', text);
    // axios options
    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'df4a3292admsh5bcdf3a8c1f4ae1p178a58jsnc8d0a19c4f10',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);

     // console.log(response.data);
      return res.status(200).json({
        translation:response.data.data.translatedText
      })
    } catch (error) {
     // console.error(error);
      return res.status(500).json({
        error:error
      })
    }
    
    
 
  }else{
    return res.status(200).json({
      error: "No text provided in the request body"
    })
  }
  
})


app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})