describe('Validar acceso al formulario con enlace vencido.', () => {

    beforeEach(() => {
        cy.visit('https://y2k.finansoftsas.ec/smagfe/#/')
    });

    it('TC-10-Se espera que el sistema no acceda al formulario con enlace manipulado', () => {

     const urlManipulada = 
      'https://y2k.finansoftsas.ec/smagfe/#/reset-pwd/reset?selector=62078de8b8adc0da&=2ba4483f23fa02304138f10f321321c7a4c86641d30e6e49182df01dc37c1db9';

        cy.visit(urlManipulada);

        // El sistema muestra mensaje Token inválido o expirado
        cy.contains('Token inválido o expirado')
            .should('be.visible');
        
        



    });

});