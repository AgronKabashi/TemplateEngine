"use strict";

module.exports = {
  options: {
    configFile: ".eslintrc",
    globals: ["window", "angular", "Cerberus", "setTimeout", "console", "namespace"]
  },
  target: ["src/TemplateEngine/**/*.js"]
};