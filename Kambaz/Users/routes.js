import UsersDao from "./dao.js";

export default function UserRoutes(app) {
  const dao = UsersDao();

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };
  app.get("/api/users", findAllUsers);

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);

    if (!currentUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  app.post("/api/users/signin", signin);

  const signup = async (req, res) => {
    const existing = await dao.findUserByUsername(req.body.username);
    if (existing) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const newUser = await dao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };
  app.post("/api/users/signup", signup);

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;

    await dao.updateUser(userId, userUpdates);
    const updatedUser = await dao.findUserById(userId);

    res.json(updatedUser);
  };
  app.put("/api/users/:userId", updateUser);

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).json({ message: "Not logged in" });
    }
    res.json(currentUser);
  };
  app.get("/api/users/profile", profile);

  const signout = async (req, res) => {
    req.session.destroy(() => { });
    res.sendStatus(200);
  };
  app.post("/api/users/signout", signout);

  const deleteUser = async (req, res) => {
    console.log("DELETE HIT:", req.params.userId);
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  app.delete("/api/users/:userId", deleteUser);

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);
  
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    console.log(user);
    res.json(user);
  };
  app.get("/api/users/:userId", findUserById);



}
