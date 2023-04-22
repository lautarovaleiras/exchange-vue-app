<div align="center">  
  <h1>Exchange app</h1>
</div>

## Objetivo
El objetivo es crear una app con vuejs y express del lado servidor secutizando la api con jwt. El frontend consta de dos vistas principales, un login (donde generamos un jwt a partir de un email) y un home donde se realicen converciones de monedas en base a un monto pasado por parametro.

Para la consulta de los valores de las monedas se  utilizaria el plan gratuito de la API https://openexchangerates.org/ para llevar a cabo la conversión. Sin embargo dado que dejo de tener capa gratuita se optó por utulizar la API de https://fixer.io/

## Descripción
La Aplicacion consta de un backend y frontend en el mismo repositorio.
El Backend esta implementado con Node 14 y typescript.

En cuanto al Frontend, este esta desarrollado en Vue 2.x, y consta de 2 vistas, `login`, `home`, para los estilos se utilizo bootstrap-vue para una mayor simplicidad.

Posee un interceptor que injecta actomaticamente los jwt  en los headers cada que se hace un request. (Se utilizo axios para los fetching y jwt-decode para decodear los tokens).

Ademas se utlizo `Vuex` para el manejo del store(estados globales) para el handling de la sesion de usuario.




## Documentación API
La api esta securizada con JWT  por lo que para la utilizacion de la API es necesario el inicio de sesion para obtener el token de acceso.
La ruta POST /login, no esta securizada, ya que esta se utiliza para registrarse en la aplicacion.

Para obtener el listado completo de monedas, se debe hacer el request vacio.
Para este caso el listado se trae de un mock harcodeado en el archivo currencies para bajar al minimo las requets a fixer.

`GET /exchange/currencies/`

    curl -i -H 'Accept: application/json' http://localhost:3000/exchange/currencies/

### Response

    [{currencyISO:"AFN",CurrencyName:"Afghani",Symbol:"؋", ....]


## Convert
El metodo POST /exchange/convert/ recibe un objeto con los atributos de las monedas a convertir.
    {
      from:ARS,
      to:USD,
      amount:100,
    }

### Request

`POST /exchange/convert/`

    curl -i -H 'Accept: application/json' --request POST -d ' {from:ARS, to:USD, amount:1}'
    http://localhost:3000/exchange/convert

### Response
    {
      amountConverted: 0.005   
    }
    


### Request

Metodo para autenticarse con un email y generar el jwt.

`POST /login`

    curl -i -H 'Accept: application/json' --request POST -d ' {email:'example@gmail.com'}'
    http://localhost:3000/login

### Response
    {
     message: 'Ok',
     token: 'ey.....'
    }


## Local Development

### Requerimientos
- NodeJs instalado (14.x.x)
- Vue 2.x.x
- Visual Studio Code



### Local Deploy
Para correr la aplicacion en local, se deben instalar las dependencias ejecuntado el comando `npm install` en los directorios backend y frontend, luego 
debe que ejecutar el comando `npm run serve` estando ubicado en le directorio /frontend el cual levanta el front en el puerto 8080. Luego en otra terminal parse sobre la ruta /backend y ejecutar el comando `npm run dev` (este comando levanta la API en el puerto 3000).
Se debe ingresar en el navegador: http://localhost:8080

Setear la variable de entorno VUE_APP_API_URL=http://localhost:3000 creando el archivo .env.development en el root del frontend.


### No-Gos
* Nos estan implementada la sesion con localStorage por lo que cualquier refresh causa la perdia de la misma.