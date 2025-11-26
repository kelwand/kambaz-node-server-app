import {
  enrollUserInCourse,
  unenrollUserFromCourse,
  findCoursesForUser,
  findUsersForCourse,
} from "./dao.js";

export default function EnrollmentsRoutes(app) {
  app.post("/api/users/:userId/courses/:courseId/enroll", async (req, res) => {
    const { userId, courseId } = req.params;
    await enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  });

  app.delete("/api/users/:userId/courses/:courseId/enroll", async (req, res) => {
    const { userId, courseId } = req.params;
    await unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  });

  app.get("/api/users/:userId/enrollments", async (req, res) => {
    const { userId } = req.params;
    const courses = await findCoursesForUser(userId);
    res.json(courses); 
  });

  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    const { courseId } = req.params;
    const users = await findUsersForCourse(courseId);
    res.json(users);
  });
}
