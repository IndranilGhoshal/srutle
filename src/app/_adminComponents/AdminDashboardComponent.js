'use client'
import React, { useEffect, useState } from 'react'
import { getPassData, hideLoader, setPassData, showLoader } from '../lib/common'
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image'
import AdminLineChart from './_chart/AdminLineChart'
import AdminPieChart from './_chart/AdminPieChart'
import AdminBarChart from './_chart/AdminBarChart'
import AdminRadialBarChart from './_chart/AdminRadialBarChart'
import { admindashboardApi } from '../lib/apiService';
import AdminLineChartSkeleton from './_skeleton/AdminLineChartSkeleton';
import AdminPieChartSkeleton from './_skeleton/AdminPieChartSkeleton';
import AdminBarChartSkeleton from './_skeleton/AdminBarChartSkeleton';
import AdminRadialBarChartSkeleton from './_skeleton/AdminRadialBarChartSkeleton';
export default function AdminDashboardComponent() {


    const [totalrevenue, settotalrevenue] = useState(0)
    const [pendingorders, setpendingorders] = useState(0)
    const [completedorders, setcompletedorders] = useState(0)


    const [salesperformance, setsalesperformance] = useState(undefined)
    const [consumergenderinsights, setconsumergenderinsights] = useState(undefined)
    const [orderperformance, setorderperformance] = useState(undefined)
    const [consumerinsights, setconsumerinsights] = useState(undefined)





    const [piediv, setPieDiv] = useState(false)
    const [linediv, setLineDiv] = useState(false)
    const [bardiv, setBarDiv] = useState(false)
    const [radialdiv, setRadialDiv] = useState(false)
    useEffect(() => {
        hideLoader()
        setPieDiv(true)
        setLineDiv(true)
        setBarDiv(true)
        setRadialDiv(true)
        if (getPassData()) {
            toast.success(getPassData())
            setPassData('')
        }
    }, [])


    useEffect(() => {
        getdashboarddata()
        getsalesperformance()
        getconsumergenderinsights()
        getorderperformance()
        getconsumerinsights()
    }, [])

    const getdashboarddata = async () => {
        showLoader()
        let data = { getdashboarddata: true }
        let response = await admindashboardApi(data)
        if (response.success) {
            hideLoader()
            let { result } = response
            settotalrevenue(result.totalrevenue)
            setpendingorders(result.pendingorders)
            setcompletedorders(result.completedorders)
        } else {
            hideLoader()
            settotalrevenue(0)
            setpendingorders(0)
            setcompletedorders(0)
        }
    }

    const getsalesperformance = async () => {
        showLoader()
        let data = { getsalesperformance: true }
        let response = await admindashboardApi(data)
        if (response.success) {
            hideLoader()
            let { result } = response
            setsalesperformance(result)
        } else {
            hideLoader()
            setsalesperformance(undefined)
        }
    }

    const getconsumergenderinsights = async () => {
        showLoader()
        let data = { getconsumergenderinsights: true }
        let response = await admindashboardApi(data)
        if (response.success) {
            hideLoader()
            let { result } = response
            setconsumergenderinsights(result)
        } else {
            hideLoader()
            setconsumergenderinsights(undefined)
        }
    }


    const getorderperformance = async () => {
        showLoader()
        let data = { getorderperformance: true }
        let response = await admindashboardApi(data)
        if (response.success) {
            hideLoader()
            let { result } = response
            setorderperformance(result)
        } else {
            hideLoader()
            setorderperformance(undefined)
        }
    }

    const getconsumerinsights = async () => {
        showLoader()
        let data = { getconsumerinsights: true }
        let response = await admindashboardApi(data)
        if (response.success) {
            hideLoader()
            let { result } = response
            setconsumerinsights(result)
        } else {
            hideLoader()
            setconsumerinsights(undefined)
        }
    }


    return (
        <>
            <div className="main-das-page">

                <div className="heading mb-3">
                    <h3 className='text-blue'>Dashboard</h3>
                </div>
                <div className="main-content">
                    <div>
                        <div className="salse-overview-sec mb-4">
                            <div className="salse-overview">
                                <div className="salse-over-view">
                                    <div className="salse-over-txt">
                                        <h3>Total Revenue</h3>
                                        <strong className="blue">{totalrevenue}</strong>
                                    </div>
                                    <div className="sals-icn">
                                        <Image src="/assets/img/sales-icon1.png" width={80} height={80} alt='no' />
                                    </div>
                                </div>
                                <div className="salse-over-view">
                                    <div className="salse-over-txt">
                                        <h3>Pending Orders</h3>
                                        <strong className="red">{pendingorders}</strong>
                                    </div>
                                    <div className="sals-icn">
                                        <Image src="/assets/img/sales-icon2.png" width={80} height={80} alt='no' />
                                    </div>
                                </div>
                                <div className="salse-over-view">
                                    <div className="salse-over-txt">
                                        <h3>Completed Orders</h3>
                                        <strong className="green">{completedorders}</strong>
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
                                        salesperformance !== undefined ?
                                            <>
                                                {
                                                    salesperformance && linediv && <AdminLineChart salesperformance={salesperformance} />
                                                }
                                            </>
                                            :
                                            <>
                                                <AdminLineChartSkeleton />
                                            </>
                                    }
                                </div>
                            </div>
                            <div className="right-chart">
                                <div className="headng-cgrt">
                                    <h2>Consumer Gender Insights</h2>
                                </div>
                                <div className="right-chart-inr">
                                    {
                                        consumergenderinsights ?
                                            <>
                                                {
                                                    consumergenderinsights && piediv && <AdminPieChart consumergenderinsights={consumergenderinsights} />
                                                }
                                            </>
                                            :
                                            <>
                                                <AdminPieChartSkeleton />
                                            </>
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
                                        orderperformance !== undefined ?
                                            <>
                                                {
                                                    orderperformance && bardiv && <AdminBarChart orderperformance={orderperformance} />
                                                }
                                            </>
                                            :
                                            <>
                                                <AdminBarChartSkeleton />
                                            </>
                                    }
                                </div>
                            </div>
                            <div className="right-chart">
                                <div className="headng-cgrt">
                                    <h2>Consumer Insights</h2>
                                </div>
                                <div className="right-chart-inr">
                                    {
                                        consumerinsights !== undefined ?
                                            <>
                                                {
                                                   consumerinsights && radialdiv && <AdminRadialBarChart consumerinsights={consumerinsights} />
                                                }
                                            </>
                                            :
                                            <>
                                                <AdminRadialBarChartSkeleton />
                                            </>
                                    }

                                </div>
                            </div>
                        </div>
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
