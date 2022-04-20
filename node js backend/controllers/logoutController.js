const User = require ("../model/User");


const handlelogout = async (req, res) => {

// on client , also delete the accessToken
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); //no content
    
    const refreshToken = cookies.jwt;

    //refresToken in database
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie("jwt",{httpOnly: true});
        return res.sendStatus(204);

    }
    //delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);
    // const otherUsers = usersDB.users.filter(person =>person.refreshToken !== foundUser.refreshToken);
    // const currentUser ={...foundUser,refreshToken:""};
    // usersDB.setUsers([...otherUsers,currentUser]);
    // await fsPromise.writeFile(
    //     path.join(__dirname,"..","model","user.json"),
    //     JSON.stringify(usersDB.users)

    // );
    res.clearCookie("jwt",{httpOnly:true});
    res.sendStatus(204);
}

module.exports = { handlelogout }