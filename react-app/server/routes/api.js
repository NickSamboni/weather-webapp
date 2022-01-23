const express = require("express");
const router = express.Router();
const stations = require("../model/stations");

router.get('/', async (req,res) => {
    try{
        const stat = await stations.find();
        res.json(stat)
    }catch(err){
        res.send({ error: err})
    }
});

module.exports = router;


