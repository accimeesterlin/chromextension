import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

<<<<<<< HEAD
addDecorator(withInfo({
  goFullScreen: true,
  text: 'some general information of this component goes here',
=======
addDecorator(withKnobs);
addDecorator(withInfo({
  goFullScreen: true,
>>>>>>> master
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

<<<<<<< HEAD
addDecorator(withKnobs);

const req = require.context('../src/components', true, /\.stories\.js$/);
=======
const req = require.context('../src', true, /.stories.js$/);
>>>>>>> master

function loadStories() {
  req.keys().forEach(filename => req(filename));
}
<<<<<<< HEAD

=======
>>>>>>> master
configure(loadStories, module);
