'use client'
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { adminResetPasswordApi } from '../lib/apiService';
import { getLocalStorageData, hideLoader, setPassData, showLoader } from '../lib/common';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ResetPasswordComponent({ id, expTime }) {
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
        if (!getLocalStorageData("admin") && id) {
            router.push("/admin/resetPassword/" + id);
            hideLoader()
        } else if (!getLocalStorageData("seller") && !id) {
            router.push("/admin/forgotpassword");
        } else {
            router.push("/admin/account");
        }
        let now = new Date().getTime();
        if (expTime < now) {
            setPassData("The link has already expired.")
            router.push("/admin/forgotpassword");
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
            let data = { id, password }
            let response = await adminResetPasswordApi(data)
            if (response.success) {
                setPassData(response.message)
                router.push("/admin");
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


    return (
        <>

            <div className="login-wrapper">
                <div className="d-flex justify-content-center mb-5">
                    <Image
                        src="/assets/img/srutle-logo.png"
                        alt="Picture of the author"
                        width={200}
                        height={200}
                        className="d-block mx-auto"
                    />
                </div>
                <div className="container-login p-0">
                    <div className="col-left">
                        <div className="login-text">
                            <h2>Welcome to Strutle</h2>
                            <p>&nbsp;</p>
                        </div>
                    </div>
                    <div className="col-right">
                        <div className="login-form">
                            <h2>Reset Password</h2>
                            <p className="position-relative">
                                <label>Enter Password<span>*</span></label>
                                <input
                                    id="txtPassword"
                                    type={passwordType}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    onKeyUp={() => { passwordChanged() }}
                                />
                                {
                                    passwordType === 'password'
                                        ?
                                        <>
                                            <button className="btn btn-vw" onClick={() => { setPasswordType("text") }}><i className="bi bi-eye-fill"></i></button>
                                        </>
                                        :
                                        <>
                                            <button className="btn btn-vw" onClick={() => { setPasswordType("password") }}><i className="bi bi-eye-slash-fill"></i></button>
                                        </>
                                }
                            </p>
                            {
                                error && !password && <div className='input-error'>Please enter password</div>
                            }
                            <p className="position-relative">
                                <label>Confirm Password<span>*</span></label>
                                <input
                                    type={confirmPasswordType}
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                />
                                {
                                    confirmPasswordType === 'password'
                                        ?
                                        <>
                                            <button className="btn btn-vw" onClick={() => { setConfirmPasswordType("text") }}><i className="bi bi-eye-fill"></i></button>
                                        </>
                                        :
                                        <>
                                            <button className="btn btn-vw" onClick={() => { setConfirmPasswordType("password") }}><i className="bi bi-eye-slash-fill"></i></button>
                                        </>
                                }
                            </p>
                            {
                                error && !confirmPassword && <div className='input-error'>Please enter confirm password</div>
                            }
                            {
                                validPassword && !error && password && confirmPassword && <div className='input-error'>Password mismatch</div>
                            }
                            {
                                validpassworderror && !error && password && confirmPassword && <div className='input-error'>Enter valid password</div>
                            }

                            <div>
                                <ul className="pass-comp mt-2">
                                    <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 8 character (letters & Numbers)</li>
                                    <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 1 specila character (@ # $ % ! ^ & *)</li>
                                    <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 1 capital letter (A to Z)</li>
                                    <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 1 number (0-9)</li>
                                </ul>
                            </div>


                            <div className="for-sign mt-3">
                                <label></label>
                                <button onClick={() => { handleSubmit() }}>Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    )
}
