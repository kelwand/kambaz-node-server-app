import UsersDao from "./dao.js";
import users from "../Database/users.js";

export default function UserRoutes(app) {
    const db = { users };
    const dao = UsersDao(db);

    app.post("/api/users/signin", (req, res) => {
        const { username, password } = req.body;
        const user = dao.findUserByCredentials(username, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        req.session["currentUser"] = user;
        res.json(user);
    });

    app.post("/api/users/signup", (req, res) => {
        const existingUser = dao.findUserByUsername(req.body.username);
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }
        const newUser = dao.createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    });

    const updateUser = (req, res) => {
        const userId = req.params.userId;
        const userUpdates = req.body;
        dao.updateUser(userId, userUpdates);
        const currentUser = dao.findUserById(userId);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
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

    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    app.post("/api/users/signout", signout);
}
