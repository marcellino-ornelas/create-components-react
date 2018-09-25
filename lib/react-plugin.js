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
  const useDefault = env['default'];
  const useTest = useDefault && env['test'];

  let packages = [];

  if (useDefault) {
    packages = DEFAULT_PACKAGES.filter(function(item) {
      return !mapToPackages[item] || env[mapToPackages[item]] === true;
    });

    packages.push(env.functional ? 'functional' : 'component');

    if (useTest) {
      packages.push('test');
    }
  }

  return {
    packages: packages,
    process: [
      {
        match: /\.css$/,
        ext: function(packageData) {
          return env.cssType || packageData.file.ext;
        },
        name: function(packageData) {
          return packageData.component.name;
        }
      },
      {
        match: /\.test\.js$/,
        name: function(packageData) {
          return packageData.component.name;
        }
      },
      {
        match: /^(component|functional)/,
        name: function(packageData) {
          return packageData.component.name;
        }
      }
    ]
  };
};
