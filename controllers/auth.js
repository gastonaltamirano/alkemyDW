const { User } = require('../db'); //se requiere el modelo user
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authRouter = require('express').Router();

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET, {expiresIn: 60*60**60});
};

authRouter.use('/login', async (req, res) => {

    const { body } = req;
    const { username, password } = body;

    //se busca el usuario por su username
    const userFound = await User.findAll({where:{username }});

    //se verifica que el usuario no sea null y se compara la passwordHash
    const passwordCorrect = userFound === null
    ? false
    : await bcrypt.compare(password, userFound[0]['dataValues'].passwordHash);

    //si alguno de los campos necesarios está mal se responde un json con un mensaje
    if(!(userFound && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        });
    }
    
    //se crea un usuario para el token, un token y se responde un json con un mensaje y el token
    const userForToken = {username, id: userFound.idUsers};
          
    const accessToken = generateAccessToken(userForToken);
          
    res.header('authorization', accessToken).json({
        message: 'usuario validado',
        token: accessToken
    })
});

authRouter.use('/register', async (req, res) => {
    
    const { body } = req;
    const { username, name, email, password } = body;

    //configuracion bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    //se crea el usuario y se responde con un json y el usuario dentro
    const newUser = await User.create ({ username, name, email, passwordHash })
    res.status(200).json(newUser);
    
});

module.exports = authRouter;
