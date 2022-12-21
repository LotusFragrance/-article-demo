<template>
  <div class="header-container">
    <el-row type="flex">
      <el-col :span="6" v-for="(obj, index) in headerData" :key="index">
        <div class="item">
          <el-row type="flex" justify="space-between" align="middle">
            <div class="left">
              <div>{{ obj.num }}</div>
              <span>{{ obj.name }}</span>
            </div>
            <div class="right">
              <i :class="[obj.icon]"></i>
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headerData: [
        {
          num: 10040,
          name: '文章总数',
          icon: 'el-icon-tickets'
        },
        {
          num: 1056,
          name: '日新增文章数',
          icon: 'el-icon-document'
        },
        {
          num: 11148,
          name: '评论总数',
          icon: 'el-icon-document-copy'
        },
        {
          num: 420,
          name: '日新增评论数',
          icon: 'el-icon-folder'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  padding: 15px 2px;
  margin-bottom: 23px;
  background-color: #fff;
  .el-col {
    &:nth-child(4) {
      .item {
        border: 0;
      }
    }
  }
  .item {
    padding: 11px 30px;
    border-right: 1px solid #D7DBEC;
    .right {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #ecf2fe;
      opacity: 0.6;
      text-align: center;
      line-height: 42px;
      i {
        color: #317EFF;
      }
    }
    .left {
      div {
        font-size: 19px;
        font-weight: 500;
        color: #131523;
        line-height: 21px;
      }
      span {
        font-size: 11px;
        color: #5a607f;
        line-height: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
  }
}
</style>
