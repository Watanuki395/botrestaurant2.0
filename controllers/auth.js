const { httpError } = require("../helpers/handleError");
const { encrypt, compare } = require("../helpers/handleBcrypt");
const { tokenSign, verifyToken } = require("../helpers/generateToken");
//const userModel = require('../models/user')
var db = require("../models");

//Login!
const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
        return res
            .status(400)
            .json({ message: "Username y passwordson requeridos." });

        const foundUser = await db.User.findOne({
        where: {
            email: email,
        },
        });

    if (!foundUser) return res.sendStatus(401); //Unauthorized

    const match = await compare(password, foundUser.password); //Contraseña!

    if (match) {
      // Creamos JWT 👉
        const accessToken = await tokenSign(
            foundUser,
            process.env.JWT_SECRET,
            "1h"
        ); 
        const refreshToken = await tokenSign(
            foundUser,
            process.env.RF_JWT_SECRET,
            "1d"
        ); 
    // Salvamos el refreshToken
        await db.User.update({
                refreshToken
            },
            {
            where:{
                uuid: foundUser.uuid}
        });
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 });
        res.json({
            user: foundUser,
            accessToken,
        });

    } else {
        res.sendStatus(401);
    }

    } catch (e) {
        httpError(res, e);
    }
};

// Refrescamos el token
const handleRefreshTokenCtrl = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

   // Is refreshToken in db?
const foundUser = await db.User.findOne({
    where: {
        refreshToken,
    },
});
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    const payload = await verifyToken(refreshToken,  process.env.RF_JWT_SECRET)
    if (!payload) return res.sendStatus(403); //Forbidden 
    if (foundUser.email !== payload.email) return res.sendStatus(403); //Forbidden 

    const accessToken = await tokenSign(
        foundUser,
        process.env.JWT_SECRET,
        "1h"
    ); 

    res.json({ accessToken })
}
// Log Out
const logoutCtrl = async (req, res) => {
  // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

  // Is refreshToken in db?
    const foundUser = await db.User.findOne({
        where: {
            refreshToken,
        },
    });
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

  // Delete refreshToken in db
  // Salvamos el refreshToken
    await db.User.update({
        refreshToken: null
    },
    {
    where:{
        uuid: foundUser.uuid}
    })
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);

};

//Registramos usuario!
const registerCtrl = async (req, res) => {
  try {
    //Datos que envias desde el front (postman)
    const { email, password, password2, business_nm, name } = req.body;

    const passwordHash = await encrypt(password); //(123456)<--- Encriptando!!

    const unique = await db.User.findOne({
      where: {
        email: email,
      },
    });

    const matchPass = password === password2 ? true : false;

    if (!unique && matchPass) {
      const registerUser = await db.User.create(
        {
          email,
          business_nm,
          name,
          password: passwordHash,
        },
        { returning: true }
      );
      res.send({ data: registerUser });
    } else {
      if (!matchPass) {
        res.status(409);
        res.send({ error: "La contraseña no coincide " });
      } else {
        res.status(409);
        res.send({ error: "El usuario ya existe" });
      }
    }
  } catch (e) {
    httpError(res, e);
  }
};

const forgotpassCtrl = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const token = await tokenSign(user, "15m"); //jwt.sign(payload, secret, {expiresIn: '15m'})
      const link = `http://localhost:8081/api/auth/reset-password/${user.uuid}/${token}`;
      console.log(link);
      res.send({ msg: "Enviamos un correo de confirmación" });
      return;
    } else {
      //res.status(404)
      res.send({
        error: "No existe un usuario registrado con este correo electronico",
      });
      return;
    }
  } catch (e) {
    httpError(res, e);
  }
};

const resetPasswordCtrl = async (req, res) => {
  try {
    const { uuid, token } = req.params;

    const user = await db.User.findOne({
      where: {
        uuid,
      },
    });
    const payload = await verifyToken(token,  process.env.JWT_SECRET);

    if (user && payload) {
      res.status(200);
      res.send({ msg: "link valido" });
      return;
    } else {
      //res.status(404)
      res.send({
        msg: "Error al validar el link",
        error:
          "El link no es valido o el tiempo para resetear tu contraseña a expirado",
      });
      return;
    }
  } catch (e) {
    httpError(res, e);
  }
};

const createNewPassCtrl = async (req, res) => {
  try {
    const { uuid, token } = req.params;
    const { password, password2 } = req.body;

    const user = await db.User.findOne({
      where: {
        uuid,
      },
    });
    const matchPass = password === password2 ? true : false;

    const passwordHash = await encrypt(password); //(123456)<--- Encriptando!!

    if (user && matchPass) {
      await db.User.update(
        {
          password: passwordHash,
        },
        {
          where: {
            uuid: uuid,
          },
          returning: true,
        }
      ).then((result) => {
        res.json({ result });
      });
    } else {
      //res.status(404)
      res.send({
        error: "No se pudo actualizar la contraseña",
      });
      return;
    }
  } catch (e) {
    httpError(res, e);
  }
};
module.exports = {
  loginCtrl,
  registerCtrl,
  logoutCtrl,
  forgotpassCtrl,
  resetPasswordCtrl,
  createNewPassCtrl,
  handleRefreshTokenCtrl
};
