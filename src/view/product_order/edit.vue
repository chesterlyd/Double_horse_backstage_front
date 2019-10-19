<template>
    <div>
        <Form :model="formData" @submit.native.prevent="save" :label-width="80">
            <FormItem label="支付表ID"><Select v-model="formData.order_pay_id"><Option v-for="item in order_pay_idList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>
<FormItem label="类型 1-商品订单 2-升级订单"><Input v-model="formData.order_type" type="number" /></FormItem>
<FormItem label="地址ID"><Select v-model="formData.address_id"><Option v-for="item in address_idList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>
<FormItem label="商品ID"><Select v-model="formData.product_id"><Option v-for="item in product_idList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>
<FormItem label="商品数量"><Input v-model="formData.product_num" type="number" /></FormItem>
<FormItem label="用户ID"><Select v-model="formData.member_id"><Option v-for="item in member_idList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>
<FormItem label="状态 0-失败 1-待发货 2-完成"><Select v-model="formData.status"><Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>
<FormItem label="留言"><Input v-model="formData.message" /></FormItem>

            <FormItem>
                <Button type="primary" html-type="submit" :loading="formLoading">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import editPage from "../../mixins/editPage";
    export default {
        data() {
            return {
                formData:{"order_pay_id":"","order_type":"","address_id":"","product_id":"","product_num":"","member_id":"","status":"","message":""},
                formLoading: false,
                editUrl:"/admin/product_order/edit"
            };
        },
        mixins:[editPage]
    };
</script>