'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
export default function PayoutManagementComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    const handleSelect = (key) => {
        if (key == 1) {
            // setStatus("0")
        } else if (key == 2) {
            // setStatus("1")
        } 
    }
    return (
        <div className="main-das-page">

            <div className="heading my-3">
                <h3 className='text-blue'>Payout Management</h3>
            </div>
            <div>
                <Tabs
                    defaultActiveKey={1} onSelect={(e) => { handleSelect(e) }}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey={1} title="Seller Payout">
                        Tab content for Home
                    </Tab>
                    <Tab eventKey={2} title="Affiliate Marketer Payout">
                        Tab content for Profile
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
