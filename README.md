# Backend do Projeto de Gestão Financeira

Este repositório contém a implementação do backend para o sistema de gestão financeira, responsável pelo processamento dos dados financeiros, controle de autenticação e autorização dos usuários, além do armazenamento e gestão de transações e categorias financeiras. 

## Estrutura do Projeto

- **API e Banco de Dados**: Fornece os endpoints para o frontend, gerencia as transações e categorias e mantém a consistência dos dados.
- **Autenticação e Controle de Acesso**: Controle de permissões e autenticação de usuários.
- **Relatórios e Visualizações de Dados**: Permite a geração de relatórios financeiros em diferentes formatos e a exibição de dados com gráficos e estatísticas.

## Tecnologias Utilizadas

- **Node.js + TypeScript**: Para um backend com tipagem estática, desempenho otimizado e maior segurança.
- **Fastify**: Framework web rápido e eficiente para criação de APIs.
- **Drizzle ORM**: ORM leve, com suporte a TypeScript e fácil integração com bancos SQL.
- **SQLite**: Banco de dados SQL para armazenamento de dados de forma leve e local.
- **JWT (JSON Web Token)**: Para autenticação e controle de sessão.
- **Vitest**: Framework de testes rápido e com suporte completo para TypeScript.

## Requisitos Funcionais

### Autenticação e Controle de Acesso
- [ ] **Registro de Usuário**: Permitir que novos usuários se registrem com email, senha e nome.
- [ ] **Login e Logout**: Usuários devem poder se autenticar e encerrar suas sessões com segurança.
- [ ] **Controle de Acesso**: Diferenciar permissões entre usuários comuns e administradores.

### Gestão Financeira
- [ ] **Transações**: 
  - [ ] CRUD para transações financeiras (criação, leitura, atualização e exclusão).
  - [ ] Definição de categorias e tags para cada transação.
  - [ ] Acompanhamento de despesas e receitas mensais.

- [ ] **Categorias**: 
  - [ ] CRUD para categorias financeiras.
  - [ ] Associação de cada transação com uma categoria para melhor organização.

### Relatórios e Visualizações
- [ ] **Relatórios Mensais e Anuais**: Geração de relatórios com base nos dados financeiros do usuário.
- [ ] **Gráficos e Estatísticas**: Exibir gráficos de despesas por categoria, fluxo de caixa mensal e resumo financeiro anual.

### Configurações
- [ ] **Preferências do Usuário**: Cada usuário pode ajustar as configurações de notificação e moeda.

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/RafaSS/GestaoFinanceiraApp-BackEnd.git
