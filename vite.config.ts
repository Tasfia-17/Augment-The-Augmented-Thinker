import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      base: '/Augment-The-Augmented-Thinker/',
      plugins: [react()],
      define: {
        'process.env.YOU_API_KEY': JSON.stringify('ydc-sk-83473f0dddbfa19e-mwvhUpKHFdOExajpsDFUmtSjpuST33Xb-fb547221<__>1SNdEVETU8N2v5f4423OJIkd')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
