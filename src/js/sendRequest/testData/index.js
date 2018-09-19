let img1 = require('@/assets/devImg/banner.png'),
    img2 = require('@/assets/devImg/400X400.png'),
    avatar = require('@/assets/devImg/avatar.png'),
    companyList = [],
    jobList = [],
    slideshow = [],
    professionList = [],
    tradeList = [],
    applyRecord = []

let userInfo = {
    name: '阿嫂我',
    sex: 1,
    idCard: '441423199050505141',
    phone: '13750415241',
    areaCode: '440604',
    wantJob: 2,
    expTime: 1,
    expDetail: '哦题图哦i我就额头i我就额头i舞台剧哦i',
    cardUrl: [img1, img2].join(','),
    headImageUrl: avatar,
    education: 3
}

for (let i = 1; i < 50; i++) {
    companyList.push({
        id: i,
        logoUrl: img1,
        companyName: '云端信息',
        areaCode: i % 12 + 1,
        tradeId: i % 5 + 1,
        personCount: i % 4 + 1,
        addressDetail: '广东省佛山市禅城区祖庙街道XXXXXXXXX号',
        companyPhone: '1385242152',
        introduction: '奥迪减肥我就额头陪我图片问题去品味u去品味',
        jobCount: 23,
    })
    jobList.push({
        id: i,
        jobName: 'java开发工程师',
        introduction: '招聘介绍java工程师啊索菲教师节佛教阿富',
        requirement: '认知要求奥的手机佛啊四季度佛i就是都覅',
        personCount: i,
        areaCode: i % 12 + 1,
        education: i % 5 + 1,
        endDate: '2017-04-02',
        profession: i % 5 + 1,
        companyName: '云端创意',
        companyId: i,
        expTime: i % 5 + 1,
        salary: '12.0 - 10.2',
        datetime: '2017-01-01 14:23:01',
        state: i % 2
    })
    applyRecord.push({
        id: i,
        datetime: '2015-01-02 14:14:01',
        jobName: 'web前端开发',
        companyName: '云端创意',
        jobId: i,
        companyId: i
    })
    if (i < 6) {
        slideshow.push({
            id: i,
            imageUrl: i % 2 ? img1 : img2
        })
        professionList.push({
            id: i,
            profession: '第' + i + '类工程师',
        })
        tradeList.push({
            id: i,
            tradeName: '第' + i + '类行业',
        })
    }
}

let mock = (data) => {
    console.log('mock: ')
    console.log(data)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data)
        }, 500)
    })
}

let mockPagination = (arg, list) => {
    let { pageNo, pageSize } = arg[0]
    return mock({
        rowCount: list.length,
        pageCount: Math.ceil(list.length / pageSize),
        pageSize,
        pageNo,
        list: list.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    })
}

/* product */
let getSlideshow = () => mock(slideshow)

let getProfessionList = () => mock(professionList)

let getTradeList = () => mock(tradeList)

let uploadImage = () => mock([img1, img2])

/* personal */
let register = () => mock()

let login = () => mock(userInfo)

let logout = () => mock()

let changePassword = () => mock()

let getUserInfo = () => mock(userInfo)

let getApplyRecord = function () { return mockPagination(arguments, applyRecord) }

let saveUserInfo = () => mock()

let certificateUpload = () => mock()

/* company */
let getCompanyInfo = (companyId) => mock(companyList[companyId - 1])

let findCompany = function () { return mockPagination(arguments, companyList) }

/* job */
let findJob = function () { return mockPagination(arguments, jobList) }

let getJobDetail = (jobId) => mock(jobList[jobId - 1])

let applyJob = (jobId) => mock()

export {
    getSlideshow,
    getTradeList,
    getProfessionList,
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
