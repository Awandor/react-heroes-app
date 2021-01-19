# Heroes App

SPA con páginas de héroes de Marvel y de DC y un buscador de héroes

Se ha generado con > `npx create-react-app heroes-app`

Es mejor usar Chrome como navegador para desarrollo, Brave da problemas

## Preparación

En `src` borramos todo salvo el `index.js`

Creamos `src/HeroesApp.js` que va a ser un functional component, usamos el snippet `rafc`

Instalamos Bootstrap


## Crear un primer Router

Vamos `https://reactrouter.com/web/guides/quick-start` para documentación

> `npm install react-router-dom`

Creamos `src/components/dc/DcPage.js` y `src/components/marvel/MarvelPage.js` y `src/components/ui/Navbar.js` y `src/components/heroes/HeroPage.js`
y `src/components/login/LoginPage.js`

Ahora creamos `src/routers/AppRouter.js` por convención este es el nombre del router principal, también es un functional component

copiamos el ejemplo de la documentación y lo pegamos en `AppRouter.js` y lo ajustamos


## Crear un segundo Router

Tenemos un sistema de rutas convencional, pero queremos un segundo sistema para antes de que el usuario se autentica

Creamos en `scr/routers/DashboardRoutes.js` también es un functional component igual que `AppRouter.js` pero con la excepción de que no va a tener
el componente <Router> sólo contiene las rutas hijas.

Ahora en `AppRouter.js` y usamos <DashboardRoutes />


## Trabajar con el historial de rutas

Trabajamos en `LoginPage.js` añadimos un botón y una función handler, queremos que al pinchar nos redireccione a una página.

`react-router-dom` nos ofrece varios métodos para navegar, consultar el historial y realizar cambios.

Para trabajar con el historial tenemos el Hook `useHistory` que tiene los métodos `push` y `replace`


## Hero List

Creamos `src/components/heroes/HeroList.js` es un functional component que recibe por props `publisher`

Creamos `scr/data/heroes.js` que son los datos de los héroes en forma de arreglo de objetos

Ahora creamos `src/selectors/getHeroById.js` y `src/selectors/getHeroesByPublisher.js` son las funciones que retornan datos

En `HeroList.js` implementamos la función `getHeroesByPublisher` recibe un prop que es el publisher.

Importamos <HeroList /> en `DcPage.js` y en `MarvelPage.js` y adaptamos el publisher según el caso


## Hero Card

Creamos `src/components/heroes/HeroCard.js` recibe por props todas las propiedades del objeto héroe.

Lo implementamos en `HeroList.js`


## Hero Page

En `DashboardRoutes.js` tenemos la ruta al detalle del héroe, ahora vamos a leer los argumentos de la URL que en este
caso es `heroId`.

Vamos a `HeroPage.js`, importamos el Hook `useParams` con él leemos facilmente los argumentos de la URL y con heroId
obtenemos los detalles usando la función `getHeroById`

Ponemos un botón para volver y un handler que utiliza el Hook useHistory, para ver los métodos del Hook podemos ir a la
consola de desarrollo > Components > HeroPage > hooks y vemos los 2 Hooks que usamos en el componente, si desplegamos
History podemos ver los métodos que hay.


## useMemo Hook

En `HeroList.js` si el state cambia React va a disparar la función `getHeroesByPublisher` y nosotros queremos que sólo
se dispare una vez, cuando se carga por primera vez el componente o si el `publisher` cambia

Importamos `useMemo` y tiene un snippet

Aplicamos el mismo principio a `HeroPage.js` para que sólo se dispare si `heroId` cambia


## Search Page

Creamos `src/components/search/SearchPage.js`

Del ejercicio anterior tomamos el custom Hook useForm y lo importamos y lo usamos como en el ejercicio anterior

Ya estamos recibiendo el dato del campo de búsqueda

Cuando hacemos una búsqueda exitosa necesitamos añadir a la URL `?q=nombre` para que si después entramos en el detalle
del resultado y después volvamos podamos conservar el estado

React tiene un Hook para obtener fácilmente el parámetro q que estamos enviando `useLocation`, lo importamos y lo usamos

El problema viene cuando hay más de un parámetro en la URL, React no tiene una manera fácil de separlos tendríamos que
hacerlo manualmente pero hay un paquete de npm que facilita esta labor y se usa mucho `https://www.npmjs.com/package/query-string`

> `npm install query-string` lo importamos y usamos según la documentación, es muy sencillo

Ahora que podemos obtener nuestro querystring vamos a crear `src/selectors/getHeroesByName.js`

Lo importamos en `SearchPage.js` pero se dispara cada vez que escribo una letra, lo que queremos es que se dispare sólo
al pinchar el botón Search, para ello vamos a usar useMemo y que se dispare sólo cuando el querystring haya cambiado


# Protección de rutas

Vamos a crear un context y un reducer para que el context distribuya todo lo que va a hacer el reducer, para poder hacer
dispatch de acciones en cualquier parte de la app

Creamos `src/authentication/authReducer.js`

Para evitar errores de escritura trabajaremos con los types, creamos `src/types/types.js` este archivo no es más que un objeto con todos
los types de la app, ahora los aplicamos en `authReducer.js`.

Creamos un context `src/authentication/AuthContext.js` con A mayúscula para indicar que es un higher order component

Ahora importamos y envolvemos con <AuthContext></AuthContext> en `HeroesApp.js` se puede hacer en `index.js` también pero es preferible
dejarlo lo más limpio posible

Con <AuthContext> podemos distribuir por toda la aplicación un objeto, el contenido de ese objeto vendrá de un reducer que con su
`dispatch` permitirá acceder al estado del usuario en toda la app


## Login de usuario

Vamos a `LoginPage.js` y ahora del `context` extraemos la función `dispatch` que mandará llamar a una action que tenga el tipo `login`

En `Navbar.js` accedemos al `context` y al nombre del usuario y lo pintamos

Si recargamos la página perdemos los datos del usuario porque pasa por `HeroesApp.js` que lee del `localStorage` y si no encuentra user
sólo devuelve `logged: false` y perdemos el nombre.

Debemos guardar en `localStorage` el nombre y `logged: true` en el momento de que cambie el estado de `userState` para ello en `HeroesApp.js`
usamos el Hook `useEffect` que se queda a la escucha de cambios en `userState`


## Rutas privadas

Creamos `src/routers/PrivateRoute.js` es un functional component.

Podríamos proteger todas las rutas dentro de `DashboardRoutes.js` pero es más sencillo proteger <DashboardRoutes /> dentro de `AppRouter.js`

En `PrivateRoute.js` vamos a recibir como argumento un objeto con varios props y retornaremos de forma condicional el componente que
recibimos por props o redireccionamos al `LoginPage.js`

Usamos `PropTypes` para indicar que algunos props son obligatorios

Ahora lo aplicamos en `AppRouter.js` y comprobamos con el context si el usuario está autenticado y los pasamos como propiedad en <PrivateRoute />


## Rutas públicas

Creamos `src/routers/PublicRoute.js` es un functional component. Lo aplicamos de la misma manera que `PrivateRoute.js`

Si el usuario está autenticado y trata de acceder al Login será redireccionado al Home


## Recordar la última página visitada

Si hacemos logout y volvemos a hacer login queremos que la app redireccione a la última página visitada con los mismos parámetros de búsqueda
por ejemplo.

Vamos a `PrivateRoute.js`, miramos por consola lo que contiene `rest`, tiene computedMatch, location y path. location tiene `pathname` y `search`
podemos guardar estos datos en localStorage al hacer logout para leerlos al hacer login.

Pero en vez de guardar al hacer logout guardamos cada vez que entra en una ruta privada por lo que lo hacemos en `PrivateRoute.js` porque en
casos de usar tokens, los tokens pueden expirar.

Para leerlos vamos a `LoginPage.js` y leemos, en caso de haber un lastPath vamos a él de lo contrario a una página por defecto



# Pruebas Unitarias y de Integración

Las pruebas unitarias están enfocadas en pequeñas funcionalidades mientras las pruebas de integración están enfocadas en cómo reaccionan
varias piezas en conjunto, el proceso de las pruebas se conoce como **AAA**: Arrange, Act, Assert

1. Arrange, es cuando preparamos el estado inicial: iniciamos variables, importaciones necesarias, preparamos el ambiente del sujeto a probar
2. Act, aplicamos acciones o estímulos sobre el sujeto a probar: llamamos métodos, simulamos clicks
3. Assert, observamos el comportamiento resultante y afirmamos que los resultados son los esperados


## Instalaciones de paquetes y configuración del entorno de pruebas

Creamos `src/setupTests.js`

### Enzyme

Enzyme es una utilidad para probar componentes de React, fue desarrollado por AirBnB y ahora es mantenido por Facebook

Documentación: `https://enzymejs.github.io/enzyme/`

A fecha de hoy no hay Enzyme para React 17 oficial, hay una versión no oficial en beta pero que nos va a servir: 
`https://github.com/wojtekmaj/enzyme-adapter-react-17`

La instalamos > `npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17`

Lo importamos en `setupTests.js` según la documentación

### Snapshot

Ahora vamos a trabajar con Snapshot que toma una fotografía de lo que renderiza el componente en forma de datos y que son
almacenados en una carpeta autogenerada `_snapshots_`

Pero para poder trabajar con esos datos en Jest necesitamos instalar el paquete enzyme-to-json: `https://www.npmjs.com/package/enzyme-to-json`

> `npm install --save-dev enzyme-to-json`

Ahora en `setupTests.js` importamos createSerializer según la documentación


***Las pruebas van de menor a mayor dificultad***

## Pruebas en authReducer

Creamos el archivo `src/tests/authentication/authReducer.test.js` deben terminar con `.test.js`

En el archivo de prueba importamos el componente a probar `authReducer.js`
importamos `shallow` de `enzyme`
importamos `render` de `@testing-library/react`

Usamos el método `describe` de Jest, podemos usar el snippet `desc` y dentro esribimos `test` y hay un snippet que nos monta la estructura básica


## Pruebas en PrivateRoute

Creamos el archivo `src/tests/routers/PrivateRoute.test.js`

Como los componentes de las rutas privadas están envueltas por <Router></Router> que es un higher order component no podemos usar `shallow`
que se queda en el padre, necesitamos acceder al hijo y por lo tento necesitamos usar `mount`

Por otro lado como `PrivateRoute.js` retorna un componente <route />, <PrivateRoute /> deberá estar envuelto por <MemoryRouter></MemoryRouter>


## Pruebas en AppRouter

Creamos el archivo `src/tests/routers/AppRouter.test.js`

<AppRouter /> lo usamos en HeroesApp.js envuelto en el higher order component <AuthContext></AuthContext> para pasarle el context con
los datos del usuario.

Tendremos que simular el context, importar AuthContext.js y envolver de la misma manera <AppRouter /> con <AuthContext> pasándole a este último
el context.

No podemos usar `shallow` que se queda en el padre, necesitamos acceder al hijo y por lo tento necesitamos usar `mount`


## Pruebas en DashboardRoutes

Creamos el archivo `src/tests/routers/DashboardRoutes.test.js`

Como en los casos anteriores necesitamos el contexto, importar AuthContext.js y envolver de la misma manera <DashboardRoutes /> con <AuthContext>
pasándole a este último el context.

También <DashboardRoutes /> necesitará estar envuelto por <MemoryRouter></MemoryRouter> y usaremos `mount`


## Pruebas en Navbar

Creamos el archivo `src/tests/components/ui/Navbar.test.js`

Como en los casos anteriores necesitamos el contexto, importar AuthContext.js y envolver de la misma manera <Navbar /> con <AuthContext>
pasándole a este último el context.

También <Navbar /> necesitará estar envuelto por <MemoryRouter></MemoryRouter> y usaremos `mount`

Para evaluar si ha sido llamado `history.replace(/logout)` necesitamos un mock del history y para usarlo hay que envolver <Navbar />
también con <Router></Router> y pasarle a éste el mock del history


## Pruebas en HeroPage

Creamos el archivo `src/tests/components/heroes/HeroPage.test.js`



## Pruebas en LoginPage

Creamos el archivo `src/tests/components/login/LoginPage.test.js`

Como en los casos anteriores necesitamos el contexto, importar AuthContext.js y envolver de la misma manera <LoginPage /> con <AuthContext>
pasándole a este último el context.

También <LoginPage /> necesitará estar envuelto por <MemoryRouter></MemoryRouter> y usaremos `mount`

Para evaluar si ha sido llamado `history.replace(/login)` necesitamos un mock del history y para usarlo hay que envolver <LoginPage />
también con <Router></Router> y pasarle a éste el mock del history


## Pruebas en SearchPage

Creamos el archivo `src/tests/components/search/SearchPage.test.js`

Como necesitamos trabajar con rutas necesitamos <MemoryRouter> en primer lugar y también necesitamos <Route> porque vamos a evaluar cosas
en una ruta en particular, las búsquedas transforman la URL y vamos a estar leyendo ésta. 

Usamos <Route> cuando tenemos que probar algo relacionado con los parámetros de las rutas o algo que suceda con la ruta



# GIT

En nuestra cuenta de github creamos un repositorio

Si no tenemos repositorio git local lo creamos > `git init`

Si no tenemos archivo `.gitignore` lo creamos, especialmente para evitar `node_modules`

Añadimos los cambios a GIT> `git add .`
Commit > `git commit -m "Primer commit"`

Si en este punto borro accidentalmente algo puedo recuperarlo con > `git checkout -- .`

Que nos recontruye los archivos tal y como estaban en el último commit.

Enlazamos el repositorio local con un repositorio externo en GitHub donde tenemos cuenta y hemos creado un repositorio
`git remote add origin https://github.com/Awandor/react-heroes-app.git`

Situarnos en la rama master > `git branch -M master`

Subir todos los cambios a la rama master remota > `git push -u origin master`

Para reconstruir en local el código de GitHub nos bajamos el código y ejecutamos `npm install` que instala todas las dependencias


## Tags y Releases

Crear un tag en Github y un Release

> `git tag -a v1.0.0 -m "Versión 1 - Lista para producción"`

> `git tag` muestra los tags

> `git push --tags` > sube los tags al repositorio remoto

En github vamos a Tags > Add release notes


## Desplegar aplicación en GitHub Pages

Tenemos que hacer un pequeño cambio en las rutas de `index.html` del build, en vez de apuntar a la raíz del servidor deben de apuntar
al directorio que contiene `index.html` simplemente con `./`

Vamos github y creamos un nuevo repositorio, podemos hacer 2 cosas:
1. Crear un proyecto aparte sólo con el contenido de build y subirlo a github
2. Renombrar el directorio build a docs, así no será ignorado por `.gitignore` y GitHub Pages lo va a detectar como posible entrada a la app
y subimos toda la app a github

Ahora vamos acceder al repositorio como si fuera una página web

Vamos a Settings > GitHub Pages > Source > master branch > Save

La app es ahora accesible desde `https://awandor.github.io/...`




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
