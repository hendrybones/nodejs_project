const Player = require("../model/Player");



const getAllPlayers = async (req, res) =>{
    const players = await Player.find();
    if(!Player) return res.status(204).json({"message":"No employees found"});
    res.json(players);
}
const createNewPlayer = async(req, res) =>{
    if(!req?. body?.firstname || !newPlayer.lastname){
        return res.status(400).json({"message": "First and last names are required."});
    }
    try{
        const result = await Player.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        res.status(201).json(result);
    } catch (err){
        console.error(err);
    }
    // const newPlayer = {
    //     id: data.players[data.players.length-1].id +1 || 1,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname
    // }
    // if(!newPlayer.firstname || !newPlayer.lastname){
    //     return res.status(400).json({"message":"First and last names are required."});
    // }
    // data.setPlayers([...data.players,newPlayer]);
    // res.status(201).json(data.players);
}
const updatePlayer = async (req, res) =>{
    // const player=data.players.find(ply =>ply.id === parseInt(req.body.id));
    if(!req?.body?.id){
        return res.status(400).json({"message": "ID parameter is required."});

    }
    const player =await Player.findOne({_id: req.body.id}).exec();
    
    if(!player){
        return res.status(204).json({"message": `No player matches ID ${req.body.id}.`});

    }
    if(req.body?.firstname) player.firstname =req.body.firstname;
    if(req.body?.lastname) player.lastname =req.body.lastname;

    const result = await player.save();
    // const filteredArray= data.players.filter(ply =>ply.id !==parseInt(req.body.id));
    // const unsortedArray =[...filteredArray,player];
    // data.setPlayers(unsortedArray.sort((a,b) =>a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(result);
}
const deletePlayer= async(req,res) =>{
    if(!req?.body?.id) return res.status(400).json({"message":"Player ID required."});

    const player=await Player.findOne({_id:req.body.id}).exec();
    if(!player){
        return res.status(204).json({"message": `No player matches ID ${req.body.id}.`});

    }
    // const filteredArray =data.players.filter(ply =>ply.id !== parseInt(req.body.id));
    // data.setPlayers([...filteredArray]);
    const result = await player.deletePlayer({_id:req.body.id});
    res.json(data.players);
}
const getPlayer= async(req, res) =>{
    if(!req?.params?.id) return res.status(400).json({"message":"Player ID required."});
    const player =await Player.findOne({_id:req.params.id}).exec();
    
    if(!player){
        return res.status(204).json({"message": `No player matches ID ${req.params.id}.`});

    }
    res.json(player);
}

module.exports ={
    getAllPlayers,
    createNewPlayer,
    updatePlayer,
    deletePlayer,
    getPlayer
}