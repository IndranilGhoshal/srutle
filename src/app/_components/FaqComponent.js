'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, opneWorkinProgresModal, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import Image from 'next/image'
import { consumerFaqApi } from '../lib/apiService'
import FaqSkeleton from './_skeleton/FaqSkeleton'
import { useRouter } from 'next/navigation'
import FaqTopicSkeleton from './_skeleton/FaqTopicSkeleton'

export default function FaqComponent() {
    const router = useRouter();
    const [list, setList] = useState(undefined)
    useEffect(() => {
        getFaqtopic()
    }, [])

    const getFaqtopic = async () => {
        showLoader()
        let data = { getfaqtopic: true }
        let response = await consumerFaqApi(data)
        if (response.success) {
            hideLoader()
            setList(response.result)
        } else {
            hideLoader()
            setList(undefined)
        }
    }

    const goto = (path) => {
        showLoader()
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }

    return (
        <>
            <div className="help-support padding">
                <div className="help-support-inr">
                    <div className="help-support-inr-l">
                        {
                            list !== undefined ?
                                <>
                                    {
                                        list.length > 0 ?
                                            <>
                                                {
                                                    list.map((item, i) => (
                                                        <div key={i} className="section" onClick={()=>{goto('/faqdetails/'+item._id)} }>
                                                            <span className="hlp-icn"><Image src={"/upload/" + item.image} width={40} height={40} alt='no' /> </span>
                                                            <h4>{item.title}</h4>
                                                            <p>{item.description}</p>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                            :
                                            <> </>
                                    }
                                </>
                                :
                                <><FaqTopicSkeleton /></>
                        }
                        <div className="section">
                            <span className="hlp-icn"><Image src={"/assets/img/help-ico9.png"} width={40} height={40} alt='no' /></span>
                            <h4>Need a Call Back</h4>
                            <a href="tel:+1234567890" className="call-btn">Call</a>
                        </div>
                    </div>
                    <div className="help-support-inr-r">
                        <div className="section">
                            <span className="hlp-icn"><Image src={"/assets/img/help-ico10.png"} width={40} height={40} alt='no' /></span>
                            <h4>Need more help?</h4>
                            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has
                                been the industry's standard dummy text ever since.</p>
                            <div className="need-btn-dv"><button className="btn btn-cret-tic" onClick={() => { opneWorkinProgresModal() }}>Create Ticket</button>
                                <button className="btn btn-nobg" onClick={() => { opneWorkinProgresModal() }}>View Ticket</button>
                            </div>
                        </div>


                        <div className="section video-sc">
                            <span className="hlp-icn"><Image src={"/assets/img/help-ico11.png"} width={40} height={40} alt='no' /></span>
                            <div className="video-sc-inr">
                                <div className="video-sc-inr-in-in">
                                    <h2>Video Tutorial</h2>
                                    <p>Lorem ipsum is simply dummy text of the printing and typesetting industry.<br />
                                        Lorem ipsum has been the industry's standard dummy text ever since.</p>
                                </div>
                                <a className="btn btn-nobg" onClick={()=>{goto('/tutorial')} }>View Video</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
