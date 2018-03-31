# floorplan-react
The place to start for making a react component library.


### Hi!

This repo is a starting place for a react component library. Simply clone this. Change and/or add to the current components. Or remove them all and start with a clean slate.

### Getting Started.

```sh
git clone https://github.com/floorplan/floorplan-react.git <my-component-library>
cd <my-component-library>
git remote set-url origin git@github.com:<USER_NAME>/<my-component-library>.git
```
(Optional) Remove existing components
> This will remove the `util` folder that includes the deprication warning function.
```sh
rm -rf src && mkdir src
```

### Adding a new Component
```
yarn add-component
```
It will ask for a name. It is recomended that you use KabobCase for the names of components. You will then be asked for the type of the component. If this is wrong you can easily move it later. For genral reference if you are simply styling a native html element choose atom. If you are mixing a few atoms and/or html elements choose molecule. If you are mixing atoms, html elements, and molecules choose organisms. Anything larger than that would be a page or a template. If you can generalize the content choose template. If it has a specific business purpose it whould propably be a page.

#### What just got created?
> We are going to use the example of Button and atom for this section.
```js
/src/atoms/Button.jsx
/src/atoms/Button.stories.jsx
/src/atoms/__tests__/Button.spec.jsx
```
##### Button.jsx
###### It is a Class
First of all it creates the component in a class form extending `React.Component` most components probably could be defined as a stateless function or as a `styled-component`, defined by css-in-js option. There are two man reasons for this the first is consistancy. Some components will need this level of complexity. So if everything follows a similar pattern it makes things easier. The seccond reason has to do with deprecation. If a component is ever deprecated or props on component become deprecated you will want to leverage life cycle hooks to warn users about the usage. We typically do it in the constructor. 
###### 3 Props to consider
> Please make sure to be careful and accuret with the props. They are used in the auto gen docs.

We have created three props for you already by default that we suggest that you consider. The first is the children. Most of you components can take children and render them so make sure the think about it and use them appropriatly. Seccond is the className. The main win behind this systems is that the components come packaged with thier styles but make sure consumers of the componenent api can easily pass their own className onto the component to add/overwrite styles as needed. The last one is component. It mostly makes sense for atoms. The idea is we want to leverage native html api as much as possible. So say you created a button but in a certian case it should be an `a` tag, you can pass `"a"` to the component prop and also pass the href tag and boom your but now is an `a` tag.

###### Styling
We include emotion for styling. You can remove it and use any option that you want. But we reccomend that you let webpack bundle the css up with the component. This allows the styles to be encapsulated with the component. You should not have to worry about clashing styles. Also you get he benefiet of sending less over the wire. The browser only has to worry about the css that the rendered components need at load time. We try to keep the styling in the same file as the component to help remove dead styles and code easier.

###### Code styling and linting
For this we simply chose to use the practices defined by create react app. We let prettier fix code on commit and eslint warn us of broken javascript.

##### Button.stories.jsx
This file is rendered by `storybook` and is a create environment for developing comonents in isolation. We have also included two addons. One is `info` it auto generates documentation to help other developers quickly see the api with out any help. One can also extend the documentation via mark down. The other addon we include is `knobs`. We have found it very helpful to lets developers easily play with the props to see the other states rather then make a story for all teh different states. 

> We used to use story shots but found that the combonation of `info` and `storyshots` is not very helpful.

##### Button.specs.jsx

This is the test file for the component. Most of the components can be validated against snap shots but we recomend making sure that component methods are also tested correctly. We use `enzyme` for this but feel free to checkout other options.

### Developing
After you add your new component you are read to start developing. 

#### Making Your Component
To start run `yarn start` this will start storybook at `localhost:6006`.
Open up `src/atoms/Buttons/Button.jsx` and start makeing changes to you component. When you save the dev environenment will refresh and you will be ready see you changes.

> We haver pruposely add "annoying" styles to the new component so you can see it and start changing it right away.

#### Testing
When you run yarn test, it will create a few snapshots using jest. So open `src/atoms/Button/__tests__/Button.spec.jsx` and edit and create some tests to use you props so that you have snap shots protecting the different layouts of the component.

> There is another type of testing that could be awesome. Take a peak at chromatic. It takes snapshots pictures of you components based on your stories. We have not included anything like this at this type but might in the future.

#### Deprecation
As you components mature props or even whole components might need to be deprecated. Take care to give others time to make adjustments before doing a major bump. Here is an example of how we handle it.

> Deprecation is a NOOP in production
```js
...
import { deprecationWarning } from '../../../utils/dev';
...
...
  constructor() {
    deprecationWarning({
      condition: !!props.onUserClick,
      message:
        'Button prop onUserClick is being deprecated in favor of native onClick',
    });
  }
...
```
Now if any one uses the `Button` with the old `onUserProp` they will be warned that the prop is being deprecated.

#### Devloping your components in context.
> We recomend only doing this after you have finished the component to do minor tweaks and validate the component. Your library will also need to have been published before.

Run `yarn watch` in the libary and run `yarn link <my-component-library>` and use your newly created components. You can also update the components and they will be rebuilt so that the changes can be reflected in the app that is using the linked library.


### Deploying

Run the command `npm version <major | minor | patch>` the library version updated will be updated. Then run `npm publish:npm`. Now your library is ready to be add/updated in the projects that use it. 


## Philosophy

Everything in here is based on atomic design. The component library will consist of atoms, molecules, organisms, templates and pages. There is also utils folder for helper functions.

### Dependancies

The dependancies added are completely based on opinion. There are other ways to accomplish this but, these are some of the more popular tools in the industry. The main goal here is that if you run into problems you hopefully wont be the first one and can google for an answer.

### Peer Dependancies

Peer dependancies can help shrink the bundle for the end user. For example if you and the consumer of the library are both using `anime.js`, then having it be a peer dependancie can help reduce the number of times the code is shipped to the end users. However this does force the consumer to use the same version you are using. We ran into this issue with `react-transition-group` We wanted to use the new version but since we did not bundle it witht he library it caused breaking changes for the consumers and we had to put a lot more effort into the migration. So there is a delicate balance to play here. If you do enfore peer dependancies make sure to update to the newest versions so the consuming apps can as well.

## Contibuting

Feel free to contribute example components that are generally useful and and updates to make this process easier for others. Also write your own guidlines for contributing if you have cloned/forked this repo.

 > We are intersted in establishing this pattern for other frameworks that storybook supports so please feel free to reach out and lets get a mono repo started to help out others.
