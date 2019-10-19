<template>
  <Modal :value="value" @input="(val)=>this.$emit('input',val)" title="附加信息">
    <transition name="slide-fade" mode="out-in">
      <Table v-if="slide_fade" :columns="infoAttrColumns" :data="infoAttrTableData" :loading="infoAttrLanding">
        <template slot-scope="{ row }" slot="content">{{infoAttrTableContent[row.attr]}}</template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" v-auth @click="handleSettingAttr(row)">编辑</Button>
        </template>
      </Table>
      <Form :model="updateInfoCollecting" @submit.native.prevent v-if="!slide_fade">
        <FormItem :label="updateInfoCollecting.attr_title">
          <Input v-model="updateInfoCollecting.attr_val"/>
        </FormItem>
        <FormItem>
          <Button type="primary" v-auth @click="handleSettingAttr" :loading="loading">确认</Button>
        </FormItem>
      </Form>
    </transition>
  </Modal>
</template>

<script>
    export default {
        name: "memberInfoCollecting",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            uid: {
                type: Number,
                default: () => 0
            }
        },
        data() {
            return {
                slide_fade: !0,
                user_id: 0,
                infoAttrContent: '',
                infoAttrColumns: [
                    {
                        title: 'ID',
                        key: 'attr_id',
                    },
                    {
                        title: '#',
                        key: 'attr',
                        align: 'center'
                    },
                    {
                        title: '内容',
                        key: 'content',
                        align: 'center',
                        slot: 'content'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        slot: 'action'
                    }
                ],
                infoAttrTableData: [],
                infoAttrTableContent: {},
                infoAttrLanding: false,
                updateInfoCollecting: {
                    id: 0,
                    member_id: 0,
                    attr_id: 0,
                    attr_val: '',
                    attr_title: '',
                },
                loading: false
            }
        },
        watch: {
            uid(val) {
                this.infoAttrLanding = true;
                this.user_id = val;
                this.$axios.get("/admin/member_info_collecting", {member_id: val}).then(res => {
                    if (res.code == 1) {
                        let tmpObj = {};
                        let tmpCon = {};
                        let tmpArry = [];
                        for (let i = 0; i < res.data.data.length; i++) {
                            let newVal = res.data.data[i]['attr_val'];
                            let newKey = res.data.data[i]['attr'];
                            tmpObj = res.data.data[i];
                            tmpObj[newKey] = newVal;
                            tmpCon[newKey] = newVal;
                            tmpArry.push(tmpObj);
                            tmpObj = {};
                        }
                        this.infoAttrTableData = tmpArry;
                        this.infoAttrTableContent = tmpCon;
                        this.infoAttrLanding = false;
                    } else {
                        this.$Message.error(res.msg)
                    }
                });
            }
        },
        methods: {
            handleInfoAttr(row) {
                this.infoAttrLanding = true;
                this.user_id = row;
                this.$axios.get("/admin/member_info_collecting", {member_id: row}).then(res => {
                    if (res.code == 1) {
                        let tmpObj = {};
                        let tmpCon = {};
                        let tmpArry = [];
                        for (let i = 0; i < res.data.data.length; i++) {
                            let newVal = res.data.data[i]['attr_val'];
                            let newKey = res.data.data[i]['attr'];
                            tmpObj = res.data.data[i];
                            tmpObj[newKey] = newVal;
                            tmpCon[newKey] = newVal;
                            tmpArry.push(tmpObj);
                            tmpObj = {};
                        }
                        this.infoAttrTableData = tmpArry;
                        this.infoAttrTableContent = tmpCon;
                        this.infoAttrLanding = false;
                    } else {
                        this.$Message.error(res.msg)
                    }
                });
            },
            handleSettingAttr(row) {
                if (this.slide_fade) {
                    this.slide_fade = !1;
                    this.updateInfoCollecting.id = row.id;
                    this.updateInfoCollecting.member_id = this.user_id;
                    this.updateInfoCollecting.attr_id = row.attr_id;
                    this.updateInfoCollecting.attr_val = row.attr_val;
                    this.updateInfoCollecting.attr_title = row.attr;
                } else {
                    let editUrl = "/admin/member_info_collecting/edit";
                    this.loading = true;
                    this.$axios.post(editUrl, this.updateInfoCollecting).then(res => {
                        this.loading = false;
                        if (res.code == 1) {
                            this.$Message.success("操作成功");
                            this.handleInfoAttr(this.user_id);
                            this.slide_fade = !0;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
                }
            },
        }
    }
</script>

<style>
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    /*transition: all .8s ease;*/
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
