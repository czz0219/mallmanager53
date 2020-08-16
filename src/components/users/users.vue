<template>
<el-card class="box-card">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button class="queryBtn" type="success">搜索</el-button>
        </el-col>
    </el-row>
    <!--表-->
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="#"      type="index"></el-table-column>
        <el-table-column prop="name"    label="姓名"></el-table-column>
        <el-table-column prop="email"   label="邮箱"></el-table-column>
        <el-table-column prop="phone"   label="电话"></el-table-column>
        <el-table-column prop="time"    label="创建时间"></el-table-column>
        <el-table-column prop="status"  label="用户状态"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--分页-->
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            pagenum:1,
            pagesize:2,
            tableData: [{
                name:'王洋',
                email:'dsfd@com',
                phone:'123234234234',
                time:'2020-08-20',
                status:'comm'
            }]
        }
    },
    created(){
        this.getUserList();
    },
    methods:{
                //需要授权的API，必须在请求头使用Authorization字段提供token 令牌
                async getUserList(){
                    this.$axios.defaults.headers.common['Authorization']=localStorage.getItem('token');
                    const res =await this.$axios.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
                    console.log(res);
                    const {meta,data}=res.data;
                    if(meta.status===200){
                        this.tableData =data.users;
                    }
        }
    }
}
</script>

<style scoped>
.box-card {
    height: 100%;
}

.searchRow {
    margin-top: 20px;
}

.inputSearch {
    width: 300px;
    vertical-align: middle;
}

.queryBtn {
    margin-left: 10px;
    vertical-align: middle;
}
</style>
