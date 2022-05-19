package co.com.certificaction.opencart.questions;

import co.com.certificaction.opencart.userinterfaces.Opencart;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

public class Verificar3 implements Question {
    public static Verificar3 order() {
        return new Verificar3();}

    @Override
    public Object answeredBy(Actor actor) {
        return Text.of(Opencart.TXT).viewedBy(actor).asString();
    }
}

