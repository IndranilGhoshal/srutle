'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { partnerApi } from '../lib/apiService';
import { hideLoader, removeLocalStorageData, setLocalStorageData } from '../lib/common';
import moment from 'moment';
import PartnerDetailsSkeleton from './_skeleton/PartnerDetailsSkeleton';
import Image from 'next/image';

export default function PartnerDetailsComponent({ id }) {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [createdAt, setCreatedAt] = useState('');


  useEffect(() => {
    getPartner(id)
  }, [])

  const goto = (path) => {
    router.push("/admin/account" + path)
    removeLocalStorageData("pathName")
    setLocalStorageData('pathName', path)
  }

  const getPartner = async (id) => {
    let response = await partnerApi({ id: id, details: true })
    if (response.success) {
      hideLoader()
      let res = response.result
      setImage(res.image)
      setName(res.name)
      setEmail(res.email)
      setPhone(res.phone)
      setStatus(res.status)
      setCreatedAt(res.createdAt)
      setIsLoad(true)
    } else {
      hideLoader()
      setImage('')
      setName('')
      setEmail('')
      setPhone('')
      setStatus('0')
      setCreatedAt('')
    }
  }

  return (
    <>
      <div className="main-das-page">
        <div className="heading my-3">
          <h3 className='text-blue'>Partner Details</h3>
        </div>
        {
          isLoad ?
            <>
              <div className='my-3'>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item cp"><a onClick={() => { goto('/partnermanagement') }}>Partner Management</a></li>
                    <li className="breadcrumb-item active not-cp" aria-current="page">Partner Details</li>
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
                        <li><strong>Name</strong> <span className="seprt">:</span> <span>{name}</span></li>
                        <li><strong>Contact No.</strong> <span className="seprt">:</span> <span>{phone}</span></li>
                        <li><strong>Email Id</strong> <span className="seprt">:</span> <span>{email}</span></li>
                        <li><strong>Status</strong> <span className="seprt">:</span> {status == "0" && <span className="badge text-bg-success">Active</span>} {status == "1" && <span className="badge text-bg-secondary">Inactive</span>} </li>
                        <li><strong>Created On</strong> <span className="seprt">:</span> <span>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
            :
            <>

              <PartnerDetailsSkeleton />
            </>
        }
      </div>
    </>
  )
}
