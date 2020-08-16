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
    <el-table :data="userList" style="width: 100%">
        <el-table-column label="#"      type="index"></el-table-column>
        <el-table-column prop="username"    label="姓名"></el-table-column>
        <el-table-column prop="email"   label="邮箱"></el-table-column>
        <el-table-column prop="mobile"   label="电话"></el-table-column>
        <el-table-column                 label="创建时间">
            <!--prop不支持 {{time|fmtdate}},需要在其外层加template,然后通过slot-scope传入值,在进行插值表达式
            渲染单元格 -->
            <template slot-scope="scope">
                {{scope.row.create_time|fmtdate}}
            </template>
        </el-table-column>
        <el-table-column   label="用户状态">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button  size="mini" plain="true" type="primary" icon="el-icon-edit" circle  @click="handleEdit"></el-button>
                <el-button  size="mini" plain="true" type="danger" icon="el-icon-delete" circle @click="handleDelete"></el-button>
                <el-button  size="mini" plain="true" type="success" icon="el-icon-check" circle @click="handleCheck"></el-button>
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
            total:-1,
            userList: []
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
                    const {meta:{status,msg},data:{users,total}}=res.data;
                    if(status===200){
                        this.userList =users;
                        this.total=total;
                        this.$message.success(msg);
                    }else{
                        this.$message.warning(msg);
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
