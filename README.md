# TCC_Outlier

Este projeto é fruto de um TCC e tem como objetivo a identificação de desvios utilizando método Outlier de tal maneira que não precise se conectar ao banco de dados do usuário, desta forma qualquer pessoa pode utilizar, basta importar os dados em um arquivo CSV e selecionar as variáveis que deseja analisar.

### Sobre o desenvolvimento:
O projeto possui um server em Python para conexão ao banco de dados MYSQL(caso queira salvar históricos de análise e também para termos controle de acesso) e a realizações dos cálculos. Segue o passo a passo para rodar a aplicação:

1. Primeiro precisa estar na pasta */backend*, instale todas as dependências que você ainda não tiver, depois ative o env com o comando => `source env/bin/activate`
2. Depois basta rodar o comando => `uvicorn main:app --reload`

* No link http://127.0.0.1:8000/docs# é possível visualizar o Swagger e testar a api

Além disso, o projeto conta com o front-end em React TS, utilizando a ferramenta Vite e Tailwind CSS, com layout simples e intuitivo. Para rodar basta estar na pasta */web*.
1. Instale todas as dependencias com o comando => `npm install` 
2. Depois basta rodar o comando => `npm run dev`

* No link http://localhost:3000/ é possível acessar a página inicial.

Há um modelo do banco de dados utilizado no projeto, está na pasta */backend* no arquivo **script_sql.txt**.
