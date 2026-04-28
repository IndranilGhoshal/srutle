'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function OrderManagementComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    const handleSelect = (key) => {
        if (key == 1) {
            // setStatus("0")
        } else if (key == 2) {
            // setStatus("1")
        } else if (key == 3) {
            // setStatus("3")
        }
    }
    return (
        <div className="main-das-page">

            <div className="heading my-3">
                <h3 className='text-blue'>Order Management</h3>
            </div>
            <div>
                <Tabs
                    defaultActiveKey={1} onSelect={(e) => { handleSelect(e) }}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey={1} title="On Hold">
                        Tab content for Home
                    </Tab>
                    <Tab eventKey={2} title="Shipped">
                        Tab content for Profile
                    </Tab>
                    <Tab eventKey={3} title="Delivered">
                        Tab content for Contact
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
