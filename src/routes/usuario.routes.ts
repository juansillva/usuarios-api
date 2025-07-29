import { Router } from "express";
import { cadastrarUsuario, excluirUsuario, listarUsuarios } from "../controllers/usuario.controller";

const router = Router();

router.post('/cadastro',cadastrarUsuario);
router.post('/login')
router.get('/usuarios', listarUsuarios);
router.get('/dashboard', )
router.delete('/usuarios/:id', excluirUsuario);

export default router;


