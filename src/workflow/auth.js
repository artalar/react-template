import * as React from 'react';

import { contextFactory } from 'service/contextFactory';

export const { connect, Provider } = contextFactory(
  'auth',
  class extends React.Component {
    state = { permissions: [] };
  }
);
