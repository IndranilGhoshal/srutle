import { adminFaqApi } from '@/app/lib/apiService';
import { hideLoader, showLoader } from '@/app/lib/common';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';

export default function FAQModal({ onMessage, id }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [status, setStatus] = useState('0');
    const [error, setError] = useState(false)

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handleClose = () => {
        setQuestion('')
        setAnswer('')
        setStatus('0')
        setShow(false)
        setError(false)
    };


    const addEvent = async () => {
        let err = 0;
        setError(false)
        if (!question || !answer) {
            setError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = { question, answer, status, id, addfaq: true }
            let response = await adminFaqApi(data)
            if (response.success) {
                hideLoader()
                handleClose()
                setTimeout(() => {
                    onMessage(response.message, true)
                }, 150);
            } else {
                hideLoader()
                onMessage(response.message, false)
            }
        }
    }

    return (
        <>
            <button className="btn down_btn" onClick={() => { handleShow() }}><i className="bi bi-plus"></i> Add New</button>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                onHide={handleClose}
                size='lg'
            >
                <Modal.Body style={{ padding: 0 }}>
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className='text-blue'>Add FAQ</h4>
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
                                    <label className="mb-2">Question</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !question ? "error-txt" : ""}`}
                                        value={question}
                                        onChange={(e) => { setQuestion(e.target.value) }}
                                    />
                                    {
                                        error && !question && <div className='input-error'>Please enter question</div>
                                    }
                                </div>

                                <div className="role_select mt-3">
                                    <label className="mb-2">Answer</label>

                                    <textarea
                                        className={`form-control ${error && !answer ? "error-txt" : ""}`}
                                        value={answer}
                                        onChange={(e) => { setAnswer(e.target.value) }}
                                    >
                                    </textarea>
                                    {
                                        error && !answer && <div className='input-error'>Please enter answer</div>
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
