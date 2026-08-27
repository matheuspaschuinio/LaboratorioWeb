import argon2 from "argon2";
import Usuario from "../Models/Usuario.js";
import jwt from "jsonwebtoken";
const JWT_EXPIRATION_MS = 24 * 60 * 1000;
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_muito_forte";
export default class UsuarioController{
    static async Create(req, res){
        const{nome, email, senha} = req.body;
        if(!nome || !email || !senha) {
            return res.status(422).json({message: "Todos os dados são obrigatórios"});
        }
        try {
            const hashPassword = await argon2.hash(senha);
            const usuario = new Usuario({
                nome,
                email,
                senha:hashPassword,
            });
            const novoUsuario = await usuario.save();
            return res.status(200).json({message: "usuário criado com sucesso", novoUsuario});
        } catch (error) {
            return res.status(500).json({message:"Problema ao inserir um usuáio.", error});
        }
    } //fim do create
    static async Login(req, res){
        const{email, senha} = req.body;
        if(!email || !senha) {
            return res.status(422).json({message: "Todos os dados são obrigatórios"});
        }
        try {
            const usuario = await Usuario.findOne({email}).select('+senha');
            if(!usuario)
            {
                return res.status(400).json({message: "Credenciais Inválidas"});
            }
            const senhaValida = await argon2.verify(usuario.senha, senha);
            if(!senhaValida)
            {
                return res.status(400).json({message: "Credenciais Inválidas"});
            }
            const tokenPayload = {
                id:usuario._id,
                nome:usuario.nome,
                email:usuario.email
            };
            const token = jwt.sign(tokenPayload, JWT_SECRET, {expiresIn: "1h"});
            res.cookie("token", token, {
                httpOnly:true, //evita acesso por script JS
                secure:false, //tornar true em produção exige https 
                sameSite: "lax", //comunicação entre front e back
                maxAge: JWT_EXPIRATION_MS || 3600000 //1h
            });
            return res.status(200).json({message: "Login efetuado com sucesso",
                    usuario:{id:usuario.id, nome:usuario.nome, email:usuario.email}, 
                    token
        });
        } catch (error) {
            return res.status(500).json({message:"Problema ao efetuar o login.", error});
        }
    }//fim do login
}