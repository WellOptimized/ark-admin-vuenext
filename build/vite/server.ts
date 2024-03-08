import type { ServerOptions, PreviewOptions } from 'vite'

export function createServerOptions(env: ViteEnv): ServerOptions {
  const { VITE_PORT, VITE_PROXY_API_TARGET,VITE_APP_TITLE } = env
  console.log(VITE_PROXY_API_TARGET)
  console.log(VITE_PORT)
  console.log(VITE_APP_TITLE)
  return {
    host: true,
    open: true,
    port: VITE_PORT,
    proxy: {
      '/api': {
        target: VITE_PROXY_API_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  }
}

export function createPreviewOptions(env: ViteEnv): PreviewOptions {
  const { VITE_PORT, VITE_PROXY_API_TARGET,VITE_APP_TITLE } = env
  console.log(VITE_PROXY_API_TARGET)
  console.log(VITE_PORT)
  console.log(VITE_APP_TITLE)
  return {
    host: true,
    open: true,
    port: VITE_PORT + 1,
    proxy: {
      '/api': {
        target: VITE_PROXY_API_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
}
