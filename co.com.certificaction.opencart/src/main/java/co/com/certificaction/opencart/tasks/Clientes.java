package co.com.certificaction.opencart.tasks;

import co.com.certificaction.opencart.userinterfaces.Opencart;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.Open;


public class Clientes implements Task {
    private Opencart opencart;


    public static Clientes consultar () {
        return Tasks.instrumented(Clientes.class);

    }
    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(Open.browserOn(opencart),
                Enter.theValue("demo").into(Opencart.TXT_USUARIO),
                Enter.theValue("demo").into(Opencart.TXT_CONTRASENA),
                Click.on(Opencart.BTN_LOGIN),
                Click.on(Opencart.BTN_CUSTOMER)
                );

    }
}
