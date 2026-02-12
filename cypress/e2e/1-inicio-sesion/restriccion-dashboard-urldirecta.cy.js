describe('Validar restricción de acceso al dashboard sin autenticación mediante URL directa', () => {

    beforeEach(() => {
        cy.visit('https://y2k.finansoftsas.ec/smagfe/#/');
    });

    it('Debe bloquear el acceso al dashboard y redirigir a login', () => {

        //Escribir el nombre del usuario en el campo usuario
        cy.get('form[name="loginForm"]')
            .find('input[name="identification"]')
            .type('*****');

        // Escribir contraseña en el campo password
        cy.get('form[name="loginForm"]')
            .find('input[name="password"]')
            .type('*****');

        cy.wait(2000)

        cy.get('form[name="loginForm"]')
            .find('input[type="submit"]')
            .click();

        cy.url().should('include','/dashboard');

        // Cerrar sesion
        //TODO: Hacer clic en Salir
        cy.contains('a', 'Salir')
            .should('be.visible')
            .click();

        // Para verificar el menesaje de confirmación de salir que viene en el modal
        cy.get('.modal-body')
            .should('be.visible')
            .and('have.text', '¿Desea salir del sistema?');

        //TODO: Hacer clic dentro del modal de confirmacion en Si
        cy.contains('button', 'Si')
            .should('be.visible')
            .click();

        cy.wait(1000);

        // Visitar URL no permitida sin iniciar sesion
        cy.visit('https://y2k.finansoftsas.ec/smagfe/#/dashboard');

        // Para verificar el menesaje de error que viene de respuesta en un modal
        cy.get('.modal-body.text-danger')
            .should('have.text', 'No tiene permisos de acceso a la URL solicitada.');

    
    });

});