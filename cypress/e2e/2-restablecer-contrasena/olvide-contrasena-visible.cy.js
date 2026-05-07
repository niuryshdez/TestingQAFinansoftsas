describe('Validar que el enlace "Olvide mi contraseña" este visible en la pantalla de Login', () => {

    beforeEach(() => {
        cy.visit('https://y2k.finansoftsas.ec/smagfe/#/')
    });

    it('TC-01-Debe mostrar el enlace en la pantalla de Login', () => {

            //Acceso a enlace olvide mi contraseña visible en Login
            cy.get('a[name="forgotPassword"]')
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Olvidé mi contraseña');  
    });

});