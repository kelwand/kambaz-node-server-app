import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  const { assignments } = db;

  function findAssignmentsForModule(moduleId) {
    return assignments.filter((a) => a.module === moduleId);
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    assignments.push(newAssignment);
    return newAssignment;
  }

  function updateAssignment(assignmentId, updates) {
    const index = assignments.findIndex((a) => a._id === assignmentId);
    if (index !== -1) {
      assignments[index] = { ...assignments[index], ...updates };
      return assignments[index];
    }
    return null;
  }

  function deleteAssignment(assignmentId) {
    const index = assignments.findIndex((a) => a._id === assignmentId);
    if (index !== -1) {
      assignments.splice(index, 1);
      return { status: "deleted" };
    }
    return { status: "not found" };
  }

  return {
    findAssignmentsForModule,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
