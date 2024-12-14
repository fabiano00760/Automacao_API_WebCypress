describe('login', () => {
    let generatedCredentials = [];  // Variável para armazenar as credenciais carregadas

    beforeEach(() => {
        // Navegar até a página inicial do Magento
        cy.visit('https://magento.softwaretestingboard.com/');

        // Carregar as credenciais salvas do arquivo JSON (caso existam)
        cy.readFile('cypress/fixtures/generatedCredentials.json', { failOnStatusCode: false }).then((credentials) => {
            // Se o arquivo existe e contém credenciais, carrega as credenciais
            generatedCredentials = credentials || [];
        });
    });

    it('Login com a última credencial gerada', () => {
        // Verificar se existem credenciais salvas no arquivo JSON
        expect(generatedCredentials).to.have.length.greaterThan(0, 'Deve haver credenciais geradas para realizar o login');
        // Pegar a última credencial gerada
        const { email, password } = generatedCredentials[generatedCredentials.length - 1]; // Pega a última credencial
        // Acessar a página de login
        cy.contains('Sign In').click();
        // Preencher os campos de login com o e-mail e senha salvos
        cy.get('input[id="email"]').first().type(email); // Garante que o primeiro campo será usado
        cy.get('input[id="pass"]').first().type(password); // Garante que o primeiro campo será usado
        cy.contains('button', 'Sign In').click(); // Clicar no botão "Sign In"
        // Verificar se o login foi bem-sucedido
        // Aqui você pode ajustar para validar um elemento visível após o login
        cy.contains('Welcome, Fabiano Silva! ').should('be.visible'); // Exemplo de uma mensagem ou elemento que aparece após o login
        cy.contains("Women").trigger('mouseover').click();
        // Agora que o menu está visível, clica em "Tops"
        cy.contains("Tops").click({ force: true });
        cy.contains("Antonia Racer Tank").trigger('mouseover').click();
        cy.contains("XS").click({ force: true });
        cy.get('#option-label-color-93-item-49').click();
        cy.contains("Add to Cart").click();
        cy.get("body > div.page-wrapper > header > div.header.content > div.minicart-wrapper > a > span.counter.qty").click({ force: true });
        cy.contains("Proceed to Checkout").click({ force: true })
        // Verifica se o texto está visível na página
          // Se a mensagem aparecer, realiza uma ação (como clicar ou verificar algo)
    var mensagem = "You added Antonia Racer Tank to your";

    // Usando cy.contains para verificar a presença do texto
    cy.contains(mensagem, { timeout: 10000 }).then(($message) => {
      // Se a mensagem for encontrada, loga e faz a ação desejada
      cy.log('Mensagem encontrada!');
      // Aqui você pode adicionar outras ações, como clicar em um botão
    }).should('not.exist').then(() => {
      // Se a mensagem não for encontrada, registra o que aconteceu
      cy.log('Mensagem não encontrada. Continuando o fluxo...');
      // Redireciona ou realiza outra ação se necessário
      cy.visit('https://magento.softwaretestingboard.com/checkout/#shipping');  // Exemplo de redirecionamento
    });


});

});
