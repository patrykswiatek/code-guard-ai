import { Server } from 'http'
import WebSocket from 'ws'

class WebSocketServer {
  public wss: WebSocket.Server
  public clients: Set<WebSocket>

  constructor(server: Server) {
    this.clients = new Set()
    this.wss = new WebSocket.Server({ server })

    this.wss.on('connection', (ws: WebSocket) => {
      this.clients.add(ws)
      ws.send('WebSocket connection established 🎉')

      ws.on('close', () => {
        this.clients.delete(ws)
      })

      ws.on('error', (error) => {
        console.error('WebSocket error:', error)
      })
    })
  }

  public sendToClient(message: string) {
    this.clients.forEach(({ readyState, send }) =>
      readyState === WebSocket.OPEN ? send(message) : null
    )
  }
}

export const webSocketServer = (server: Server) => new WebSocketServer(server)
