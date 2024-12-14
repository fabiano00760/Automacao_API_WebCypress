# Documentação de Automação com Cypress

Este repositório contém automações utilizando [Cypress](https://www.cypress.io/) para testes web e de API. A automação está dividida em dois escopos:

1. **Cadastro e Login de Usuário no site Magento**: [https://magento.softwaretestingboard.com/](https://magento.softwaretestingboard.com/)
2. **Testes de API utilizando o serviço GoRest**: [https://gorest.co.in/](https://gorest.co.in/)

## Pré-requisitos

- Node.js instalado (versão 12 ou superior)
- Gerenciador de pacotes npm ou yarn
- Cypress instalado como dependência do projeto
- Token de autenticação válido para acessar as APIs do GoRest

## Instalação

1. Clone este repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `cypress.env.json` para armazenar variáveis sensíveis:
   ```json
   {
     "gorestToken": "seu-token-aqui"
   }
   ```

## Estrutura do Projeto

- **cypress/e2e/magento.cy.js**: Testes de cadastro e login no Magento.
- **cypress/e2e/gorest.cy.js**: Testes de API no GoRest.
- **cypress/fixtures**: Dados para os testes.
- **cypress/support**: Funções auxiliares.

## Testes Web (Magento)

### Fluxo Automatizado

1. **Cadastro de Usuário**:
   - Acessar a página de cadastro.
   - Preencher os campos obrigatórios (Nome, Sobrenome, Email, Senha).
   - Submeter o formulário e verificar o sucesso do cadastro.

2. **Login do Usuário**:
   - Acessar a página de login.
   - Preencher as credenciais (Email, Senha).
   - Validar o acesso ao painel do usuário.

### Exemplo de Teste

```javascript
describe('Testes de Cadastro e Login no Magento', () => {
  it('Deve cadastrar um novo usuário', () => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/create/')
    cy.get('#firstname').type('Fabiano')
    cy.get('#lastname').type('Silva')
    cy.get('#email_address').type('fabiano.silva@example.com')
    cy.get('#password').type('SenhaForte123')
    cy.get('#password-confirmation').type('SenhaForte123')
    cy.get('button[title="Create an Account"]').click()
    cy.contains('Thank you for registering with Main Website Store').should('be.visible')
  })

  it('Deve fazer login com usuário existente', () => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/')
    cy.get('#email').type('fabiano.silva@example.com')
    cy.get('#pass').type('SenhaForte123')
    cy.get('button[title="Sign In"]').click()
    cy.contains('My Account').should('be.visible')
  })
})
```

## Testes de API (GoRest)

### Fluxo Automatizado

1. **Criar Usuário** (`POST /public/v2/users`):
   - Enviar dados como Nome, Email, Gênero e Status.
   - Validar o status 201 e o retorno do ID do usuário criado.

2. **Consultar Usuário** (`GET /public/v2/users/:id`):
   - Buscar detalhes do usuário criado.
   - Validar o status 200 e os dados retornados.

3. **Atualizar Usuário** (`PUT /public/v2/users/:id` ou `PATCH /public/v2/users/:id`):
   - Alterar informações como Nome ou Status.
   - Validar o status 200 e os dados atualizados.

4. **Deletar Usuário** (`DELETE /public/v2/users/:id`):
   - Remover o usuário.
   - Validar o status 204 (sem conteúdo).

### Exemplo de Teste

```javascript
describe('Testes de API com GoRest', () => {
  const apiUrl = 'https://gorest.co.in/public/v2/users';
  let userId;

  it('Deve criar um novo usuário', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { Authorization: `Bearer ${Cypress.env('gorestToken')}` },
      body: {
        name: 'Fabiano Silva',
        email: `fabiano.silva.${Date.now()}@example.com`,
        gender: 'male',
        status: 'active'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body.id;
    });
  });

  it('Deve consultar os detalhes do usuário criado', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/${userId}`,
      headers: { Authorization: `Bearer ${Cypress.env('gorestToken')}` }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', userId);
    });
  });

  it('Deve atualizar o usuário criado', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/${userId}`,
      headers: { Authorization: `Bearer ${Cypress.env('gorestToken')}` },
      body: { name: 'Fabiano Silva Atualizado' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Fabiano Silva Atualizado');
    });
  });

  it('Deve deletar o usuário criado', () => {
    cy.request({
      method: 'DELETE',
      url: `${apiUrl}/${userId}`,
      headers: { Authorization: `Bearer ${Cypress.env('gorestToken')}` }
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
```

## Execução dos Testes

1. Para rodar os testes de interface (Magento):
   ```bash
   npx cypress open
   ```
   Selecione o arquivo `magento.cy.js` e execute.

2. Para rodar os testes de API (GoRest):
   ```bash
   npx cypress run --spec "cypress/e2e/gorest.cy.js"
   ```

## Contribuições

Sinta-se à vontade para contribuir com melhorias, abrindo uma issue ou enviando um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
