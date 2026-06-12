# 🎮 GamesBit

## Integrantes do Grupo

- Mykael da Silva Leal
- Matheus Guimarães Silva

# Sobre o Projeto

GamesBit é uma plataforma de e-commerce gamer desenvolvida para a comercialização de jogos digitais e clássicos.

O sistema simula o funcionamento de uma loja virtual real, oferecendo recursos completos de autenticação, gerenciamento de produtos, carrinho de compras, lista de desejos, checkout, pedidos e painel administrativo.

A aplicação foi construída utilizando React no frontend e Node.js com Express no backend, utilizando MongoDB Atlas para persistência dos dados.

# Tecnologias Utilizadas

## Frontend

* React
* React Router DOM
* Context API
* Axios
* React Icons
* CSS3

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (JSON Web Token)
* Bcrypt
* Dotenv
* Cors

# Funcionalidades

## Autenticação

O sistema possui:

* Cadastro de usuários
* Login
* Logout
* Controle de sessão
* Persistência de autenticação
* Rotas privadas
* Diferenciação entre usuário comum e administrador
* Visualização de senha
* Validação de formulários

### Conta Administrativa

O sistema reconhece automaticamente um administrador quando o cadastro é realizado utilizando:

```txt
Nome: Admin
Email: admin@gamesbit.com
Senha: admin123
```

# Carrinho de Compras

O carrinho permite:

* Adicionar produtos
* Remover produtos
* Alterar quantidades
* Visualizar subtotal e total
* Limpar carrinho após a compra

# Lista de Desejos

A wishlist permite:

* Adicionar produtos favoritos
* Remover produtos
* Visualizar itens salvos

# Checkout

O sistema de checkout possui:

* Validação de campos
* Validação de CPF
* Validação de e-mail
* Pagamento via PIX
* Frete grátis
* Resumo do pedido
* Modal de confirmação

## Segurança de CPF

O CPF cadastrado no perfil é utilizado para validação durante o checkout.

A compra somente é finalizada quando:

* O CPF informado no checkout corresponde exatamente ao CPF salvo no perfil.

Além disso:

* Após o cadastro, o CPF não pode ser alterado.

---

# Perfil do Usuário

A área de perfil permite:

* Editar nome
* Editar telefone
* Alterar avatar
* Visualizar e-mail
* Visualizar CPF
* Acessar pedidos
* Acessar lista de desejos

# Pedidos

O sistema registra:

* Produtos comprados
* Quantidades
* Valor total
* Dados do comprador
* Data da compra

Os pedidos ficam armazenados no banco de dados e podem ser consultados posteriormente.

---

# Painel Administrativo

O painel administrativo possui acesso exclusivo para administradores.

## Produtos

* Listagem de produtos
* Cadastro de produtos
* Edição de produtos
* Exclusão de produtos
* Controle de estoque
* Cadastro de promoções

## Categorias

* Cadastro de categorias
* Edição de categorias
* Exclusão de categorias
* Listagem de categorias

## Pedidos

* Visualização de todos os pedidos
* Informações do comprador
* Valor total dos pedidos

## Usuários

* Listagem de usuários
* Ordenação alfabética
* Exclusão de usuários
* Gerenciamento de contas

# Segurança

O sistema conta com:

* Senhas criptografadas com Bcrypt
* Autenticação via JWT
* Rotas protegidas
* Controle de acesso por perfil
* Variáveis sensíveis armazenadas em arquivos `.env`
* Validações no frontend e backend

#  Persistência de Dados

A aplicação utiliza o MongoDB Atlas para armazenamento em nuvem.

A integração é realizada através do Mongoose, responsável pela modelagem e manipulação dos dados.

Os dados persistidos incluem:

* Usuários
* Produtos
* Categorias
* Pedidos
* Lista de desejos
* Carrinho de compras
* Perfil dos usuários
* Dados de autenticação

# Interface e Experiência do Usuário

O projeto foi desenvolvido com foco em usabilidade e experiência moderna.

### Recursos visuais

* Layout moderno
* Interface intuitiva
* Sidebar administrativa
* Cards estilizados
* Inputs animados
* Feedback visual de erros
* Ícones com React Icons
* Navegação fluida
* Experiência otimizada


# Responsividade

A aplicação foi adaptada para:

* Desktop
* Notebook
* Tablet
* Smartphone


# Telas Desenvolvidas

## Home

* Listagem de produtos
* Adição ao carrinho
* Adição à wishlist
* Navegação por categorias

## Login

* Autenticação de usuários
* Validação de credenciais
* Visualização de senha

## Cadastro

* Registro de usuários
* Validação de dados
* Verificação de e-mail duplicado

## Perfil

* Gerenciamento de dados pessoais
* Avatar
* CPF
* Pedidos

## Wishlist

* Produtos favoritos

## Carrinho

* Alteração de quantidade
* Remoção de produtos
* Cálculo automático

## Checkout

* Finalização da compra
* Resumo do pedido
* Validação dos dados

## Pedidos

* Histórico de compras

## Dashboard Admin

* Produtos
* Categorias
* Usuários
* Pedidos


# Estrutura do Projeto

```txt
GamesBit/

├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── service/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│
├── .env
└── README.md
```

# Como Executar o Projeto

## 1. Clone o repositório

```bash
git clone https://github.com/MykaelLeal/gamesbit_app.git
```

## 2. Entre na pasta do projeto

```bash
cd gamesbit_app
```

# Executando o Backend

## Entre na pasta backend

```bash
cd backend
```

## Instale as dependências

```bash
npm install
```

## Configure o arquivo .env

## Execute o servidor

```bash
npm run dev
```

Backend disponível em:

```txt
http://localhost:3001
```

# Executando o Frontend

Abra outro terminal.

## Entre na pasta frontend

```bash
cd frontend
```

## Instale as dependências

```bash
npm install
```

## Execute o projeto

```bash
npm start
```

Frontend disponível em:

```txt
http://localhost:3000

