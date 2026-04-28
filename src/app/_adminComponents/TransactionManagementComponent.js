'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
export default function TransactionManagementComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    const handleSelect = (key) => {
        if (key == 1) {
            // setStatus("0")
        } else if (key == 2) {
            // setStatus("1")
        } else if (key == 3) {
            // setStatus("1")
        } 
    }
    return (
        <div className="main-das-page">

            <div className="heading my-3">
                <h3 className='text-blue'>Transaction Management</h3>
            </div>
            <div>
                <Tabs
                    defaultActiveKey={1} onSelect={(e) => { handleSelect(e) }}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey={1} title="Consumer Transaction">
                        Tab content for Home
                    </Tab>
                    <Tab eventKey={2} title="Seller Transaction">
                        Tab content for Home
                    </Tab>
                    <Tab eventKey={3} title="Affiliate Marketer Transaction">
                        Tab content for Profile
                    </Tab>
                    
                </Tabs>
            </div>
        </div>
    )
}
