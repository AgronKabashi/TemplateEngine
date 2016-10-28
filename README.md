# TemplateEngine

TemplateEngine is a web component templating framework that helps you build web applications using only your browser! Include it in your projects to replace your editing tool or create something more awesome based on it.

Demo: [http://agronkabashi.github.io/TemplateEngine/](http://agronkabashi.github.io/TemplateEngine/)

#### Sizes

This includes markup and default components.

|                | Size (KB) | Gzipped (KB) |
|----------------|-----------|--------------|
| TemplateEngine |    25.2   |      8.4     |
| TemplateEditor |    58.1   |      14.6    |

#### Dependencies
- jQuery (TemplateEditor)
- jQuery UI (TemplateEditor)
- Custom lodash build
- AngularJS

## How to Get Started

Download and install [NodeJS](http://nodejs.org/)

    $ npm install -g grunt-cli                                      // Install Grunt globally
    $ git clone https://github.com/AgronKabashi/TemplateEngine.git  // Clone the project and enter directory
    $ cd TemplateEngine
    $ npm install                                                   // Install dependencies
    $ grunt                                                         // Run the default task

## Build targets
    grunt build             // Pre-cleaning and compilation of js, sass and templates
    grunt release-build     // Same as build + minification and obfuscation
    grunt default           // Runs build target and hosts a webserver with live reload
    grunt release           // Runs build target and hosts a webserver
    grunt eslint            // Runs linting
    grunt test              // Run unit/e2e tests

## Creating your own components
Check the [Wiki](https://github.com/AgronKabashi/TemplateEngine/wiki) for details about how to create your own components.
