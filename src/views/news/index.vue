<template>
  <div class="serviceList">
    <div class="header">
      <el-input
        v-model="searchForm.name"
        placeholder="请输入标题"
        class="input"
      ></el-input>

      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button type="primary" plain @click="handleAdd"
        >添加新闻公告</el-button
      >
    </div>
    <el-table
      style="width: 100%"
      class="table-wrap"
      :data="listData"
      highlight-current-row
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="100"></el-table-column>

      <el-table-column prop="title" label="新闻标题"></el-table-column>

      <el-table-column prop="createtime" label="时间"> </el-table-column>
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
            @click="newsdel(scope.row)"
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
        <el-form-item label="标题" prop="title">
          <el-input v-model="newform.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="title">
          <el-input
            v-model="newform.content"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10 }"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" v-if="!isedit" @click="addbank('newform')"
            >添 加</el-button
          >
          <el-button type="primary" v-if="isedit" @click="newsupdate('newform')"
            >修 改</el-button
          >
          <el-button @click="dialogclose">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getnewsall, newsadd, newsupdate, newsdel } from "@/api/news";
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
        title: "",
        pageNum: 1,
        pageSize: 20,
      },

      isedit: false,
      rules: {
        title: [{ required: true, message: "请填写", trigger: "blur" }],
        content: [{ required: true, message: "请填写", trigger: "blur" }],
      },
      newform: {
        content: "",
        title: "",
      },
      id: "",
    };
  },
  created() {
    me = this;
  },
  mounted() {
    this.getnewsall();
  },
  methods: {
    //列表
    getnewsall() {
      getnewsall(this.searchForm).then((res) => {
        this.total = Number(res.data.data.total);
        this.listData = res.data.data.list;
      });
    },

    // 新增
    newsadd() {
      newsadd(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.getnewsall();
          this.newform = {};

          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
          this.dialogVisible = false;
        }
      });
    },
    //删除
    newsdel(row) {
      newsdel(row.id).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getnewsall();
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
      this.getnewsall();
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
          this.newsadd();
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
      this.newform.title = row.title;
      this.newform.content = row.content;
      this.dialogVisible = true;
    },
    newsupdate() {
      newsupdate(this.newform).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getnewsall();
          this.dialogVisible = false;
        }
      });
    },
    // 点击搜索
    handleSearch() {
      this.searchForm.pageNum = 1;
      this.getnewsall();
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
