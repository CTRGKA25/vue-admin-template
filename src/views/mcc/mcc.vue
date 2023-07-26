<template>
  <div class="serviceList">
    <div class="header">
      <el-select
        v-model="searchForm.type"
        placeholder="Mcc类别"
        style="margin-left: 8px"
        clearable
      >
        <el-option label="民生类" :value="1"></el-option>
        <el-option label="一般类" :value="2"></el-option>
        <el-option label="餐娱类" :value="3"></el-option>
        <el-option label="批发类" :value="4"></el-option>
        <el-option label="房汽类" :value="5"></el-option>
      </el-select>
      <el-input
        v-model="searchForm.code"
        placeholder="Mcc码"
        class="input"
      ></el-input>
      <el-input
        v-model="searchForm.businessScope"
        placeholder="经营范围"
        class="input"
      ></el-input>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button type="primary" plain @click="handleAdd">添加地区</el-button>
      <el-button type="primary" plain @click="Mccdel">删除</el-button>
    </div>
    <el-table
      style="width: 100%"
      class="table-wrap"
      :data="listData"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="type" label="MCC类别"></el-table-column>
      <el-table-column prop="code" label="MCC代码"> </el-table-column>
      <el-table-column prop="businessScope" label="经营范围"> </el-table-column>
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
        <el-form-item label="MCC类别" prop="type">
          <el-select v-model="newform.type" placeholder="请选择">
            <el-option label="民生类" :value="1"></el-option>
            <el-option label="一般类" :value="2"></el-option>
            <el-option label="餐娱类" :value="3"></el-option>
            <el-option label="批发类" :value="4"></el-option>
            <el-option label="房汽类" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MCC码" prop="code">
          <el-input v-model="newform.code"></el-input>
        </el-form-item>

        <el-form-item label="经营范围" prop="businessScope">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            placeholder="请输入内容"
            v-model="newform.businessScope"
          ></el-input>
        </el-form-item>

        <div style="text-align: center">
          <el-button type="primary" v-if="!isedit" @click="addbank('newform')"
            >添 加</el-button
          >
          <el-button type="primary" v-if="isedit" @click="Mccupdate('newform')"
            >修 改</el-button
          >
          <el-button @click="dialogclose">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getmcclist, Mccadd, Mccupdate, Mccdel } from "@/api/mcc";
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
        businessScope: "",
        code: "",
        type: "",
        pageNum: 1,
        pageSize: 20,
      },

      isedit: false,
      rules: {
        businessScope: [{ required: true, message: "请填写", trigger: "blur" }],
        type: [{ required: true, message: "请填写", trigger: "blur" }],
        code: [{ required: true, message: "请填写", trigger: "blur" }],
      },
      newform: {
        code: "",
        type: "",
        businessScope: "",
      },
      id: "",
      delarr: [],
    };
  },
  created() {
    me = this;
  },
  mounted() {
    this.getmcclist();
  },
  methods: {
    //列表
    getmcclist() {
      getmcclist(this.searchForm).then((res) => {
        this.total = Number(res.data.data.total);
        this.listData = res.data.data.list;
      });
    },
    citylistCode() {
      citylistCode().then((res) => {});
    },
    cityfirst() {
      cityfirst().then((res) => {});
    },
    // 新增
    Mccadd() {
      Mccadd(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.getmcclist();
          this.newform = {};

          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
          this.dialogVisible = false;
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //删除
    Mccdel(row) {
      const length = this.multipleSelection.length;
      for (let i = 0; i < length; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      if (this.delarr.length > 0) {
        let obj = {
          ids: this.delarr,
        };
        Mccdel(obj).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getmcclist();
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
      this.getmcclist();
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
          this.Mccadd();
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
      this.newform.code = row.code;
      this.newform.name = row.name;
      this.newform.regionalLevel = row.regionalLevel;
      this.newform.city = row.city;
      this.newform.clearcode = row.clearcode;
      this.newform.province = row.province;
      this.dialogVisible = true;
    },
    Mccupdate() {
      Mccupdate(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getmcclist();
          this.dialogVisible = false;
        }
      });
    },
    // 点击搜索
    handleSearch() {
      this.searchForm.pageNum = 1;
      this.getmcclist();
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
