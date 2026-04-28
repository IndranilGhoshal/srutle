'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { adminactivitylogApi, adminAddAdminApi } from '../lib/apiService';
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData } from '../lib/common';
import moment from 'moment';
import Image from 'next/image';
import UserDetailsSkeleton from './_skeleton/UserDetailsSkeleton';
import ActivityLogsList from './_list/ActivityLogsList';

export default function UserComponent({ id }) {
    const router = useRouter();
    const [isLoad, setIsLoad] = useState(false);
    const [image, setImage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [createdbyfirstname, setCreatedbyfirstname] = useState('');
    const [createdbylastname, setCreatedbylastname] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [firstLogin, setFirstLogin] = useState('');
    const [lastLogout, setLastLogout] = useState('');

    const [list, setlist] = useState(undefined)


    const [limit, setlimit] = useState('10')
    const [offset, setoffset] = useState('0')
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')

    const [listlength, setListlength] = useState('0')

    useEffect(() => {
        getActivitylogsData(search, limit, offset)
    }, [search, limit, offset])



    useEffect(() => {
        getUser(id)
    }, [])

    const getActivitylogsData = async (r, l, s) => {
        let data = { search: r, limit: l, skip: s, id: id, list: true }
        let response = await adminactivitylogApi(data)
        if (response.success) {
          hideLoader()
          setListlength(response.listlength)
          let totalPage = Math.ceil(response.listlength / limit);
          setPage(totalPage);
          setlist(response.result)
        } else {
          hideLoader()
          setlist(undefined)
          setPage(0)
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

    const getUser = async (id) => {
        let response = await adminAddAdminApi({ id: id, details: true })
        if (response.success) {
            hideLoader()
            let res = response.result
            setImage(res.image)
            setFirstName(res.firstname)
            setLastName(res.lastname)
            setEmail(res.email)
            setPhone(res.phone)
            setRole(res.role)
            setStatus(res.status)
            setCreatedbyfirstname(res.createdbyfirstname)
            setCreatedbylastname(res.createdbylastname)
            setCreatedAt(res.createdAt)
            setFirstLogin(res.firstLogin)
            setLastLogout(res.lastLogin)
            setIsLoad(true)
        } else {
            hideLoader()
            setImage('')
            setFirstName('')
            setLastName('')
            setEmail('')
            setPhone('')
            setRole('')
            setStatus('0')
            setCreatedbyfirstname('')
            setCreatedbylastname('')
            setCreatedAt('')
            setFirstLogin('')
            setLastLogout('')
        }
    }
    return (
        <>
            <div className="main-das-page">
                <div className="heading my-3">
                    <h3 className='text-blue'>User Details</h3>
                </div>
                {
                    isLoad ?
                        <>
                            <div className='my-3'>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item cp"><a onClick={() => { goto('/usermanagement') }}>User Management</a></li>
                                        <li className="breadcrumb-item active not-cp" aria-current="page">User Details</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-12 w-100">
                                    <div className="bg-white shadow_d rounded-3 my-3">

                                        <div className="role-details">
                                            <div className="img-dv">
                                                <span className="avtr">
                                                    {
                                                        image ?
                                                            <>
                                                                <Image
                                                                    src={"/upload/" + image}
                                                                    width={100}
                                                                    height={100}
                                                                    alt='asd'
                                                                />
                                                            </>
                                                            :
                                                            <i className="bi bi-person"></i>
                                                    }
                                                </span>
                                            </div>
                                            <ul className='px-0'>
                                                <li><strong>Role Name</strong> <span className="seprt">:</span> <span>{role}</span></li>
                                                <li><strong>Name</strong> <span className="seprt">:</span> <span>{firstName + " " + lastName}</span></li>
                                                <li><strong>Contact No.</strong> <span className="seprt">:</span> <span>{phone}</span></li>
                                                <li><strong>Email Id</strong> <span className="seprt">:</span> <span>{email}</span></li>
                                                <li><strong>Status</strong> <span className="seprt">:</span> {status == "0" && <span className="badge text-bg-success">Active</span>} {status == "1" && <span className="badge text-bg-secondary">Inactive</span>} {status == "3" && <span className="badge text-bg-info">Invited</span>}</li>
                                                <li><strong>Created On</strong> <span className="seprt">:</span> <span>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></li>
                                                {
                                                    firstLogin && <li><strong>First Login On</strong> <span className="seprt">:</span> <span>{moment(firstLogin).format('MMMM Do YYYY, h:mm:ss a')}</span></li>
                                                }
                                                {
                                                    lastLogout && <li><strong>Last Logout On</strong> <span className="seprt">:</span> <span>{moment(lastLogout).format('MMMM Do YYYY, h:mm:ss a')}</span></li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className='text-blue'>Activity Logs</h3>
                                <ActivityLogsList list={list} limit={limit} setlimit={setlimit} handleChangePage={handleChangePage} page={page} search={search} setSearch={setSearch} />
                            </div>
                        </>
                        :
                        <>
                            
                            <UserDetailsSkeleton />
                        </>
                }
            </div>
        </>
    )
}
