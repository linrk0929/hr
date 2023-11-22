<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="app-container">
        <el-button size="mini" type="primary" @click="showDialog=true">添加角色</el-button>
      </div>
      <!-- 放置table组件 -->
      <el-table :data="list">
        <el-table-column prop="name" align="center" width="200" label="角色" />
        <el-table-column prop="state" align="center" width="200" label="启用">
          <!-- 自定义结构 -->
          <!-- 作用于插槽 -->
          <template v-slot="{row}">
            <span>
              {{ row.state === 1?"已启用":row.state === 0? "未启用":"无" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
          <template>
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" style="height: 60px;" align="middle" justify="end">
        <!-- 放置分页组件  -->
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="prev,pager,next"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <el-dialog width="500px" title="新增角色" :visible.sync="showDialog">
      <!-- 表单内容 -->
      <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" style="width: 300px" size="mini" />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="roleForm.state" size="mini" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width: 300px" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini">确定</el-button>
              <el-button size="mini">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'
export default {
  name: 'Role',
  // name: 'Role',
  data() {
    return {
      roleForm: {
        name: '',
        description: '',
        state: 0 // 默认为1启用 关闭0 打开1
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]

      },
      pageParams: {
        page: 1, // 第几页
        pagesize: 5, // 每页多少条
        total: 0
      },
      list: [],
      showDialog: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.list = rows // 赋值数据
      this.pageParams.total = total
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
