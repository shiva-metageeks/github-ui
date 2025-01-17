"use client"
import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  arbitrumSepolia
} from 'wagmi/chains';


const RainbowProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <RainbowKitProvider theme={darkTheme()}>
        {children}
    </RainbowKitProvider>
  )
}
export const wagmiConfig = getDefaultConfig({
    appName: 'ClusterProtocol',
    projectId: '8e449bb8e55b689e613c2168cf2a66da',
    chains: [arbitrumSepolia],
    ssr: true, 
  });
export default RainbowProvider