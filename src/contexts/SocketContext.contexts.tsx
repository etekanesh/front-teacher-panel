

import { createContext, useState, useCallback } from 'react'

import WebSocketManager from 'core/utils/WebSocketManager'

// type SocketManagers = Map<string, WebSocketManager>
// type SocketContextType = {
//     sockets: SocketManagers
//     getConnection: (endpoint: string) => WebSocketManager
//     releaseConnection: (endpoint: string) => void
// }

export const SocketContext = createContext<any>(null)

type Props = {
    children: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
    const [sockets, _setSockets] = useState<Map<string, WebSocketManager>>(new Map())

    const getConnection = useCallback((endpoint: string) => {

        if (sockets.has(endpoint)) {
            return sockets.get(endpoint)
        }

        let wsManager = new WebSocketManager(endpoint)
        sockets.set(endpoint, wsManager)
        return wsManager


    }, [sockets])

    const releaseConnection = useCallback((endpoint: string) => {
        if (sockets.has(endpoint)) {
            let wsManager = sockets.get(endpoint)
            if (wsManager && wsManager.is_connected()) {
                wsManager.disconnect()
            }
            sockets.delete(endpoint)
        }
    }, [sockets])



    return (
        <SocketContext.Provider value={{ sockets, getConnection, releaseConnection }}>
            {children}
        </SocketContext.Provider>
    )
}


