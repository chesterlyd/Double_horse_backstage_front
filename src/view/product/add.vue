<template>
  <div>
    <Form :model="formData" @submit.native.prevent="save" :label-width="80">
      <FormItem label="商品名称"><Input v-model="formData.name"/></FormItem>
      <FormItem label="类型">
        <Select v-model="formData.type" style="width:200px">
          <Option v-for="item in product_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="价格"><Input v-model="formData.price"/></FormItem>
      <FormItem label="主图">
        <Row>
          <Col span="24">
            <singleImage
              :uploadAction="path+'/admin/tool/uploadImage'"
              v-model="formData.main_picture"
              :maxFileCounts="1"
            ></singleImage>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="详情">
        <editor ref="editor" v-model="formData.details" :uploadImgServer="path+'/admin/tool/editorUpload'"/>
      </FormItem>
      <FormItem label="状态">
        <Select v-model="formData.status" style="width:200px">
          <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="等级"><Input v-model="formData.lev" type="number"/></FormItem>

      <FormItem>
        <Button type="primary" html-type="submit" :loading="formLoading">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
    import addPage from "../../mixins/addPage";

    export default {
        data() {
            return {
                statusList: [
                    {
                        value: 0,
                        label: "下架"
                    },
                    {
                        value: 1,
                        label: "上架"
                    }
                ],
                product_type: [
                    {
                        value: 1,
                        label: "普通商品"
                    },
                    {
                        value: 2,
                        label: "升级商品"
                    }
                ],
                formData: {
                    "name": "",
                    "type": "",
                    "price": "",
                    "main_picture": "",
                    "details": "",
                    "status": "",
                    "lev": ""
                },
                formLoading: false,
                addUrl: "/admin/product/add"
            };
        },
        mixins: [addPage],
    };
</script>
