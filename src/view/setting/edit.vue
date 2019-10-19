<template>
  <div>
    <Form :model="formData" @submit.native.prevent="save" :label-width="80">
      <FormItem label="配置模块"><Input v-model="formData.module"/></FormItem>
      <FormItem label="模块标识"><Input v-model="formData.code"/></FormItem>
      <FormItem label="模块值">
        <i-switch v-model="valType" true-color="#13ce66" false-color="#2d8cf0" />
        <Input v-show="valType" v-model="formData.val"/>
        <Row v-show="!valType">
          <Col span="24">
            <singleImage
              :uploadAction="path+'/admin/tool/uploadImage'"
              v-model="formData.val"
              :maxFileCounts="1"
            ></singleImage>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="模块名称"><Input v-model="formData.name"/></FormItem>

      <FormItem>
        <Button type="primary" html-type="submit" :loading="formLoading">保存</Button>
        <Button @click="$router.go(-1)" style="margin-left:10px;">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
    import editPage from "../../mixins/editPage";

    export default {
        data() {
            return {
                valType: !0,
                formData: {"module": "", "code": "", "val": "", "name": ""},
                formLoading: false,
                editUrl: "/admin/setting/edit"
            };
        },
        mixins: [editPage]
    };
</script>
