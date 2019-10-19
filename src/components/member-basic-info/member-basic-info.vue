<template>
  <Modal :value="value" @input="(val)=>this.$emit('input',val)" title="基本信息">
    <transition name="slide-fade" mode="out-in">
      <div v-if="slide_fade">
        <Row>
          <Col class="basic-info">
            <p>身份证：{{formData.id_card}}</p>
          </Col>
        </Row>
        <Row>
          <Col class="basic-info">
            <p>{{formData.path}}</p>
          </Col>
        </Row>
        <Row>
          <Col class="basic-info">
            <p>{{formData.address_detail}}</p>
          </Col>
        </Row>

        <Spin size="large" v-if="spinShow"></Spin>
        <Button type="primary" v-auth style="margin-top: 10px;" @click="handleForm">编辑</Button>
      </div>

      <div v-if="!slide_fade">
        <Row>
          <Col class="basic-info">
            <p>身份证:<Input type="text" v-model="formData.id_card"></Input></p>
          </Col>
        </Row>
        <Row>
          <Col class="basic-info">
            <p>省市区：</p>
            <SelectRegion :id-field="indexField" :from-obj="formData"
                          v-model="region_list"></SelectRegion>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>详细地址：</p>
            <Input type="textarea" v-model="formData.address_detail"></Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="primary" v-auth style="margin-top: 10px;" @click="handleUpdate">确认修改</Button>
            <Button type="default" v-auth style="margin-top: 10px;margin-left: 5px;" @click="handleForm">取消</Button>
          </Col>
        </Row>
      </div>
    </transition>
  </Modal>
</template>

<script>
    import SelectRegion from "../../components/select-region";

    export default {
        name: "member-basic-info",
        components: {
            SelectRegion
        },
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
        watch: {
            uid(val) {
                this.spinShow = !0;
                this.user_id = val;
                this.$axios.get('admin/member_basic_info/edit', {member_id: val}).then(res => {
                    if (res.code == 1) {
                        this.formData = res.data.data;
                        this.spinShow = !1;
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            }
        },
        data() {
            return {
                slide_fade: !0,
                user_id: 0,
                formData: {},
                spinShow: !1,
                indexField: ['pro_id', 'city_id', 'area_id'],
                region_list: []
            }
        },
        methods: {
            handleForm() {
                if (this.slide_fade) {
                    this.slide_fade = !1;
                } else {
                    this.slide_fade = !0;
                }
            },
            handleUpdate() {
                if (Array.isArray(this.region_list)) {
                    let tmpPathArray = [];
                    for(let i = 0; i < this.region_list; i++) {
                        tmpPathArray.push(this.region_list[i]['label'])
                    }
                    let tmpPath = tmpPathArray.join('/');
                    this.formData.pro_id = this.region_list[0]['id'];
                    this.formData.pro_name = this.region_list[0]['label'];
                    this.formData.city_id = this.region_list[1]['id'];
                    this.formData.city_name = this.region_list[1]['label'];
                    this.formData.area_id = this.region_list[2]['id'];
                    this.formData.area_name = this.region_list[2]['label'];
                    this.formData.path = tmpPath;
                    this.$axios.post('admin/member_basic_info/edit', this.formData).then(res => {
                        if (res.code == 1) {
                            this.$Message.success('修改成功');
                            this.slide_fade = !0;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    })
                } else {
                    this.$axios.post('admin/member_basic_info/edit', this.formData).then(res => {
                        if (res.code == 1) {
                            this.$Message.success('修改成功');
                            this.slide_fade = !0;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    })
                }
            }
        }
    }
</script>

<style>
  .basic-info {
    margin-top: 5px;
  }

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
