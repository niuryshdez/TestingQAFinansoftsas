describe('Validar mensaje de error al ingresar credenciales inválidas', () => {

    beforeEach(() => {
        cy.visit('https://y2k.finansoftsas.ec/smagfe/#/')
    });

    it('Se espera que el mensaje sea credenciales inválidas', () => {

        const username = randomUsername();
        const password = randomUsername('');

        cy.get('form[name="loginForm"]')
            .find('input[name="identification"]')
            .type(username);

        cy.get('form[name="loginForm"]')
            .find('input[name="password"]')
            .type(password);

        cy.wait(500)

        cy.get('form[name="loginForm"]')
            .find('input[type="submit"]')
            .click();

  
        // Para verificar el menesaje de error que viene de respuesta en un modal
        cy.get('.modal-body.text-danger p')
            .should('have.text', 'Credenciales inválidas.');

        
    });

});

function randomUsername(prefix = "user") {
  return `${prefix}_${Math.random().toString(36).substring(2, 10)}`;
}

