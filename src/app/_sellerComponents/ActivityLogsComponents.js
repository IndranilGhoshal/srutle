import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'

export default function ActivityLogsComponents() {
    useEffect(()=>{
        hideLoader()
    },[])
  return (
    <div>ActivityLogsComponents</div>
  )
}
