import { Router } from "express";
import { atualizarUsuario, buscarUsuario, cadastrarUsuario, excluirUsuario, listarUsuarios } from "../controllers/usuario.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *           example: Jenifer Gisele Pacheco
 *         email:
 *           type: string
 *           example: jenifer@email.com
 *         senha:
 *           type: string
 *           example: 123456
 *     Usuario:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *              - $ref: '#/components/schemas/UsuarioInput'
 */

/**
 * @swagger
 * /cadastro:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos
 */
router.post("/cadastro", cadastrarUsuario);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get("/usuarios", listarUsuarios);

/**
 * @swagger
 * /usuarios/{nome}:
 *   get:
 *     summary: Busca usuários por nome (parcial ou completo)
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome (ou parte do nome) do usuário
 *     responses:
 *       200:
 *         description: Usuário(s) encontrado(s)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Nenhum usuário encontrado
 */
router.get("/usuarios/:nome", buscarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/usuarios/:id", atualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Exclui um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/usuarios/:id", excluirUsuario);

export default router;
