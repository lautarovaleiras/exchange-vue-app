<template>
 <div class="text-center">
    <b-card title="Challenge conversion de divisas" class="w-75 mx-auto">
      <b-card-text style="text-align: justify;">

        <p>
          Este desafío fue desarrollado con <b>Vue.js 2</b>  y Express con TypeScript en <b>Node.js 14</b> como servidor.
          El desafío consta de dos vistas principales: una vista de inicio de sesión y una vista de conversión de divisas.
          La vista de inicio de sesión solicita al usuario ingresar su correo electrónico y, con este, se
          genera un token JWT en el servidor, el cual será requerido para realizar las demás consultas.
          La vista de conversión consta de dos selectores para las divisas de origen y destino, además
          de un input para ingresar el monto a convertir.

          Para obtener las tasas de cambio de divisas, se utilizo la api de <a href="https://fixer.io/">fixer</a> ya que la misma brinda una capa gratuita .
        </p>
        <p>Aclaracion: Se utilizo Vuex para el manejo del estado global que incluye la sesion de usuario, por lo que al no utilizar localStorage  al cerrar la pagina o si se pegan manualmente los path de la url, la sesion se pierde.</p>
      </b-card-text>
    </b-card>
  </div>
</template>
