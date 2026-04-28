import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { hideLoader, removeLocalStorageData, setPassData, showLoader } from '@/app/lib/common'
import { useRouter } from 'next/navigation';

export default function LogoutModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const router = useRouter();

    const logoutEvent = async () => {
        showLoader()
        removeLocalStorageData("seller")
        removeLocalStorageData("pathName")
        setPassData("You have successfully logged out from the system")
        router.push("/seller");
    }
    return (
        <>
            <a className="dropdown-item mb-1" onClick={handleShow}><i className="bi bi-box-arrow-in-right"></i> Sign out</a>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                onHide={handleClose}
            >
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className='text-blue'><i className="bi bi-box-arrow-right"></i> Logout</h5>
                    </div>
                    <div className="modal-body">

                        <div className="frm">
                            <div className="role_select">
                                <h6>Are you sure you want to log out?</h6>
                            </div>
                            <div className="add_btn d-flex mt-4 justify-content-center">
                                <button type="button" className="btn btn-no" onClick={handleClose}>No</button>
                                <button type="button" className="btn btn-yes" onClick={logoutEvent}>Yes</button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>

        </>
    )
}
