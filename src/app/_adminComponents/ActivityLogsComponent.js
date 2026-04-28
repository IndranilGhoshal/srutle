'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, showLoader } from '../lib/common'
import ActivityLogsList from './_list/ActivityLogsList'
import { adminactivitylogApi } from '../lib/apiService'

export default function ActivityLogsComponent() {
  const [list, setlist] = useState(undefined)


  const [limit, setlimit] = useState('10')
  const [offset, setoffset] = useState('0')
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')

  const [listlength, setListlength] = useState('0')

  useEffect(() => {
    getData(search, limit, offset)
  }, [search, limit, offset])

  const getData = async (r, l, s) => {
    showLoader()
    let data = { search: r, limit: l, skip: s, id: getLocalStorageData('admin')?._id, list: true }
    let response = await adminactivitylogApi(data)
    if (response.success) {
      hideLoader()
      setListlength(response.listlength)
      let totalPage = Math.ceil(response.listlength / limit);
      setPage(totalPage);
      setlist(response.result)
    } else {
      hideLoader()
      setlist([])
      setPage(0)
    }
  }

  const handleChangePage = (e, val) => {
    let offeset = (val - 1) * limit;
    setoffset(offeset);
  };

  return (
    <div className="main-das-page">
      <div className="heading my-3">
        <h3 className='text-blue'><i className="bi bi-activity"></i> Activity Logs</h3>
      </div>
      <div className='mt-2'>
        <h5 className='no-of-count'>No. of Count : {listlength}</h5>
      </div>
      <div className='my-3'>
        <ActivityLogsList
          list={list}
          limit={limit}
          setlimit={setlimit}
          handleChangePage={handleChangePage}
          page={page}
          search={search}
          setSearch={setSearch}
        />
      </div>
    </div>
  )
}
