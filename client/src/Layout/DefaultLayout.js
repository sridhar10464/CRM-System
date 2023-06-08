import React from 'react'
import { Header } from './partial/Header'
import { Footer } from './partial/Footer'

export const DefaultLayout = ({children}) => {
  return (
    <div className='default-layout'>
       <header className='header mb-2'>
       <Header />
       </header>
        
       <main className='main'>
       {children}
       </main> 
       
       <footer className='footer'>
       <Footer />
       </footer>
    </div>
  )
}
