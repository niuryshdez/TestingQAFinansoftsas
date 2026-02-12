describe('Validar que se muestre el formulario al hacer click en el enlace "Olvidé mi contraseña".', () => {

    beforeEach(() => {
        cy.visit('https://y2k.finansoftsas.ec/smagfe/#/')
    });

    it('TC-02-Debe mostrarse el formulario al hacer click en el enlace', () => {

            //Hacer click en Olvide mi Contraseña y mostrar formulario
            cy.get('a[name="forgotPassword"]')
                .should('exist')
                .and('be.visible')
                .and('contain.text', 'Olvidé mi contraseña')
                .click();


            // Buscar en el formulario un input con el nombre "email"
            cy.get('form[name="requestPasswordChangeForm"]')
                .find('input[name="email"]')
                .should('exist')
                .and('be.visible'); 

            
    });

});