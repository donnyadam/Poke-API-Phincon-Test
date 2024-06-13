import express from "express";
import JSONdb from "simple-json-db";

const router = express.Router();
const db = new JSONdb('../data/pokemon-data.json');

const newFibonacci = (name, latestFibonacci) => {
    if(latestFibonacci == 1){
        if(db.has(name.toLowerCase())){
            return latestFibonacci + 1;
        }
        else {
            db.set(name.toLowerCase(), true);
            return latestFibonacci;
        }
    }
    else if(latestFibonacci < 3){
        return latestFibonacci + 1;
    }
    else {
        const result = latestFibonacci * (1 + Math.sqrt(5)) / 2.0
        return Math.round(result);
    }
};

const extractName = name => {
    const nameArr = name.split("-")
    if (nameArr.length > 1) {
        return nameArr
    } else {
        nameArr.push("-1")
        return nameArr
    }
};

const rename = oldName => {
    const fullname = extractName(oldName);
    const latestFibNum = parseInt(fullname[1]);
    const newFibNum = newFibonacci(fullname[0], latestFibNum);

    return `${fullname[0]}-${newFibNum}`;
}

router.put('/', (req, res) => {
    const name = req.body.name;
    const newName = rename(name);

    const result = {
        'data': {
            'name': newName,
            'status': true
        }
    }

    res.json(result);
});

export default router;