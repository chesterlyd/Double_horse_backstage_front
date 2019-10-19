<template>
  <div>
    <Form :model="memberData" :label-width="80">
      <FormItem label="用户名">{{ memberData.username }}</FormItem>
      <FormItem label="余额">{{ memberData.balance }}</FormItem>
    </Form>
    <Form :model="formData" :label-width="80">
      <FormItem label="充值金额"><Input v-model="formData.money" type="number"/></FormItem>

      <FormItem>
        <Button type="primary" @click="rechargePrompt = true" :loading="formLoading">保存</Button>
        <Modal
          v-model="rechargePrompt"
          title="提示"
          @on-ok="ok"
          @on-cancel="cancel">
          <p>确定给 {{ memberData.username }} 用户充值 {{ formData.money }} 积分吗？</p>
        </Modal>
      </FormItem>
    </Form>
  </div>
</template>

<script>
    import editPage from "../../mixins/editPage";

    export default {
        data() {
            return {
                rechargePrompt: false,
                memberData: {
                    "username": "",
                    "balance": "",
                },
                formData: {
                    "username": "",
                    "money": "",
                },
                formLoading: false,
                editUrl: "/admin/member/edit",
                rechargeUrl: "/admin/member/recharge"
            };
        },
        mixins: [editPage],
        methods: {
            getData() {
                this.$axios
                    .get(this.editUrl, {
                        id: this.$route.query.id
                    })
                    .then(res => {
                        if (res.code == 1) {
                            this.formData = res.data.data;
                            this.memberData = res.data.data;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
            },
            ok() {
                this.formLoading = true;
                this.$axios.post(this.rechargeUrl, this.formData).then(res => {
                    this.formLoading = false;
                    if (res.code == 1) {
                        this.$Message.success("操作成功");
                        this.closeTag(this.$route);
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            },
            cancel() {
                this.$Message.info('已取消充值');
            }
        }
    };
</script>

