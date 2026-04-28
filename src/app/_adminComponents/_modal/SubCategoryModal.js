'use client'
import React, { useEffect, useState } from 'react'
import { categoryApi, subcategoryApi, uploadImageApi } from '@/app/lib/apiService';
import { hideLoader, showLoader } from '@/app/lib/common';
import Image from 'next/image'
import { resizeFile } from '@/app/lib/ImageCroper';
import { Modal } from 'react-bootstrap';

export default function SubCategoryModal({ onMessage, isedit }) {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [mstcategoryid, setMstcategoryid] = useState('');
    const [status, setStatus] = useState('0');
    const [error, setError] = useState(false)

    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = async () => {
        let data = { list: true, dropdown: true }
        let response = await categoryApi(data)
        if (response.success) {
            let res = response.result
            setCategoryList(res)
        } else {
            setCategoryList([])
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

    const handleClose = () => {
        setName('')
        setImage('')
        setMstcategoryid('')
        setStatus('0')
        setError(false)
        setShow(false)
    };

    const addEvent = async () => {
        let err = 0;
        setError(false)
        if (!name || !mstcategoryid) {
            setError(true)
            err++
        }
        if (err == 0) {
            let data = { name, image, mstcategoryid, status, add: true }
            let response = await subcategoryApi(data)
            if (response.success) {
                handleClose()
                onMessage(response.message, false, true)
            } else {
                onMessage(response.message, false, false)
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
                            <h4 className='text-blue'>Add Sub-Category</h4>
                            <button
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
                                                <Image
                                                    src={"/upload/" + image}
                                                    width={100}
                                                    height={100}
                                                    alt='aaddsd'
                                                />
                                                :
                                                <Image
                                                    src={"/assets/img/sub-category-icon.png"}
                                                    width={60}
                                                    height={60}
                                                    alt='category'
                                                />
                                        }
                                    </span>
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Upload Photo</label>
                                    <input
                                        type="file"
                                        name="file"
                                        className={`form-control`}
                                        onChange={(e) => { uploadImg(e.target.files?.[0]) }}
                                    />
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Sub-Category Name <span className='acsts'>*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !name ? "error-txt" : ""}`}
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        maxLength={25}
                                    />
                                    {
                                        error && !name && <div className='input-error'>Please enter sub category name</div>
                                    }
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Category Name <span className='acsts'>*</span></label>
                                    <select
                                        className={`form-select ${error && !mstcategoryid ? "error-txt" : ""}`}
                                        value={mstcategoryid}
                                        onChange={(e) => { setMstcategoryid(e.target.value) }}
                                    >
                                        <option>Select</option>
                                        {
                                            categoryList && categoryList.map((item, i) => (
                                                <option key={i} value={item._id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        error && !mstcategoryid && <div className='input-error'>Please select category</div>
                                    }
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Status</label>
                                    <div className="contct_no">
                                        <select
                                            className={`form-select ${error && !status ? "error-txt" : ""}`}
                                            value={status}
                                            onChange={(e) => { setStatus(e.target.value) }}
                                        >
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="add_btn">
                                    <button type="button" className="btn btn-primary" onClick={() => { addEvent() }}>Add</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
