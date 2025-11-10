import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    const enrollUserInCourse = (req, res) => {
        const { userId, courseId } = req.params;
        dao.enrollUserInCourse(userId, courseId);
        res.sendStatus(200);
    };
    app.post("/api/users/:userId/courses/:courseId/enrollments", enrollUserInCourse);

    const unenrollUserFromCourse = (req, res) => {
        const { userId, courseId } = req.params;
        dao.unenrollUserFromCourse(userId, courseId);
        res.sendStatus(200);
    };
    app.delete("/api/users/:userId/courses/:courseId/enrollments", unenrollUserFromCourse);

    const findAllEnrollments = (req, res) => {
        const enrollments = dao.findAllEnrollments();
        res.json(enrollments);
    };
    app.get("/api/enrollments", findAllEnrollments);

    const findCoursesForUser = (req, res) => {
        const { userId } = req.params;
        const courses = dao.findCoursesForUser(userId);
        res.json(courses);
    };
    app.get("/api/users/:userId/enrollments", findCoursesForUser);

    const findAllUsers = (req, res) => {
        const users = dao.findAllUsers();
        res.json(users);
    };
    app.get("/api/users", findAllUsers);
}
