
export default {
  API_URL: process.env.DJANGO_API_URL || 'http://0.0.0.0:8001/api',
  WS_URL: process.env.DJANGO_WS_URL || 'ws://0.0.0.0:8001/ws'
}
