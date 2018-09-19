<template>
    <transition name="fade">
        <div class="addressSlt" @click.stop="hideAddress">
            <div class="address">
                <div class="title">
                    <p @click.stop>请选择居住地区</p>
                    <span @click.stop="hideAddress">×</span>
                </div>
                <div class="selected">
                    <div class="area" :class="areaActive == index ? 'active' : ''" v-for="item, index in selectedInfo"
                         @click.stop="backTo(index)">{{item.name}}
                    </div>
                </div>
                <ul class="selectWrapper">
                    <li class="addList" :class="addProvinceActive == index ? 'active' : ''" v-if="showSlt === 0"
                        v-for="item, index in addressInfo" @click.stop="getCityList(index)">
                        {{item.name}}<i></i>
                    </li>
                    <li class="addList" :class="addCityActive == index ? 'active' : ''" v-if="showSlt === 1"
                        v-for="item, index in cityList"
                        @click.stop="getDistrictList(index)">
                        {{item.name}}<i></i>
                    </li>
                    <li class="addList" :class="addDistrictActive == index ? 'active' : ''" v-if="showSlt === 2"
                        v-for="item, index in districtList"
                        @click.stop="getDistrict(index)">
                        {{item.name}}<i></i>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>
<script>
    import picker from '../picker.json'
    export default {
        data () {
            return {
                areaActive: -1,
                selectedInfo: [],
                addProvinceActive: -1,
                addCityActive: -1,
                addDistrictActive: -1,
                selectedProvince: {},
                selectedCity: {},
                selectedDistrict: {},
                showSlt: 0,
                cityList: [],
                districtList: [],
                addressInfo: [],
            }
        },
        computed: {
        },
        created () {
            this.getPicker()
        },
        methods: {
            getPicker () {
                this.addressInfo = picker
            },
            backTo (index) {
                this.showSlt = index
                this.areaActive = index
                if (index === 0) {
                    this.selectedCity = {}
                    this.selectedDistrict = {}
                    this.addCityActive = -1
                    this.addDistrictActive = -1
                    this.selectedInformation()
                }
                if (index === 1) {
                    this.selectedDistrict = {}
                    this.addDistrictActive = -1
                    this.selectedInformation()
                }
            },
            getCityList (index) {
                this.areaActive = 0
                this.addProvinceActive = index
                this.selectedCity = {}
                this.selectedDistrict = {}
                this.selectedProvince = {
                    code: this.addressInfo[index].code,
                    name: this.addressInfo[index].name
                }
                this.selectedInformation()
                if (this.addressInfo[index].sub) {
                    this.cityList = this.addressInfo[index].sub
                    this.showSlt = 1
                } else {
                    return false
                }
            },
            getDistrictList (index) {
                this.areaActive = 1
                this.addCityActive = index
                this.selectedDistrict = {}
                this.selectedCity = {
                    code: this.cityList[index].code,
                    name: this.cityList[index].name
                }
                this.selectedInformation()
                if (this.cityList[index].sub) {
                    this.districtList = this.cityList[index].sub
                    this.showSlt = 2
                } else {
                    return false
                }
            },
            getDistrict (index) {
                this.areaActive = 2
                this.selectedDistrict = {}
                this.addDistrictActive = index
                this.selectedDistrict = {
                    code: this.districtList[index].code,
                    name: this.districtList[index].name
                }
                this.selectedInformation()
            },
            selectedInformation () {
                this.selectedInfo = []
                if (this.selectedProvince.code) {
                    this.selectedInfo.push(this.selectedProvince)
                }
                if (this.selectedCity.code) {
                    this.selectedInfo.push(this.selectedCity)
                }
                if (this.selectedDistrict.code) {
                    this.selectedInfo.push(this.selectedDistrict)
                }
                this.$emit('selectedInformation', this.selectedInfo)
            },
            hideAddress () {
                this.$emit('close', false)
            }
        }
    }
</script>

<style lang="scss">
    .addressSlt {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.2);
        color: #353535;
        .address {
            position: fixed;
            left: 0;
            bottom: 0;
            background: #fff;
            height: 25rem;
            width: 100%;
            overflow: hidden;
        }
        .title {
            display: flex;
            height: 4rem;
            font-size: 1.2rem;
            justify-content: space-between;
            padding-left: 1rem;
            align-items: center;
            font-weight: bold;
            span {
                color: #8e8e8e;
                padding: 1rem;
                font-size: 2rem;
                font-weight: normal;
            }
        }
        .selected {
            display: flex;
            width: 100%;
            height: 3rem;
            border: 1px solid #e8e8e8;
            border-right: none;
            border-left: none;
            padding-left: 1.3rem;
            font-size: 1rem;
            .area {
                height: 100%;
                line-height: 2.8rem;
                text-align: center;
                margin-right: 5rem;
            }
            .active {
                color: #c22d27;
                border-bottom: 1px solid #c22d27;
            }
        }
        .selectWrapper {
            width: calc(100% + 2rem);
            height: 20rem;
            overflow: scroll;
            font-size: 1rem;
            .addList {
                padding-left: 1.5rem;
                text-align: left;
                height: 3rem;
                line-height: 3rem;
                &:last-child {
                    margin-bottom: 2rem;
                }
            }
            .active {
                color: #c22d27;
                i {
                    display: inline-block;
                    width: 0.8rem;
                    height: 0.6rem;
                    background: url("../assets/icons/gou.png") no-repeat center;
                    background-size: 0.8rem 0.6rem;
                    margin-left: 0.5rem;
                    margin-bottom: 0.05rem;
                }
            }
        }

    }
</style>
