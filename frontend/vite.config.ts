import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    define: {
      global: typeof window === 'undefined' ? {} : window,
      // VITE_API_URL: env.VITE_API_URL,
      // VITE_REGION: env.VITE_REGION,
      // VITE_BUCKET_NAME: env.VITE_BUCKET_NAME,
      // VITE_USER_POOL_ID: env.VITE_USER_POOL_ID,
      // VITE_IDENTITY_POOL_ID: env.VITE_IDENTITY_POOL_ID,
      // VITE_USER_POOL_CLIENT_ID: env.VITE_USER_POOL_CLIENT_ID,
    }
  }
})
