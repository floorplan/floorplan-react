# floorplan-react
The place to start for making a react component library.


### Hi!

This repo is a starting place for a react component library. Simply clone this. Change and/or add to the current components. Or remove them all.

### Getting Started.

```sh
git clone https://github.com/floorplan/floorplan-react.git
cd floorplan-react
```
(Optional) Remove existing components

```sh
rm -rf src
cd floorplan-react
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
We have created three props for you already by default that we suggest that you consider. The first is the children. Most of you components can take children and render them so make sure the think about it and use them appropriatly. Seccond is the className. The main win behind this systems is that the components come packaged with thier styles but make sure consumers of the componenent api can eaily pass their own className onto the component to add/overwrite styles as needed. The last one is component. It mostly makes sense for atoms. The idea is we want to leverage native html api as much as possible. so say you created a button but in a certian case it should be an `a` tag, you can pass `"a"` to the component prop and also pass the href tag and boom your but now is an `a` tag.
###### Styling
We include emotion for styling. You can remove it and use any option that you want. But we reccomend that you let webpack bundle the css up with the component. This allows the styles to be encapsulated with the component. You should not have to worry about clashing styles. Also you get he benefiet of sending less over the wire. the browser only has to worry about the css that the visible components need.

 
### Dependancies

The dependancies added are completely based on opinion. There are other ways to accomplish this but, these are some of the more popular tools in the industry. The main goal here is that if you run into problems you hopefully wont be the first one and can google for an answer.

### What's in here?

In here you will see the dev build tools, dev tools and frameworks. 

### Philosophy

Everything in here is based on atomic design. The component library will only consist of atoms, molecules, organisms, templates and pages.
