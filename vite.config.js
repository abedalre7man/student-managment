import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/student-managment/', // ضروري جدًا للنشر على GitHub Pages
  plugins: [react()],
});
