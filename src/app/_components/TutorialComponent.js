'use client'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { consumertutorialApi } from '../lib/apiService'
import Image from 'next/image'
import TutorialSkeleton from './_skeleton/TutorialSkeleton'
import { useRouter } from 'next/navigation'
export default function TutorialComponent() {
    const router = useRouter();
    const [isvideo, setIsvideo] = useState(false)
    const [list, setList] = useState(undefined)
    useEffect(() => {
        setIsvideo(true)
        getTutorial()
    }, [])
    const getTutorial = async () => {
        showLoader()
        let data = { gettutorial: true }
        let response = await consumertutorialApi(data)
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
                <div className="back-pag">
                    <button className="btn btn-backpge" onClick={()=>{goto('/faq')}}><i className="bi bi-chevron-left"></i> Back to Help & Support</button>
                </div>
                <div className="help-support-video">
                    {
                        list !== undefined ?
                            <>
                                {
                                    list && list.length > 0 ?
                                        <>
                                            {
                                                list.map((item, i) => (
                                                    <div key={i} className="support-video">
                                                        {
                                                            isvideo && <ReactPlayer
                                                                url={item.url}
                                                                width='100%'
                                                                height='100%'
                                                            />
                                                        }

                                                        <strong>{item.title} </strong>
                                                        <p className='lst-txt-wp-tw'>{item.description}</p>
                                                    </div>
                                                ))
                                            }
                                        </>
                                        :
                                        <>
                                            <div className='addrf-no'>
                                                <Image
                                                    style={{ height: "auto" }}
                                                    src="/assets/img/no-data.png"
                                                    width={600}
                                                    height={100}
                                                    alt='asd'
                                                />
                                            </div>
                                        </>
                                }
                            </>
                            :
                            <>
                                <TutorialSkeleton />
                            </>
                    }
                </div>
            </div>
        </>
    )
}
