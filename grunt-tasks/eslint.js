"use strict";

module.exports = {
  options: {
    configFile: ".eslintrc",
    globals: ["window", "angular", "Cerberus", "setTimeout", "console"]
  },
  target: ["src/TemplateEngine/Service/*.js"]
};