import multilevelPicker from '../multilevelPicker/multilevelPicker'
import areaList from './areaList'
class CityPicker extends multilevelPicker {
    constructor (element, options) {
        super(element, 'cityPicker',
            Object.assign({ title: '请选择所在地区', showAllChecked: true }, options, { options: CityPicker.prototype.areaList }))
    }

    /**
     * overwrite _getOptionsMap
     */
    static _getOptionsMap (options) {
        return CityPicker.prototype.areaMap ? CityPicker.prototype.areaMap : super._getOptionsMap(options)
    }

    /**
     * 获取对应城市名字
     * @param code
     * @return String
     */
    static getName (code) {
        return CityPicker.prototype.areaMap[code] ? CityPicker.prototype.areaMap[code].name : ''
    }

    static getFullname (code) {
        try {
            let areaMap = CityPicker.prototype.areaMap,
                area = areaMap[code],
                fullname = area.name,
                parent = areaMap[area.parent]

            while (parent) {
                fullname = parent.name + ' ' + fullname
                parent = areaMap[parent.parent]
            }
            return fullname
        } catch (e) {
            return ''
        }
    }

    /**
     * 获取下一级的地区列表
     * @param code
     * @return Array
     */
    static getSub (code) {
        return CityPicker.prototype.areaMap[code].sub
    }

    static getAreaList () {
        return CityPicker.prototype.areaList
    }
}

CityPicker.prototype.areaList = areaList
CityPicker.prototype.areaMap = CityPicker._getOptionsMap(areaList)

export default CityPicker
