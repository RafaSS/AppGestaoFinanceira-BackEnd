import {defineConfig} from 'vitest/config';
import tsConfigpaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsConfigpaths()],

});