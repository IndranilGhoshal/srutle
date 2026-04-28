import React from 'react'
import UsePagination from '../UsePagination'
import moment from 'moment'
import Image from 'next/image'
import ActivityLogsListSkeleton from '../_skeleton/ActivityLogsListSkeleton'

export default function ActivityLogsList({ list, limit, setlimit, handleChangePage, page, search, setSearch }) {
    return (
        <>
            <div className="bg-white shadow_d rounded-3">
                <div className="mast_hw_tab">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr role="row">
                                    <th align="left">Sl. No.</th>
                                    <th align="left">Event Name</th>
                                    <th align="left">Device </th>
                                    <th align="left">Device Type </th>
                                    <th align="left">Created At </th>
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
                                                        <td align="left">
                                                            <div className='txt-wp'>{item.eventName}</div>
                                                        </td>
                                                        <td align="left"><div className='prdcrd-txt-wp'>{item.userAgent}</div></td>
                                                        <td align="left"><div className='txt-wp'>{item.deviceType}</div></td>
                                                        <td align="left">{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
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
                                            {list == undefined && <ActivityLogsListSkeleton />}
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
                                <span>{list && list.length} logs{list && list.length > 1 ? "s" : ""} <strong>per page</strong></span>

                            </div>

                        </div>
                        <div className="paginati_r">
                            <UsePagination handleChangePage={handleChangePage} page={page} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
