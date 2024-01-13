import {
  Box
} from '@mui/material'
import './globals.css'
// import { NextRequest } from 'next/server'
// import '../dist/output.css'

import { Inter } from 'next/font/google'
// import { Suspense } from 'react'
// import LoadingTb from './components/Loading'
import './../dist/style.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ТурбоБрокер',
  description: 'Виджет для amoCRM',
}

export default function RootLayout({ children }) {
  // request = new NextRequest();
  // console.log(request);
  // req

  // const current_session = session(request).all();
  // if (!current_session.user_id || current_session.account_id) {
  //     const { searchParams } = new URL(request.url);
  //     const token = searchParams.get('token');
  //     if (token) {

  //         const redis = new Redis({
  //             host: process.env.REDIS_HOST,
  //             port: process.env.REDIS_PORT,
  //             password: process.env.REDIS_PASS
  //         })
  //         const saved_token = JSON.parse( await redis.get(process.env.REDIS_AMO_TOKEN_PREFIX + token));
  //         console.log(saved_token);
  //     }

  // }


  return (
    <html lang="ru">
      <body id='root' className={inter.className}>
        {/* <StyledEngineProvider injectFirst> */}
        {/* <Suspense fallback={<LoadingTb />}> */}
          <Box className="bg-white pb-8">
            <Box className="
            
            pb-0 bg-third-bg sm:max-w-7xl mx-auto ">
              {children}
            </Box>
          </Box>
        {/* </Suspense> */}
        {/* </StyledEngineProvider> */}
      </body>
    </html>
  )
}
