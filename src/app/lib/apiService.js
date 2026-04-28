import { useRouter } from "next/navigation";
import { dencryptFunction, encryptFunction, getLocalStorageData, removeLocalStorageData, setPassData, showLoader } from "./common";
import { BASE_URL, PAYLOAD_DECRYCT, PAYLOAD_ENCRYCT } from "./config";
import { DeviceDetails } from "./device";
import axios from 'axios';
import { getPost } from "./postApi";

const baseURL = BASE_URL;
const encrypt = PAYLOAD_ENCRYCT;
const decrypt = PAYLOAD_DECRYCT;

axios.interceptors.request.use(function (config) {
    if (getLocalStorageData('admin')?._id) {
        config.headers.Authorization = getLocalStorageData('admin').token
        if (getLocalStorageData("admin")?._id && config.method === 'post') {
            config.data.userid = getLocalStorageData("admin")._id
        }
    }
    if (getLocalStorageData('seller')?._id) {
        config.headers.Authorization = getLocalStorageData('seller').token
        if (getLocalStorageData("seller")?._id && config.method === 'post') {
            config.data.userid = getLocalStorageData("seller")._id
        }
    }
    if (getLocalStorageData('consumer')?._id) {
        config.headers.Authorization = getLocalStorageData('consumer').token
        if (getLocalStorageData("admin")?._id && config.method === 'post') {
            config.data.userid = getLocalStorageData("consumer")._id
        }
    }
    if (encrypt && config.method === 'post') {
        var ciphertext = encryptFunction(config.data);
        let payloadData = {
            "payload": ciphertext
        }
        config.data = payloadData;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(async (response) => {
    if (decrypt) {
        var res = dencryptFunction(response.data)
        response.data = res
    }
    if (getLocalStorageData('admin')?._id && response.data.status == "401") {
        adminlogoutEvent()
        removeLocalStorageData("admin")
        removeLocalStorageData("pathName")
        removeLocalStorageData("adminrole")
        removeLocalStorageData('col-key');
        removeLocalStorageData('isEdit');
        window.location.href = baseURL + "/admin?session=error";
    }
    if (getLocalStorageData('seller')?._id && response.data.status == "401") {
        removeLocalStorageData("seller")
        removeLocalStorageData("pathName")
        window.location.href = baseURL + "/seller?session=error";
    }
    return response
})

export const axiosInstance = axios.create({
    baseURL: baseURL,
})

const adminlogoutEvent = async () => {
    showLoader()
    let logResp = await adminEvent("Logout")
}

export const adminLoginApi = async (data) => {
    return getPost(baseURL + '/api/admin/login', data)
}

export const adminEvent = async (evn) => {
    const data = {
        mstAdminId: getLocalStorageData("admin")._id,
        userAgent: DeviceDetails().user_agent,
        eventName: evn,
        deviceType: DeviceDetails().device_type,
        status: "0",
    }
    return getPost(baseURL + '/api/admin/event', data)
}


export const adminForgotPasswordApi = async (data) => {
    return getPost(baseURL + '/api/admin/forgotpassword', data)
}

export const adminResetPasswordApi = async (data) => {
    return getPost(baseURL + '/api/admin/resetpassword', data)
}

export const adminMenuApi = async (data) => {
    return getPost(baseURL + '/api/admin/menu', data)
}

export const adminAddRoleApi = async (data) => {
    return getPost(baseURL + '/api/admin/role', data)
}

export const admingiftcardApi = async (data) => {
    return getPost(baseURL + '/api/admin/giftcard', data)
}

export const menuApi = async (data) => {
    return getPost(baseURL + '/api/admin/menu', data)
}

export const adminAddAdminApi = async (data) => {
    return getPost(baseURL + '/api/admin/useradmin', data)
}


export const uploadImageApi = async (data) => {
    try {
        let response = await fetch(baseURL + "/api/uploadfile", {
            method: "POST",
            body: data
        });
        return response = await response.json();
    } catch (e) {
        return null
    }
}

export const categoryApi = async (data) => {
    return getPost(baseURL + '/api/admin/category', data)
}

export const subcategoryApi = async (data) => {
    return getPost(baseURL + '/api/admin/subcategory', data)
}

export const producttypeApi = async (data) => {
    return getPost(baseURL + '/api/admin/producttype', data)
}

export const sellerApi = async (data) => {
    return getPost(baseURL + '/api/admin/seller', data)
}

export const consumerApi = async (data) => {
    return getPost(baseURL + '/api/admin/consumer', data)
}

export const partnerApi = async (data) => {
    return getPost(baseURL + '/api/admin/partner', data)
}

export const consumerloginapi = async (data) => {
    return getPost(baseURL + '/api/consumer/login', data)
}

export const consumercategoryapi = async (data) => {
    return getPost(baseURL + '/api/consumer/category', data)
}

export const consumeruserapi = async (data) => {
    return getPost(baseURL + '/api/consumer/user', data)
}

export const productlistapi = async (data) => {
    return getPost(baseURL + '/api/consumer/productlist', data)
}

export const productapi = async (data) => {
    return getPost(baseURL + '/api/consumer/product', data)
}

export const menuapi = async (data) => {
    return getPost(baseURL + '/api/consumer/menu', data)
}

export const cartapi = async (data) => {
    return getPost(baseURL + '/api/consumer/cart', data)
}

export const pincodeapi = async (pincode) => {
    try {
        let response = await fetch("https://api.postalpincode.in/pincode/" + pincode)
        return response = await response.json();
    } catch (e) {
        return null
    }
}

export const shippingaddressapi = async (data) => {
    return getPost(baseURL + '/api/consumer/shippingaddress', data)
}

export const favouriteapi = async (data) => {
    return getPost(baseURL + '/api/consumer/favourite', data)
}

export const orderapi = async (data) => {
    return getPost(baseURL + '/api/consumer/order', data)
}

export const productreviewapi = async (data) => {
    return getPost(baseURL + '/api/consumer/productreview', data)
}

export const reviewapi = async (data) => {
    return getPost(baseURL + '/api/consumer/review', data)
}

export const giftcardApi = async (data) => {
    return getPost(baseURL + '/api/consumer/giftcard', data)
}

export const sellerloginapi = async (data) => {
    return getPost(baseURL + '/api/seller/login', data)
}

export const sellerorderapi = async (data) => {
    return getPost(baseURL + '/api/seller/order', data)
}

export const sellershippingapi = async (data) => {
    return getPost(baseURL + '/api/seller/shipping', data)
}

export const getgstapi = async (gstno) => {
    // let result
    // await axios.get("https://razorpay.com/api/gstin/"+gstno,{
    // 	mode: 'no-cors',
    // }).then(res => { result = res.data })
    // return result
    // fetch("https://razorpay.com/api/gstin/" + gstno,
    //     {
    //         referrer: "https://razorpay.com/api/gstin/" + gstno,
    //         credentials: 'include',
    //         mode: 'no-cors',
    //         referrerPolicy: "no-referrer-when-downgrade",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*",
    //             "X-Aequseted-With": "XMLHttpRequest",
    //         }
    //     }).catch(err =>
    //         console.log(err)
    //     )
    //     .then(function (response) {
    //         console.log(response);
    //     }).then(function (result) {
    //         console.log(result)
    //     });

}
export const getifscapi = async (data) => {
    try {
        let result
        await axios.get("https://ifsc.razorpay.com/" + data)
            .then(res => {
                result = res.data
            })
            .catch(error => {
                result = null
            })
        return result
    } catch (e) {
        return null
    }
}


export const sellersignupapi = async (data) => {
    return getPost(baseURL + '/api/seller/signup', data)
}

export const sellerForgotPasswordApi = async (data) => {
    return getPost(baseURL + '/api/seller/forgotpassword', data)
}

export const sellerResetPasswordApi = async (data) => {
    return getPost(baseURL + '/api/seller/resetpassword', data)
}

export const sellerDashboardApi = async (data) => {
    return getPost(baseURL + '/api/seller/dashboard', data)
}

export const sellerSettingsApi = async (data) => {
    return getPost(baseURL + '/api/seller/settings', data)
}

export const adminSettingsApi = async (data) => {
    return getPost(baseURL + '/api/admin/settings', data)
}

export const catelogcategoryapi = async (data) => {
    return getPost(baseURL + '/api/seller/catelogs', data)
}

export const adminPrivacyPolicyApi = async (data) => {
    return getPost(baseURL + '/api/admin/privacypolicy', data)
}

export const consumerPrivacyPolicyApi = async (data) => {
    return getPost(baseURL + '/api/consumer/privacypolicy', data)
}

export const sellerPrivacyPolicyApi = async (data) => {
    return getPost(baseURL + '/api/seller/privacypolicy', data)
}

export const adminTermsandConditionsApi = async (data) => {
    return getPost(baseURL + '/api/admin/termscondition', data)
}

export const consumerTermsandConditionsApi = async (data) => {
    return getPost(baseURL + '/api/consumer/termscondition', data)
}

export const sellerTermsandConditionsApi = async (data) => {
    return getPost(baseURL + '/api/seller/termscondition', data)
}

export const adminCatelogApi = async (data) => {
    return getPost(baseURL + '/api/admin/catelogs', data)
}

export const adminFaqApi = async (data) => {
    return getPost(baseURL + '/api/admin/faq', data)
}

export const consumerFaqApi = async (data) => {
    return getPost(baseURL + '/api/consumer/faq', data)
}

export const adminactivitylogApi = async (data) => {
    return getPost(baseURL + '/api/admin/activitylogs', data)
}

export const admintutorialApi = async (data) => {
    return getPost(baseURL + '/api/admin/tutorial', data)
}

export const consumertutorialApi = async (data) => {
    return getPost(baseURL + '/api/consumer/tutorial', data)
}

export const admindashboardApi = async (data) => {
    return getPost(baseURL + '/api/admin/dashboard', data)
}