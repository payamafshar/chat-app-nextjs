import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { PropsWithChildren, useState } from 'react'
import { User } from '../utils/types/types';
import { AuthContext,} from '../utils/context/AuthContext';
import { SocketContext, socket } from '../utils/context/SocketContext';
import { Provider as ReduxProvider } from 'react-redux';
import {Socket} from 'socket.io-client'
import {store} from '../store/index'

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket;
  store:any
};

function AppWithProviders({
  children,
  user,
  setUser,
  socket,
  store
  
}: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
        {children}
        </SocketContext.Provider>
          
      </AuthContext.Provider>
      </ReduxProvider>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
  return( 
    <AppWithProviders user={user} setUser={setUser} socket={socket} store={store}>

      <Component {...pageProps} />
    </AppWithProviders>
  )
}

export default MyApp
