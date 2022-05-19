package co.com.certificaction.opencart.questions;

import co.com.certificaction.opencart.userinterfaces.Opencart;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

public class Verificar2 implements Question {

    public static Verificar2 usuario(){
        return new Verificar2();
    }

    @Override
    public Object answeredBy(Actor actor) {
        return Text.of(Opencart.TD_TEXT).viewedBy(actor).asString();
    }
}
