<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple logo-left"><img src="" alt=""></div>
            </el-col>
            <el-col :span="18" class="middle">
                <div class="grid-content bg-purple-light"><h3>电商后台管理系统</h3></div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple"><a class="loginout" @click.prevent="handleSignout()" href="#">退出</a></div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <el-menu
            :router="true"
            :unique-opened="true"
            >
                <el-submenu index="1">
                    <!--定义要传入的插槽,插槽名shi title,他在组件内部已经固定了插入的位置,即头部的位置
                        不同的slot名,有不同的插入位置
                    -->
                    <template slot="title">
                        <!--插入的内容,头部插入图标和文字-->
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="users">
                        <i class="el-icon-circle-check"></i>
                        <span>用户列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="2-1">
                        <i class="el-icon-icon-location"></i>
                        <span>角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="rights">
                        <i class="el-icon-icon-location"></i>
                        <span>权限列表</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    beforeCreate(){
        const token = localStorage.getItem('token');
        if(!token){
            this.$router.push({name:'login'});
        }
    },
    methods:{
        handleSignout(){
            localStorage.clear();
            this.$message.success('退出成功');
            this.$router.push({name:'login'});
        }
    }

}
</script>

<style>
.container {
    height: 100%;
    border: 1px solid;
}
.header .logo-left{
    line-height: 60px;
    background: #B3C0D1  url("../../assets/logo.png")   no-repeat left top;
    background-size: 160px 100%;
}
.header {
    background-color: #B3C0D1;
    
}

.aside {
    background-color: #D3DCE6;
}

.main {
    background-color: #E9EEF3;
}
.header #logo{
    width: 120px;
    height: 60px;
}
.middle{
    text-align: center;
}
.loginout{
    text-decoration: none;
    line-height: 60px;
}
</style>
