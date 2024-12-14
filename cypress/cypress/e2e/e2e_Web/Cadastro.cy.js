describe('cadastro', () => {
    // Lista para armazenar os e-mails e senhas gerados
    let generatedCredentials = [];

    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/');

        // Carregar os dados existentes, se houver, para evitar sobrescrever
        cy.readFile('cypress/fixtures/generatedCredentials.json').then((credentials) => {
            // Se o arquivo já existe, carrega as credenciais anteriores, senão inicializa com um array vazio
            generatedCredentials = credentials || [];
        });
    });

    it('Create an Account', () => {
        // Gerar um e-mail único com base no timestamp atual
        const email = `user_${Date.now()}@gmail.com`;
        const password = 'Admin123@'; // Senha fixa ou você pode gerar uma senha também, se necessário

        // Adiciona o e-mail e a senha gerados à lista
        generatedCredentials.push({ email, password });

        // Preencher os campos de cadastro com os dados
        cy.contains('Create an Account').click();
        cy.get('input[id="firstname"]').type('Fabiano');
        cy.get('input[id="lastname"]').type('Silva');
        cy.get('input[id="email_address"]').type(email);
        cy.get('input[id="password"]').type(password);
        cy.get('input[id="password-confirmation"]').type(password);
        cy.contains('button', 'Create an Account').click();

        // Verificar se a mensagem de sucesso é exibida
        cy.contains('Thank you for registering with Main Website Store.').should('be.visible');

        // Salvar os e-mails e senhas gerados em um arquivo JSON
        // Mantém as credenciais anteriores e adiciona as novas no final
        cy.writeFile('cypress/fixtures/generatedCredentials.json', generatedCredentials);
    });

    after(() => {
        // Log para visualizar os e-mails e senhas gerados
        cy.log('Credenciais geradas:', generatedCredentials);
    });
});
