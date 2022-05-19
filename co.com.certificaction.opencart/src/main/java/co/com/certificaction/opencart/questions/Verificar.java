package co.com.certificaction.opencart.questions;

import co.com.certificaction.opencart.userinterfaces.Opencart;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

public class Verificar implements Question {
    public static Verificar resultado() {
        return new Verificar();
    }

    @Override
    public Object answeredBy(Actor actor) {
        return Text.of(Opencart.LBL_MENU).viewedBy(actor).asString();
    }
}
