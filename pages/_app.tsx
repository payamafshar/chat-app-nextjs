import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { PropsWithChildren, useState } from 'react'
import { User } from '../utils/types/types';
import { AuthContext,} from '../utils/context/AuthContext';

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  // socket: Socket;
};

function AppWithProviders({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) {
  return (
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
          {children}
      </AuthContext.Provider>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
  return( 
    <AppWithProviders user={user} setUser={setUser}>

      <Component {...pageProps} />
    </AppWithProviders>
  )
}

export default MyApp
