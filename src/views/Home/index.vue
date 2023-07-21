<template>
  <div class="serviceList">
    <div class="header">
      <el-select
        v-model="searchForm.province"
        placeholder="请选择省份"
        style="margin-left: 8px"
        clearable
      >
        <el-option
          v-for="item in 1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        v-model="searchForm.city"
        placeholder="请输入城市名"
        class="input"
      ></el-input>
      <el-input
        v-model="searchForm.bankCode"
        placeholder="请输入银行代码"
        class="input"
      ></el-input>
      <el-input
        v-model="searchForm.bankName"
        placeholder="请输入银行名称"
        class="input"
      ></el-input>
      <el-input
        v-model="searchForm.servicePackageName"
        placeholder="请输入服务包名称查询"
        class="input"
      ></el-input>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button type="primary" plain @click="handleAdd">添加银行</el-button>
    </div>
    <el-table
      style="width: 100%"
      class="table-wrap"
      :data="listData"
      highlight-current-row
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="bankCode" label="银行代码"></el-table-column>
      <el-table-column prop="bankName" label="银行名称"></el-table-column>
      <el-table-column prop="province" label="所属省份"></el-table-column>

      <el-table-column prop="city" label="所属城市"> </el-table-column>
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
            @click="bankdel(scope.row)"
            >删除</el-button
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
        <el-form-item label="省份" prop="province">
          <el-select v-model="newform.province" placeholder="请选择省份">
            <el-option label="浙江" value="浙江"></el-option>
            <el-option label="湖南" value="湖南"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="newform.bankName"></el-input>
        </el-form-item>

        <el-form-item label="银行代码" prop="bankCode">
          <el-input v-model="newform.bankCode"></el-input>
        </el-form-item>
        <el-form-item label="银行类型" prop="bankType">
          <el-select v-model="newform.bankType" placeholder="请选择省份">
            <el-option label="开户行" :value="1"></el-option>
            <el-option label="清算行" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="newform.city"></el-input>
        </el-form-item>
        <el-form-item label="清算行代码" prop="clearBankCode">
          <el-input v-model="newform.clearBankCode"></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" v-if="!isedit" @click="addbank('newform')"
            >添 加</el-button
          >
          <el-button type="primary" v-if="isedit" @click="bankupdate('newform')"
            >修 改</el-button
          >
          <el-button @click="dialogclose">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getbanklist, bankadd, bankupdate, bankdel } from "@/api/bank";
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
        bankCode: "",
        bankName: "",
        bankType: "",
        city: "",
        clearBankCode: "",
        id: 0,
        province: "",
        pageNum: 1,
        pageSize: 20,
      },
      isedit: false,
      rules: {
        bankName: [{ required: true, message: "请填写", trigger: "blur" }],
        province: [{ required: true, message: "请填写", trigger: "blur" }],
        bankCode: [{ required: true, message: "请填写", trigger: "blur" }],
        bankType: [{ required: true, message: "请填写", trigger: "blur" }],
        city: [{ required: true, message: "请填写", trigger: "blur" }],
        clearBankCode: [{ required: true, message: "请填写", trigger: "blur" }],
      },
      newform: {
        bankCode: "",
        bankName: "",
        bankType: "",
        city: "",
        clearBankCode: "",
        province: "",
      },
      id: "",
    };
  },
  created() {
    me = this;
  },
  mounted() {
    this.getbanklist();
  },
  methods: {
    //列表
    getbanklist() {
      getbanklist(this.searchForm).then((res) => {
        this.total = Number(res.data.data.total);
        this.listData = res.data.data.list;
      });
    },

    // 新增
    bankadd() {
      bankadd(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.getbanklist();
          this.newform = {};

          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
          this.dialogVisible = false;
        }
      });
    },
    //删除
    bankdel(row) {
      bankdel(row.id).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getbanklist();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
          this.dialogVisible = false;
        }
      });
    },

    // 翻页
    handleCurrentChange(newPage) {
      this.searchForm.pageNum = newPage;
      this.getbanklist();
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
    addbank(newform) {
      this.$refs.newform.validate((valid) => {
        if (valid) {
          this.bankadd();
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
      this.newform.bankCode = row.bankCode;
      this.newform.bankName = row.bankName;
      this.newform.bankType = row.bankType;
      this.newform.city = row.city;
      this.newform.clearBankCode = row.clearBankCode;
      this.newform.province = row.province;
      this.dialogVisible = true;
    },
    bankupdate() {
      bankupdate(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getbanklist();
          this.dialogVisible = false;
        }
      });
    },
    // 点击搜索
    handleSearch() {
      this.searchForm.pageNum = 1;
      this.getbanklist();
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
