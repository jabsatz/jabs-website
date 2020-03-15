---
title: Programming Paradigms
date: "2020-03-15T01:43:00.169Z"
description: Making sense of coding paradigms. Written in beginner-oriented language
---

In one of my first interviews I received a question that has been stuck in my head for a long time.

> Is JavaScript an object-oriented language? Yes/No.

This was a take-home interview, and that was one of the less important points, so like many other self-taught programmers I did what I always do: googling the answer. After a couple of minutes I got an almost unanimous "Yes", so I wrote that and continued with the rest of the questions.

Having at the time little experience with other languages, I didn't think much of what the question meant or the answer was. It seemed like pretty much a textbook answer.

But during the next couple of years I would once in a while remember that question and feel that it was kind of odd. With the benefit of hindsight and experience, I realized that it is a very **misleading** question to ask a beginner.

If I had to formulate what I think is the right question, I'd go with something like:

> Does JavaScript support object-oriented features?

Because, like many other high concepts in programming, paradigms are often paraphrased to the point where their nomenclature becomes unclear and confusing.

Asking wether JavaScript is object-oriented feels like asking if cooking is oven-oriented.

Sure, you can use the oven to cook a _lot_ of things, but you can also cook without an oven, and for some things it would actually be the right thing to do (although I never tried a baked salad).

I want to talk about what some different paradigms are, and why I don't think that languages are **oriented** towards a certain style, but rather that they **support** different styles.

**The point of this article is not to teach you all the different paradigms.**

During this whole read, the thing I want you to keep in mind the most is that **you can mix and match these practices**.

## Imperative Paradigm

Unless you're coding in a very weird language like Haskell, chances are the first thing you learned is **imperative programming**. This style of coding consists of telling a program exactly what to do, step by step, as if it's following a recipe. Create an array, set i = 0, add it to the array, increase i by one, repeat until i reaches 20:

```js
let array = []
for (let i = 0; i < 20; i++) {
  array.push(i)
}
```

This is easy for starters, if you're trying to explain to a friend how you cook an omelette you tell them what to do step by step. Break two eggs, turn on the stove, put the eggs in a pan, add salt, stirr ocasionally for 6 minutes. It is an intuitive solution to solve a simple problem.

However, this becomes an issue when a problem becomes bigger. If you have to explain how to cook a three course meal, you wouldn't put all the dishes in one recipe, you would split it between several different sheets and let the cook do these tasks one by one. You can accomplish this by using auxiliary functions in most languages, which leads us nicely into declarative programming.

## Declarative Paradigm

Programming declaratively means telling a program **what** you want, instead of **how** you want it. If we were to make that delicious three course meal we talked about before declaratively, we would do something like this:

```js
const entree = prepareEntree()
const mainDish = cookMainDish()
const dessert = makeDessert()
serve(entree, mainDish, dessert)
```

This makes it clear what we want to do at each moment.

One important thing to note here, as I said in the intro, is that declarative programming can and often times will be mixed together with imperative programming and other paradigms will see later. In fact, some of these functions could be implemented imperatively, after all it **is** an intuitive solution for a simple problem.

Making declarative code helps you break problems into simpler ones, which also mingles pretty well with functional programing

## Functional Programming (FP)

Functional programming is a very _strict_ way of coding. The idea is to declare everything in **pure functions**, which are described as functions where:

1. Nothing from outside the function is changed when it is called (this is denominated a **side effect**)
2. The returned value is always the same when the the same input is passed

The first rule can be a bit weird to those who have never heard of this style of coding, but it's basically a measure to ensure that our functions don't ripple through the whole program creating unexpected variable changes.

It's simple enough to apply this in most cases, but certain actions become quite hard, like dealing with I/O or other external events that require interacting with remote hosts, for example. This leads to [extremely intrincated design patterns](<https://en.wikipedia.org/wiki/Monad_(functional_programming)>) if you're trying to keep your program as a purely functional application.

The second rule seems pretty simple, our function `prepareEntree()` should always return the same entree. We could pass it some variables if we wanted to get different results sometimes, for example `prepareEntree("salad")` would always return a salad while `prepareEntree("soup")` would always return soup.

However it can get hard when we start dealing with things like time or random values, since `Date.now()` or `Math.random()` are not pure functions. There are some purely functional languages like Haskell that make some pretty weird solutions to this, but it is beyond the scope of this article.

A common part of a functional program could look like this:

```js
function createArrayFromZeroToN(n) {
  const emptyArray = Array.from({ length: n + 1 })
  const filledArray = emptyArray.map((element, index) => index)
  return filledArray
}
```

This two methods (`Array.from` and `[].map`) are pure functions in and of themselves, they don't modify anything from the outside and always return the same thing when taking the same input.

Furthermore, our defined function is also a pure function. It returns an array like `[0,1,2...20]` when taking `20` as an argument, and will never return anything else.

This is the advantage of the functional style, it composes smaller problem-solving functions into bigger ones, every time making sure that they're deterministic and don't have unexpected side effects.

However sometimes we need to define structures with a lot of side effects, while keeping a structure. This is when the much-awaited object-oriented pattern arises.

## Object-Oriented Programming (OOP)

This style of programming is one of the most well-known out there. It's a tried and tested way to handle complicated processes and gives a very robust structure, however it can get out of hand if one isn't disciplined with it and builds very large classes.

The two main building blocks of this paradigm are `classes` and `objects`. A class defines a structure an object can take, while an object is an instance of a specific class. With the ES6 syntax for JavaScript, we can make classes in a very similar way as you would see other languages do:

```js
class Greeting {
  constructor(greeting) {
    this.greeting = greeting
  }

  greet(person) {
    console.log(`${this.greeting} ${person}`)
  }
}

const formalGreeting = new Greeting("Evening")
formalGreeting.greet("John") // Evening John

const informalGreeting = new Greeting("Heya")
informalGreeting.greet("Johnny") // Heya Johnny
```

Here we can see a class with two different instances. This is a small one, but classes can (and usually do) have a lot of methods and internal variables.

One of the most important concepts in OOP is **inheritance**, which means that classes can extend others to add more specific methods or properties.

This example has a Dog class that extends an Animal class, so it receives all of it's parent's methods and properties. It even calls the previous constructor with a set parameter using `super`:

```js
class Animal {
  constructor(legs) {
    this.legs = legs
  }

  walk() {
    console.log(`I'm walking with my ${this.legs} legs!`)
  }
}

class Dog extends Animal {
  constructor() {
    super(4) // dogs have four legs
  }

  bark() {
    console.log("Bark bark!")
  }
}

const max = new Dog()
max.walk() // I'm walking with my 4 legs!
max.bark() // Bark bark!
```

This inheritance chain is pretty useful sometimes, it saves us the trouble of defining methods and variables again, but this is a double-edged sword.

Since our code can be split in several classes, it can be hard to follow what a class can do, or what it's purpose is.

There are several design patterns that have been developed over the years to create order out of classes, some of which have been extensively detailed in a [very well-known book that has stood the test of time](https://en.wikipedia.org/wiki/Design_Patterns).

## Conclusion

My point here was not to teach about programming paradigms, but rather to show how they can be mixed and matched together to create sensible code that takes the strengths of each one.

Your class methods can be pure or semi-pure. Not being purely functional doesn't mean we can try to encapsulate as much code as possible. You can think of all your object's properties as "parameters" and define your method as a pure function within those constraints.

If your problem has a lot of moving parts interacting with each other, it's okay to declare a class within an otherwise functional program.

OOP is often considered as a "subset" of imperative programming, but methods can be pretty declarative.

Likewise, FP is considered a declarative paradigm, but it's okay to use an imperative style within the constraints of an otherwise pure function. As long as the function doesn't have side effects and is deterministic, it's still for all intents and purposes a pure function.

It's not necessary to confine yourself to a specific style.
