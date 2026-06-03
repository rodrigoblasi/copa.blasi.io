import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://copa.blasi.io',
  output: 'static',
  build: {
    format: 'directory'
  }
});
