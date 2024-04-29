import {Router} from "express";
import {check} from "express-validator";
import usersController from "../controllers/usersController.js";
import {checkRoles} from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API endpoints for managing users
 */

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/User'
 */

// get users
router.get("/users", usersController.getAllUsers);

// Login user
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Invalid email."),
    check("password")
      .isLength({min: 5, max: 10})
      .withMessage("Invalid password"),
  ],
  usersController.LoginUser
);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
// post new user
router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("invalid email."),
    check("password")
      .isLength({min: 6})
      .withMessage("password must be at least 6 chars long"),
    //check("password").isStrongPassword,
    check("role").isIn(["USER"]).withMessage("invalid role"),
  ],
  usersController.CreateUser
);
/**
 * @swagger
 * /auth/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrive
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: The user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
// get user by ID
router.get("/users/:id", usersController.getAllUsersById);

// update user by ID
router.put("/users/:id", usersController.updateUsers);
// delete user by ID
router.delete("/users/:id", checkRoles(["ADMIN"]), usersController.deleteUser);

router.post(
  "/admin",
  [
    check("email").isEmail().withMessage("Invalid email."),
    check("password")
      .isLength({min: 5, max: 10})
      .withMessage("Invalid password"),
  ],
  checkRoles(["ADMIN"]),
  usersController.AdminLogin
);

export default router;
