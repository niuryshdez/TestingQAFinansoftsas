describe('Validar inicio de sesión exitoso con credenciales válidas', () => {

    beforeEach(() => {
        cy.visit('https://y2k.finansoftsas.ec/smagfe/#/')
    });

    it('Iniciar sesión y validar', () => {

            //Escribir el nombre del usuario en el campo usuario
        cy.get('form[name="loginForm"]')
            .find('input[name="identification"]')
            .type('****');

            // Escribir contraseña en el campo password
        cy.get('form[name="loginForm"]')
            .find('input[name="password"]')
            .type('****');

        cy.wait(2000)

        cy.get('form[name="loginForm"]')
            .find('input[type="submit"]')
            .click();

        cy.url().should('include','/dashboard');
    
    });

});