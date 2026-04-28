'use client'
import React, { useEffect, useState } from 'react'
import { getEditPermission, getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import toast, { Toaster } from 'react-hot-toast';
import { adminFaqApi } from '../lib/apiService'
import FaqTopicModal from './_modal/FaqTopicModal'
import { useRouter } from 'next/navigation'
import FaqTopicList from './_list/FaqTopicList';

export default function FaqManagementComponent() {
    const router = useRouter();
    const [list, setList] = useState(undefined)
    const [limit, setlimit] = useState('10')
    const [offset, setoffset] = useState('0')
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const [listlength, setListlength] = useState('0')

    const [isedit, setisEdit] = useState(false)

    useEffect(() => {
        if (!getLocalStorageData("admin")) {
            router.push("/admin");
        } else {
            router.push("/admin/account/faqmanagement");
            setisEdit(getEditPermission())
        }
    }, [])


    useEffect(() => {
        getData(search, limit, offset, status)
    }, [search, limit, offset, status])

    const getData = async (r, l, s, sta) => {
        showLoader()
        let data = { search: r, limit: l, skip: s, status: sta, faqtopiclist: true }
        let response = await adminFaqApi(data)
        if (response.success) {
            hideLoader()
            setListlength(response.listlength)
            let totalPage = Math.ceil(response.listlength / limit);
            setPage(totalPage);
            setList(response.result)
        } else {
            hideLoader()
            setList([])
            setPage(0)
        }
    }

    const onStatus = async (val, id) => {
        let response = await adminFaqApi({ status: val, id: id, onStatus: true })
        if (response.success) {
            onMessage(response.message, true)
        } else {
            onMessage(response.message, false)
        }
    }


    const onMessage = async (mes, sus) => {
        if (sus) {
            toast.success(mes)
            getData(search, limit, offset)
        } else {
            toast.error(mes)
            getData(search, limit, offset)
        }
    }
    const handleChangePage = (e, val) => {
        let offeset = (val - 1) * limit;
        setoffset(offeset);
    };

    const goto = (path) => {
        router.push("/admin/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }

    return (
        <>
            <div className="main-das-page">

                <div className="heading my-3">
                    <h3 className='text-blue'>FAQ Management</h3>
                    <FaqTopicModal onMessage={onMessage} isedit={isedit} />
                </div>
                <div className='mt-2'>
                    <h5 className='no-of-count'>No. of Count : {listlength}</h5>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 col-sm-12">
                        {
                            <FaqTopicList
                                list={list}
                                limit={limit}
                                setlimit={setlimit}
                                handleChangePage={handleChangePage}
                                page={page}
                                search={search}
                                setSearch={setSearch}
                                setStatus={setStatus}
                                status={status}
                                onStatus={onStatus}
                                goto={goto}
                                onMessage={onMessage}
                            />
                        }
                    </div>
                </div>

            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>

    )
}
