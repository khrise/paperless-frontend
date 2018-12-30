# PaperlessFrontend
A frontend to daniel quinn's great paperless ecosystem.
It would have been more appropriate to write the frontend in django. Too bad I don't know django, and after I started googling how to achieve the simplest things, I decided to use a stack I know.
That's how I ended up creating an [Angular](https://angular.io/) app using [Material components](https://material.angular.io/) and [Bootstrap](https://getbootstrap.com/).

The project is not yet production ready. However, don't judge it from the landing page. Since I'm tied to the REST API, it is not sooo easy to provide sneaky numbers as the django admin section does. Besides, I'm not a designer, therefore I kind of assimilated the look and feel of the django admin section.

You might wanna give it a try it on [github pages](https://khrise.github.io/paperless-frontend/). Please note that there is no hosted backend, you have to try it against your own paperless instance. To do so, you have to add 
`khrise.github.io` to `PAPERLESS_CORS_ALLOWED_HOSTS` in `paperless.conf`. Or simply checkout the project and run `ng serve` (in which case you're gonna have to add `localhost:4200` to the `PAPERLESS_CORS_ALLOWED_HOSTS`). 
Be aware that username and password are currently stored in localstorage. Each backend request is provided with a basic auth header. I had no time to determine a more elegant auth solution yet.




# Below is the default angular cli README
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
