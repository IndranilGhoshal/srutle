'use client'
import LogoutModal from '@/app/_sellerComponents/_modal/LogoutModal';
import SellerAccountHeader from '@/app/_sellerComponents/SellerAccountHeader';
import { getLocalStorageData, removeLocalStorageData, setLocalStorageData, showLoader } from '@/app/lib/common';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Layout({ children }) {
    const router = useRouter();
    const path = usePathname()
    const [nav, setnav] = useState(false)
    const [menu, setMenu] = useState([
        { menuName: "Dashboard", menuIcon: "icon1.png", menuUrl: "/dashboard", submenu: [] },
        { menuName: "Catelogs", menuIcon: "icon2.png", menuUrl: "/catelogs", submenu: [] },
        { menuName: "Order", menuIcon: "icon5.png", menuUrl: "/order", submenu: [] },
        { menuName: "Shipping", menuIcon: "icon8.png", menuUrl: "/shipping", submenu: [] },
        { menuName: "Report", menuIcon: "icon7.png", menuUrl: "/report", submenu: [] },
        { menuName: "Return", menuIcon: "icon6.png", menuUrl: "/return", submenu: [] },
        { menuName: "Payout", menuIcon: "icon10.png", menuUrl: "/payout", submenu: [] },
        { menuName: "Transaction", menuIcon: "icon12.png", menuUrl: "/transaction", submenu: [] },
    ])
    useEffect(() => {
        let getPath = getLocalStorageData('pathName')
        if (getPath) {
            router.push("/seller/account" + getPath)
        }
        if (!getPath) {
            setLocalStorageData('pathName', menu[0].menuUrl)
            let getPath = getLocalStorageData('pathName')
            router.push("/seller/account" + getPath)
        }
    }, [])

    const goto = (path) => {
        showLoader()
        router.push("/seller/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }
    const oncolaps = (n) => {
        if (n) {
            setnav(false)
        } else {
            setnav(true)
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand navbar-light navbar-bg top_nav">

                <div className="navbar-collapse collapse">

                    <ul className="navbar-nav navbar-align">
                        <li className="nav-item dropdown">
                            <a className="nav-icon dropdown-toggle no-dropdown-arrow" href="#" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <div className="position-relative">
                                    <Image src={"/assets/seller-img/bell-icon.png"} alt="bell" width={20} height={20} />
                                    <span className="indicator">4</span>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
                                <div className="dropdown-menu-header">
                                    4 New Notifications
                                </div>
                                <div className="list-group">
                                    <a href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-alert-circle text-danger">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                </svg>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">Update completed</div>
                                                <div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
                                                <div className="text-muted small mt-1">2h ago</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-bell text-warning">
                                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                                </svg>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">Lorem ipsum</div>
                                                <div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit
                                                    et.</div>
                                                <div className="text-muted small mt-1">6h ago</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-home text-primary">
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                                </svg>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">Login from 192.186.1.1</div>
                                                <div className="text-muted small mt-1">8h ago</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-user-plus text-success">
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="8.5" cy="7" r="4"></circle>
                                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                                </svg>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">New connection</div>
                                                <div className="text-muted small mt-1">Anna accepted your request.</div>
                                                <div className="text-muted small mt-1">12h ago</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="dropdown-menu-footer">
                                    <a href="#" className="text-muted">Show all notifications</a>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle d-none d-sm-inline-block" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <Image src={"/assets/seller-img/usr-icon.png"} className="avatar Image-fluid rounded-circle me-1 d-sm-inline-block"
                                    alt="Chris Wood" width={20} height={20} />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" onClick={() => { goto('/settings?tab=seller-details-tab') }}><i className="bi bi-gear"></i> Settings</a>
                                <a className="dropdown-item" onClick={() => { goto('/activitylogs') }}><i className="bi bi-activity"></i> Activity Logs</a>
                                <LogoutModal />
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div id="seller-part" className="">
                <div className="wrapper">
                    <nav id="sidebar" className={`sidebar ${!nav ? "collapsed" : ""}`}>
                        <div className="sidebar-content" id="sidebar-sticky">
                            <div className="sidebar-brand text-start">
                                <span className="nav-img">
                                    <Image className="d-inline-block align-middle" src={"/assets/seller-img/srutle-logo.png"}
                                        alt="masterlist" width={500} height={100} /></span>
                                <button className="col_btn" onClick={() => { oncolaps(nav) }}>

                                    <i className="bi bi-chevron-left"></i>
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                            <ul className="sidebar-nav">
                                {
                                    menu && menu.map((item, i) => (
                                        <li key={i} className="sidebar-item" onClick={() => { goto(item.menuUrl) }}>
                                            <a data-bs-target="#navmasterlist" data-bs-toggle="collapse"
                                                className={`sidebar-link collapsed ${path == "/seller/account" + item.menuUrl ? "active" : ""}`}>
                                                <span className="nav-Image"><Image className="d-inline-block align-middle" src={"/assets/seller-img/"+item.menuIcon}
                                                    alt="masterlist" width={20} height={20} /></span>
                                                <span className="align-middle"> {item.menuName}</span>
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </nav>
                    <div className="main">
                        <main className="content">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
