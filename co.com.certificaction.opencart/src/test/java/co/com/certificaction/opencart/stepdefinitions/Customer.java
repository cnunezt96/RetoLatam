package co.com.certificaction.opencart.stepdefinitions;

import co.com.certificaction.opencart.questions.Verificar2;
import co.com.certificaction.opencart.tasks.AbrirPagina;
import co.com.certificaction.opencart.tasks.Buscar;
import co.com.certificaction.opencart.tasks.Clientes;
import cucumber.api.java.Before;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import net.serenitybdd.screenplay.GivenWhenThen;
import net.serenitybdd.screenplay.actors.OnStage;
import net.serenitybdd.screenplay.actors.OnlineCast;
import org.hamcrest.Matchers;

public class Customer {
    @Before
    public void iniciarEscenario(){
        OnStage.setTheStage(new OnlineCast());}


    @Dado("^: que camilo ingresa al modulo customers$")
    public void queCamiloIngresaAlModuloCustomers() {
            OnStage.theActorCalled("Camilo").wasAbleTo(Clientes.consultar());
    }

    @Cuando("^: digita los datos del cliente en el filtro$")
    public void digitaLosDatosDelClienteEnElFiltro() {
            OnStage.theActorInTheSpotlight().attemptsTo(Buscar.clientes());
    }

    @Entonces("^:Verifica que trae la información del cliente$")
    public void verificaQueTraeLaInformaciónDelCliente() {
        OnStage.theActorInTheSpotlight().should(GivenWhenThen.seeThat(Verificar2.usuario(), Matchers.equalTo("162.158.235.21")));
    }

}
