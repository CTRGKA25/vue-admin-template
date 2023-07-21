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
        v-model="searchForm.code"
        placeholder="请输入区域代码"
        class="input"
      ></el-input>
      <el-input
        v-model="searchForm.name"
        placeholder="请输入地区名称"
        class="input"
      ></el-input>
      <el-input
        v-model="searchForm.servicePackageName"
        placeholder="请输入服务包名称查询"
        class="input"
      ></el-input>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button type="primary" plain @click="handleAdd">添加地区</el-button>
    </div>
    <el-table
      style="width: 100%"
      class="table-wrap"
      :data="listData"
      highlight-current-row
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="code" label="地区代码"></el-table-column>
      <el-table-column prop="name" label="地区名称"> </el-table-column>
      <el-table-column prop="regionalLevel" label="地区级别">
        <template v-slot="scope">
          <div>
            {{
              scope.row.regionalLevel
                ? regionalLeveldata[scope.row.regionalLevel].label
                : "省级"
            }}
          </div>
        </template>
      </el-table-column>
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
            @click="city1del(scope.row)"
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
        <el-form-item label="地区代码" prop="code">
          <el-input v-model="newform.code"></el-input>
        </el-form-item>

        <el-form-item label="地区名称" prop="name">
          <el-input v-model="newform.name"></el-input>
        </el-form-item>
        <el-form-item label="地区级别" prop="regionalLevel">
          <el-select
            v-model="newform.regionalLevel"
            placeholder="请选择地区级别"
          >
            <el-option label="省级" :value="1"></el-option>
            <el-option label="地级" :value="2"></el-option>
            <el-option label="市级" :value="3"></el-option>
            <el-option label="县级市" :value="4"></el-option>
            <el-option label="县级" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属省份" prop="regionalLevel">
          <el-select v-model="newform.regionalLevel" placeholder="请选择省份">
            <el-option label="省级" :value="1"></el-option>
            <el-option label="地级" :value="2"></el-option>
            <el-option label="市级" :value="3"></el-option>
            <el-option label="县级市" :value="4"></el-option>
            <el-option label="县级" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属城市" prop="regionalLevel">
          <el-select
            v-model="newform.regionalLevel"
            placeholder="请选择地区级别"
          >
            <el-option label="省级" :value="1"></el-option>
            <el-option label="地级" :value="2"></el-option>
            <el-option label="市级" :value="3"></el-option>
            <el-option label="县级市" :value="4"></el-option>
            <el-option label="县级" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" v-if="!isedit" @click="addbank('newform')"
            >添 加</el-button
          >
          <el-button
            type="primary"
            v-if="isedit"
            @click="city1update('newform')"
            >修 改</el-button
          >
          <el-button @click="dialogclose">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getcitylist,
  city1add,
  city1update,
  city1del,
  citylistCode,
  cityfirst,
} from "@/api/city";
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
        code: "",
        name: "",
        regionalLevel: "",
        city: "",
        clearcode: "",
        id: 0,
        province: "",
        pageNum: 1,
        pageSize: 20,
      },
      regionalLeveldata: {
        1: {
          label: "省级",
        },
        2: {
          label: "地级",
        },
        3: {
          label: "市级",
        },
        4: {
          label: "县级市",
        },
        5: {
          label: "县级",
        },
      },
      isedit: false,
      rules: {
        name: [{ required: true, message: "请填写", trigger: "blur" }],
        province: [{ required: true, message: "请填写", trigger: "blur" }],
        code: [{ required: true, message: "请填写", trigger: "blur" }],
        regionalLevel: [{ required: true, message: "请填写", trigger: "blur" }],
        city: [{ required: true, message: "请填写", trigger: "blur" }],
        clearcode: [{ required: true, message: "请填写", trigger: "blur" }],
      },
      newform: {
        id: 0,
        code: "",
        name: "",
        regionalLevel: "",
        city: "",
        province: "",
      },
      id: "",
    };
  },
  created() {
    me = this;
  },
  mounted() {
    this.getcitylist();
    this.citylistCode();
    this.cityfirst();
  },
  methods: {
    //列表
    getcitylist() {
      getcitylist(this.searchForm).then((res) => {
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
    city1add() {
      city1add(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.getcitylist();
          this.newform = {};

          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
          this.dialogVisible = false;
        }
      });
    },
    //删除
    city1del(row) {
      city1del(row.id).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getcitylist();
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
      this.getcitylist();
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
          this.city1add();
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
    city1update() {
      city1update(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getcitylist();
          this.dialogVisible = false;
        }
      });
    },
    // 点击搜索
    handleSearch() {
      this.searchForm.pageNum = 1;
      this.getcitylist();
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
