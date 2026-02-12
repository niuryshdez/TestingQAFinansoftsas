describe('Validar tolerancia de espacios en blanco inicio- final en el campo Usuario durante login', () => {

    beforeEach(() => {
        cy.visit('https://y2k.finansoftsas.ec/smagfe/#/')
    });

    it('Ignorar espacios en blanco al ingresar nombre de usuario y permitir acceso', () => {

            //Escribir espacio al inicio y final del nombre de usuario
        cy.get('form[name="loginForm"]')
            .find('input[name="identification"]')
            .type(' ***** ');

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



