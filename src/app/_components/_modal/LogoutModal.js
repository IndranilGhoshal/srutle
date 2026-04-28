import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function LogoutModal({onLogout}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <span className="dropdown-item" onClick={handleShow}><i className="bi bi-box-arrow-right"></i> Logout</span>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                onHide={handleClose}
                size='md'

            >
                <Modal.Body style={{ padding: 0 }}>
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
                                    <button type="button" className="btn btn-yes" onClick={onLogout}>Yes</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
