import ModulesDao from "../Modules/dao.js";

export default function ModulesRoutes(app, db) {
    const dao = ModulesDao(db);

    const findModulesForCourse = (req, res) => {
        const { cid } = req.params;
        const modules = dao.findModulesForCourse(cid);
        res.json(modules);
    };
    app.get("/api/courses/:cid/modules", findModulesForCourse);

    const deleteModule = (req, res) => {
        const { moduleId } = req.params;
        const status = dao.deleteModule(moduleId);
        res.send(status);
    };
    app.delete("/api/modules/:moduleId", deleteModule);

    const updateModule = async (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const status = await dao.updateModule(moduleId, moduleUpdates);
        res.send(status);
    };
    app.put("/api/modules/:moduleId", updateModule);
}
