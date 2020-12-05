🚀 Desafio Node.js

Nesse desafio, foi criada uma aplicação para armazenar repositórios do seu portfólio, que irá permitir a criação, listagem, atualização e remoção dos repositórios, e além disso permitir que os repositórios possam receber "likes".

Para utilização da aplicação siga os passos abaixo:

- Faça um git clone deste repositório através do terminal linux ou através do GIT bash do windows

  git clone https://github.com/tasilvabr/desafio-nodejs.git

- entre na pasta da aplicação que foi criada

  cd desafio-nodejs

- execute o yarn para fazer a instalação das dependências utilizadas na aplicação

  yarn

- execute o teste da aplicação

  yarn test

- para executar a aplicação:

  yarn dev

- para utilização recomenda-se utilizar um software de envio de requisição http, como exemplo Insomnia, Postman, entre outros.

- poderá ser utilizados os caminhos:

  http://localhost:3333

  GET /repositories

  Retornar todos os repositórios

  POST /repositories

  No body:

  {
  "title":"Título do repositório",
  "url":"https://github.com/<seu_usuario>/<seu_repositorio>",
  "techs":["...","..."]
  }

  Para incluir um novo repositório

  PUT /repositories/<id_repositório>

  No body:

  {
  "title":"Título do repositório",
  "url":"https://github.com/<seu_usuario>/<seu_repositorio>",
  "techs":["...","..."]
  }

  Para alterar o repositório

  DELETE /repositories/<id_repositório>

  Para excluir o repositório

  POST /repositories/<id_repositório>/like

  Para adicionar um like ao repositório
