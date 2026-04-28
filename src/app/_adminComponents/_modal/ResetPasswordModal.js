'use client'
import { adminResetPasswordApi } from '@/app/lib/apiService';
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, setPassData, showLoader } from '@/app/lib/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

export default function ResetPasswordModal({ id, show }) {

  const passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/
  const [validpasswordiconerror, setvalidpasswordiconerror] = useState(false)
  const [validpassworderror, setvalidpassworderror] = useState(false)

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [error, setError] = useState(false)
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');

  const router = useRouter();

  useEffect(() => {
    if (getLocalStorageData('admin')?.isfirstlogin == "1") {
      router.push("/admin/account");
    } else if (getLocalStorageData('admin')?.isfirstlogin == "0") {
      router.push("/admin/accountpassword");
      hideLoader()
    } else if (!getLocalStorageData("admin")) {
      router.push("/admin");
    }
  }, [])

  const handleSubmit = async () => {
    let err = 0;
    setError(false)
    setValidPassword(false)
    setvalidpassworderror(false)

    if (!confirmPassword || !password) {
      setError(true)
      err++
    }
    if (confirmPassword !== password) {
      setValidPassword(true)
      err++
    }
    if (!passwordformat.test(password)) {
      setvalidpassworderror(true)
      err++
    }
    if (err == 0) {
      showLoader()
      let data = { id, password, token:getLocalStorageData('admin')?.token, accountreset: true }
      let response = await adminResetPasswordApi(data)
      if (response.success) {
        const { result, message } = response;
        removeLocalStorageData('admin')
        setPassword('')
        setConfirmPassword('')
        setPassData(message)
        setLocalStorageData("admin", result)
        router.push("/admin/account");
      } else {
        hideLoader()
        toast.error(response.message)
      }
    }
  }

  const passwordChanged = () => {
    setvalidpasswordiconerror(false)
    var pwd = document.getElementById("txtPassword");
    if (pwd.value) {
      if (passwordformat.test(pwd.value)) {
        setvalidpasswordiconerror(true)
      }
    }
  }

  const handleClose = () => {
  };

  return (
    <>

      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
        size='md'
      >
        <Modal.Body style={{ padding: 0 }}>
          <div className="modal-content rst-pwd">
            <div className="modal-header border-0">
              <div className='d-flex justify-content-center mx-auto'>
                <Image
                  src="/assets/img/srutle-logo.png"
                  alt="Picture of the author"
                  width={250}
                  height={100}
                  className="d-block mx-auto"
                />
              </div>
            </div>
            <div className='d-flex justify-content-center mx-auto'>
              <h4 className='text-blue'>Reset Password</h4>
            </div>

            <div className="modal-body">

              <div className="frm-resetPass">
                <div className="role_select">
                  <label className="mb-2">Password <span className='acsts'>*</span></label>
                  <div className='frm-resetPass-inpt'>
                    <input
                      type={passwordType}
                      className={`form-control ${error && !password ? "error-txt" : ""} ${validPassword ? "error-txt" : ""}`}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                      id="txtPassword"
                      onKeyUp={() => { passwordChanged() }}
                    />
                    {
                      passwordType === 'password'
                        ?
                        <>
                          <i className="bi bi-eye-fill " onClick={() => { setPasswordType("text") }}></i>
                        </>
                        :
                        <>
                          <i className="bi bi-eye-slash-fill" onClick={() => { setPasswordType("password") }}></i>
                        </>
                    }
                  </div>

                  {
                    error && !password && <div className='input-error'>Please enter password</div>
                  }
                </div>
                <div className="role_select mt-3">
                  <label className="mb-2">Confirm Password <span className='acsts'>*</span></label>
                  <div className='frm-resetPass-inpt'>
                    <input
                      type={confirmPasswordType}
                      className={`form-control ${error && !confirmPassword ? "error-txt" : ""} ${validPassword ? "error-txt" : ""}`}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value) }}
                    />
                    {
                      confirmPasswordType === 'password'
                        ?
                        <>
                          <i className="bi bi-eye-fill " onClick={() => { setConfirmPasswordType("text") }}></i>
                        </>
                        :
                        <>
                          <i className="bi bi-eye-slash-fill" onClick={() => { setConfirmPasswordType("password") }}></i>
                        </>
                    }
                  </div>
                  {
                    error && !confirmPassword && <div className='input-error'>Please enter confirm password</div>
                  }
                  {
                    validPassword && !error && password && confirmPassword && <div className='input-error'>Password mismatch</div>
                  }
                  {
                    validpassworderror && !error && password && confirmPassword && <div className='input-error'>Enter valid password</div>
                  }
                </div>
                <div>
                  <ul className="pass-comp mt-3">
                    <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 8 character (letters & Numbers)</li>
                    <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 1 specila character (@ # $ % ! ^ & *)</li>
                    <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 1 capital letter (A to Z)</li>
                    <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 1 number (0-9)</li>
                  </ul>
                </div>
                <div className="add_btn mt-3">
                  <button type="button" className="btn btn-primary" onClick={() => { handleSubmit() }}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}
