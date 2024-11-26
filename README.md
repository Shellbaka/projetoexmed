# Aplicação para Agendamento de Exames e Vacinas

Esta aplicação web é voltada para a logística de atendimento domiciliar, abrangendo desde a aquisição de exames ou vacinas até o agendamento do atendimento na residência do cliente. Ela oferece uma solução prática e eficiente, garantindo comodidade e organização em todas as etapas do processo.

## Sobre o desafio proposto

Criar uma solução web que seja capaz de gerenciar a coleta de exames de acordo com os pedidos e compras realizadas no app exmed.

## Período de realização

Todo envolvimento no projeto desde a entrega parcial até a entrega final ocorreu durante o período de 26/08/2023 a 29/11/2024.

## Funcionalidades

- Cadastro;
- Login;
- Agendamento de exame/vacina;
- Listagem de agendamentos;
- Gerenciamento de agendamentos;
- Finalização de agendamentos;

## Demo

Deploy v1.0: [Tela inicial](https://projetoexmed.vercel.app/) 

## Tecnologias utilizadas

### Front-end

- React.js

### Back-end

- Node/Express
- MySQL

## Instalação

Para instalar o projeto localmente, siga os seguintes passos:

1. Clone o repositório
   ```bash
   git clone https://github.com/Shellbaka/projetoexmed.git

2. Entre na pasta do projeto
   ```bash
   cd projetoexmed

3. Instale as dependências
   ```bash
   npm install

4. Crie uma database
   ```bash
    CREATE DATABASE exmed;
    USE exmed;
    
    CREATE TABLE cliente (
        ID_Cliente VARCHAR(36) PRIMARY KEY NOT NULL,
        CPF VARCHAR(11) NOT NULL,
        Email VARCHAR(100) NOT NULL,
        Telefone CHAR(12) NOT NULL,
        Rua VARCHAR(255) NOT NULL,
        Numero VARCHAR(10) NOT NULL,
        Complemento VARCHAR(50) NOT NULL,
        Bairro VARCHAR(100) NOT NULL,
        Cidade VARCHAR(100) NOT NULL,
        Estado VARCHAR(2) NOT NULL,
        CEP VARCHAR(8) NOT NULL,
        Nome_Cliente VARCHAR(100) NOT NULL,
        Data_Nascimento DATE NOT NULL,
        Genero VARCHAR(20) NOT NULL,
        Senha VARCHAR(255) NOT NULL,
        userType ENUM('cliente', 'funcionario') NOT NULL DEFAULT 'cliente'
    );
    
    CREATE TABLE funcionario (
        ID_Funcionario VARCHAR(36) PRIMARY KEY NOT NULL,
        CPF VARCHAR(11) NOT NULL,
        Email VARCHAR(100) NOT NULL,
        Data_Nascimento DATE NOT NULL,
        Cargo_Funcionario VARCHAR(50) NOT NULL,
        Nome_Funcionario VARCHAR(100) NOT NULL,
        Descricao_Setor_Funcionario VARCHAR(255) NOT NULL,
        Telefone CHAR(12) NOT NULL,
        Genero VARCHAR(20) NOT NULL,
        Senha VARCHAR(255) NOT NULL,
        userType ENUM('cliente', 'funcionario') NOT NULL DEFAULT 'funcionario'
    );

5. Configure o arquivo db.js conforme a sua necessidade

[⬆️ Voltar ao topo](#Aplicação-para-Agendamento-de-Exames-e-Vacinas)

## Status de desenvolvimento

O projeto foi entregue dentro do esperado, segundo o backlog priorizado com o cliente, no entanto ainda carece de algumas melhorias na estilização e da implementação de algumas funcionalidades sugeridas pela equipe de desenvolvimento, como: Persistir dados de transações no banco de dados, deploy fullstack e notificações para o cliente por e-mail.

## Desafios de desenvolvimento

Ficou a cargo do grupo definir as prioridades de desenvolvimento que seriam seguidas, conforme os requisitos solicitados pelo cliente. O desenvolvimento exigiu a busca pelo conhecimento de novas tecnologias que atendessem a necessidade da aplicação, bem como a capacidade de analisar a aplicação como um todo, suas diferentes telas e componentes, e prever possíveis conflitos e/ou reaproveitamento de componentes. Enfrentamos problemas pontuais relacionados à proatividade que foram solucionados através da redistribuição de tarefas.

## Desenvolvedores

- André Carneiro
- Erlon Mendes
- Germária Lins
- Kewen Wesley
- Renan Argôlo
- Samuel Alexandre
- Victor Sousa

## Agradecimentos

Agradecemos ao Porto Digital e à Prefeitura do Recife por nos proporcionar esta oportunidade de aprendizado e desenvolvimento de habilidades técnicas e de trabalho em equipe. Também agradecemos aos colegas de turma, mentor e cliente que foram peças chave para a construção e finalização do projeto.

[⬆️ Voltar ao topo](#Aplicação-para-Agendamento-de-Exames-e-Vacinas)
