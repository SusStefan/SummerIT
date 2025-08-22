import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
import { buildErrorMessage } from 'vite';
dotenv.config({path:'./src/.env'})

const app = express();
const PORT = process.env.PORT;
app.use(cors());

// PENTRU VREME

app.get('/weather',async (req,res) =>{
    const {latitudine,longitudine,oras} = req.query;
    let queryParam = ''
    if(latitudine && longitudine)
    {
        queryParam = `${latitudine},${longitudine}`;
    }
    else if(oras)
    {
        queryParam = oras;
    }
    else {
        queryParam = 'Bucharest';
    }

    console.log(`Apelam vremea pentru latitudinea ${latitudine} si longitudinea ${longitudine}`);
    try{
        const response = await axios.get('http://api.weatherapi.com/v1/current.json',{
            params:
            {
                key: process.env.key,
                q:queryParam
            },
        });
        res.json(response.data);
    }
    catch(error)
    {
        res.status(500).json({error: "Am ESUAT in a se apela datele despre vreme"});
        console.log("EROARE: Nu s-au putut apela datele: "+error.message);
    }
});

// PENTRU STOCK & CRYPTO

app.get('/crypto-price',async (req,res) =>{
    const {coin,currency} = req.query;
    const apikey = process.env.keycripto;
    const coinParam = coin || 'bitcoin';
    const currencyParam = currency || 'usd';
    console.log(`Vrem sa aflam pretul ${coinParam} in ${currencyParam}`);
    try{
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price',{
            params:
            {
                ids: coinParam,
                vs_currencies: currencyParam
            },
            headers: {
                'Accept': 'application/json',
                'x-cg-demo-api-key': apikey
            }
        });
        res.json(response.data);
    }
    catch(error)
    {
        res.status(500).json({error: "Am ESUAT in a se apela datele despre stocuri"});
        console.log("EROARE: Nu s-au putut apela datele: "+error.message);
    }
});


app.listen(PORT,() => {
    console.log(`Serverul ruleaza pe http://localhost:${PORT}/weather \n sau \n http://localhost:${PORT}/crypto-price?coin=bitcoin,ethereum&currency=usd`);
})