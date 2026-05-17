# Nome do Projeto

GamesBit

# Integrantes do Grupo

- Mykael da Silva Leal
- Matheus Guimarães Silva

# Descrição da Ideia do Sistema: 

GamesBit é uma plataforma de e-commerce gamer desenvolvida em React, focada na venda e gerenciamento de jogos digitais e clássicos. 
O projeto possui autenticação, rotas privadas, gerenciamento global de estado, painel administrativo, carrinho, lista de desejos, checkout e sistema de pedidos.
A aplicação conta com interface moderna, responsiva e interativa, simulando o funcionamento de uma loja virtual real.

# Tecnologias Utilizadas

* React
* React Router DOM
* Context API
* LocalStorage
* React Icons
* CSS puro

# Funcionalidades

## Autenticação

O sistema possui:

* Cadastro de usuários
* Login de usuários
* Logout
* Controle de sessão
* Persistência de login via LocalStorage
* Diferenciação entre usuário comum e administrador
* Visualização de senha nos formulários
* Validação dos campos de cadastro e login

### Conta Admin

O sistema reconhece automaticamente um administrador quando realiza seu cadastro com os seguintes campos:

```txt
Nome: Admin
Email: admin@gamesbit.com
Senha: 12345678
```

# Carrinho de Compras

O carrinho de compras permite:

* Adicionar produtos ao carrinho
* Remover produtos
* Alterar quantidade
* Visualizar subtotal e total
* Limpar carrinho após finalizar compra
* Persistência do carrinho no LocalStorage

# Lista de Desejos

A plataforma possui sistema de wishlist.

A lista de desejos permite:

* Adicionar produtos a lisa de desejos
* Remover produtos da lista de desejos
* Visualizar produtos salvos como desejados

# Checkout

O checkout possui:

* Validação de campos
* Validação de email
* Validação de CPF
* Método de pagamento via PIX
* Frete grátis
* Resumo do pedido
* Modal de sucesso após compra

## Segurança de CPF

O CPF salvo no perfil do usuário é utilizado como validação no checkout.

A compra só é finalizada quando:

* o CPF digitado no checkout for exatamente igual ao CPF salvo no perfil.

Além disso:

* após salvar o CPF no perfil, ele não pode mais ser alterado.
  

# Perfil do Usuário

A área de perfil permite:

* Editar nome
* Editar telefone
* Editar avatar
* Visualizar email
* Salvar dados pessoais
* Acessar pedidos
* Acessar lista de desejos

# Pedidos

O sistema registra:

* Produtos comprados
* Quantidade
* Valor total
* Dados do cliente

Todos os pedidos ficam salvos no LocalStorage.


# Painel Administrativo

O administrador possui acesso exclusivo ao painel admin.

## Funcionalidades do Admin

### Produtos

* Listagem de produtos
* Estrutura CRUD
* Botão para adicionar produtos
* Botões de editar e remover

### Categorias

* Gerenciamento de categorias
* Estrutura CRUD

### Pedidos

* Visualização de todos os pedidos realizados
* Exibição do usuário responsável pela compra
* Valor total dos pedidos

### Usuários

* Listagem de usuários cadastrados
* Ordenação alfabética
* Estrutura CRUD

# Interface e Experiência do Usuário

O projeto foi desenvolvido com foco em usabilidade, organização visual e experiência moderna.

A interface possui:

* Layout moderno e intuitivo
* Sidebar administrativa interativa
* Cards estilizados
* Inputs animados
* Feedback visual de erros
* Botões interativos
* Ícones com React Icons
* Navegação fluida entre páginas
* Organização visual inspirada em plataformas modernas
* Experiência amigável para desktop e mobile

## Responsividade

O GamesBit é totalmente responsivo.

A aplicação foi adaptada para diferentes tamanhos de tela, incluindo:

* desktops
* notebooks
* tablets
* smartphones

Os elementos se reorganizam automaticamente para melhorar a navegação e acessibilidade em dispositivos menores.

Isso inclui:

* grids adaptáveis
* menus responsivos
* formulários ajustáveis
* cards flexíveis
* melhor aproveitamento de espaço em telas pequenas

O projeto possui:

* Layout moderno
* Sidebar administrativa
* Responsividade
* Inputs animados
* Cards interativos
* Ícones com React Icons
* Feedback visual de erros


# Persistência de Dados

Os dados são armazenados utilizando:

```txt
LocalStorage
```

O sistema salva:

* usuários
* autenticação
* carrinho
* pedidos
* perfil
* wishlist

# Explicação das Telas Desenvolvidas

## Home

Tela principal da plataforma responsável por apresentar os jogos disponíveis na loja.

### Funcionalidades:

- listagem de jogos
- navegação pelos produtos
- adição ao carrinho
- adição à lista de desejos
- visualização rápida dos produtos


## Login

Tela de autenticação dos usuários.

### Funcionalidades:

- login de usuários
- validação de credenciais
- visualização de senha
- redirecionamento automático


## Register

Tela de cadastro de novos usuários.

### Funcionalidades:

- criação de conta
- validação de email duplicado
- visualização de senha
- definição automática de permissões
  

## Profile (Perfil)

Tela de gerenciamento da conta do usuário.

### Funcionalidades:

- edição de dados pessoais
- alteração de avatar
- visualização de informações da conta
- gerenciamento de CPF
- acesso rápido aos pedidos e lista de desejos

  
## Wishlist (Lista de desejos)

Tela responsável pela lista de desejos do usuário.

### Funcionalidades:

- salvar produtos favoritos
- remover itens da lista
- visualizar jogos desejados

  
## Cart (Carrinho de Compras)

Tela responsável pelos produtos adicionados ao carrinho.

### Funcionalidades:

- alteração de quantidade
- remoção de produtos
- cálculo automático do total
- redirecionamento para checkout


## Checkout

Tela de finalização de compra.

### Funcionalidades:

- validação de formulário
- validação de CPF
- resumo do pedido
- confirmação da compra
- geração do pedido


## Pedidos

Tela onde o usuário visualiza suas compras realizadas.

### Funcionalidades:

- listagem de pedidos
- visualização dos produtos comprados
- valor total do pedido


## Dashboard Admin

Painel administrativo exclusivo para administradores.

### Funcionalidades:

- gerenciamento de produtos
- gerenciamento de categorias
- visualização de pedidos
- listagem de usuários
- controle administrativo da plataforma


# Estrutura do Projeto

```txt
src/
 ├── assets/
 ├── components/
 ├── context/
 ├── data/
 ├── pages/
 ├── routes/
 ├── styles/
 ├── App.jsx
 └── index.jsx
```


# Como Executar o Projeto

## 1️- Clone o repositório

```bash
git clone https://github.com/MykaelLeal/gamesbit_app.git
```

---

## 2️- Entre na pasta do projeto

```bash
cd frontend
```

## 3️- Instale as dependências

```bash
npm install
```

ou

```bash
npm i
```

## 4️- Execute o projeto

```bash
npm start
```





