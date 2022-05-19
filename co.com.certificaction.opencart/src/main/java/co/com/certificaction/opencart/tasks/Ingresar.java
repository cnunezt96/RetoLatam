package co.com.certificaction.opencart.tasks;

import co.com.certificaction.opencart.userinterfaces.Opencart;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Performable;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.ClickOnBy;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.Open;

public class Ingresar implements Task {
    public static Ingresar credenciales(){
        return Tasks.instrumented(Ingresar.class);
    }


    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(Enter.theValue("demo").into(Opencart.TXT_USUARIO),
                Enter.theValue("demo").into(Opencart.TXT_CONTRASENA),
                Click.on(Opencart.BTN_LOGIN)

        );

    }

}
