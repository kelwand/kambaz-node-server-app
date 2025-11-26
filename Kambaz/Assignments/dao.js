import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}

export function findAssignmentsForModule(moduleId) {
  return model.find({ module: moduleId });
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return model.create(newAssignment);
}

export function updateAssignment(assignmentId, updates) {
  return model.updateOne({ _id: assignmentId }, { $set: updates });
}

export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}

export function findAssignmentById(assignmentId) {
  return model.findById(assignmentId);
}


export default {
  findAssignmentsForModule,
  findAssignmentsForCourse,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  findAssignmentById
};

