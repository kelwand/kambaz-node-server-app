import CoursesDao from "./dao.js";
import {
  enrollUserInCourse,
  unenrollUserFromCourse,
  findCoursesForUser,    
  findUsersForCourse,
  unenrollAllUsersFromCourse
} from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();

  app.post("/api/users/current/courses", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await dao.createCourse(req.body);

    if (currentUser) {
      await enrollUserInCourse(currentUser._id, newCourse._id);
    }

    res.json(newCourse);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    await unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    res.send(status);
  });

  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  app.get("/api/users/:userId/courses", async (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) return res.sendStatus(401);
      userId = currentUser._id;
    }

    const courses = await findCoursesForUser(userId);
    res.json(courses);
  });

  app.get("/api/courses/:cid/users", async (req, res) => {
    const { cid } = req.params;
    const users = await findUsersForCourse(cid);
    res.json(users);
  });

  app.post("/api/users/:uid/courses/:cid/enroll", async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) return res.sendStatus(401);
      uid = currentUser._id;
    }

    const status = await enrollUserInCourse(uid, cid);
    res.send(status);
  });

  app.delete("/api/users/:uid/courses/:cid/enroll", async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) return res.sendStatus(401);
      uid = currentUser._id;
    }

    const status = await unenrollUserFromCourse(uid, cid);
    res.send(status);
  });
}
