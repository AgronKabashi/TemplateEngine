# TemplateEngine

TemplateEngine is a web component templating framework that helps you build web applications using only your browser!

Demo: [http://agronkabashi.github.io/TemplateEngine/](http://agronkabashi.github.io/TemplateEngine/)

## How to Get Started

### Step 1. Download and install [NodeJS](http://nodejs.org/)


### Step 2. Install Grunt globally
    $ npm install -g grunt-cli

### Step 3. Clone the project and enter directory
    $ git clone https://github.com/AgronKabashi/TemplateEngine.git && cd TemplateEngine

### Step 4. Install dependencies
    $ npm install

### Step 5. Run grunt
    $ grunt

## Build targets
    grunt build             // Pre-cleaning and compilation of js, sass and templates
    grunt release-build     // Same as build + minifcation and obfuscation
    grunt default           // Builds and hosts a webserver with live reload
    grunt release           // Build and hosts a webserver
    grunt eslint            // Runs linting
    grunt test              // Run unit/e2e tests

## Creating your own components
Check the [Wiki](wiki/Creating-Custom-Plugins) for details about how to create your own components.