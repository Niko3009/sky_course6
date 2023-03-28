const router = require("express").Router();

const { getUsers } = require("express");

router.get("/users", getUsers);
router.get("/users/:user_id", getuser);
router.post("/users", createUser);
router.patch("/users/:user id", updateUser);
router.delete("/users/:user id", deleteUser);

module.exports = { router };
