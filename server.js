const express = require("express");
const app = express();
const PORT = 3000;

app.get("/oi", (request, response) => {
  return response.status(200).json("Olá, mundo!");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});
