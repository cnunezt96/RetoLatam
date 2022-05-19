package co.com.certificaction.opencart.stepdefinitions;

import co.com.certificaction.opencart.questions.Verificar3;
import co.com.certificaction.opencart.tasks.Consultar;
import co.com.certificaction.opencart.tasks.Pedidos;
import cucumber.api.java.Before;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import net.serenitybdd.screenplay.GivenWhenThen;
import net.serenitybdd.screenplay.actors.OnStage;
import net.serenitybdd.screenplay.actors.OnlineCast;
import org.hamcrest.Matchers;

public class Order {
    @Before
    public void iniciarEscenario(){
        OnStage.setTheStage(new OnlineCast());
    }

    @Dado("^: que camilo ingresa al modulo orders$")
    public void queCamiloIngresaAlModuloOrders() {
        OnStage.theActorCalled("Camilo").wasAbleTo(Pedidos.consultar());

    }

    @Cuando("^: digita los datos de la orden y consulta el pedido$")
    public void digitaLosDatosDeLaOrdenYConsultaElPedido() {
        OnStage.theActorInTheSpotlight().attemptsTo(Consultar.pedidos());
    }

    @Entonces("^: verifica  que la orden, coincida con el pedido$")
    public void verificaQueLaOrdenCoincidaConElPedido() {
        OnStage.theActorInTheSpotlight().should(GivenWhenThen.seeThat(Verificar3.order(), Matchers.equalTo("HP LP3065")));
    }
}
