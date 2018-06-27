# create-components-react


## Description

This module will create a react component folder in your current working directory.


## Set Up

`npm install -g create-components-react`


## Usages

Run `react-component <ComponentName>`. This will create a react component folder. This will include a `<ComponentName>.js`, `<ComponentName>.css`, and `index.js`. 



## examples

`react-component App` will create App component folder in your current working directory
    
    App
      |--- App.js
      |
      |--- App.css
      |
      |--- index.js

or

`react-component Nav/NavItem` will create a NavItem component folder in Nav folder

    Nav
    | -- NavItem
        |
        |--- NavItem.js
        |
        |--- NavItem.css
        |        
        |--- index.js


you can also chain components names `react-component <ComponentName> <ComponentName> <ComponentName>`

`react-component Nav/NavItem SideBar SideBar/SideBarItem` will create a NavItem component folder in Nav folder

    Nav
    | -- NavItem
    |  |
    |  |--- NavItem.js
    |  |
    |  |--- NavItem.css
    |  |        
    |  |--- index.js
    |
    sideBar
    |
    |-- SideBar.js
    |
    |--SideBar.css
    |
    |--index.js
    |
    | -- sideBarItem
        |
        |--- sideBarItem.js
        |
        |--- sideBarItem.css
        |        
        |--- index.js


## Tips

Create Components React assumes that you want all path to a component name and the component name itself first character to be capitail. If you input a component name or any paths that use lower case chars it will turn itself to a capatailized version. Examples: 

`app` will turn into `App`

`nav/navItem` will turn into `Nav/NavItem`


