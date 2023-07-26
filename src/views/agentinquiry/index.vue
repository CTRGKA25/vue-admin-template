<template>
  <div class="agentreview">
    <div class="header">
      <el-input
        v-model="searchForm.agentno"
        placeholder="代理商编号"
        class="input"
      ></el-input>
      <el-input
        v-model="searchForm.fullName"
        placeholder="代理商名称"
        class="input"
      ></el-input>

      <el-date-picker
        v-model="searchForm.openTimeBegin"
        type="date"
        placeholder="选择开始日期"
      >
      </el-date-picker>
      <el-date-picker
        v-model="searchForm.openTimeEnd"
        type="date"
        placeholder="选择结束日期"
      >
      </el-date-picker>
      <el-input
        v-model="searchForm.mobile"
        placeholder="请输入手机号码"
        class="input"
      ></el-input>

      <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>
    <el-table
      style="width: 100%"
      class="table-wrap"
      :data="listData"
      highlight-current-row
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="agentCode" label="录入时间"></el-table-column>
      <el-table-column prop="agentName" label="代理商编号"></el-table-column>
      <el-table-column prop="province" label="代理简称"></el-table-column>
      <el-table-column prop="city" label="全称"> </el-table-column>
      <el-table-column prop="city" label="个人码费率"> </el-table-column>
      <el-table-column prop="city" label="审核状态"> </el-table-column>
      <el-table-column prop="city" label="所属省份"> </el-table-column>
      <el-table-column prop="city" label="城市"> </el-table-column>
      <el-table-column label="审核" width="150">
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
            @click="agentdel(scope.row)"
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
        <el-form-item label="银行名称" prop="agentName">
          <el-input v-model="newform.agentName"></el-input>
        </el-form-item>

        <el-form-item label="银行代码" prop="agentCode">
          <el-input v-model="newform.agentCode"></el-input>
        </el-form-item>
        <el-form-item label="银行类型" prop="agentType">
          <el-select v-model="newform.agentType" placeholder="请选择省份">
            <el-option label="开户行" :value="1"></el-option>
            <el-option label="清算行" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="newform.city"></el-input>
        </el-form-item>
        <el-form-item label="清算行代码" prop="clearagentCode">
          <el-input v-model="newform.clearagentCode"></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" v-if="!isedit" @click="addagent('newform')"
            >添 加</el-button
          >
          <el-button type="primary" v-if="isedit" @click="agentupdate('newform')"
            >修 改</el-button
          >
          <el-button @click="dialogclose">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getagentlist, agentadd, agentupdate, agentdel } from "@/api/agentreview";
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
        agentno: "",
        fullName: "",
        openTimeBegin: "",
        openTimeEnd: "",
        mobile: "",
        pageNum: 1,
        pageSize: 20,
      },
      isedit: false,
      rules: {
        agentName: [{ required: true, message: "请填写", trigger: "blur" }],
        province: [{ required: true, message: "请填写", trigger: "blur" }],
        agentCode: [{ required: true, message: "请填写", trigger: "blur" }],
        agentType: [{ required: true, message: "请填写", trigger: "blur" }],
        city: [{ required: true, message: "请填写", trigger: "blur" }],
        clearagentCode: [{ required: true, message: "请填写", trigger: "blur" }],
      },
      newform: {
        agentCode: "",
        agentName: "",
        agentType: "",
        city: "",
        clearagentCode: "",
        province: "",
      },
      id: "",
    };
  },
  created() {
    me = this;
  },
  mounted() {
    this.getagentlist();
  },
  methods: {
    //列表
    getagentlist() {
      getagentlist(this.searchForm).then((res) => {
        this.total = Number(res.data.data.total);
        this.listData = res.data.data.list;
      });
    },

    // 新增
    agentadd() {
      agentadd(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.getagentlist();
          this.newform = {};

          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
          this.dialogVisible = false;
        }
      });
    },
    //删除
    agentdel(row) {
      agentdel(row.id).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getagentlist();
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
      this.getagentlist();
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
    addagent(newform) {
      this.$refs.newform.validate((valid) => {
        if (valid) {
          this.agentadd();
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
      this.newform.agentCode = row.agentCode;
      this.newform.agentName = row.agentName;
      this.newform.agentType = row.agentType;
      this.newform.city = row.city;
      this.newform.clearagentCode = row.clearagentCode;
      this.newform.province = row.province;
      this.dialogVisible = true;
    },
    agentupdate() {
      agentupdate(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getagentlist();
          this.dialogVisible = false;
        }
      });
    },
    // 点击搜索
    handleSearch() {
      this.searchForm.pageNum = 1;
      this.getagentlist();
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.agentreview {
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
