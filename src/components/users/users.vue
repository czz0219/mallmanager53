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
            <!--用 keyup.enter.native 解决 keyup事件不起作用-->
            <el-input clearable @keyup.enter.native="searchUsers" @clear="searchUsers" placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button @click="searchUsers" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button @click="showAddUserDialog" class="queryBtn" type="success">添加用户</el-button>
        </el-col>
    </el-row>
    <!--表-->
    <el-table :data="userList" style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column label="创建时间">
            <!--prop不支持 {{time|fmtdate}},需要在其外层加template,然后通过slot-scope传入值,在进行插值表达式
            渲染单元格 scope总是代表 e-table的 data属性对应的数据 -->
            <template slot-scope="scope">
                {{scope.row.create_time|fmtdate}}
            </template>
        </el-table-column>
        <el-table-column label="用户状态">
            <template slot-scope="scope">
                <el-switch @change="changeMgState(scope.row)"
                v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
        </el-table-column>

        <el-table-column prop="" label="操作">
            <template slot-scope="scope">
                <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
                <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="handleUserDelete(scope.row.id)"></el-button>
                <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="showSetUserRoleDia(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!--对话框-->
        <!--添加用户-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-switch v-model="form.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addUserOk">确 定</el-button>
        </div>
    </el-dialog>
    <!--编辑用户信息-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input   disabled v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-switch v-model="form.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="editUserOk()">确 定</el-button>
        </div>
    </el-dialog>
    <!--角色分配-->
    <el-dialog title="角色分配" :visible.sync="dialogFormVisibleRol">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
      {{this.form.username}}
    </el-form-item>
    <el-form-item label="角色" label-width="100px">
      <el-select v-model="currRoleId">
        <el-option label="请选择"   :value=-1 disabled></el-option>
        <el-option v-for='(item,index) in roles' :key="index" :label="item.roleName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
    <el-button type="primary" @click="setRole()">确 定</el-button>
  </div>
</el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            pagenum: 1,
            pagesize: 2,
            total: -1,
            userList: [],
            dialogFormVisibleAdd: false,
            dialogFormVisibleEdit:false,
            form: {
                username: '',
                password: '',
                email: '',
                mobile: '',
                mg_state: false
            },
            formLabelWidth: '120px',
            dialogFormVisibleRol:false,
            currRoleId:-1,
            roles:[],
            currUserId:-1,
        }
    },
    created() {
        this.getUserList();
    },
    methods: {
        //需要授权的API，必须在请求头使用Authorization字段提供token 令牌
        async getUserList() {
            this.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            const res = await this.$axios.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
            
            const {
                meta: {
                    status,
                    msg
                },
                data: {
                    users,
                    total
                }
            } = res.data;
            if (status === 200) {
                this.userList = users;
                this.total = total;
                this.$message.success(msg);
            } else {
                this.$message.warning(msg);
            }
        },
        showAddUserDialog(){
            this.form={};
            this.dialogFormVisibleAdd=true;
        },
        searchUsers() {
            console.log('searchUsers');
            this.getUserList();
        },
        //分页相关方法
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagenum = 1;
            this.pagesize = val;
            this.getUserList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getUserList();
        },
        async handleUserDelete(id) {
            console.log('handleUserDelete');
            this.$confirm('删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$axios.delete(`users/${id}`);
                const {meta:{status,msg}}=res.data;
                if(status===200){
                    this.pagenum=1;
                    this.pagesize=8;
                    this.getUserList();
                    this.pagesize=8;
                    this.$message({
                        type: 'success',
                        message: msg
                    });
                }else{
                        this.$message({
                        type: 'info',
                        message: '删除失败,'+msg
                    });
                }
              
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleUserCheck() {
            console.log('handleUserCheck');
        },
        async addUserOk() {
            //添加用户
            const res = await this.$axios.post(`users`, this.addUserForm);
            const {
                meta: {
                    msg,
                    status
                },
                data: {
                    users,
                    total
                }
            } = res.data;
            if (status === 201) {
                this.pagesize=8;
                this.pagenum1;
                this.getUserList();
                this.$message.success(msg);
                this.form = {};
            } else {
                this.$message.warning(msg);
            }

            this.dialogFormVisibleAdd = false;
        },
        async editUserOk() {
            //修改用户
            const res = await this.$axios.put(`users/${this.form.id}`,this.form);
            const {
                meta: {
                    msg,
                    status
                }
            } = res.data;
            if (status === 200) {
                
                this.pagesize=8;
                this.pagenum=1;
                this.getUserList();
                this.$message.success(msg);
                this.form = {};
            } else {
                this.$message.warning(msg);
            }

            this.dialogFormVisibleEdit = false;
        },
        showEditUserDia(user){
            this.form = user;
            this.dialogFormVisibleEdit =true;
        },
        async changeMgState(user){
            const res = await this.$axios.put(`users/${user.id}/state/${user.mg_state}`);
            const {meta:{status,msg}}=res.data;
            if(status === 200)
            {
                this.pagesize=8;
                this.pagenum=1;
                this.getUserList();
                this.$message.success(msg);
            }else{
                this.$message.warning(msg);
            }
        },
        async showSetUserRoleDia(user){
            this.form.username = user.username;
            this.currUserId = user.id;
            //1 获取角色列表
            const res1 = await this.$axios.get(`roles`);
            this.roles = res1.data.data;
            //2 获取用户角色ID
            const res = await this.$axios.get(`users/${user.id}`);
            this.currRoleId = res.data.data.rid;
            this.dialogFormVisibleRol = true;
        },
        async setRole(){
            const res = await this.$axios.put(`users/${this.currUserId}/role`,{rid:this.currRoleId});
            const {meta:{status,msg}} =res.data
            if ( status ===200){
                this.$message.success('角色配置成功:',msg)
            }else
            {
                this.$message.warning('角色配置失败:',msg)
            }
            this.dialogFormVisibleRol =false;
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
