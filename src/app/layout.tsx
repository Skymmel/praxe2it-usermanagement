import type {Metadata} from "next";
import "./globals.css";
import Header from "@/component/header/Header";
import React from "react";
export const metadata: Metadata = {
    title: "User Manager",
    description: "User Manager",
};
export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        <Header/>
        {children}
        </body>
        </html>
    );
}
