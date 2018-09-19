import ajax from './ajax.js'
// import store from '../store/store'
function send (url, data) {
    return ajax({
        url,
        data
    })
}
/* eslint-disable */
let getSlideshow = () => send('common/index/slideShowList')

let getTradeList = () => send('common/index/getTradeList')

let getProfessionList = () => send('common/index/getProfessionList')

let uploadImage = (serverIds) => send('common/index/uploadImage', { serverIds })

/* personal */
let register = (payload) => send('common/user/register', payload) // realName,sex,idCard,phone,area,education,headImageUrl,wantJob,expTime,expDetail

let login = (payload) => send('common/user/login', payload) // account, password

let logout = () => send('wap/user/logout')

let changePassword = (payload) => send('wap/user/changePassword', payload) // oldPassword, newPassword, repeatPassword

let getUserInfo = () => send('wap/user/getUserInfo')

let getApplyRecord = () => send('wap/user/getApplyRecord', {pageNo:1, pageSize:100})

let saveUserInfo = (payload) => send('wap/user/saveUserInfo', payload) // name,sex,idCard,phone,areaCode,education,headImageUrl,wantJob,expTime,expDetail

let certificateUpload = (urlList) => send('wap/user/cardUpload', { cardUrl: urlList.join(',') })


/* company */
let getCompanyInfo = (companyId) => send('common/company/getCompanyInfo', { companyId })

let findCompany = (payload) => send('common/company/findCompany', payload)  // companyName, areaCode, tradeName, pageNo, pageSize



/* job */

let findJob = (payload) => send('common/job/findJob', payload) // jobName, areaCode, tradeName, sortType, pageNo, pageSize

let getJobDetail = (jobId) => send('common/job/getDetail', { jobId })

let applyJob = (jobId) => send('wap/job/apply', { jobId })

// export * from './testData'

export {
    getSlideshow,
    getProfessionList,
    getTradeList,
    uploadImage,

    register,
    login,
    logout,
    changePassword,
    getUserInfo,
    getApplyRecord,
    saveUserInfo,
    certificateUpload,

    getCompanyInfo,
    findCompany,

    findJob,
    getJobDetail,
	applyJob,
}

