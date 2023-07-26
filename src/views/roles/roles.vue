<template>
  <div class="serviceList">
    <div class="header">
      <el-input
        v-model="searchForm.name"
        placeholder="请输入角色名"
        class="input"
      ></el-input>

      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button type="primary" plain @click="handleAdd">添加角色</el-button>

      <el-button
        type="primary"
        class="table-btn1 warning style-color-2"
        @click="Roledel()"
        >删除</el-button
      >
    </div>
    <el-table
      style="width: 100%"
      class="table-wrap"
      :data="listData"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="name" label="角色名"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="roleKey" label="roleKey"></el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot="scope">
          <el-button
            type="text"
            size="small"
            class="table-btn"
            @click="update(scope.row)"
            >修改</el-button
          >

          <el-button
            type="text"
            size="small"
            class="table-btn1 warning style-color-2"
            @click="Roledel(scope.row)"
            >编辑权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      small
      layout=" prev, pager, next"
      :total="total"
      :page-size="searchForm.pageSize"
      :current-page="searchForm.pageNum"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-dialog
      title="添加银行"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="newform"
        :rules="rules"
        :model="newform"
        label-width="120px"
      >
        <el-form-item label="角色名" prop="name">
          <el-input v-model="newform.name"></el-input>
        </el-form-item>
        <el-form-item label="roleKey" prop="roleKey">
          <el-input v-model="newform.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="newform.description"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
          <el-select v-model="newform.status" placeholder="请选择">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <div style="text-align: center">
          <el-button type="primary" v-if="!isedit" @click="addRole('newform')"
            >添 加</el-button
          >
          <el-button type="primary" v-if="isedit" @click="Roleupdate('newform')"
            >修 改</el-button
          >
          <el-button @click="dialogclose">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleall, Roleadd, Roleupdate, Roledel } from "@/api/roles";
let me;
export default {
  data() {
    return {
      // 总数
      total: 0,
      // 列表数据
      listData: [],
      dialogVisible: false,
      // 表格数据
      selected: "",
      // 搜索数据
      searchForm: {
        name: "",
        pageNum: 1,
        pageSize: 20,
      },
      isedit: false,
      rules: {
        name: [{ required: true, message: "请填写", trigger: "blur" }],
        status: [{ required: true, message: "请填写", trigger: "blur" }],
        roleKey: [{ required: true, message: "请填写", trigger: "blur" }],
        description: [{ required: true, message: "请填写", trigger: "blur" }],
      },
      multipleSelection: "",
      delarr: [],
      newform: {
        name: "",
        description: "",

        roleKey: "",
        status: 0,
      },
      id: "",
    };
  },
  created() {
    me = this;
  },
  mounted() {
    this.getRoleall();
  },
  methods: {
    //列表
    getRoleall() {
      getRoleall(this.searchForm).then((res) => {
        this.total = Number(res.data.data.total);
        this.listData = res.data.data.list;
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 新增
    Roleadd() {
      Roleadd(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.getRoleall();
          this.newform = {};

          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
          this.dialogVisible = false;
        }
      });
    },
    //删除
    Roledel(row) {
      const length = this.multipleSelection.length;
      for (let i = 0; i < length; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      if (this.delarr.length > 0) {
        let obj = {
          ids: this.delarr,
        };
        Roledel(obj).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getRoleall();
            this.dialogVisible = false;
          } else {
            this.$message.error(res.data.message);
            this.dialogVisible = false;
          }
        });
      }
    },

    // 翻页
    handleCurrentChange(newPage) {
      this.searchForm.pageNum = newPage;
      this.getRoleall();
    },
    // 点击表格
    dialogclose() {
      this.newform = {};
      this.dialogVisible = false;
    },
    // 新增
    handleAdd() {
      this.isedit = false;
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    },
    addRole(newform) {
      this.$refs.newform.validate((valid) => {
        if (valid) {
          this.Roleadd();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 修改
    update(row) {
      this.isedit = true;
      this.newform.id = row.id;
      this.newform.status = row.status;
      this.newform.name = row.name;
      this.newform.roleKey = row.roleKey;
      this.newform.description = row.description;
      this.dialogVisible = true;
    },
    Roleupdate() {
      Roleupdate(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getRoleall();
          this.dialogVisible = false;
        }
      });
    },
    // 点击搜索
    handleSearch() {
      this.searchForm.pageNum = 1;
      this.getRoleall();
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.serviceList {
  padding: 16px;
  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
    .input {
      width: 200px;
      margin: 0 8px;
    }
  }
}
</style>
