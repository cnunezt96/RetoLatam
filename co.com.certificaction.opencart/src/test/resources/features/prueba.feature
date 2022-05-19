#Autor: Camilo Nuñez Torres
  #language: es

  @HistoriaDeUsuario
  Característica: Verificar el correcto funcionamiento de los modulos de la app opencart
    Yo como usuario quiero ingresar a la app opencart para verificar que tengo acceso a ella

  @CasoLogueo
  Escenario: Verificar ingreso correcto
    Dado :que camilo ingresa a la app opencart
    Cuando :digita las credenciales e ingresa a la app
    Entonces :verifica que pudo ingresar correctamente

    @CasoConsultarCliente
    Escenario: Buscar un cliente registrado en la app
      Dado : que camilo ingresa al modulo customers
      Cuando : digita los datos del cliente en el filtro
      Entonces :Verifica que trae la información del cliente

      @VerificarPedido
      Escenario: Ver una orden de servicio
        Dado : que camilo ingresa al modulo orders
        Cuando : digita los datos de la orden y consulta el pedido
        Entonces : verifica  que la orden, coincida con el pedido