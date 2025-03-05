# JoinUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Create Environments

To create different environments for your Angular application, follow these steps:

1. Navigate to the `src` directory.
2. Run `ng g environments`.
3. Navigate to the `src/environments` directory.
4. Define the environment configuration in the new file. For example:
   ```typescript
   export const environment = {
     production: false,
     API_URL: "http://localhost:8080/",
   };
   ```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
