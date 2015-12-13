# TemplateEngine

TemplateEngine is a web component templating framework that helps you build web applications using only your browser!

Demo: [http://agronkabashi.github.io/TemplateEngine/](http://agronkabashi.github.io/TemplateEngine/)

## How to Get Started

Download and install [NodeJS](http://nodejs.org/)

    $ npm install -g grunt-cli                                      // Install Grunt globally
    $ git clone https://github.com/AgronKabashi/TemplateEngine.git  // Clone the project and enter directory
    $ cd TemplateEngine
    $ npm install                                                   // Install dependencies
    $ grunt                                                         // Run the default task

## Build targets
    grunt build             // Pre-cleaning and compilation of js, sass and templates
    grunt release-build     // Same as build + minifcation and obfuscation
    grunt default           // Runs build target and hosts a webserver with live reload
    grunt release           // Runs build target and hosts a webserver
    grunt eslint            // Runs linting
    grunt test              // Run unit/e2e tests

## Creating your own components
Check the [Wiki](https://github.com/AgronKabashi/TemplateEngine/wiki) for details about how to create your own components.
