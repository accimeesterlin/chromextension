import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo({
  goFullScreen: true,
  text: 'some general information of this component goes here',
  inline: true,
  source: true,
  // Make a default for all stories in this book,
  inline: true, // where the components are inlined,
  header: true,
  styles: {
    header: {
      h1: {
        color: 'red', // and the headers of the sections are red.
      },
    }
    
  },
}));

addDecorator(withKnobs);

const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
