import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
import { buildErrorMessage } from 'vite';
dotenv.config({path:'./src/.env'})

const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.get('/weather',async (req,res) =>{
    const {latitudine,longitudine,oras} = req.query;
    const key = process.env.key;
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

app.listen(PORT,() => {
    console.log(`Serverul ruleaza pe http://localhost:${PORT}/weather`);
})