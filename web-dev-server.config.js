import { legacyPlugin } from '@web/dev-server-legacy';
import { fromRollup } from '@web/dev-server-rollup';
import rollupReplace from '@rollup/plugin-replace';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

// Replace process.env.NODE_ENV with string literal
const replacePlugin = fromRollup(
  rollupReplace({
    preventAssignment: true,
    values: {
      'process.env.NODE_ENV': JSON.stringify(
        mode === 'dev' ? 'development' : 'production'
      ),
    },
  })
);

export default {
  nodeResolve: { exportConditions: mode === 'dev' ? ['development'] : [] },
  appIndex: 'index.html',
  historyApiFallback: true,
  preserveSymlinks: true,
  plugins: [
    replacePlugin,
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
};
