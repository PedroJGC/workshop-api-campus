const express = require("express");
const { request } = require("http");
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

app.get("/oi", (request, response) => {
  return response.status(200).json("Olá, mundo!");
});

app.get("/tasks", (request, response) => {
  return response.status(200).json(tasks);
});

app.post("/tasks", (request, response) => {
  let bodyRequest = request.body;

  let newTask = {
    id: Math.random().toString(32).substring(2, 17),
    dataInclusao: new Date(),
    titulo: bodyRequest.titulo,
    descricao: bodyRequest.descricao,
    status: bodyRequest.status,
  };

  tasks.push(newTask);
  response.status(201).json({ message: "Tarefa criada com sucesso", newTask });
});

app.get("/tasks/:id", (request, response) => {
  let idRequest = request.params.id;
  let taskDoRequest = tasks.find((tarefa) => tarefa.id === idRequest);

  if (!taskDoRequest) {
    return response
      .status(404)
      .json({ message: "Tarefa não encontrada", taskDoRequest });
  }
  return response
    .status(200)
    .json({ message: "Tarefa encontrada", taskDoRequest });
});

app.delete("/tasks/:id", (request, response) => {
  let idRequest = request.params.id;
  let taskDoRequest = tasks.find((tarefa) => tarefa.id === idRequest);

  if (!taskDoRequest) {
    return response
      .status(404)
      .json({ message: "Tarefa não encontrada", taskDoRequest });
  }

  let taskIndex = tasks.findIndex((tarefa) => tarefa.id === idRequest);

  tasks.splice(taskIndex, 1);
  return response.status(200).json({ message: "Tarefa deletada" });
});

app.put("/tasks/:id", (request, response) => {
  let idRequest = request.params.id;
  let bodyRequest = request.body;

  let taskIndex = tasks.findIndex((tarefa) => tarefa.id === idRequest);

  if (taskIndex === -1) {
    return response.status(404).json({ message: "Tarefa não encontrada" });
  }

  let task = tasks[taskIndex];

  tarefaAtualizada = {
    id: task.id,
    dataInclusao: task.dataInclusao,
    titulo: bodyRequest.titulo,
    descricao: bodyRequest.descricao,
    status: bodyRequest.status,
  };

  task = tarefaAtualizada;

  response.status(200).json({ message: "Tarefa atualizada com sucesso", task });
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});
