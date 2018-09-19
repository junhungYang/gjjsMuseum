let getIndexData = () => {
    return new Promise((resolve) => {
        resolve(
            {
                'phone': '18924563266',
                'week': [
                    {
                        'amTicket': 200,
                        'times': [
                            {
                                'time': '9:30-10:30',
                                'teamRemain': 2
                            },
                            {
                                'time': '10:30-11:30',
                                'teamRemain': 2
                            },
                            {
                                'time': '14:00-15:00',
                                'teamRemain': 5
                            },
                            {
                                'time': '15:00-16:00',
                                'teamRemain': 2
                            },
                            {
                                'time': '16:00-17:00',
                                'teamRemain': 5
                            }
                        ],
                        'pmTicket': 211,
                        'day': '六',
                        'date': '2018-01-20'
                    },
                    {
                        'amTicket': 444,
                        'times': [
                            {
                                'time': '9:30-10:30',
                                'teamRemain': 8
                            },
                            {
                                'time': '10:30-11:30',
                                'teamRemain': 9
                            },
                            {
                                'time': '14:00-15:00',
                                'teamRemain': 8
                            },
                            {
                                'time': '15:00-16:00',
                                'teamRemain': 7
                            },
                            {
                                'time': '16:00-17:00',
                                'teamRemain': 7
                            }
                        ],
                        'pmTicket': 744,
                        'day': '日',
                        'date': '2018-01-21'
                    },
                    {
                        'amTicket': 0,
                        'times': [
                            {
                                'time': '9:30-10:30',
                                'teamRemain': 0
                            },
                            {
                                'time': '10:30-11:30',
                                'teamRemain': 0
                            },
                            {
                                'time': '14:00-15:00',
                                'teamRemain': 0
                            },
                            {
                                'time': '15:00-16:00',
                                'teamRemain': 0
                            },
                            {
                                'time': '16:00-17:00',
                                'teamRemain': 0
                            }
                        ],
                        'pmTicket': 0,
                        'day': '一',
                        'date': '2018-01-22'
                    },
                    {
                        'amTicket': 0,
                        'times': [
                            {
                                'time': '9:30-10:30',
                                'teamRemain': 0
                            },
                            {
                                'time': '10:30-11:30',
                                'teamRemain': 2
                            },
                            {
                                'time': '14:00-15:00',
                                'teamRemain': 2
                            },
                            {
                                'time': '15:00-16:00',
                                'teamRemain': 5
                            },
                            {
                                'time': '16:00-17:00',
                                'teamRemain': 4
                            }
                        ],
                        'pmTicket': 0,
                        'day': '二',
                        'date': '2018-01-23'
                    },
                    {
                        'amTicket': 1,
                        'times': [
                            {
                                'time': '9:30-10:30',
                                'teamRemain': 4
                            },
                            {
                                'time': '10:30-11:30',
                                'teamRemain': 5
                            },
                            {
                                'time': '14:00-15:00',
                                'teamRemain': 8
                            },
                            {
                                'time': '15:00-16:00',
                                'teamRemain': 4
                            },
                            {
                                'time': '16:00-17:00',
                                'teamRemain': 1
                            }
                        ],
                        'pmTicket': 5,
                        'day': '三',
                        'date': '2018-01-24'
                    },
                    {
                        'amTicket': 2,
                        'times': [
                            {
                                'time': '9:30-10:30',
                                'teamRemain': 5
                            },
                            {
                                'time': '10:30-11:30',
                                'teamRemain': 4
                            },
                            {
                                'time': '14:00-15:00',
                                'teamRemain': 6
                            },
                            {
                                'time': '15:00-16:00',
                                'teamRemain': 5
                            },
                            {
                                'time': '16:00-17:00',
                                'teamRemain': 4
                            }
                        ],
                        'pmTicket': 1,
                        'day': '四',
                        'date': '2018-01-25'
                    },
                    {
                        'amTicket': 2,
                        'times': [
                            {
                                'time': '9:30-10:30',
                                'teamRemain': 8
                            },
                            {
                                'time': '10:30-11:30',
                                'teamRemain': 7
                            },
                            {
                                'time': '14:00-15:00',
                                'teamRemain': 4
                            },
                            {
                                'time': '15:00-16:00',
                                'teamRemain': 1
                            },
                            {
                                'time': '16:00-17:00',
                                'teamRemain': 1
                            }
                        ],
                        'pmTicket': 5,
                        'day': '五',
                        'date': '2018-01-26'
                    }
                ],
                'name': '霍礼康'
            }
        )
    })
}
let addContactInfo = ({name, phone, sex, area, remark}) => {
    return new Promise((resolve) => {
        resolve(
            {
                name: name,
                phone: phone,
                sex: sex,
                area: area,
                remark: remark,
            }
        )
    })
}
let addSelectedInfo = ({contactName, contactPhone, date, time, guide, type, count, teamName}) => {
    return new Promise((resolve) => {
        resolve({
            contactName: contactName,
            contactPhone: contactPhone,
            date: date,
            time: time,
            guide: guide,
            type: type,
            count: count,
            teamName: teamName
        })
    })
}
let getTicketsRecord = () => {
    return new Promise((resolve) => {
        resolve({list: [
            {
                id: '1',
                date: '2017-01-11',
                time: '9:00-10:30',
                type: '1',
                ticketState: '待进场',
                count: '20',
                codeUrl: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
                contactName: '联系人',
                num: '3333',
                code: '1111',
            },
            {
                id: '2',
                date: '2017-01-11',
                time: '10:30-11:30',
                type: '1',
                ticketState: '退票',
                count: '30',
                codeUrl: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
                contactName: '联系人22',
                num: '3334',
                code: '2222',
            },
            {
                id: '3',
                date: '2017-01-13',
                time: '15:00-16:00',
                type: '1',
                ticketState: '已过期',
                count: '44',
                codeUrl: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
                contactName: '联系人33',
                num: '3336',
                code: '3333',
            },
            {
                id: '3',
                date: '2017-01-13',
                time: '15:00-16:00',
                type: '1',
                ticketState: '已核销',
                count: '44',
                codeUrl: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
                contactName: '联系人33',
                num: '3336',
                code: '3333',
            },
            {
                id: '3',
                date: '2017-01-13',
                time: '15:00-16:00',
                type: '1',
                state: '3',
                count: '44',
                codeUrl: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
                contactName: '联系人33',
                num: '3336',
                code: '3333',
            },
            {
                id: '3',
                date: '2017-01-13',
                time: '15:00-16:00',
                type: '1',
                state: '2',
                count: '44',
                codeUrl: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
                contactName: '联系人33',
                num: '3336',
                code: '3333',
            }
        ]})
    })
}
let getTicketDetail = ({id}) => {
    return new Promise((resolve) => {
        resolve({
            name: '报名人',
            state: '已过期1',
            personCount: '团体票(9人)',
            number: '1083',
            entryTime: '9:30-10:30',
            ticketTime: '2018-01-26',
            imageUrl: 'http://192.168.3.189:8080/qzjgSys/upload/share/20180125/184809e30dba8c.jpg',
            codeUrl: 'http://qr.liantu.com/api.php?text=ticketNumber=201801251083@contactName=jsdfklsja@contactPhone=18924563266@type=1@entryTime=1@ticketTime=18-01-29@count=0&logo=http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erLQFeiaXZSPHazZdhOhbjOCUl2eqr56ZfvvpRk6kicsEWffUfuyEVLlZrLVMGhrYr2VZ3sJHMQicE8Q/0'
        })
    })
}
let scanLogin = ({username, password}) => {
    return new Promise((resolve) => {
        resolve({
            username: username,
            password: password,
            state: '成功'
        })
    })
}

export {
    getIndexData,
    addContactInfo,
    addSelectedInfo,
    getTicketsRecord,
    getTicketDetail,
    scanLogin,
}
