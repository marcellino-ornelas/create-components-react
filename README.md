# create-components-react

## Description

This module will create a react component folder in your current working directory.

## Install

`npm install -g create-components-react`

## Create

This will create a react component folder that will include a `<ComponentName>.js`, `<ComponentName>.css`, and `index.js`.

### Usages

`react-component create [flags] <ComponentName...>`.

### Flags

<table>
    <thead>
        <tr>
            <th>Flag</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c, --css-type <ext> </td>
            <td>css</td>
            <td>change extention for css file</td>
        </tr>
        <tr>
            <td>-t, --no-test</td>
            <td>fasle</td>
            <td>dont include a testing file for the component(s) you create</td>
        </tr>
        <tr>
            <td>-n, --no-css</td>
            <td>fasle</td>
            <td>dont include a css file for the component(s) you create</td>
        </tr>
        <tr>
            <td>-i, --no-index</td>
            <td>fasle</td>
            <td>dont include a index for the component(s) you create</td>
        </tr>
        <tr>
            <td>-d, --no-default</td>
            <td>fasle</td>
            <td>dont include any of the default styles for react. This is the same as saying <code>react-component create -i</code></td>
        </tr>
        <!-- impliment -->
        <!-- <tr>
            <td>-p, --packages</td>
            <td>default</td>
            <td>dont include any of the default styles for react. This is the same as saying <code>react-component create -i</code></td>
        </tr> -->
    </tbody>
</table>

### examples

`react-component create App` will create App component folder in your current working directory

    App
    |--- App.js
    |
    |--- App.css
    |
    |--- index.js

or

`react-component create Nav/NavItem` will create a NavItem component folder in Nav folder

    Nav
    | -- NavItem
        |
        |--- NavItem.js
        |
        |--- NavItem.css
        |
        |--- index.js

you can also chain components names `react-component <ComponentName> <ComponentName> <ComponentName>`

    react-component create Nav/NavItem SideBar SideBar/SideBarItem

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

### Tips

Create Components React assumes that you want all paths to a component and the component's name first character to be uppercase. If you input a component name or any paths that use lowercase chars, this package will convert it to the uppercase version. Examples:

`app` will turn into `App`

`nav/navItem` will turn into `Nav/NavItem`

## Settings

create-components-react gives you the capability to make localized settings for each repo you wish to chose. These setting will change the behavior of how create-components-react functions. These settings would be like using the flags in the command line but it will be apply everytime a react component is made.

### Usage

    react-components init [flags]

### Flags

-   `-t, --templates` Initialize create-components react to use templates functionality

> Note: It is recommended to initailize the settings in your repos root directory.

### Examples

Fist change into the directory that you wish to initailize local settings.

    cd some/path/to/repo

Initailize create-component-react settings

    react-component init

This will create a `.ccr` folder with `settings.json` file inside it.

> If `-t` flag is present it will also make a templates folder inside `.ccr` folder

## Templating

This feature allows a user to construct how of each file of a component should render within a repo. This gives the ability for a user to modify or add to the structure of a component and the files it should include.

> Note: create-compoents-react uses a templating engine to compile and render the files. More documentation on how to use the templating engine can be found [here](http://olado.github.io/doT/index.html)

### Usage

To initailize templating, you can use:

    react-component template

This will only make templating folder to use. you can initialize this with the settings command when initializing local settings. Just include the `-t` flag.

    react-component init -t

This will initialize local settings and local templating.

The doT templating language uses `{{}}` for inertoplation and javascript execution. Here are some basic uses of doT:

<!-- table>(thead>tr>th*3)+tbody>tr*3>td*3 -->
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Interpolation</td>
            <td>{{= someVariable }}</td>
            <td>Replace {{= }} with the value of the variable</td>
        </tr>
        <tr>
            <td>Conditionals</td>
            <td>
                {{? expression }}<br />
                    /* code here*/<br />
                {{?}}<br />
            </td>
            <td>Render the code between the braces when the expression evaluates to true</td>
        </tr>
        <!-- <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr> -->
    </tbody>
</table>

### Flags

No flags for Templating

### Examples

Open your terminal and go to the directory that you wish to use.

    cd path/to/repo\ Folder

Initialize Settings and Templates

    react-component init -t

This will create:

    Repo Folder
        | - .ccr
            | - templates
                | - component
                |   | - component.dot
                |
                | - index
                |   | - index.dot
                |
                | - style
                |   | - style.css.dot
                |
                | - settings.json

open `component/component.dot` and you should see something like this.

        import React, { Component } from 'react';
        {{? it.component.useCSS }}
        import './{{= it.component.name }}.css';
        {{?}}

        class {{= it.component.name}} extends Component {
          // constructor(props){
            // super(props);
            // this.state = {};
          // }

          // componentWillMount(){}
          // componentDidMount(){}
          // componentWillUnmount(){}

          // componentWillReceiveProps(){}
          // shouldComponentUpdate(){}
          // componentWillUpdate(){}
          // componentDidUpdate(){}

          render() {
            return (
              <div></div>
            );
          }
        }
        export default {{= it.component.name}};

> Note: All templates in the `.ccr/templates` folder are the default templates for create-components-react.

`component/component.dot` is the default template to make each component file. You now can edit this file to make it look like anything you want as long as you follow the rules of javascript and doT. After you update this file and save it you can now use the `create` command and each component created will now take on the new look of the template file you updated.

Example: edit `component/component.dot` to render a component that doesnt include any life cycle methods and always uses the constructor function. Now your file should look like this:

        import React, { Component } from 'react';
        {{? it.component.useCSS }}
        import './{{= it.component.name }}.css';
        {{?}}

        class {{= it.component.name}} extends Component {
          constructor(props){
            super(props);
            this.state = {};
          }

          render() {
            return (
              <div></div>
            );
          }
        }
        export default {{= it.component.name}};

Now when you execute `react-components create App` it should make a directory like this:

        Repo Folder
        | - .ccr
            | - ...
        | _ App
            | - App.js
            | - index.js
            | - style.css

This doesnt look to different than the default version right? Dont be disappointed to fast. Lets take a look at `App.js`. This file is create from the `component/component.dot` so if we have all our configurations right, it should now look like this:

    import React, { Component } from 'react';

    class App extends Component {
      constructor(props){
        super(props);
        this.state = {};
      }

      render() {
        return (
          <div></div>
        );
      }
    }
    export default App;

<!-- ## Create
CAC DSV
### Usage

### Flags

-   `d`

### Examples
 -->
