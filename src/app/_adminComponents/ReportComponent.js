'use client'
import React, { useEffect } from 'react'
import { getPassData, hideLoader, setPassData } from '../lib/common'
import { toast, ToastContainer } from 'react-toastify'

export default function ReportComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    return (
        <>
            <div className="main-das-page">

                <div className="heading mb-3">
                    <h3 className='text-blue'>Report</h3>
                    <div className="report-page">
                        <div className="metrics-grid">
                            <div className="metric-card">
                                <div className="metric-header">Session Key Event Rate</div>
                                <div className="metric-value">76.00%</div>
                                <div className="metric-chart"></div>
                                <div className="metric-changes">
                                    <span>Previous period <span className="change-negative">-19%</span></span>
                                    <span>Previous year <span className="change-positive">2%</span></span>
                                </div>
                            </div>

                            <div className="metric-card">
                                <div className="metric-header">Sessions</div>
                                <div className="metric-value">1,867</div>
                                <div className="metric-chart"></div>
                                <div className="metric-changes">
                                    <span>Previous period <span className="change-positive">34%</span></span>
                                    <span>Previous year <span className="change-positive">15%</span></span>
                                </div>
                            </div>

                            <div className="metric-card">
                                <div className="metric-header">Purchaser Key Event</div>
                                <div className="metric-value">48.13%</div>
                                <div className="metric-chart"></div>
                                <div className="metric-changes">
                                    <span>Previous period <span className="change-negative">-44%</span></span>
                                    <span>Previous year <span className="change-negative">-58%</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="analytics-grid">
                            <div className="analytics-card">
                                <div className="card-title">Engaged Sessions Per User by Sources</div>
                                <div className="pie-chart"></div>
                                <ul className="source-list">
                                    <li className="source-item">
                                        <span className="source-name">
                                            <span className="source-dot" style={{backgroundColor: "#38b2ac"}}></span>
                                            Cursus tellus
                                        </span>
                                        <span className="source-value">1.94</span>
                                    </li>
                                    <li className="source-item">
                                        <span className="source-name">
                                            <span className="source-dot" style={{backgroundColor: "#4299e1"}}></span>
                                            Ipsum augue
                                        </span>
                                        <span className="source-value">1.41</span>
                                    </li>
                                    <li className="source-item">
                                        <span className="source-name">
                                            <span className="source-dot" style={{backgroundColor: "#9f7aea"}} ></span>
                                            Leo luctus placerat non ut
                                        </span>
                                        <span className="source-value">1.26</span>
                                    </li>
                                    <li className="source-item">
                                        <span className="source-name">
                                            <span className="source-dot" style={{backgroundColor: "#ed8936"}} ></span>
                                            Eros tristique
                                        </span>
                                        <span className="source-value">1.02</span>
                                    </li>
                                    <li className="source-item">
                                        <span className="source-name">
                                            <span className="source-dot" style={{backgroundColor: "#f56565"}}></span>
                                            Augue
                                        </span>
                                        <span className="source-value">0.84</span>
                                    </li>
                                    <li className="source-item">
                                        <span className="source-name">
                                            <span className="source-dot" style={{backgroundColor: "#ecc94b"}} ></span>
                                            Dictum arcu amet
                                        </span>
                                        <span className="source-value">0.68</span>
                                    </li>
                                    <li className="source-item">
                                        <span className="source-name">
                                            <span className="source-dot" style={{backgroundColor: "#48bb78"}}></span>
                                            Tellus
                                        </span>
                                        <span className="source-value">0.64</span>
                                    </li>
                                    <li className="source-item">
                                        <span className="source-name">
                                            <span className="source-dot" style={{backgroundColor: "#38b2ac"}}></span>
                                            Suscipit cursus
                                        </span>
                                        <span className="source-value">0.41</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="analytics-card">
                                <div className="card-title">Top Traffic Sources</div>
                                <table className="traffic-table">
                                    <thead>
                                        <tr>
                                            <th>Session Default Channel Grouping</th>
                                            <th>Sessions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="source-cell">
                                                <span className="source-dot" style={{backgroundColor: "#38b2ac"}}></span>
                                                Risus cursus
                                            </td>
                                            <td className="source-value">1,897</td>
                                        </tr>
                                        <tr>
                                            <td className="source-cell">
                                                <span className="source-dot"  style={{backgroundColor: "#38b2ac"}}></span>
                                                Sit bibendum
                                            </td>
                                            <td className="source-value">1,841</td>
                                        </tr>
                                        <tr>
                                            <td className="source-cell">
                                                <span className="source-dot" style={{backgroundColor: "#38b2ac"}}></span>
                                                Eros aenean accumsan
                                            </td>
                                            <td className="source-value">1,729</td>
                                        </tr>
                                        <tr>
                                            <td className="source-cell">
                                                <span className="source-dot" style={{backgroundColor: "#38b2ac"}}></span>
                                                Ligula pellentesque
                                            </td>
                                            <td className="source-value">1,722</td>
                                        </tr>
                                        <tr>
                                            <td className="source-cell">
                                                <span className="source-dot" style={{backgroundColor: "#38b2ac"}}></span>
                                                Risus posuere
                                            </td>
                                            <td className="source-value">1,463</td>
                                        </tr>
                                        <tr>
                                            <td className="source-cell">
                                                <span className="source-dot" style={{backgroundColor: "#38b2ac"}}></span>
                                                Lorem non
                                            </td>
                                            <td className="source-value">1,290</td>
                                        </tr>
                                        <tr>
                                            <td className="source-cell">
                                                <span className="source-dot" style={{backgroundColor: "#38b2ac"}}></span>
                                                Nunc arcu dui risus luctus accumsan
                                            </td>
                                            <td className="source-value">617</td>
                                        </tr>
                                        <tr>
                                            <td className="source-cell">
                                                <span className="source-dot" style={{backgroundColor: "#38b2ac"}}></span>
                                                Mattis consecteturadipiscing
                                            </td>
                                            <td className="source-value">573</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="analytics-card">
                                <div className="card-title">Product Adds to Cart</div>
                                <div className="large-metric">1,931</div>
                                <div className="mini-chart"></div>
                                <div className="metric-changes">
                                    <span>Previous period <span className="change-positive">31%</span></span>
                                    <span>Previous year <span className="change-positive">18%</span></span>
                                </div>
                            </div>

                            <div className="analytics-card">
                                <div className="card-title">Product Checkouts</div>
                                <div className="large-metric">835</div>
                                <div className="mini-chart"></div>
                                <div className="metric-changes">
                                    <span>Previous period <span className="change-negative">-25%</span></span>
                                    <span>Previous year <span className="change-negative">-22%</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
