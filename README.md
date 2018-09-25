# Create Components react

This module will create a react component folder in your current working directory.

### Install

`npm install -g create-components-react`

## Create

### Description

This will create a react component folder that will include a `<ComponentName>.js`, `<ComponentName>.css`, and `index.js`.

> Note: If the directory to the component doesnt exist, create-components-react will make it for you.

---

### Syntax

`react-component create [flags...] <ComponentName> [ComponentNames...]`

#### Parameters

`[flags...]` (optional) flags to change the behavior of create.

`ComponentName` (required) Name of the component you would like to create.

`[ComponentName...]` (optional)

---

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
            <td>Change extension for css file</td>
        </tr>
        <tr>
            <td>-s, --no-css</td>
            <td>false</td>
            <td>Don't include a css file for the component(s) you create</td>
        </tr>
        <tr>
            <td>-i, --no-index</td>
            <td>false</td>
            <td>Don't include a index file for the component(s) you create</td>
        </tr>
        <tr>
            <td>-d, --no-default</td>
            <td>false</td>
            <td>Don't include any of the default packages for react. This is the same as saying <code>react-component create -i</code></td>
        </tr> 
        <tr>
            <td>-t, --test</td>
            <td>false</td>
            <td>Include a test file for the component(s) you create</td>
        </tr>        
        <tr>
            <td>-r, --extend-cwd <path></td>
            <td></td>
            <td>Path to extend your current working directory path</td>
        </tr>
    </tbody>
</table>

---

### Examples

`react-component create App` will create an App component folder in your current working directory

    App/
    |--- App.js
    |
    |--- App.css
    |
    |--- index.js

If you would like a component to be a child of another component put a path to the folder of the parent component first followed by the child component after. `react-component create <ParentFolder>/<ChildComponent>` will create a child component in the parent folder.

`react-component create Nav/NavItem` will create a NavItem component inside the nav folder.

    Nav/
    | -- NavItem/
        |
        |--- NavItem.js
        |
        |--- NavItem.css
        |
        |--- index.js

If Nav was a component already then it would look like this.

    Nav/
    |--- index.js
    |--- Nav.js
    |--- Nav.css
    |
    | -- NavItem/
        |
        |--- NavItem.js
        |
        |--- NavItem.css
        |
        |--- index.js

> Note: Parent folder(s) will be created if they dont exist. This will not make the parent folder a component.

You can also chain components names `react-component <ComponentName> <ComponentName> <ComponentName>`

    react-component create Nav/NavItem SideBar SideBar/SideBarItem

    Nav/
    | -- NavItem/
    |  |
    |  |--- NavItem.js
    |  |
    |  |--- NavItem.css
    |  |
    |  |--- index.js
    |
    sideBar/
    |
    |-- SideBar.js
    |
    |-- SideBar.css
    |
    |-- index.js
    |
    | -- SideBarItem/
        |
        |--- SideBarItem.js
        |
        |--- SideBarItem.css
        |
        |--- index.js

---

### Tips

create-components-react assumes that you want the first character of all paths to a component and the component's name to be uppercase. If you input a component name or any paths that use lowercase chars, this package will convert it to the uppercase version. Examples:

    react-component create app

`app` will turn into `App`

    react-component create nav/navItem

`nav/navItem` will turn into `Nav/NavItem`

## Settings

### Description

create-components-react gives you the capability to make localized settings for each repo you wish to chose. These setting will change the behavior of how create-components-react functions. These settings would be like using the flags in the command line but it will be applied every time a react component is made.

> Note: It is recommended to initailize the settings in your repos root directory.

---

### Syntax

    react-components init [flags...]

---

#### Parameters

`[flags...]` (optional) flags to change the behavior of init.

---

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
            <td>-t, --templates <ext> </td>
            <td>false</td>
            <td>Initialize create-components react to use templates functionality</td>
        </tr>
    </tbody>
</table>

---

### Examples

First navigate into the directory that you wish to initailize local settings.

    cd some/path/to/repo

Initailize create-component-react settings

    react-component init

This will create a `.ccr/` folder with `settings.json` file inside it.

> Note: If `-t` flag is present it will also make a `templates/` folder inside `.ccr/` folder

#### Setting options

<table id="setting-options">
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>css</td>
            <td>Boolean</td>
            <td>true</td>
            <td>Include a css file for the component(s) you create</td>
        </tr>
        <tr>
            <td>index</td>
            <td>Boolean</td>
            <td>true</td>
            <td>Include a index file for the component(s) you create</td>
        </tr>
        <tr>
            <td>default</td>
            <td>Boolean</td>
            <td>true</td>
            <td>Include  default packages for react</td>
        </tr>
        <tr>
            <td>test</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Include a testing file for the component(s) you create</td>
        </tr>
        <tr>
            <td>verbose</td>
            <td>Boolean</td>
            <td>false</td>
            <td>log progress while creating components</td>
        </tr>
        <tr>
            <td>templates</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Use local templates instead of defaults</td>
        </tr>
        <tr>
            <td>cssType</td>
            <td>String</td>
            <td></td>
            <td>Change extension for css file</td>
        </tr>       
        <tr>
            <td>extendCwd</td>
            <td>String</td>
            <td></td>
            <td>Path to extend your current working directory</td>
        </tr>
    </tbody>
</table>

## Templating

### Description

This feature allows a user to construct how of each file of a component should render within a repo. This gives the ability for a user to modify or add to the structure of a component and the files it should include.

> Note: create-components-react uses a templating engine to compile and render the files. More documentation on how to use the templating engine can be found [here](http://olado.github.io/doT/index.html)

### Syntax

`react-component template`

### Parameters

None

---

### Flags

No flags for Templating

### Examples

To initailize templating, you can use:

    react-component template

This will only make templating folder to use. You still would need set the `templates` property in your `.ccr/settings.json` to true.

    {
        ...
        templates: true,
        ...
    }

This feature still relays on your local settings to work. It is recommended to initalize templates usage when initailizing settings. This feature is mostly here for those who have a old repo with create-components-react local settings already initailized and want to add templating.

This is the recommended way to initailze templates if you don't have local settings initialized.

    react-component init -t

This will initialize local settings and local templating.

---

### doT

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
            <td>{{= expression }}</td>
            <td>Replaces {{= expression }} with the value of the expression</td>
        </tr>
        <tr>
            <td>Conditionals</td>
            <td>
                {{? condition }}<br />
                    /* code here*/<br />
                {{?}}<br />
            </td>
            <td>Render the code between the braces when the condition evaluates to true</td>
        </tr>
    </tbody>
</table>

---

### Packages

    | - templates/
        | - component/
        |   | - component.dot
        |
        | - index/
        |   | - index.dot
        |
        | - functional/
        |   | - functional.dot
        |
        | - style/
        |   | - style.css.dot
        |
        | - test/
        |   | - test.test.js.dot
        |
        | - settings.json

Lets give you some basic info on how templating works. When you initialize templating in create-components-react, every folder that is a direct child of `.ccr/templates/` are called packages. Create-components-react uses the content of these folders to render your component. The default packages for react are `index, component, style` these will be include everytime you create a component structure unless you specify in the local settings or command-line that you would not like to include these packages.

You also are allowed to add your own packages to use throughout the repo. These packages can have directories and/or dot files for rendering inside. each directory( even nested ones!) and all files will be made to the destination. To add custom packages create a new folder inside `.ccr/templates`. The name of the folder will be the package name. Inside your custom package folder create a file(s) and/or directory(s). Each file inside that you would like to have rendered with templating should include a `.dot` extention at the end of the file.
If the only extention to your file is a `.dot` extention then will be rendered as a `.js` file. If you would like to have another type of extention include it before the `.dot` extention.

Example to create a css file: `someFileName.css.dot`

> Note: The `-c` flag in create will replace the extention for all `.css` files. If you want all your css files from `css` to `sass` or `less` files change it with the `-c` flag or change it in the `settings.json` file under `cssType`.

To use custom packages use the `-p` flag while creating a component. The `-p` or `--packages` flag takes a colon separated list of package names.

Example:

    react-component create -p storage:view:container App

This command will Create App with a custom storage, view, and container package included.

<br>

> Review Create flags section for a full list of all flags.

---

### Examples

Open your terminal and go to the directory that you wish to use.

    cd path/to/repoFolder/

Initialize Settings and Templates

    react-component init -t

or this if you have settings already initialized.

    react-component template

This will create:

    RepoFolder/
    | - .ccr/
        | - templates/
            | - component/
            |   | - component.dot
            |
            | - index/
            |   | - index.dot
            |
            | - functional/
            |   | - functional.dot
            |
            | - style/
            |   | - style.css.dot
            |
            | - test/
            |   | - test.test.js.dot
            |
            | - settings.json

open `component/component.dot` and you should see something like this.

    import React, { Component } from 'react';
    {{? it.settings.css }}
    import './{{= it.component.name }}.{{= it.settings.cssType}}';
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

`component/component.dot` is the default template to make each component file. You can edit this file to make it look like anything you want as long as you follow the rules of javascript and doT. After you update this file and save it you can use the `create` command and each component created will take on the look of the template file you updated.

There is some special syntax on this file that doesnt look familiar.

    {{? it.settings.css }}
    import './{{= it.component.name }}.{{= it.settings.cssType}}';
    {{?}}

or

    {{= it.component.name}}

This is doT snytax. The first example is a example of a conditional in doT and the second one is interpolation. I recommend to review the doT documentation <a href="http://olado.github.io/doT/index.html" target="_blank">here</a> to see how to use this correctly this templating engine. The next thing that is unfamiliar is:

      it.component.name

Every file that gets rendered we give you configuration and enviroment settings to let you customize your files anyway you would like.

The top level element is always `it`.

There are three main variables that will be important for you to use. The three are:

-   [File](#env-options-file) -> `it.file`
-   [Component](#env-options-component) -> `it.component`
-   [Settings](#setting-options) -> `it.settings`

Here are all the possible env options you have

#### File

usage:

    it.file

propertys:

<table id="env-options-file">
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>String</td>
            <td>Original name of the current file you are rendering</td>
        </tr>
        <tr>
            <td>path</td>
            <td>String</td>
            <td>Directory path where the current file will be saved to</td>
        </tr>
        <tr>
            <td>ext</td>
            <td>String</td>
            <td>Extentiom type for the current file(no dot included)</td>
        </tr>
    </tbody>
</table>

#### Component

usage:

    it.component

propertys:

<table id="env-options-component">
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>String</td>
            <td>Name of the Component we are generating</td>
        </tr>
        <tr>
            <td>dir</td>
            <td>String</td>
            <td>Directory path where the current file will be saved to</td>
        </tr>
    </tbody>
</table>

#### Setting

usage:

    it.settings

propertys:

The properties here are the same as the ones you can use in [settings options section](#setting-options)

Example: Edit `component/component.dot` to render a component that doesn't include any react lifecycle methods always uses the constructor function. Now your file should look like this:

    import React, { Component } from 'react';
    {{? it.settings.css }}
    import './{{= it.component.name }}.{{= it.settings.cssType}}';
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

    Repo Folder/
    | - .ccr/
    |   | - ...
    |
    | _ App/
        | - App.js
        | - index.js
        | - App.css

This doesn't look to different than the default version right? Don't be disappointed too quickly. Let's take a look at `App.js`. This file is created from the `component/component.dot` so if we have all our configurations right, it should now look like this:

    import React, { Component } from 'react';
    import './App.css';

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

This is the code we have just editted in `.ccr/templates/component/component.dot`. You can edit to file however you want to fit your needs while developing with react.

To add your own custom packages. Create a folder inside the `templates/` folder. The name can be anything you want but its important to remember that this name is what the package is gonna be called.

In this example we are going to create a `storage` package that will help us create a mobx store. Create A folder called `storage`. Next create a file called `storage.dot`.

    RepoFolder/
    | - .ccr/
        | - templates/
            | - component/
            | - index/
            | - functional/
            | - style/
            | - test/
            |
            | - storage/
            |   |- storage.dot
            |
            | - settings.json

Inside of `storage/storage.dot` add the following code.

    const

To create a component with our additional package. Execute this line in your command line.

    react-component create -p storage App

This will create:

    App/
    |
    | - App.js
    | - App.css
    | - index.js
    | - storage.js

<!-- ## Create
CAC DSV
### Usage

### Flags

-   `d`

### Examples
 -->
