import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = dao.findAssignmentsForCourse(cid);
    res.json(assignments);
  });

  app.get("/api/modules/:moduleId/assignments", (req, res) => {
    const assignments = dao.findAssignmentsForModule(req.params.moduleId);
    res.json(assignments);
  });

  app.post("/api/modules/:moduleId/assignments", (req, res) => {
    const moduleId = req.params.moduleId;
    const newAssignment = { ...req.body, module: moduleId };
    const created = dao.createAssignment(newAssignment);
    res.json(created);
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const updated = dao.updateAssignment(req.params.assignmentId, req.body);
    if (!updated) return res.status(404).json({ message: "Assignment not found" });
    res.json(updated);
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const result = dao.deleteAssignment(req.params.assignmentId);
    if (result.status === "not found") return res.status(404).json(result);
    res.json(result);
  });
}