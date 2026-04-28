'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { hideLoader, removeLocalStorageData, setLocalStorageData } from '../lib/common';
import { consumerApi } from '../lib/apiService';
import ConsumerDetailsSkeleton from './_skeleton/ConsumerDetailsSkeleton';
import moment from 'moment';
import Image from 'next/image';

export default function ConsumerDetailsComponent({id}) {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState(false);
  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    getConsumer(id)
  }, [])

  const goto = (path) => {
    router.push("/admin/account" + path)
    removeLocalStorageData("pathName")
    setLocalStorageData('pathName', path)
  }

  const getConsumer = async (id) => {
    let response = await consumerApi({ id: id, details: true })
    if (response.success) {
      hideLoader()
      let res = response.result
      setImage(res.image)
      setFirstName(res.firstname)
      setLastName(res.lastname)
      setEmail(res.email)
      setPhone(res.phone)
      setDateofbirth(res.dateofbirth)
      setStatus(res.status)
      setGender(res.gender)
      setCreatedAt(res.createdAt)
      setIsLoad(true)
    } else {
      hideLoader()
      setImage('')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setDateofbirth('')
      setStatus('0')
      setGender('')
      setCreatedAt('')
    }
  }

  return (
    <>
    <div className="main-das-page">
                    <div className="heading my-3">
                        <h3 className='text-blue'>Consumer Details</h3>
                    </div>
                    {
                        isLoad ?
                            <>
                                <div className='my-3'>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item cp"><a onClick={() => { goto('/consumermanagement') }}>Consumer Management</a></li>
                                            <li className="breadcrumb-item active not-cp" aria-current="page">Consumer Details</li>
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
                                                    
                                                    <li><strong>Name</strong> <span className="seprt">:</span> <span>{firstName + " " + lastName}</span></li>
                                                    <li><strong>Date of Birth</strong> <span className="seprt">:</span> <span>{dateofbirth}</span></li>
                                                    <li><strong>Gender</strong> <span className="seprt">:</span> <span>{gender=="0"&&"Male"}{gender=="1"&&"Female"}{gender=="2"&&"Other"}</span></li>
                                                    <li><strong>Contact No.</strong> <span className="seprt">:</span> <span>{phone}</span></li>
                                                    <li><strong>Email Id</strong> <span className="seprt">:</span> <span>{email}</span></li>
                                                    <li><strong>Status</strong> <span className="seprt">:</span> {status == "0" && <span className="badge text-bg-success">Active</span>} {status == "1" && <span className="badge text-bg-secondary">Inactive</span>}</li>
                                                    <li><strong>Created On</strong> <span className="seprt">:</span> <span>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                
                                <ConsumerDetailsSkeleton />
                            </>
                    }
                </div>
    </>
  )
}
