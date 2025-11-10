import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
    function enrollUserInCourse(userId, courseId) {
        const { enrollments } = db;
        const existing = enrollments.find(
            (e) => e.user === userId && e.course === courseId
        );
        if (existing) return existing;

        const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
        enrollments.push(newEnrollment);
        return newEnrollment;
    }

    function unenrollUserFromCourse(userId, courseId) {
        db.enrollments = db.enrollments.filter(
            (e) => !(e.user === userId && e.course === courseId)
        );
        return { status: "ok" };
    }

    function findAllEnrollments() {
        return db.enrollments;
    }

    function findEnrollmentsForUser(userId) {
        return db.enrollments.filter((e) => e.user === userId);
    }

    function findCoursesForUser(userId) {
        const { courses, enrollments } = db;
        return courses.filter((course) =>
            enrollments.some(
                (e) => e.user === userId && e.course === course._id
            )
        );
    }

    function findAllUsers() {
        return db.users;
    }


    return {
        enrollUserInCourse,
        unenrollUserFromCourse,
        findAllEnrollments,
        findEnrollmentsForUser,
        findCoursesForUser,
        findAllUsers,
    };
}
