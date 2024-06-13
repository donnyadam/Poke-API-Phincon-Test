import express from 'express';
import JSONdb from 'simple-json-db';

const router = express.Router();
const db = new JSONdb('../data/pokemon-data.json');

const isPrime = num => {
    const s = Math.sqrt(num);
    for(let i = 2; i <= s; i++){
        if(num % i === 0 ) return false;
    }
    return num > 1;
} 

const extractName = name => {
    const nameArr = name.split("-")
    if (nameArr.length > 1) {
        return nameArr
    } else {
        nameArr.push("-1")
        return nameArr
    }
};

router.post('/', (req, res) => {
    const number = Math.floor((Math.random() * 100) + 1);
    const prime = isPrime(number);

    if(prime){
        const name = req.body.name;
        const firstName = extractName(name)[0].toLowerCase();

        if(db.has(firstName)){
            db.delete(firstName);
        }
    }

    const result = {
        'data': {
            'number': number,
            'status': isPrime(number)
        }
    }

    res.json(result);
});

export default router;