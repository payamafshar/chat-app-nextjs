import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { PropsWithChildren, useState } from 'react'
import { User } from '../utils/types/types';
import { AuthContext,} from '../utils/context/AuthContext';
import { SocketContext, socket } from '../utils/context/SocketContext';
import {Socket} from 'socket.io-client'

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket;
};

function AppWithProviders({
  children,
  user,
  setUser,
  socket
}: PropsWithChildren & Props) {
  return (
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
        {children}
        </SocketContext.Provider>
          
      </AuthContext.Provider>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
  return( 
    <AppWithProviders user={user} setUser={setUser} socket={socket}>

      <Component {...pageProps} />
    </AppWithProviders>
  )
}

export default MyApp
