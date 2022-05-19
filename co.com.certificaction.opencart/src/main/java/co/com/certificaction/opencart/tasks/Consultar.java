package co.com.certificaction.opencart.tasks;

import co.com.certificaction.opencart.userinterfaces.Opencart;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.Open;

public class Consultar implements Task {
    private Opencart opencart;

    public static Consultar pedidos(){
        return Tasks.instrumented(Consultar.class);
    }


    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(Click.on(opencart.BTN_ORDERS),
                Enter.theValue("16788").into(opencart.TXT_ORDER_ID),
                Click.on(opencart.BTN_FILTRO),
                Click.on(opencart.BTN_VIEW)
                );

    }
}