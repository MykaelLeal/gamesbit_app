# 🎮 GamesBit

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

### Conta Admin

O sistema reconhece automaticamente um administrador quando realiza seu cadastro com os segunites campos:

```txt
Nome: Admin
Email: admin@gamesbit.com
Senha: 12345678
```

# Carrinho de Compras

O usuário pode:

* Adicionar produtos ao carrinho
* Remover produtos
* Alterar quantidade
* Visualizar subtotal e total
* Limpar carrinho após finalizar compra
* Persistência do carrinho no LocalStorage

# Lista de Desejos

A plataforma possui sistema de wishlist.

O usuário pode:

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

---

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




