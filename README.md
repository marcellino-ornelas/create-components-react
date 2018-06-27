# create-components-react

## Description
This module will create a react component folder. This will include a `<componentName>.js`, `<componentName>.css`, and <`index.js`. 

## Set Up
`npm install -g create-components-react`

## Usages
Change your directory into a react project and run `react-component <ComponentName>`. This will make a js and css file in your current working directory.


## examples

`react-component App`
will create App component folder in your current working directory
    
    App
      |--- App.js
      |
      |--- App.css
      |
      |--- index.js

or

`react-component Nav/NavItem`
will create a NavItem component folder in Nav folder

    Nav
    | -- NavItem
      |--- NavItem.js
      |
      |--- NavItem.css
      |        
      |--- index.js


you can also chain components names
`react-component <ComponentName> <ComponentName> <ComponentName>`


## Tips

Create Components React assumes that you want all path to a component name and the component name itself first character to be capitail. If you input a component name or any paths that use lower case chars it will turn itself to a capatailized version. Examples: 

`app` will turn into `App`

`nav/navItem` will turn into `Nav/NavItem`


