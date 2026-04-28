'use client'
var $ = require("jquery");
import moment from 'moment'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UsePagination from '../UsePagination';
import { adminFaqApi, admintutorialApi } from '@/app/lib/apiService';
import Image from 'next/image';
import { getEditPermission, getLocalStorageData, getNameFirstLetter, showLoader } from '@/app/lib/common';
import FaqTopicListSkeleton from '../_skeleton/FaqTopicListSkeleton';
import TutorialListSkeleton from '../_skeleton/TutorialListSkeleton';

export default function TutorialList({
    list, limit, setlimit, handleChangePage, page, search, setSearch, onMessage, isedit, setStatus, status, onStatus, goto
}) {
    const [id, setId] = useState('');
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [statusVal, setStatusVal] = useState('0');
    const [error, setError] = useState(false)

    const [show, setShow] = useState(false);
    const handleDeleteClose = () => {
        setShow(false)
        setId("")
    };
    const handleShow = () => setShow(true);

    const editEvent = async () => {
        let err = 0;
        setError(false)
        if (!url || !title || !description) {
            setError(true)
            err++
        }
        if (err == 0) {
            let data = { id, url, title, description, status: statusVal, editfaqtopic: true }
            let response = await admintutorialApi(data)
            if (response.success) {
                handleEditClose()
                setTimeout(() => {
                    onMessage(response.message, true)
                }, 200);
            } else {
                setTimeout(() => {
                    onMessage(response.message, false)
                }, 200);
            }
        }
    }

    const [editshow, setEditShow] = useState(false);

    const handleEditShow = (item) => {
        setEditShow(true);
        setId(item._id),
            setUrl(item.url),
            setTitle(item.title),
            setDescription(item.description),
            setStatusVal(item.status)
    };

    const handleEditClose = () => {
        setId("")
        setTitle('')
        setUrl('')
        setDescription('')
        setStatusVal('0')
        setError(false)
        setEditShow(false)
    };

    return (
        <>
            <div className="mastr_hw">
                <div className="assects_src_dv position-relative">
                    <label>Search</label>
                    <input
                        type="text"
                        className="form-control"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder='Search by Tutorial'
                    /><button className="btn no-bg"><i className="bi bi-search"></i></button>
                </div>
                <div className="assects_src_dvadd">
                    <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Filter List <i className="bi bi-sliders"></i></button>
                    <div className="dropdown-menu dropdown-menu-end">
                        <div className="filter-lists">
                            <label>Filter by Status</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => { setStatus(e.target.value) }}
                            >
                                <option value="">Select Status</option>
                                <option value="0">Active</option>
                                <option value="1">Inactive</option>
                            </select>
                        </div>

                    </div>

                </div>
            </div>
            <div className="bg-white shadow_d rounded-3">

                <div className="mast_hw_tab">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr role="row">
                                    <th align="left">Sl. No.</th>
                                    <th align="left">Title</th>
                                    <th align="left">Desctiption</th>
                                    <th align="left">Video Url</th>
                                    <th align="left">Created at <i style={{ cursor: "pointer" }} className="bi bi-arrow-down-up" onClick={() => { createdatsortFun() }}></i></th>
                                    <th align="left">Status</th>
                                    <th align="left">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    list !== undefined ?
                                        <>
                                            {
                                                list.length > 0 ? list.map((item, i) => (
                                                    <tr role="row" key={i}>
                                                        <td style={{ textAlign: "left" }} align="left">{i + 1}</td>
                                                        <td align="left" className='lst-td'>
                                                            <div className='txt-wp'>{item.title}</div>
                                                        </td>
                                                        <td align="left"><div className='txt-wp'>{item.description}</div></td>
                                                        <td align="left"><div className='txt-wp'>{item.url}</div></td>
                                                        <td align="left">{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                        <td align="left">
                                                            <span className={`${item.status == "0" ? "text-success" : "text-danger"}`}>{item.status == "0" ? "Active" : "Inactive"} </span>
                                                            <button
                                                                className="btn btn-dwn p-0 dropdown-toggle"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                                disabled={isedit}
                                                            >
                                                                <i className="bi bi-chevron-down"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                {item.status == "0" ? <></> : <a className="dropdown-item text-success" onClick={() => { onStatus("0", item._id) }}>Active</a>}
                                                                {item.status == "1" ? <></> : <a className="dropdown-item text-danger" onClick={() => { onStatus("1", item._id) }}>Inactive</a>}

                                                                {item.status == "0" ? <></> : <a className="dropdown-item text-secondary" onClick={() => { setId(item._id), handleShow() }}>Delete</a>}

                                                            </div>
                                                        </td>
                                                        <td align="left">
                                                            <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <div className="filter-lists">
                                                                    <div className='edtbtn'>
                                                                        <button onClick={() => { handleEditShow(item) }} disabled={isedit}>
                                                                            <i className="bi bi-pencil-square me-2"></i> Edit Tutorial
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                ))
                                                    :
                                                    <tr className='no-data' >
                                                        <td colSpan={7} >
                                                            <Image
                                                                src="/assets/img/no-data.png"
                                                                width={500}
                                                                height={100}
                                                                alt='asd'
                                                            />
                                                        </td>
                                                    </tr>
                                            }
                                        </>
                                        :
                                        <>
                                            {list == undefined && <TutorialListSkeleton />}
                                        </>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="paginati">
                        <div className="paginati_l">


                            <div className="dataTables_length d-flex align-items-center" id="datatables-reponsive_length">
                                <label>View </label>
                                <select
                                    name="datatables-reponsive_length"
                                    aria-controls="datatables-reponsive"
                                    className="form-select form-select-sm"
                                    value={limit}
                                    onChange={(e) => { setlimit(e.target.value) }}
                                >
                                    {
                                        limit && ["10", "15", "30", "50", "100"].map((item, i) => (
                                            <option key={i} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                                <span>{list && list.length} faq{list && list.length > 1 ? "s" : ""} <strong>per page</strong></span>

                            </div>

                        </div>
                        <div className="paginati_r">
                            <UsePagination handleChangePage={handleChangePage} page={page} />
                        </div>
                    </div>
                </div>

            </div>


            <Modal
                show={editshow}
                backdrop="static"
                keyboard={false}
                onHide={handleEditClose}
                size='md'
            >
                <Modal.Body style={{ padding: 0 }}>
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className='text-blue'>Edit Tutorial</h4>
                            <button
                                onClick={() => { handleEditClose() }}
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
                                        maxLength={25}
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
                                    <button type="button" className="btn btn-primary" onClick={editEvent}>Update</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                onHide={handleDeleteClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete this tutorial?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleDeleteClose() }}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => { onStatus("2", id), handleDeleteClose() }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
