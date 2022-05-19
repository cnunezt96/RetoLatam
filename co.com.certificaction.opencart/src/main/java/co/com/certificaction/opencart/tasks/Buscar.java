package co.com.certificaction.opencart.tasks;

import co.com.certificaction.opencart.userinterfaces.Opencart;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Performable;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.Hit;
import net.serenitybdd.screenplay.actions.Open;
import org.openqa.selenium.Keys;

public class Buscar implements Task {
    private Opencart opencart;

    public static Buscar clientes(){
        return Tasks.instrumented(Buscar.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(Click.on(Opencart.BTN_CUSTOMERS),
                Enter.theValue("sachint@gmail.com").into(Opencart.TXT_CORREO),
                Click.on(Opencart.SELECT_STATUS),
                Click.on(opencart.ENABLE),
                Click.on(Opencart.SELECT_DATE),
                Click.on(Opencart.SELECT_MES),
                Click.on(Opencart.SELECT_DAY),
                Click.on(Opencart.BTN_FILTRO)
                );

    }
}
