# AuthChallenge Frontend

Este repositório contém a implementação do frontend da aplicação AuthChallenge, construída com Angular. O projeto foi estruturado em módulos distintos, onde cada módulo contém suas páginas, serviços, rotas e componentes, garantindo organização e escalabilidade.

## Estrutura do projeto

O projeto está organizado nas seguintes camadas e módulos:

- Modules: Onde vai conter cada módulo da aplicação, como o módulo de autenticação, módulo de usuários, etc. Cada módulo possui suas próprias páginas, serviços, rotas e componentes.

- App: Módulo principal da aplicação, onde são importados os módulos de terceiros, módulos próprios, componentes e configurações globais.

### Tratamento de Exceções

O tratamento de erros na aplicação é feito com interceptadores HTTP e componentes de erro, garantindo que todos os erros da API e erros inesperados sejam tratados de maneira uniforme e informativa.

### Autenticação

A autenticação é feita com JWT, com tokens de acesso armazenados de maneira segura. O token é enviado em todas as requisições para a API, garantindo que o usuário esteja autenticado e autorizado.

### Internacionalização

A aplicação possui suporte a internacionalização, com traduções em inglês e português. O idioma é definido de acordo com o idioma do navegador do usuário.

## Executando o projeto

Para executar o projeto, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/becardine/auth-challenge.git
cd auth-challenge
```

2. Instale as dependências:

```bash
pnpm install
```

3. Execute o projeto:

```bash
pnpm start
```

O projeto estará disponível em `http://localhost:4200`.
