const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function logRequests(request, response, next){
  const {method, url} = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateRepositoryId(request, response, next){
  const {id} = request.params;

  if (!isUuid(id)){
    return response.status(400).json({ error:"Invalid Repository ID."});
  }

  return next();
}

app.use(logRequests);

app.use("/repositories/:id",validateRepositoryId);

app.get("/repositories", (request, response) => {
  const {title} = request.query;

  const results = title
    ? repositories.filter(repository => repository.title.toLowerCase().includes(title.toLowerCase())) 
    : repositories;
  
  return response.json(results);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {id:v4(), title, url, techs, likes:0};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0)
  {
    return response.status(400).json({ error:"Repository not found."});
  }

  const {likes} = repositories[repositoryIndex];

  const reposityUpdate = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = reposityUpdate;

  return response.json(reposityUpdate);
  
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0)
  {
    return response.status(400).json({ error:"Repository not found."});
  }

  repositories.splice(repositoryIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0)
  {
    return response.status(400).json({ error:"Repository not found."});
  }

  const {title, url, techs, likes} = repositories[repositoryIndex];

  const reposityUpdate = {
    id,
    title,
    url,
    techs,
    likes:(likes+1)
  }

  repositories[repositoryIndex] = reposityUpdate;

  return response.json(reposityUpdate);
});

module.exports = app;
