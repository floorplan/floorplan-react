import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

// Option defaults:
setOptions({
  name: 'Floorplan',
  url: '#',
  showAddonPanel: true,
  addonPanelInRight: true,
  sidebarAnimations: true,
});

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js.*$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
