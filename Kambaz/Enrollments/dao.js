import model from "./model.js";

export const enrollUserInCourse = (userId, courseId) => {
  return model.create({
    user: userId,
    course: courseId,
    _id: `${userId}-${courseId}`,
  });
};

export const unenrollUserFromCourse = (userId, courseId) => {
  return model.deleteOne({ user: userId, course: courseId });
};

export const findCoursesForUser = async (userId) => {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((e) => e.course);
};

export const findUsersForCourse = async (courseId) => {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((e) => e.user);
};

export const unenrollAllUsersFromCourse = (courseId) => {
  return model.deleteMany({ course: courseId });
};
