# create-components-react

## Description

This module will create a react component folder in your current working directory.

## Set Up

`npm install -g create-components-react`

## Usages

Run `react-component <ComponentName>`. This will create a react component folder. This will include a `<ComponentName>.js`, `<ComponentName>.css`, and `index.js`.

### examples

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

`react-component Nav/NavItem SideBar SideBar/SideBarItem`

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
    |-- SideBar.css
    |
    |-- index.js
    |
    | -- SideBarItem
        |
        |--- SideBarItem.js
        |
        |--- SideBarItem.css
        |
        |--- index.js

## Tips

Create Components React assumes that you want all paths to a component and the component's name first character to be uppercase. If you input a component name or any paths that use lowercase chars, this package will convert it to the uppercase version. Examples:

`app` will turn into `App`

`nav/navItem` will turn into `Nav/NavItem`

## Settings

create-components-react gives you the capability to make localized settings for each repo you wish to chose. These setting will change the behavior of how create-components-react functions. These settings would be like using the flags in the command line but it will be apply everytime a react component is made. It creates a `.ccr` folder with `settings.json` file inside it.

> Note: It is recommended to initailize the settings in your root directory

### Examples

Fist change into the directory that you wish to initailize local settings.

```

```
