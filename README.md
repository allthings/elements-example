# Elements Examples

This is a set of very basic example microapps build with [@allthings/elements](https://github.com/allthings/elements)

> Are you looking for elements documentation? [You can find it here](https://developers.allthings.me/elements/).

## Running the examples

Clone the project using git

`git clone git@github.com:allthings/elements-example.git`

`cd <example>` and check the README.md

## Deployment

### Heroku

Automatically deploy an example to heroku. Keep in mind you need the Heroku CLI
Toolbelt installed.

```
heroku create
git subtree push --prefix <example> heroku master
heroku open
```

## Included Examples

### Simple ToDo-App

A very simple ToDo Microapp
[Check it out](simple-todo-app/).

### Extended ToDo-App

A more complex ToDo Microapp
[Check it out](extended-todo-app/).

### Horizontal View

A minimalistic example to showcase the HorizontalRouter behaviour
[Check it out](horizontal-view/).

### Two Column Responsive Layout

A minimalistic example to showcase a mix of Responsive Layouts combined with
the HorizontalRouter behaviour.
[Check it out](two-column-responsive-layout/).
