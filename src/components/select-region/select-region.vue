<template>
  <Cascader :data="regionData" v-model="values" :load-data="getRegion" @on-change="cascaderRegionData"></Cascader>
</template>

<script>
    import {cloneObj} from '@/libs/clone.js'

    export default {
        name: "SelectRegion",
        props: {
            value: {
                type: [Array, Object],
                default: () => []
            },
            idField: {
                type: Array,
                default: () => []
            },
            fromObj: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                values: [],
                // defaultValue: [],
                // tmpValue: {},
                regionData: [],
                regionUrl: "/admin/region/getSelect",
            }
        },
        watch: {
            value(val) {
                if (Array.isArray(val)) {
                    this.values = cloneObj(val)
                } else {
                    this.idField.forEach(item => {
                        this.values.push(val[item]);
                    })
                }
            },
            idField() {
                this.mt();
            },
            fromObj() {
                this.mt();
            }
        },
        created() {
            this.getAllRegion();
            this.mt();
        },
        methods: {
            mt() {
                if (this.idField.length < 1 && Object.keys(this.fromObj).length < 1) {
                    return;
                } else if (this.idField.length < 1 || Object.keys(this.fromObj).length < 1) {
                    throw new Error("参数错误");
                }
                this.values = [];
                let tmpValue = {};
                for (let i= 0; i < this.idField.length; i++) {
                    tmpValue[this.idField[i]] = this.fromObj[this.idField[i]]
                }
                this.$emit('input', tmpValue)
            },
            getAllRegion() {
                this.$axios.get(this.regionUrl).then(res => {
                    if (res.code == 1) {
                        this.regionData = res.data;
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            },
            getRegion(item, callback) {
                item.loading = true;
                this.$axios.get(this.regionUrl, {parent_id: item.value}).then(res => {
                    if (res.code == 1) {
                        item.children = res.data;
                        item.loading = false;
                        callback();
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            },
            cascaderRegionData(value, selectedData) {
                this.$emit('input', selectedData);
                // this.formData.pro_id = selectedData[0]["value"];
                // this.formData.city_id = selectedData[1]["value"];
                // this.formData.area_id = selectedData[2]["value"];
                // this.formData.pro_name = selectedData[0]["label"];
                // this.formData.city_name = selectedData[1]["label"];
                // this.formData.area_name = selectedData[2]["label"];
            },
        }
    }
</script>

<style scoped>

</style>
