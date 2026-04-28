'use client'
import { admintutorialApi, uploadImageApi } from '@/app/lib/apiService';
import { hideLoader, showLoader } from '@/app/lib/common';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

export default function TutorialModal({ onMessage, isedit }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('0')

    const [error, setError] = useState(false)

    const handleClose = () => {
        setTitle('')
        setUrl('')
        setDescription('')
        setStatus('0')
        setError(false)
        setShow(false)
    };

    const addEvent = async () => {
        let err = 0;
        setError(false)
        if (!url ||!title || !description) {
            setError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = { url, title, description, status, addtutorial: true }
            let response = await admintutorialApi(data)
            if (response.success) {
                hideLoader()
                handleClose()
                onMessage(response.message, true)
            } else {
                hideLoader()
                onMessage(response.message, false)
            }
        }
    }



    return (
        <>
            <button className="btn down_btn" onClick={handleShow} disabled={isedit}><i className="bi bi-plus"></i> Add New</button>


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
                            <h4 className='text-blue'>Add Tutorial Video</h4>
                            <button
                                id="clsBtn12"
                                onClick={() => { handleClose() }}
                                type="button"
                                className="close-button"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="frm">
                                <div className="role_select mt-3">
                                    <label className="mb-2">Title <span className='acsts'>*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !title ? "error-txt" : ""}`}
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value) }}
                                        maxLength={100}
                                    />
                                    {
                                        error && !title && <div className='input-error'>Please enter title</div>
                                    }
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Video Url <span className='acsts'>*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !url ? "error-txt" : ""}`}
                                        value={url}
                                        onChange={(e) => { setUrl(e.target.value) }}
                                    />
                                    {
                                        error && !url && <div className='input-error'>Please enter url</div>
                                    }
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Description <span className='acsts'>*</span></label>
                                    <textarea
                                        className={`form-control ${error && !description ? "error-txt" : ""}`}
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                        maxLength={100}
                                    >
                                    </textarea>
                                    {
                                        error && !description && <div className='input-error'>Please enter description</div>
                                    }
                                </div>
                                <div className="add_btn">
                                    <button type="button" className="btn btn-primary" onClick={addEvent}>Add</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}
