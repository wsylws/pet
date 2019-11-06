<!-- 
基于quill-editor的整合七牛云上传的自定义组件
elemntUI文档地址 http://element.eleme.io/#/zh-CN/component/tag
quill-editor 文档地址 https://surmon-china.github.io/vue-quill-editor/
quill-editor整合七牛云上传https://github.com/NextBoy/skill/issues/2
-->
 
<template>
   <div id='quillEditorQiniu'>
       <!-- 基于elementUi的上传组件 el-upload begin-->
       <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :accept="'image/*'"
            :data="qiniuForm"
            :show-file-list="false"
            :on-success="uploadEditorSuccess"
            :on-error="uploadEditorError"
            :before-upload="beforeEditorUpload">
        </el-upload>
        
        <!-- 基于elementUi的上传组件 el-upload end-->
        <quill-editor class="editor" v-model="content" ref="customQuillEditor" :options="editorOption" >
        </quill-editor>
   </div>
</template>
 
<script>
import { quillEditor } from 'vue-quill-editor'
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { getToken, uploadQiNiu } from '@/apis/upload'
 
//自定义编辑器的工作条
const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
 
        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction
 
        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
 
        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ];
export default {
    name: "Editor",
    data(){
        return {
           quillUpdateImg:false,
           content:'',
           editorOption:{
                  placeholder:'请填写文章内容',
                  modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#quillEditorQiniu .avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                 }
            },
            qiniuForm:{
                key: '',
                token: '',
                domain: ''
            },
        }
    },
    components: {
        quillEditor
    },
    props:{
        // token:String, //七牛云上传的token,类型为String
        domain:String, //七牛云上传的域地址,类型为String
        uploadUrl:String  //从七牛云上拿到自己的上传地址,类型为String
    },
    methods:{
        //上传图片之前
        beforeEditorUpload(res, file){
 
            //显示上传动画
            this.quillUpdateImg = true;
        },
 
        // 上传图片成功
        uploadEditorSuccess(res, file) {
            // http://pxyq5trub.bkt.clouddn.com/1570518206101523
            //拼接出上传的图片在服务器的完整地址
            let imgUrl = this.qiniuForm.domain+ res.key;
 
            //重置上传文件key，为下次上传做好准备
            this.qiniuForm.key =  new Date().getTime()+""+Math.floor(Math.random()*1000);
 
            // 获取富文本组件实例
            let quill = this.$refs.customQuillEditor.quill;
 
           // 获取光标所在位置
            let length = quill.getSelection().index;
 
            // 插入图片  res.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', imgUrl)
 
            // 调整光标到最后
            quill.setSelection(length + 1)
 
            //取消上传动画
            this.quillUpdateImg = false;
 
        },
        
        // 上传图片失败
        uploadEditorError(res, file) {
            //页面提示
            Notification.error({
                message: '上传图片失败'
            });
 
            //取消上传动画
            this.quillUpdateImg = false;
        },
 
        
 
       
    },
    mounted () {
        this.qiniuForm.key =  new Date().getTime()+""+Math.floor(Math.random()*1000)
        getToken().then(res => {
            this.qiniuForm.token = res.data
            // console.log(this.qiniuForm.token)
        })
        this.qiniuForm.domain = this.domain
    },
    watch:{
        content(newVal, oldVal) {
          this.$emit('input', newVal)
        }
    }
 
    
 
}
</script>
 
<style scoped>
.editor{
    height: 300px;
    margin-bottom: 100px;
}
</style>
 