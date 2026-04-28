'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, getPassData, hideLoader, removeLocalStorageData, setLocalStorageData, setPassData, showLoader } from '../lib/common'
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from 'react-bootstrap'
import Image from 'next/image'
import { sellerDashboardApi } from '../lib/apiService'
import { useRouter } from 'next/navigation'
import SellerLineChart from './_chart/SellerLineChart'
import SellerPieChart from './_chart/SellerPieChart'
import SellerBarChart from './_chart/SellerBarChart'
import SellerRadialBarChart from './_chart/SellerRadialBarChart'

export default function DashboardComponent() {
    const router = useRouter();
    const [piediv, setPieDiv] = useState(false)
    const [linediv, setLineDiv] = useState(false)
    const [bardiv, setBarDiv] = useState(false)
    const [radialdiv, setRadialDiv] = useState(false)
    useEffect(() => {
        hideLoader()
        if (getLocalStorageData('seller')?.islogin == "0") {
            setShow(true)
        }
        if (getPassData()) {
            toast.success(getPassData())
            setPassData('')
        }
        setPieDiv(true)
        setLineDiv(true)
        setBarDiv(true)
        setRadialDiv(true)
    }, [])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const getislogin = async () => {
        showLoader()
        let response = await sellerDashboardApi({ id: getLocalStorageData('seller')?._id, token: getLocalStorageData('seller')?.token, islogin: true })
        if (response.success) {
            const { result } = response;
            removeLocalStorageData("seller")
            setLocalStorageData("seller", result)
            handleClose()
            hideLoader()
        } else {
            hideLoader()
        }
    }

    const goto = (path) => {
        showLoader()
        router.push("/seller/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }


    return (
        <>
            <div className="main-das-page">
                <div className="heading mb-3">
                    <h3 className='text-blue'>Dashboard</h3>
                </div>
                {
                    getLocalStorageData('seller')?.esignature == "" &&
                    <div className="alert alert-danger my-3" role="alert">
                        <strong>Your E-Signature is missing!</strong>
                        <p>E-signature is required for raising invoices / credit notes on your behalf to customers</p>
                        <button type="button" className="btn btn-outline-dark" onClick={() => { goto('/settings?tab=seller-signature-tab') }}>Add Signature</button>
                    </div>
                }
                <div className="main-content">
                    <div>
                        <div className="salse-overview-sec mb-4">
                            <div className="salse-overview">
                                <div className="salse-over-view">
                                    <div className="salse-over-txt">
                                        <h3>Total Revenue</h3>
                                        <strong className="blue">36</strong>
                                    </div>
                                    <div className="sals-icn">
                                        <Image src="/assets/img/sales-icon1.png" width={80} height={80} alt='no' />
                                    </div>
                                </div>
                                <div className="salse-over-view">
                                    <div className="salse-over-txt">
                                        <h3>Pending Orders</h3>
                                        <strong className="red">14</strong>
                                    </div>
                                    <div className="sals-icn">
                                        <Image src="/assets/img/sales-icon2.png" width={80} height={80} alt='no' />
                                    </div>
                                </div>
                                <div className="salse-over-view">
                                    <div className="salse-over-txt">
                                        <h3>Completed Orders</h3>
                                        <strong className="green">8</strong>
                                    </div>
                                    <div className="sals-icn">
                                        <Image src="/assets/img/sales-icon3.png" width={80} height={80} alt='no' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chart-sec mb-4">
                            <div className="left-chart">
                                <div className="headng-cgrt">
                                    <h2>Sales Performance</h2>
                                </div>
                                <div className="left-chart-inr">
                                    {
                                        linediv && <SellerLineChart />
                                    }

                                </div>
                            </div>
                            <div className="right-chart">
                                <div className="headng-cgrt">
                                    <h2>Profit and Loss Insights</h2>
                                </div>
                                <div className="right-chart-inr">
                                    {
                                        piediv && <SellerPieChart />
                                    }


                                </div>
                            </div>
                        </div>
                        <div className="chart-sec mb-4">
                            <div className="left-chart">
                                <div className="headng-cgrt">
                                    <h2>Order Performance</h2>
                                </div>
                                <div className="left-chart-inr">
                                    {
                                        bardiv && <SellerBarChart />
                                    }

                                </div>
                            </div>
                            <div className="right-chart">
                                <div className="headng-cgrt">
                                    <h2>Consumer Insights</h2>
                                </div>
                                <div className="right-chart-inr">
                                    {
                                        radialdiv && <SellerRadialBarChart />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body style={{ padding: '10px' }}>
                    <button id="successsignupbtncls" onClick={() => { handleClose() }} style={{ display: "none" }} type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                    <div className="success-ord">
                        <div className="success-ord-inr">
                            <span><Image src={"/assets/seller-img/store-signup-back.png"} width={200} height={100} alt='nocart' /></span>
                            <strong style={{ color: "green" }}>Congratulations!</strong>
                            <p>You are now part of 6 lakhs seller community</p>
                            <p>selling all over India.</p>
                            <button className="btn btn-vw-ordr" onClick={() => { getislogin() }} >Start Selling Now</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Toaster
                position="buttom-right"
                reverseOrder={false}
            />
        </>
    )
}
