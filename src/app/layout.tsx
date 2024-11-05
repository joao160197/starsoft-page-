"use client";

import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Providers } from "./Providers";
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@/components/Redux/store";
import Cart from "@/components/Cart";
import LoadCartFromLocalStorage from '@/components/LoadCartFromLocalStorage';
import { Footer } from "@/components/Footer";


const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Providers>
              <Header />
              <Cart />
              <LoadCartFromLocalStorage />
              {children}
              <Footer/>
            </Providers>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
