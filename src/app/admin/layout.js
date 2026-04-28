

'use client'
import React, { createContext, useEffect, useState } from 'react'
import useNetworkStatus from '../lib/useNetworkStatus';
import NoInternetConectionComponent from '../_components/NoInternetConectionComponent';
import '../../../public/assets/css/admin-stylesheet.css'
export const AppAdminContext = createContext();

export default function layout({ children }) {
    const { isOnline } = useNetworkStatus();
    return (
        <>
        {
                isOnline ?
                  <AppAdminContext.Provider 
                  value={{}}>
                        {children}
                  </AppAdminContext.Provider>
                  :
                  <NoInternetConectionComponent />
              }
        </>
    )
}