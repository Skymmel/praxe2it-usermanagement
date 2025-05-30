'use client'
import "./globals.css";
import Header from "@/component/header/Header";
import React from "react";
import {SessionProvider} from "next-auth/react";
import { Session } from 'next-auth'

interface Props {
    session: Session | null
    children: React.ReactNode
}

const RootLayout: React.FC <Props> = ({ children, session } ) => {
    return (
    <html lang="en">
      <body>
      <SessionProvider session={session}>
          <Header/>
          {children}
      </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout