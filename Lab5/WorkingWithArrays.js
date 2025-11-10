let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

export default function WorkingWithArrays(app) {
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      return res.json(completedTodos);
    }
    return res.json(todos);
  };

  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    return res.json(todos); 
  };

  const postNewTodo = (req, res) => {
    if (!req.body || !req.body.title) {
      return res.status(400).json({ message: "Todo title is required" });
    }
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
  };

  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({ message: `Todo with ID ${id} not found` });
    }
    return res.json(todo);
  };

  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      return res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
    }
    todos.splice(todoIndex, 1);
    return res.sendStatus(200);
  };

  const updateTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      return res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
    }
    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    return res.sendStatus(200);
  };

  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({ message: `Todo with ID ${id} not found` });
    }
    todo.title = title;
    return res.json(todo);
  };

  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({ message: `Todo with ID ${id} not found` });
    }
    todo.description = description;
    return res.json(todo);
  };

  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({ message: `Todo with ID ${id} not found` });
    }
    todo.completed = completed === "true";
    return res.json(todo);
  };

  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/create", createNewTodo); 
  app.post("/lab5/todos", postNewTodo);        

  app.get("/lab5/todos/:id", getTodoById);
  app.get("/lab5/todos/:id/delete", deleteTodo); 
  app.delete("/lab5/todos/:id", deleteTodo);     

  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);

  app.put("/lab5/todos/:id", updateTodo);      
}
