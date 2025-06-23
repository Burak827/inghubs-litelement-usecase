/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { legacyPlugin } from '@web/dev-server-legacy';
import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}
const replace = fromRollup(rollupReplace);

export default {
  nodeResolve: { exportConditions: mode === 'dev' ? ['development'] : [] },
  appIndex: 'index.html',
  historyApiFallback: true,
  preserveSymlinks: true,
  plugins: [
    replace({
      "preventAssignment": true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    legacyPlugin({
      polyfills: {
        webcomponents: false,
      },
    }),
  ],
};
