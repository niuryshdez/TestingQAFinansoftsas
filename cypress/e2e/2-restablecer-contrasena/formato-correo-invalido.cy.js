describe('Validar formato inválido del correo electrónico', () => {

    beforeEach(() => {
        cy.visit('https://y2k.finansoftsas.ec/smagfe/#/')
        cy.contains('Olvidé mi contraseña').click()
    });

    it('TC-04-Se espera que no envie enlace con email invalido', () => {

            //Buscar en el formulario un input con el nombre "usuario"
            cy.get('form[name="requestPasswordChangeForm"]')
                .find('input[name="identification"]')
                .should('exist')
                .and('be.visible')
                .type('******');

            //Buscar en el formulario un input con el nombre "email"
            cy.get('form[name="requestPasswordChangeForm"]')
                .find('input[name="email"]')
                .should('exist')
                .and('be.visible')
                .type('******@gmail.net');

            //Dar clic en el boron Aceptar
            cy.get('form[name="requestPasswordChangeForm"]')
                .find('button[type="submit"]')
                .should('exist')
                .and('be.visible')
                .and('contain.text', 'Aceptar')
                .click();

            //Verificar que se muestre el mensaje de error por formato de correo invalido
            cy.contains('div', 'No existe un usuario con el correo proporcionado.')
                .should('be.visible');        
    });

});