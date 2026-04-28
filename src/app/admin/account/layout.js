'use client'
import MenuSkeleton from '@/app/_adminComponents/_skeleton/MenuSkeleton'
import AdminAccountHeader from '@/app/_adminComponents/AdminAccountHeader'
import { adminMenuApi, menuApi } from '@/app/lib/apiService'
import { getLocalStorageData, getPassData, removeLocalStorageData, setLocalStorageData, setPassData, showLoader } from '@/app/lib/common'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


export default function Layout({ children }) {

  const path = usePathname()

  const router = useRouter()
  const [menu, setMenu] = useState([])

  useEffect(() => {
    getMenu()
  }, [])

  const getMenu = async () => {
    let response = await menuApi({ mstRolesId: getLocalStorageData('admin')?.mstroleid, list: true });
    if (response.success) {
      let res = response.result
      res.sort((a, b) => a.sequence - b.sequence);
      let t = []
      let fisrtmenu 
      for (let [i, r] of res.entries()) {
        let data = {
          "_id": r._id,
          "menuName": r.menuName,
          "menuIcon": r.menuIcon,
          "menuUrl": r.menuUrl,
          sequence: r.sequence,
          "submenu": r.submenu,
          "isEdit": r.isEdit,
          "isView": r.isView,
          "collapse": getLocalStorageData('col-key') == i ? true : false
        }
        if(r.sequence == "1"){
          fisrtmenu = data
        }
        t.push(data)
      }
      setMenu(t)
      let getPath = getLocalStorageData('pathName')
      if (!getPath) {
        setLocalStorageData('pathName', fisrtmenu.menuUrl)
        setLocalStorageData('isEdit', fisrtmenu.isEdit)
        let getPath = getLocalStorageData('pathName')
        router.push("/admin/account" + getPath)
      }else{
        router.push("/admin/account" + getPath)
      }
    } else {
      setMenu([])
    }
  }

  const goto = (path) => {
    showLoader()
    router.push("/admin/account" + path)
    removeLocalStorageData("pathName")
    setLocalStorageData('pathName', path)
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  const getCollapse = (index) => {
    let m = [...menu]
    let t = []
    let f = []
    for(let tt of m){
      tt.collapse = false
      t.push(tt)
    }
    for (let [i, obj] of t.entries()) {
      if (i == index) {
        obj.collapse = true
      }
      f.push(obj)
    }
    setMenu(f)
  }

  const removeCollapse = () => {
    removeLocalStorageData('col-key');
    let m = [...menu]
    let t = []
    for (let [i, r] of m.entries()) {
      let data = {
        "_id": r._id,
        "menuName": r.menuName,
        "menuIcon": r.menuIcon,
        "menuUrl": r.menuUrl,
        "submenu": r.submenu,
        "isEdit": r.isEdit,
        "isView": r.isView,
        "collapse": getLocalStorageData('col-key') == i ? true : false
      }
      t.push(data)
    }
    setMenu(t)
  }

  const setEdit = (edit) => {
    removeLocalStorageData("isEdit")
    setLocalStorageData('isEdit', edit)
  }

  return (
    <>
      <div className={`wrapper dashboardSection`}>
        <nav id="sidebar-new" className="sidebar-new">
          <div className="sidebar-content" id="sidebar-sticky">

            <div className="sidebar-brand text-start">
              <Image
                src="/assets/img/srutle-logo.png"
                alt="bell"
                width={100}
                height={100}
                className="d-inline-block align-middle"
              />
            </div>
            {
              menu && menu.length > 0 ? menu.map((item, i) => (
                <div key={i} className="accordion accordion-flush" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      {
                        item.submenu.length > 0 ?
                          <>
                            <button
                              className={`accordion-button ${!item.collapse ? "collapsed" : ""}`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={"#flush-collapseOne" + i}
                              aria-expanded="false"
                              aria-controls={"flush-collapseOne" + i}
                              onClick={() => { getCollapse(i); setEdit(item.isEdit) }}
                            >
                              <Image
                                src={"/assets/img/" + item.menuIcon}
                                alt="bell"
                                width={14}
                                height={14}
                                className="d-inline-block align-middle me-2"
                              />
                              <span className='text-blue'>{item.menuName}</span>
                            </button>
                          </>
                          :
                          <>
                            <button
                              className={`accordion-button non ${path == "/admin/account" + item.menuUrl ? "actived" : ""}`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={"#flush-collapseOne" + i}
                              aria-expanded="false"
                              aria-controls={"flush-collapseOne" + i}
                              onClick={() => { goto(item.menuUrl); setEdit(item.isEdit); removeCollapse(); }}
                            >
                              <Image
                                src={"/assets/img/" + item.menuIcon}
                                alt="bell"
                                width={14}
                                height={14}
                                className="d-inline-block align-middle me-2"
                              />
                              <span className='text-blue'>{item.menuName}</span>
                            </button>
                          </>
                      }
                    </h2>
                    {
                      item.submenu.length > 0 ? <div
                        id={"flush-collapseOne" + i}
                        className={`accordion-collapse collapse ${item.collapse ? "show" : ""}`}
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"

                      >
                        <div className="accordion-body">
                          {
                            item.submenu.map((obj, index) => (
                              <div
                                className={`submenu-btn ${path == "/admin/account" + obj.submenurl ? "actived" : ""}`}
                                key={index}
                                onClick={() => { goto(obj.submenurl); setLocalStorageData('col-key', i); }}
                              >
                                <Image
                                  src={"/assets/img/" + obj.submenuicon}
                                  alt="bell"
                                  width={14}
                                  height={14}
                                  className="d-inline-block align-middle me-2"
                                />
                                {obj.submenuname}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                        : null
                    }
                  </div>
                </div>
              ))
                :
                <MenuSkeleton />
            }
          </div>

        </nav>
        <div className="main">
          <AdminAccountHeader />
          <main className="content">
            {children}
          </main>
        </div>
      </div >
      <ToastContainer />
    </>
  )
}
