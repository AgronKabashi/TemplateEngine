# TemplateEngine

TemplateEngine is a powerful web component templating framework that helps you build web applications using only your browser! 

Demo: [http://agronkabashi.github.io/TemplateEngine/](http://agronkabashi.github.io/TemplateEngine/)

###Related Projects
- __[TemplateEngine.Backend](https://github.com/AgronKabashi/TemplateEngine.Backend) -__ A complementing library that provides the model and services  needed for using and storing templates on the server side.  
- __[SimpleCMS](https://github.com/AgronKabashi/SimpleCMS) -__ A client-based application builder with user, template and content management features utilizing TemplateEngine.  
- __[[SimpleCMS.API]] -__ An optional backend service for SimpleCMS.   

## How to Get Started

### Step 1. Install [NodeJS](http://nodejs.org/)   

To start checking this project out you first need to have NodeJS installed, preferably the latest package. It is advisable to install it from the website instead of a package manager as the latter usually takes a while to catch up. So [download it and install it if you haven't](http://nodejs.org/).

### Step 2. Install [Grunt](http://gruntjs.com/)

Second step is to install grunt globally if you haven't already. Grunt is a task runner written in NodeJS, that has tons of plugins, and can be installed easily through NodeJS's package manager called `npm`:

    $ npm install -g grunt-cli
 
### Step 3. Clone the project

You can get this source code by cloning the project from github, like this:

    $ cd to/your/project/directory
    $ git clone https://github.com/AgronKabashi/TemplateEngine.git

### Step 4. Install dependencies

When you're done cloning, install the project dependencies with `npm`, like this:

    $ npm install

### Step 5. Run

Running Grunt will build, start a webserver and watch the source files for changes.

    $ grunt
