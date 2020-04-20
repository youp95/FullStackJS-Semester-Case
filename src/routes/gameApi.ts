import express from "express";
import gameFacade from "../facades/gameFacade";
const router = express.Router();
import { ApiError } from "../errors/apiError"

//import * as mongo from "mongodb"
import setup from "../config/setupDB"
import UserFacade from '../facades/userFacadeMongoDB';
import GameFacade from "../facades/gameFacade";

(async function setupDB() {
  const client = await setup()
  gameFacade.setDatabase(client)
})()

router.post('/nearbyplayers', async function (req, res, next) {
  try{
    const { userName, password, lon, lat, distance } = req.body;
    
    const result = await GameFacade.nearbyPlayers(userName, password, lon, lat, distance);
    res.json(result)
  
  } catch(err){
    next(err)
  }

})
router.post('/getPostIfReached', async function (req, res, next) {
  try{
    const { id, lat, lon } = req.body;
    
    const result = await GameFacade.getPostIfReached(id, lat, lon)
    res.json(result)
  
  } catch(err){
    next(err)
  }
})

router.post('/addPost', async (req, res, next) => {
  try {

      const { name, task, isUrl, taskSolution, lon, lat } = req.body;
       
      const result = await gameFacade.addPost(name, task, isUrl, taskSolution, lon, lat)

      res.json(result)
      
  } catch (err) {
      next(err)
  }
})
module.exports = router;