describe('TC-15 - Reutilizar enlace de restablecimiento ya usado', () => {

  it('Debe mostrar error si se reutiliza el mismo enlace de reset', () => {

        // 1) Enlace válido 
        const resetLinkValido =
        'https://y2k.finansoftsas.ec/smagfe/#/reset-pwd/reset?selector=894ed5c348bf0240&token=f9e3a65d248a445e7e46a09477b4c448e6f5297fd31237d396eab5354d5bd3de';

        // 2) Primera vez: abrir link
        cy.visit(resetLinkValido);

       cy.get('div[class="alert alert-danger ng-binding ng-scope"]')
            .should('exist')
            .and('be.visible')
            .contains('Token inválido o expirado');
  });

});
