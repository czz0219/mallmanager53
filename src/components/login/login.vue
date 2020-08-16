<template>
<div class="login-wrap">
    <!-- label-position='top'表示表单域标签的位置,
    当用第三方组件库时,最好不要用组件库本身的class来调整样式
    -->
    <el-form 
    class="login-form"
    label-position="top"
    label-width="80px" 
    :model="formData">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data(){
        return{
            formData:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        handleLogin(){
            this.$axios.post('login',this.formData).then(
               (res)=>{
                   //对象解构赋值
                   const{data,meta:{msg,status}} =res.data;
                   if(status ===200){
                       this.$message.success(msg);
                       this.$router.push({name:'home'});
                   }else{
                       this.$message.error(msg);
                   }
               } 
            )
        }
    }
}
</script>

<style>
    .login-wrap{
        height: 100%;
        background-color: #314154;
        /**水平垂直居中 弹性布局 */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-wrap .login-form{
        width: 400px;
        background-color: #ffffff;
        border-radius: 5px;
        padding: 30px;
    }
    .login-form .login-btn{
        width: 100%;
    }
</style>