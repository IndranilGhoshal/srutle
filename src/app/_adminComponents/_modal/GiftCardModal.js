'use client'
import { admingiftcardApi, uploadImageApi } from '@/app/lib/apiService';
import { hideLoader, showLoader } from '@/app/lib/common';
import { resizeFile } from '@/app/lib/ImageCroper';
import Image from 'next/image';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

export default function GiftCardModal({ onMessage, isedit }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('0');
    const [error, setError] = useState(false)


    const handleClose = () => {
        setImage('')
        setTitle('')
        setDescription('')
        setStatus('0')
        setError(false)
        setShow(false)
    };


    const addEvent = async () => {
        let err = 0;
        setError(false)
        if (!image || !title || !description) {
            setError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = { image, title, description, status, add: true }
            let response = await admingiftcardApi(data)
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

    const uploadImg = async (f) => {
        showLoader()
        const image = await resizeFile(f);
        const data = new FormData();
        data.set("file", image);
        let result = await uploadImageApi(data)
        if (result.success) {
            hideLoader()
            setImage(result.fileName)
            onMessage(result.message, true, true)
        } else {
            hideLoader()
            setImage('')
            onMessage(result.message, true, false)
        }
    }

    return (
        <>
            <button className="btn down_btn" onClick={handleShow} disabled={isedit}><i className="bi bi-plus"></i> Add New </button>

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
                            <h4 className='text-blue'>Add Gift Card</h4>
                            <button
                                id="giftcardclsBtn"
                                type="button"
                                className="close-button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClose}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="frm">
                                <div className="role_select">
                                    <span className='photo-clr'>
                                        {
                                            image ?
                                                <>
                                                    <Image
                                                        src={"/upload/" + image}
                                                        width={100}
                                                        height={100}
                                                        alt='aaddsd'
                                                    />
                                                </>
                                                :
                                                <>
                                                    <i className="bi bi-gift"></i>
                                                </>
                                        }

                                    </span>
                                </div>
                                <div className="role_select ">
                                    <label className="mb-2">Upload Photo</label>
                                    <input
                                        type="file"
                                        name="file"
                                        className={`form-control`}
                                        onChange={(e) => { uploadImg(e.target.files?.[0]) }}
                                    />
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Gift Card Title <span className='acsts'>*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !title ? "error-txt" : ""}`}
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value) }}
                                    />
                                    {
                                        error && !title && <div className='input-error'>Please enter gift card title</div>
                                    }
                                </div>

                                <div className="role_select mt-3">
                                    <label className="mb-2">Gift Card Description <span className='acsts'>*</span></label>
                                    <textarea
                                        className={`form-control ${error && !description ? "error-txt" : ""}`}
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                    >
                                    </textarea>
                                    {
                                        error && !description && <div className='input-error'>Please enter gift card description</div>
                                    }
                                </div>


                                <div className="role_select mt-3">
                                    <label className="mb-2">Status</label>
                                    <div className="contct_no">
                                        <select
                                            className={`form-control ${error && !status ? "error-txt" : ""}`}
                                            value={status}
                                            onChange={(e) => { setStatus(e.target.value) }}
                                        >
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>
                                        </select>
                                    </div>
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
