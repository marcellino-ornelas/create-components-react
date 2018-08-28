/*
 * React plugin for Create Components React
*/

/*
 env will be a object of all the settings that create component uses.

 {
    "css": true,
    "cssType": "css",
    "templates": Boolean,
    
    // these booleans will be used to see which react files should be used
    "index": Boolean
    "test": Boolean
    "css": Boolean
    "default": Boolean
  }

*/
const DEFAULT_PACKAGES = ['index', 'style'];

const mapToPackages = {
  style: 'css',
  index: 'index'
};

module.exports = function(env) {
  packages =
    env['default'] === false
      ? []
      : DEFAULT_PACKAGES.filter(function(item) {
          return !mapToPackages[item] || env[mapToPackages[item]] === true;
        });

  // use functional if specified
  packages.push(env.functional ? 'functional' : 'component');

  return {
    packages: packages,
    process: [
      {
        match: /\.css$/,
        ext: env.cssType,
        name: function(data) {
          return data.component.name;
        }
      },
      {
        match: /^(component|functional)/,
        name: function(data) {
          // console.log(data.component.name);
          return data.component.name;
        }
      }
    ]
  };
};

// console.log([0, 1, 2, 3].filter(num => !num));
