const JOB_STATE = {
    enable: 1,
    disabled: 2,
    done: 3
}

// 企业地区 德庆县——德城街道、新圩镇、回龙镇、官圩镇、马圩镇、高良镇、莫村镇、永丰镇、武垄镇、播植镇、凤村镇、悦城镇、九市镇
const COMP_AREA_LIST = [
    {
        value: 0,
        name: '德庆全县'
    },
    {
        value: 1,
        name: '德城街道'
    },
    {
        value: 2,
        name: '新圩镇'
    },
    {
        value: 3,
        name: '回龙镇'
    },
    {
        value: 4,
        name: '官圩镇'
    },
    {
        value: 5,
        name: '马圩镇'
    },
    {
        value: 6,
        name: '高良镇'
    },
    {
        value: 7,
        name: '莫村镇'
    },
    {
        value: 8,
        name: '永丰镇'
    },
    {
        value: 9,
        name: '武垄镇'
    },
    {
        value: 10,
        name: '播植镇'
    },
    {
        value: 11,
        name: '凤村镇'
    },
    {
        value: 12,
        name: '悦城镇'
    },
    {
        value: 13,
        name: '九市镇'
    }
]
const COMP_AREA_MAP = listToMap(COMP_AREA_LIST)

// 工作经历
const EXP_TIME_LIST = [
    {
        value: 1,
        name: '应届生'
    },
    {
        value: 2,
        name: '1年以内'
    },
    {
        value: 3,
        name: '1-3年'
    },
    {
        value: 4,
        name: '3-5年'
    },
    {
        value: 5,
        name: '5-10年'
    },
    {
        value: 6,
        name: '10年以上'
    },
]
const EXP_TIME_MAP = listToMap(EXP_TIME_LIST)

// 公司规模
const COMP_SCALE_LIST = [
    {
        value: 1,
        name: '1-19人'
    },
    {
        value: 2,
        name: '20-99人'
    },
    {
        value: 3,
        name: '100-499人'
    },
    {
        value: 4,
        name: '500-999人'
    },
    {
        value: 5,
        name: '1000人以上'
    },
]
const COMP_SCALE_MAP = listToMap(COMP_SCALE_LIST)

// 学历
const EDUCATION_LIST = [
    {
        value: 1,
        name: '中专及以下'
    },
    {
        value: 2,
        name: '高中'
    },
    {
        value: 3,
        name: '大专'
    },
    {
        value: 4,
        name: '本科'
    },
    {
        value: 5,
        name: '硕士'
    },
    {
        value: 6,
        name: '博士'
    }
]
const EDUCATION_MAP = listToMap(EDUCATION_LIST)

export {
    COMP_AREA_LIST,
    COMP_AREA_MAP,
    COMP_SCALE_LIST,
    COMP_SCALE_MAP,
    EXP_TIME_LIST,
    EXP_TIME_MAP,
    EDUCATION_LIST,
    EDUCATION_MAP,
    JOB_STATE,
}

function listToMap (list) {
    let map = {}
    list.forEach(i => (map[i.value] = i.name))
    return map
}
