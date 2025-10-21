import { Router } from "express";
import { createUser, deleteUser, findUsersByName, getAllUsers , loginUser, updateUser } from "../controllers/user.controller";

const router = Router();

/**
  * @swagger
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - pasword
 *       properties:
 *         name:
 *           type: string
 *           example: Juan André da Silva
 *         email:
 *           type: string
 *           example: juanandredasilva@gmail.com
 *         senha:
 *           type: string
 *           example: juan1234567
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *         - $ref: '#/components/schemas/UserInput'
 */

/**
 * @swagger
 * /cadastro:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 */
router.post("/cadastro", createUser);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/usuarios", getAllUsers);

/**
 * @swagger
 * /usuarios/{name}:
 *   get:
 *     summary: Busca usuários por nome (parcial ou completo)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
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
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Nenhum usuário encontrado
 */
router.get("/usuarios/:nome", findUsersByName);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UsersInput'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/usuarios/:id", updateUser);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Exclui um usuário
 *     tags: [Users]
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
router.delete("/usuarios/:id", deleteUser);

router.post('/entrar', loginUser);

export default router;
