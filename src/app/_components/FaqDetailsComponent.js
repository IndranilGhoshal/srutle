'use client'
import React, { useEffect, useState } from 'react'
import FaqSkeleton from './_skeleton/FaqSkeleton'
import Image from 'next/image'
import { consumerFaqApi } from '../lib/apiService'
import { hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { useRouter } from 'next/navigation'

export default function FaqDetailsComponent({ id }) {
    const router = useRouter();
    const [list, setList] = useState(undefined)
    useEffect(() => {
        getFaq()
    }, [])

    const getFaq = async () => {
        showLoader()
        let data = { id: id, getfaq: true }
        let response = await consumerFaqApi(data)
        if (response.success) {
            let { result } = response
            let temp = []
            for (let [i, r] of result.entries()) {
                let data = {
                    "_id": r._id,
                    "question": r.question,
                    "answer": r.answer,
                    "isview": i == 0 ? true : false
                }
                temp.push(data)
            }
            hideLoader()
            setList(temp)
        } else {
            hideLoader()
            setList(undefined)
        }
    }

    const getCollapse = (index) => {
        let m = [...list]
        let t = []
        let f = []
        for (let tt of m) {
            tt.isview = false
            t.push(tt)
        }
        for (let [i, obj] of t.entries()) {
            if (i == index) {
                obj.isview = true
            }
            f.push(obj)
        }
        setList(f)
    }

    const goto = (path) => {
        showLoader()
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }


    return (
        <>
            <div className="help-support-dtl">
                <div className="back-pag">
                    <button className="btn btn-backpge" onClick={()=>{goto('/faq')}}><i className="bi bi-chevron-left"></i> Back to Help & Support</button>

                </div>
                <div className="prod-info-inner">
                    {
                        list !== undefined ?
                            <>
                                {
                                    list.length > 0 ? list.map((item, i) => (
                                        <div key={i} className='col-sm-12'>
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button onClick={() => { getCollapse(i) }} className={`accordion-button ${!item.isview ? "collapsed" : ""}`} type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne" + i} aria-expanded="true" aria-controls={"collapseOne" + i}>
                                                            {i + 1 + ". " + item.question}
                                                        </button>
                                                    </h2>
                                                    <div id={"collapseOne" + i} className={`accordion-collapse collapse ${item.isview ? "show" : ""}`} data-bs-parent="#accordionExample">
                                                        <div className="accordion-body faq_accd">
                                                            <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                                                            <div className="hpfl-out">
                                                                <p className="p-0 m-0">Was this helpful?</p>

                                                                <div className="hplfl-div"><button className="btn">Yes</button><button
                                                                    className="btn">No</button></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                        :
                                        <div className='addrf-no'>
                                            <Image
                                                src="/assets/img/no-data.png"
                                                width={600}
                                                height={100}
                                                alt='asd'
                                            />
                                        </div>
                                }
                            </>
                            :
                            <>
                                {list == undefined && <FaqSkeleton />}
                            </>
                    }
                </div>
            </div>
        </>
    )
}
