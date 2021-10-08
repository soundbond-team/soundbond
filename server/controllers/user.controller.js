const { User } = require('../models');
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllUsers = async(req,res)=>{
    try{
        const users = await user.findAll({
            include: [
                {model: user}
            ]
        })
    }catch(error){
        return res.status(500).send(error.message);
    }
}

const getUserById = async(req,res)=> {
    try{
        const{id} = req.params;
        const user = await User.finOne({
            where: {id:id},
            include: [
                {model : user}
            ]
        });
        if(user){
            return res.status(200).json({user});
        }
        return res.status(404).send('user with the specified ID does not exists');
    }catch(error){
        return res.status(500).send(error.message);
    }
}

const updateUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const[update]=await User.update(req.body,{
            where:{id:id}
        });
        if(updated){
            const updateUser = await User.finOne({where:{id:id}});
            return res.status(200).json({user:updateUser});
        }

        throw new Error('User not found');

    }catch(error) {
        return res.status(500).send(error.message);

    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};



module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}