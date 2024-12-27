const router = require("express").Router();
const { tokenExtractor } = require("../utils/middleware");
const { Active, User } = require("../models");

router.delete("/", tokenExtractor, async (req, res) => {
    try{
        const user = await User.findByPk(req.decodedToken.id)
        const isActive = await Active.findOne({where: {userId: user.id}})
        if(!isActive){
            return res.status(401).json({error: 'This user is not logged'})
        }
        const deleteSession = await isActive.destroy()
        return res.status(200).json(deleteSession)
    }catch(e){
        return res.status(400).json(e)
    }
});

module.exports = router;
