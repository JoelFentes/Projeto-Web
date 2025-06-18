# Projeto Next.js API 

Este projeto é uma API construída com Next.js (app router) que utiliza uma arquitetura limpa, separando claramente as responsabilidades entre Rotas, UseCases e Repositories.

---

## 📚 Estrutura do Projeto

- **Rotas (`/app/api/.../route.ts`)**  
  Arquivos que expõem as APIs HTTP, recebem as requisições, fazem a autenticação básica, chamam os casos de uso e retornam as respostas HTTP.  
  Aqui funciona como a camada de Controller na arquitetura tradicional, mas simplificada pelo Next.js.

- **UseCases (`/src/usecases/`)**  
  Contém a lógica principal da aplicação — regras de negócio, validações, criação de dados, autenticação, etc.  
  Cada função aqui representa um caso de uso específico do sistema.

- **Repositories (`/src/repositories/`)**  
  Responsáveis por acessar a base de dados via Prisma ORM.  
  Contém funções para criar, buscar, atualizar e deletar dados diretamente no banco.

---

## 🔧 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (API Routes com app router)  
- [Prisma ORM](https://www.prisma.io/) para acesso ao banco de dados  
- [JWT](https://jwt.io/) para autenticação via token  
- Typescript para tipagem estática  

---

## 🚀 Como rodar o projeto

1. Clone o repositório  
2. Instale as dependências:  
```bash
npm install
