describe('Validar cambio de contraseña exitoso.', () => {

    beforeEach(() => {
        cy.visit('https://y2k.finansoftsas.ec/smagfe/#/')
    });

    it('TC-01-Solicitar cambio de contraseña', () => {

        //Hacer click en Olvide mi contraseña y mostrar formulario
        cy.get('a[name=forgotPassword')
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Olvidé mi contraseña') 
            .click();
            
        //Buscar en el formulario un input con el nombre 'usuario' 
        cy.get('form[name=requestPasswordChangeForm]')
            .find('input[name=identification]')
            .should('exist')
            .and('be.visible')
            .type('*******');

        //Buscar en el formulario un input con el nombre 'email' 
        cy.get('form[name=requestPasswordChangeForm]')
            .find('input[name=email]')
            .should('exist')
            .and('be.visible')
            .type('*******@gmail.com');
          
        // Le decimos a Cypress cual es el endpoint que debe interceptar(INTERCEPT ANTES DE DISPARAR LA ACCION)
        cy.intercept('POST', 'https://y2k.finansoftsas.ec/smagfe/auth/auth/forgot').as('olvidoPassword');

        //Hacer click en el botón Aceptar
        cy.get('form[name=requestPasswordChangeForm]')
            .find('button[type=submit]')
            .should('exist')
            .and('be.visible')
            .click('');

        cy.wait(2000);

        //Verificar que se muestre el mensaje de confirmación
        cy.get('.modal-body')
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Le enviamos un correo con instrucciones para el cambio de contraseña. Si no lo recibe, revise su carpeta de spam');
      
        // Cerrar el modal de confirmación
        cy.get('.modal-footer')
            .find('button[type=button]')
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'OK')
            .click();
        
        //El endpoint que se consulta, espera a que responda y después obtenemos la respuesta si el status es 200(ok)       
        cy.wait('@olvidoPassword').then((interception)=>{

            expect(interception.response.statusCode).to.eq(200);

            const responseBody = interception.response.body;
            const url = responseBody.resetLink;

            cy.visit(url);

        });

        //Validar que se muestre el formulario para cambiar la contraseña en el campo newPassword1
        cy.get('form[name="rpc.changePasswordForm"]')
            .find('input[name="newPassword1"]')
            .should('exist')
            .and('be.visible')
            .type('******');

        //Confirmar la nueva contraseña en el campo newPassword2
        cy.get('form[name="rpc.changePasswordForm"]')
            .find('input[name="newPassword2"]')
            .should('exist')
            .and('be.visible')
            .type('******');

        //Dar click en el boton cambiar contraseña
        cy.get('form[name="rpc.changePasswordForm"]')
            .find('input[type="submit"]')
            .should('exist')
            .and('be.visible')
            .click();

        cy.wait(2000); //Esperar 2 segundos para esperar que la acción se complete

        //Validar mensaje de exito contraseña actualizada correctamente
        cy.get('.modal-body')
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Contraseña actualizada');

        //Cerrar el modal de confirmación
        cy.get('.modal-footer')
            .find('button[type="button"]')
            .should('exist')
            .and('be.visible')
            .click();

        cy.wait(2000);

        //Validar redirección al login
        cy.url().should('eq', 'https://y2k.finansoftsas.ec/smagfe/#/');

       cy.get('form[name="loginForm"]')
            .find('input[name="identification"]')
            .should('exist')
            .and('be.visible');

        cy.get('form[name="loginForm"]')
            .find('input[name="password"]')
            .should('exist')
            .and('be.visible'); 
    });

});