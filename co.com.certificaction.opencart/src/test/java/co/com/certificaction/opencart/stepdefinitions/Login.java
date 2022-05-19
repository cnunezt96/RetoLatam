package co.com.certificaction.opencart.stepdefinitions;

import co.com.certificaction.opencart.questions.Verificar;
import co.com.certificaction.opencart.tasks.AbrirPagina;
import co.com.certificaction.opencart.tasks.Ingresar;
import cucumber.api.java.Before;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import net.serenitybdd.screenplay.GivenWhenThen;
import net.serenitybdd.screenplay.actors.OnStage;
import net.serenitybdd.screenplay.actors.OnlineCast;
import org.hamcrest.Matchers;

public class Login {

    @Before
    public void iniciarEscenario(){
        OnStage.setTheStage(new OnlineCast());
    }

    @Dado("^:que camilo ingresa a la app opencart$")
    public void queCamiloIngresaALaAppOpencart() {

        OnStage.theActorCalled("Camilo").wasAbleTo(AbrirPagina.urlApp());
    }

    @Cuando("^:digita las credenciales e ingresa a la app$")
    public void digitaLasCredencialesEIngresaALaApp() {
        OnStage.theActorInTheSpotlight().attemptsTo(Ingresar.credenciales());
    }

    @Entonces("^:verifica que pudo ingresar correctamente$")
    public void verificaQuePudoIngresarCorrectamente() {
        OnStage.theActorInTheSpotlight().should(GivenWhenThen.seeThat(Verificar.resultado(), Matchers.equalTo("NAVIGATION")));
    }


}
