package co.com.certificaction.opencart.userinterfaces;


import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.thucydides.core.annotations.DefaultUrl;
import org.openqa.selenium.By;

@DefaultUrl("https://demo.opencart.com/admin/index.php?route=common/dashboard")
public class Opencart extends PageObject {
    public static final Target TXT_USUARIO = Target.the("Ingresar usuario").located(By.id("input-username"));
    public static final Target TXT_CONTRASENA = Target.the("Ingresar contrasena").located(By.id("input-password"));
    public static final Target BTN_LOGIN = Target.the("Boton ingresar").located(By.xpath("/html/body/div/div/div/div/div/div/div[2]/form/div[3]/button"));
    public static final Target LBL_MENU = Target.the("Confirmar menu").located(By.id("navigation"));
    public static final Target BTN_CUSTOMER = Target.the("Despliega modulo clientes").located(By.xpath("/html/body/div[1]/nav/ul/li[6]/a"));
    public static final Target BTN_CUSTOMERS = Target.the("Ingreso modulo clientes").located(By.xpath("//*[@id=\"collapse33\"]/li[1]/a"));
    public static final Target TXT_CORREO = Target.the("Ingreso correo cliente").located(By.xpath("//*[@id=\"input-email\"]"));
    public static final Target BTN_FILTRO = Target.the("Boton filtrar").located(By.xpath("//*[@id=\"button-filter\"]"));
    public static final Target TD_TEXT = Target.the("Td ip").located(By.xpath("//*[@id=\"form-customer\"]/table/tbody/tr/td[6]"));
    public static final Target BTN_SALES = Target.the("Despliega modulo ventas").located(By.xpath("//*[@id=\"menu-sale\"]/a"));
    public static final Target BTN_ORDERS = Target.the("Ingreso modulo ventas").located(By.xpath("//*[@id=\"collapse26\"]/li[1]/a"));
    public static final Target TXT_ORDER_ID = Target.the("Ingreso order id").located(By.xpath("//*[@id=\"input-order-id\"]"));
    public static final Target BTN_VIEW = Target.the("Ver orden").located(By.xpath("//*[@id=\"form-order\"]/table/tbody/tr/td[8]/div/div/a"));
    public static final Target  TXT = Target.the("Nombre producto").located(By.xpath("//*[@id=\"content\"]/div[2]/div[2]/div[2]/table[2]/tbody/tr[1]/td[1]/a"));
    public static final Target SELECT_STATUS = Target.the("Contenedor status").located(By.xpath("//*[@id=\"input-status\"]/option[1]"));
    public static final Target ENABLE = Target.the("Seleccionar status").located(By.xpath("//*[@id=\"input-status\"]/option[2]"));
    public static final Target SELECT_DATE = Target.the("Contenedor fecha").located(By.xpath("//*[@id=\"filter-customer\"]/div/div[2]/div[6]/div/span/button"));
    public static final Target SELECT_MES = Target.the("Seleccionar mes").located(By.xpath("/html/body/div[2]/div/div[1]/table/thead/tr[1]/th[1]"));
    public static final Target SELECT_DAY = Target.the("Seleccionar dia").located(By.xpath("/html/body/div[2]/div/div[1]/table/tbody/tr[5]/td[6]"));



    ;

}


