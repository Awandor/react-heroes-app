import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';

// import Adapter from 'enzyme-adapter-react-16'; // Necesitamos esperar a que salga la versión para React 17 e instalarla

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { createSerializer } from 'enzyme-to-json';

Enzyme.configure( { adapter: new Adapter() } );

expect.addSnapshotSerializer( createSerializer( { mode: 'deep' } ) );
