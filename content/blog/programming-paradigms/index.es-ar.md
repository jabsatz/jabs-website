---
title: Paradigmas de Programación
date: "2020-03-15T01:43:00.169Z"
description: Entendiendo paradigmas de codeo. Escrito en lenguaje orientado a principiantes.
---

En una de mis primeras entrevistas me preguntaron algo que hasta el día de hoy sigue dando vueltas en mi cabeza.

> JavaScript es un lenguaje orientado a objetos? Sí/No.

Esta era una entrevista para hacer desde casa, y este era uno de los puntos menos importantes. Entonces, como muchos otros programadores autodidáctas, hice lo mismo de siempre: googlear la respuesta.

Después de unos minutos buscando, la respuesta unánima parecía ser "Sí", entonces escribí eso y seguí con el resto de las preguntas.

Como tenía poca experiencia con otros lenguajes, no pensé mucho sobre qué significaba la pregunta o por qué la respuesta era esa. Parecía una pregunta de libro.

Pero durante los siguientes años, de vez en cuando recordaba esa pregunta y no podía evitar sentir que era medio rara. Teniendo más experiencia, me di cuenta que esa es una pregunta muy **engañosa** para hacerle a un principiante.

Si tuviera que formular lo que yo creo es la pregunta correcta, escribiría algo así::

> JavaScript soporta características de programación orientada a objetos?

Esto es porque, como muchos otros conceptos de alto nivel, los paradigmas se paraphrasean hasta el punto donde qué significan se vuelve confuso y poco claro.

Preguntar si JavaScript es orientado a objetos se siente como preguntar si cocinar es orientado a hornos.

Seguro, podés usar el horno para cocinar _muchas_ cosas diferentes, pero también podés cocinar sin un horno, y para ciertas comidas es lo correcto (aunque nunca haya probado ensalada al horno).

Quiero hablar sobre cuales son algunos diferentes paradigmas, y por qué no creo que los lenguajes están **orientados** a ciertos estilos, si no que los **soportan**.

**El punto de este artículo no es enseñar sobre todos los diferentes paradigmas que existen.**

Mientras lean el artículo, lo más importante que quiero que tengan en mente es que **pueden mezclar estas practicas de muchas formas**.

## Paradigma Imperativo

Salvo que estés codeando en un lenguaje muy raro como Haskell, lo más probable es que lo primero que aprendiste haya sido **programación imperativa**. Este estilo de programación consiste en decirle al programa exactamente que hacer, paso por paso, como si estuviera siguiendo una receta. Creá un array, asigná i = 0, agregalo al array, aumentá i por uno, repetí hasta que i llegue a 20:

```js
let array = []
for (let i = 0; i < 20; i++) {
  array.push(i)
}
```

Esto es fácil cuando alguien aprende a programar, si le explicás a un amigo como cocinar un omelette, le decís que hacer paso por paso. Rompé dos huevos, prendé la hornalla, poné los huevos en una sartén, agregá sal, revolvé por 6 minutos. Es una solución intuitiva para resolver un problema simple.

Sin embargo, esto se vuelve complicado cuando el problema se vuelve más grande. Si tratás de explicar como cocinar una comida de tres platos, no pondrías todos los platos en una sola receta, si no que la dividirías en diferentes hojas y dejarías que el cocinero las haga una por una. Esto se puede lograr con funciones auxiliares, lo que nos lleva directamente a programación declarativa.

## Paradigma Declarativo

Programar declarativamente significa decirle a un programa **qué** querés, en vez de **como** lo querés. Si hiciéramos declarativamente esa comida de la que hablamos antes, haríamos algo así:

```js
const entrada = prepararEntrada()
const platoPrincipal = cocinarPlatoPrincipal()
const postre = hacerPostre()
serve(entrada, platoPrincipal, postre)
```

De esta forma, lo que queremos hacer es claro en cada momento.

Una cosa importante para notar acá es que, como dije en la introducción, la programación declarativa se puede mezclar (y en general se mezcla) con programación imperativa y otros paradigmas que veremos más adelante. De hecho, algunas de estas funciones pueden ser implementadas imperativamente, al fin y al cabo, esa **es** una solución intuitiva para un problema simple.

Hacer el código declarativo te ayuda a dividir problemas complejos en problemas más simples, algo que también es muy común en programación funcional.

## Programación Funcional (FP)

La idea de la programación funcional es declarar todo dentro de **funciones puras**, que se definen como funciones donde:

1. Nada por fuera de la función cambia cuando se la llama (a esto se lo denomina un **side effect**, o efecto colateral)
2. El valor que devuelve la función siempre es el mismo cuando la función se llama con los mismos parámetros

La primera regla puede parecer un poco rara para quienes nunca hayan escuchado de este estilo de codeo, pero es básicamente una medida para asegurar que las funciones no cambien variables externas inesperadamente por todo el programa.

Es bastante simple aplicar esto en muchos casos, pero algunas acciones se vuelven bastante difíciles, como lidiar con I/O (responder al teclado, por ejemplo) u otros eventos que requieren interactuar con hosts remotos. Esto lleva a [patrones de diseño extremadamente intrincados](<https://es.wikipedia.org/wiki/M%C3%B3nada_(programaci%C3%B3n_funcional)>) si tratás de mantener tu aplicación en estilo puramente funcional.

La segunda regla parece bastante simple, nuestra función `prepararEntrada()` siempre debería devolver la misma entrada. Podemos pasarle algunas variables si queremos otros resultados, por ejemplo `prepararEntrada("ensalada")` podría devolver siempre una ensalada mientras que `prepararEntrada("sopa")` siempre devolvería sopa.

Sin embargo se puede volver difícil cuando empezamos a lidiar con cosas como tiempo o valores aleatorios, ya que funciones como `Date.now()` o `Math.random()` no son funciones puras. Hay lenguajes como Haskell que tienen soluciones muy raras para este tipo de cosas, pero eso va más allá de este artículo.

Una parte común de un programa funcional se podría ver así:

```js
function createArrayFromZeroToN(n) {
  const emptyArray = Array.from({ length: n + 1 })
  const filledArray = emptyArray.map((element, index) => index)
  return filledArray
}
```

Estos dos métodos (`Array.from` y `[].map`) son funciones puras de por sí, no modifican nada afuera de la función y siempre devuelven lo mismo cuando se les pasa el mismo argumento.

Y más importante, la función que definimos **también es una función pura**. Devuelve un array como `[0,1,2...20]` cuando toma `20` como argumento, y nunca va a devolver otra cosa.

Esta es la ventaja del estilo funcional, compone funciones que resuelven problemas más pequeños para crear otras más grandes, siempre asegurandose que son determinísticas y que no causan efectos colaterales.

Sin embargo, a veces necesitamos definir estructuras con muchos efectos colaterales sin dejar de mantener una estructura. Ahora es cuando aparece el esperado patrón orientado a objetos.

## Programación Orientada a Objetos (OOP)

Este estilo de programación es uno de los más conocidos. Es una técnica que ya fue probada muchísimas veces. Sirve para manejar procesos complicados y da una estructura muy robusta, pero puede salirse de control si uno no es muy disciplinado y construye clases muy grandes.

Las dos herramientas principales de este paradigma son `clases` y `objetos`. Una clase define una estructura que puede tener un objeto, mientras que el objeto es una instancia de una clase específica. Con la sintáxis de ES6 de JavaScript, podemos construir clases de una forma muy similar a otros lenguajes:

```js
class Saludo {
  constructor(saludo) {
    this.saludo = saludo
  }

  saludar(persona) {
    console.log(`${this.saludo} ${persona}`)
  }
}

const saludoFormal = new Saludo("Buenas noches")
saludoFormal.saludar("Jorge") // Buenas noches Jorge

const saludoInformal = new Saludo("Qué onda")
saludoInformal.saludar("Jorgito") // Qué onda Jorgito
```

Acá podemos ver una clase con dos instancias diferentes. Esta es pequeña, pero las clases pueden, y en general tienen, muchos métodos y variables internas

Uno de los conceptos más importantes en OOP es la **herencia**, que significa que las clases pueden extender a otras clases para agregar más métodos específicos o propiedades.

Este ejemplo tiene una clase Perro que extiende a una clase Animal, entonces recibe todos sus métodos y propiedades. Incluso llama al constructor de su padre con un parámetro seteado usando `super`:

```js
class Animal {
  constructor(patas) {
    this.patas = patas
  }

  caminar() {
    console.log(`Estoy caminando con mis ${this.patas} patas!`)
  }
}

class Perro extends Animal {
  constructor() {
    super(4) // los perros tienen 4 patas
  }

  ladrar() {
    console.log("Guau guau!")
  }
}

const max = new Dog()
max.caminar() // Estoy caminando con mis 4 patas!
max.ladrar() // Guau guau!
```

Esta cadena de herencia puede ser bastante útil a veces, nos ayuda a no tener que definir métodos y variables iguales una y otra vez, pero es un arma de doble filo.

Como nuestro código se puede dividir en varias clases, puede ser complicado seguir lo que está haciendo una clase, o cuál es su propósito.

Hay varios patrones de diseño que se desarrollaron a lo largo de los años para crear orden a partir de las clases, algunos de ellos se detallan extensivamente en un [libro muy conocido que sobrevivió al paso del tiempo](https://en.wikipedia.org/wiki/Design_Patterns).

## Conclusión

Mi punto acá no era enseñarles sobre paradigmas de programación, si no mostrarles como se pueden mezclar para crear código sensible que aprovecha las fuerzas de cada parte.

Tus métodos de clase pueden ser puros o casi puros. Que no estemos programando funcionalmente no significa que no podamos intentar encapsular todo el código posible. Podés pensar en todas las propiedades de tu objeto como "parámetros" y definir tu método como una función pura con esas restricciones.

Si tu problema tiene muchas partes que se mueven e interactúan entre sí, está bien declarar una clase en un programa funcional.

OOP se considera un "subconjunto" de la programación imperativa, pero los métodos pueden ser bastante declarativos.

Así también, FP se considera un paradigma declarativo, pero está bien usar un estilo imperativo para definir funciones, incluso se pueden mantener puras. Después de todo, si al final tu función devuelve un array con 20 valores, a nadie le importa si lo hiciste con un for o con un map, esos son detalles de implementación. Mientras una función no tenga efectos colaterales y sea determinística, sigue siendo una función pura.

No es necesario restringirse a un estilo específico.
