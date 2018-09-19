import ajax from './ajax.js'
import store from '../store/store'

let getIndexData = () => {
    return ajax({
        url: '/wap/ticketWap/getTicketDateInfo'
    })
}
let getNotice = () => {
    return ajax({
        url: '/wap/ticketWap/getNotice'
    })
}
let addContactInfo = ({name, phone, sex, area, remark}) => {
    return ajax({
        url: '/wap/user/addContact',
        data: {
            name: name,
            phone: phone,
            sex: sex,
            areaCode: area,
            remark: remark,
        }
    })
}
let scanLogin = ({username, password}) => {
    return ajax({
        url: '/common/worker/login',
        data: {
            username: username,
            password: password
        },
        error: (data) => {
            if (data.status === 102) {
                alert('用户名或密码错误')
            }
        }
    })
}
let addSelectedInfo = ({contactName, contactPhone, dayNumber, entryTime, guide, teamName, type, count, sort}) => {
    return ajax({
        url: '/wap/ticketWap/signUp',
        data: {
            contactName: contactName,
            contactPhone: contactPhone,
            dayNumber: dayNumber,
            entryTime: entryTime,
            guide: guide,
            teamName: teamName,
            type: type,
            count: count,
            sort: sort,
        },
        error: (data) => {
            if (data.status === 700) {
                alert('您今天已经报名过了')
            } else if (data.status === 307) {
                alert('手机号验证未通过')
            } else if (data.status === 701) {
                alert('您已报名过该时间段')
            }
        }
    })
}
let getVisitNum = () => {
    return ajax({
        url: '/common/worker/getTodayNumber'
    })
}
let getTicketsRecord = ({pageNo = 1, pageSize = 100}) => {
    return ajax({
        url: '/wap/ticketWap/findRecord',
        data: {
            pageNo: pageNo,
            pageSize: pageSize
        }
    })
}
let refundTicket = ({ticketNumber}) => {
    return ajax({
        url: '/wap/ticketWap/returnTicket',
        data: {
            ticketNumber: ticketNumber,
        }
    })
}
let changeTicket = ({ticketNumber, peopleCount, remark}) => {
    return ajax({
        url: '/common/worker/changeTicket',
        data: {
            ticketNumber: ticketNumber,
            peopleCount: peopleCount,
            remark: remark
        },
        error: (data) => {
            // alert(JSON.stringify(data))
            let status = parseInt(data.status)
            store.commit('setScanStatus', status)
        }
    })
}
let addRealPeople = ({peopleCount, remark}) => {
    return ajax({
        url: '/wap/ticketWap/addRealPeople',
        data: {
            peopleCount: peopleCount,
            remark: remark
        }
    })
}
let getTicketDetail = ({id}) => {
    return ajax({
        url: '/wap/ticketWap/returnSignUp',
        data: {
            id: id
        }
    })
}
let getTicketScanInfo = ({ticketNumber}) => {
    return ajax({
        url: '/common/worker/getCodeUrl',
        data: {
            ticketNumber: ticketNumber
        }
    })
}
let setUserUuid = ({userUuid}) => {
    return ajax({
        url: '/common/user/addUserUuid',
        data: {
            userUuid
        }
    })
}
// export * from './testData'
export {
    getIndexData, // 首页数据
    getNotice, // 获取首页公告
    addContactInfo, // 添加联系人
    scanLogin, // 工作人员登陆
    addSelectedInfo, // 报名
    getVisitNum, // 获取今天实际参观人数
    getTicketsRecord, // 购票记录
    refundTicket,  // 退票
    changeTicket, // 核销扫一扫
    addRealPeople, // 手动添加人数核销
    getTicketDetail, // 获取具体票详情
    getTicketScanInfo, // 获取扫一扫后的详细数据
    setUserUuid, // 获取南方+uuid给后台
}
