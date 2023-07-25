
<template>
  <div class="agentinput">
    <div>
      <h3>代理商录入</h3>
      <h4>基本信息</h4>
    </div>
    <el-form
      :model="formData"
      ref="vForm"
      :rules="rules"
      label-position="left"
      label-width="100px"
      size="medium"
      @submit.native.prevent
    >
      <el-row>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="代理商简称:"
            prop="agentName"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.agentName"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="代理商全称:"
            prop="fullName"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.fullName"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="法人姓名:	"
            prop="legalName"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.legalName"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="法人证件号:"
            prop="identityCard"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.identityCard"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="联系人:"
            prop="linkMan"
            class="label-center-align"
          >
            <el-input
              v-model="formData.linkMan"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="电子邮箱:"
            prop="email"
            class="label-center-align"
          >
            <el-input v-model="formData.email" type="text" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="固定电话:	"
            prop="telephone"
            class="label-center-align"
          >
            <el-input
              v-model="formData.telephone"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="手机号码:"
            prop="mobile"
            class="label-center-align"
          >
            <el-input
              v-model="formData.mobile"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="加盟费:"
            prop="memberFee"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.memberFee"
              type="text"
              placeholder="0.00"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="保证金:"
            prop="assuranceFee"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.assuranceFee"
              type="text"
              placeholder="0.00"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="提现费分成:"
            prop="withdrawalFee"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.withdrawalFee"
              type="text"
              placeholder="0.00"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="T+0分成比例:"
            prop="t0Divide"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.t0Divide"
              type="text"
              placeholder="0"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="代理商类型:"
            prop="agentType"
            class="label-center-align"
          >
            <el-radio-group v-model="formData.agentType">
              <el-radio
                v-for="(item, index) in agentTypeOptions"
                :key="index"
                :label="item.value"
                :disabled="item.disabled"
                style="
                   {
                    display: inline;
                  }
                "
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="业务开通类型:"
            prop="bizType"
            class="label-center-align"
          >
            <el-checkbox-group v-model="formData.bizType">
              <el-checkbox
                v-for="(item, index) in bizTypeOptions"
                :key="index"
                :label="item.value"
                :disabled="item.disabled"
                style="
                   {
                    display: inline;
                  }
                "
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="T+1分成比例:"
            prop="t1Divide"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.t1Divide"
              type="text"
              placeholder="100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell"> </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="联系地址:"
            prop="address"
            class="label-center-align"
          >
            <el-cascader
              v-model="formData.address"
              class="full-width-input"
              :options="addressOptions"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item label="" prop="address2" class="label-center-align">
            <el-input
              v-model="formData.address2"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="个人码费率:	"
            prop="personalRate"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.personalRate"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="补登费率"
            prop="budengRate"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.budengRate"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="帐户类型:"
            prop="accountType"
            class="label-center-align"
          >
            <el-radio-group v-model="formData.accountType">
              <el-radio
                v-for="(item, index) in accountTypeOptions"
                :key="index"
                :label="item.value"
                :disabled="item.disabled"
                style="
                   {
                    display: inline;
                  }
                "
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell"> </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="结算账号:	"
            prop="accountno"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.accountno"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="帐户户名："
            prop="accountName"
            class="required label-center-align"
          >
            <el-input
              v-model="formData.accountName"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="开户行所在省："
            prop="province"
            class="label-center-align"
          >
            <el-select
              v-model="formData.province"
              class="full-width-input"
              clearable
            >
              <el-option
                v-for="(item, index) in provinceOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="开户行城市"
            prop="city"
            class="label-center-align"
          >
            <el-select
              v-model="formData.city"
              class="full-width-input"
              clearable
            >
              <el-option
                v-for="(item, index) in cityOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="银行行别:	"
            prop="banktype"
            class="label-center-align"
          >
            <el-select
              v-model="formData.banktype"
              class="full-width-input"
              clearable
            >
              <el-option
                v-for="(item, index) in banktypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell">
          <el-form-item
            label="开户银行:"
            prop="bank"
            class="required label-center-align"
          >
            <el-select
              v-model="formData.bank"
              class="full-width-input"
              clearable
            >
              <el-option
                v-for="(item, index) in bankOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="身份证照片:"
        prop="identityCardImg"
        class="label-center-align"
      >
        <el-upload
          :file-list="identityCardImgFileList"
          :headers="identityCardImgUploadHeaders"
          :data="identityCardImgUploadData"
          action="http://zhifu.funstone.net:8011/oss/uploadFile2"
          list-type="picture-card"
          show-file-list
          :limit="1"
        >
          <template #default><i class="el-icon-plus"></i></template
        ></el-upload>
      </el-form-item>
      <el-form-item
        label="银行卡照片:"
        prop="bankCardImg"
        class="label-center-align"
      >
        <el-upload
          :file-list="bankCardImgFileList"
          :headers="bankCardImgUploadHeaders"
          :data="bankCardImgUploadData"
          action="http://zhifu.funstone.net:8011/oss/uploadFile2"
          list-type="picture-card"
          show-file-list
          :limit="1"
        >
          <template #default><i class="el-icon-plus"></i></template
        ></el-upload>
      </el-form-item>
      <el-form-item
        label="合同文件:	"
        prop="contractImg"
        class="label-center-align"
      >
        <el-upload
          :file-list="contractImgFileList"
          :headers="contractImgUploadHeaders"
          :data="contractImgUploadData"
          action="http://zhifu.funstone.net:8011/oss/uploadFile2"
          list-type="picture-card"
          show-file-list
          :limit="1"
        >
          <template #default><i class="el-icon-plus"></i></template
        ></el-upload>
      </el-form-item>
      <el-form-item
        label="其它文件:"
        prop="otherFile"
        class="label-center-align"
      >
        <el-upload
          :file-list="otherFileFileList"
          :headers="otherFileUploadHeaders"
          :data="otherFileUploadData"
          action="http://zhifu.funstone.net:8011/oss/uploadFile2"
          list-type="picture-card"
          show-file-list
          :limit="1"
        >
          <template #default><i class="el-icon-plus"></i></template
        ></el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      formData: {
        agentName: "",
        fullName: "",
        legalName: "",
        identityCard: "",
        linkMan: "",
        email: "",
        telephone: "",
        mobile: "",
        memberFee: "",
        assuranceFee: "",
        withdrawalFee: "",
        t0Divide: "",
        agentType: 1,
        bizType: [],
        t1Divide: "",
        address: "",
        address2: "",
        personalRate: "",
        budengRate: "",
        accountType: 1,
        accountno: "",
        accountName: "",
        province: "",
        city: "",
        banktype: "",
        bank: "",
        identityCardImg: null,
        bankCardImg: null,
        contractImg: null,
        otherFile: null,
      },
      rules: {
        agentName: [
          {
            required: true,
            message: "字段值不可为空",
          },
        ],
        fullName: [
          {
            required: true,
            message: "字段值不可为空",
          },
        ],
        legalName: [
          {
            required: true,
            message: "字段值不可为空",
          },
        ],
        identityCard: [
          {
            required: true,
            message: "字段值不可为空",
          },
        ],
        memberFee: [
          {
            required: true,
            message: "字段值不可为空",
          },
          {
            pattern: /^[-]?\d+(\.\d+)?$/,
            trigger: ["blur", "change"],
            message: "",
          },
        ],
        assuranceFee: [
          {
            required: true,
            message: "字段值不可为空",
          },
          {
            pattern: /^[-]?\d+(\.\d+)?$/,
            trigger: ["blur", "change"],
            message: "",
          },
        ],
        withdrawalFee: [
          {
            required: true,
            message: "字段值不可为空",
          },
        ],
        t0Divide: [
          {
            required: true,
            message: "字段值不可为空",
          },
          {
            pattern: /^[-]?\d+(\.\d+)?$/,
            trigger: ["blur", "change"],
            message: "",
          },
        ],
        t1Divide: [
          {
            required: true,
            message: "字段值不可为空",
          },
          {
            pattern: /^[-]?\d+(\.\d+)?$/,
            trigger: ["blur", "change"],
            message: "",
          },
        ],
        personalRate: [
          {
            required: true,
            message: "字段值不可为空",
          },
        ],
        budengRate: [
          {
            required: true,
            message: "字段值不可为空",
          },
        ],
        accountno: [
          {
            required: true,
            message: "字段值不可为空",
          },
        ],
        accountName: [
          {
            required: true,
            message: "字段值不可为空",
          },
        ],
        bank: [
          {
            required: true,
            message: "字段值不可为空",
          },
        ],
      },
      agentTypeOptions: [
        {
          label: "普通代理商",
          value: 1,
        },
        {
          label: "OEM代理商",
          value: 2,
        },
        {
          label: "机构接入代理商",
          value: 3,
        },
      ],
      bizTypeOptions: [
        {
          label: "手机APP",
          value: 1,
        },
        {
          label: "二维码费率",
          value: 2,
        },
        {
          label: "线上费率",
          value: 3,
        },
      ],
      addressOptions: [
        {
          label: "select 1",
          value: 1,
          children: [
            {
              label: "child 1",
              value: 11,
            },
          ],
        },
        {
          label: "select 2",
          value: 2,
        },
        {
          label: "select 3",
          value: 3,
        },
      ],
      accountTypeOptions: [
        {
          label: "对私",
          value: 1,
        },
        {
          label: "对公",
          value: 2,
        },
      ],
      provinceOptions: [
        {
          label: "select 1",
          value: 1,
        },
        {
          label: "select 2",
          value: 2,
        },
        {
          label: "select 3",
          value: 3,
        },
      ],
      cityOptions: [
        {
          label: "select 1",
          value: 1,
        },
        {
          label: "select 2",
          value: 2,
        },
        {
          label: "select 3",
          value: 3,
        },
      ],
      banktypeOptions: [
        {
          label: "select 1",
          value: 1,
        },
        {
          label: "select 2",
          value: 2,
        },
        {
          label: "select 3",
          value: 3,
        },
      ],
      bankOptions: [
        {
          label: "select 1",
          value: 1,
        },
        {
          label: "select 2",
          value: 2,
        },
        {
          label: "select 3",
          value: 3,
        },
      ],
      identityCardImgFileList: [],
      identityCardImgUploadHeaders: {},
      identityCardImgUploadData: {},
      bankCardImgFileList: [],
      bankCardImgUploadHeaders: {},
      bankCardImgUploadData: {},
      contractImgFileList: [],
      contractImgUploadHeaders: {},
      contractImgUploadData: {},
      otherFileFileList: [],
      otherFileUploadHeaders: {},
      otherFileUploadData: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["vForm"].validate((valid) => {
        if (!valid) return;
        //TODO: 提交表单
      });
    },
    resetForm() {
      this.$refs["vForm"].resetFields();
    },
  },
};
</script>

<style lang="scss">
.agentinput {
  padding: 16px;
}
.el-input-number.full-width-input,
.el-cascader.full-width-input {
  width: 100% !important;
}

.el-form-item--medium {
  .el-radio {
    line-height: 36px !important;
  }

  .el-rate {
    margin-top: 8px;
  }
}

.el-form-item--small {
  .el-radio {
    line-height: 32px !important;
  }

  .el-rate {
    margin-top: 6px;
  }
}

.el-form-item--mini {
  .el-radio {
    line-height: 28px !important;
  }

  .el-rate {
    margin-top: 4px;
  }
}

.clear-fix:before,
.clear-fix:after {
  display: table;
  content: "";
}

.clear-fix:after {
  clear: both;
}

.float-right {
  float: right;
}
</style>

<style lang="scss" scoped>
div.table-container {
  table.table-layout {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    td.table-cell {
      display: table-cell;
      height: 36px;
      border: 1px solid #e1e2e3;
    }
  }
}

div.tab-container {
}

.label-left-align ::v-deep .el-form-item__label {
  text-align: left;
}

.label-center-align ::v-deep .el-form-item__label {
  text-align: center;
}

.label-right-align ::v-deep .el-form-item__label {
  text-align: right;
}

.custom-label {
}

.static-content-item {
  min-height: 20px;
  display: flex;
  align-items: center;

  ::v-deep .el-divider--horizontal {
    margin: 0;
  }
}
</style>