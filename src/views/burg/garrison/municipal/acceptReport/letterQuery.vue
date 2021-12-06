<template>
  <div class="information-inner information-change">
    <h1 class="information-title active">信访查询</h1>
    <div class="tab-list-content">
      <national-info
        :teamId.sync="queryParams.teamId"
        :areaCode.sync="queryParams.inspectAreaCode"
        :areaName.sync="queryParams.inspectAreaName"
        @nameChange="getList"
      ></national-info>
      <div class="box-body" v-show="showSearch">
        <el-form :model="queryParams" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="举报内容：">
                <el-input v-model="queryParams.tipOffContent" placeholder="请输入举报内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="举报编号：">
                <el-input v-model="queryParams.tipNumber" placeholder="请输入举报编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="举报时间：">
                <el-date-picker
                  v-model="issueDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="issueDateChange"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="污染类型：">
                <el-select v-model="queryParams.pollutionLevelOne" placeholder="请选择污染类型">
                  <el-option
                    v-for="item in pollutantArry"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="举报类型：">
                <el-select v-model="queryParams.tipType" placeholder="请选择举报类型">
                  <el-option
                    v-for="item in tipArry"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item class="pull-right">
              <el-button type="primary" @click="onQuery">查询</el-button>
              <el-button type="primary" @click="onClear">清空</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-row :gutter="10" class="mb8">
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
      <el-table v-loading="loading" :data="List" border :stripe="true">
        <el-table-column type="index" label="序号" width="50">
          <template scope="scope">
            <span>
              {{
              (queryParams.pageNo - 1) * queryParams.pageSize + scope.$index + 1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="举报主要内容" min-width="200px" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span class="accounChunk" @click="handleSee(scope.row)">
              {{
              scope.row.tipOffContent
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="cityName" label="督察地市" width="120px"></el-table-column>
        <el-table-column prop="address" label="举报地址" width="160px"></el-table-column>
        <el-table-column
          prop="pollutionType"
          label="污染类型"
          width="120px"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="tipTypeName" label="举报类型" width="120px"></el-table-column>
        <el-table-column prop="tipBy" label="举报人" width="80px"></el-table-column>
        <el-table-column prop="reporterPhone" label="举报人手机号" width="110px"></el-table-column>
        <el-table-column prop="tipNumber" label="举报编号" width="160px"></el-table-column>
        <el-table-column prop="tipTime" label="举报时间" width="160px"></el-table-column>
        <el-table-column prop="acceptNum" label="受理编号" width="160px"></el-table-column>
        <el-table-column prop="acceptDate" label="受理时间" width="160px"></el-table-column>
        <el-table-column prop="toUnit" label="责任单位" width="160px"></el-table-column>
        <el-table-column prop="transfetNumber" label="转办编号" width="200px"></el-table-column>
        <el-table-column prop="transferTime" label="转办时间" width="160px"></el-table-column>
        <el-table-column prop="handleStateName" label="办理状态" width="120px"></el-table-column>
        <el-table-column prop="handleTime" label="办理时间" width="160px"></el-table-column>
        <el-table-column prop="finishFlagName" label="办结状态" width="160px"></el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :pageNo.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <el-dialog
      title="查看"
      :visible.sync="lookOpen"
      width="80%"
      :before-close="handleDialogLookClose"
      append-to-body
    >
      <div class="examineInfo">
        <h1 class="examineInfo-title">举报内容{{followTitle}}</h1>
      </div>
      <div class="manage-info">
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">轮次：</span>
            <span class="info-item-content">{{ manageInfo.inspectTurnName }}</span>
          </div>
          <div class="info-item-quare">
            <span class="info-item-title">督察地区：</span>
            <span class="info-item-content">
              {{
              manageInfo.inspectAreaName
              }}
            </span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">举报编号：</span>
            <span class="info-item-content">{{ manageInfo.tipNumber }}</span>
          </div>
          <div class="info-item-quare">
            <span class="info-item-title">举报类型：</span>
            <span class="info-item-content">{{ manageInfo.tipTypeName }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">举报人：</span>
            <span class="info-item-content">{{ manageInfo.tipBy }}</span>
          </div>
          <div class="info-item-quare">
            <span class="info-item-title">举报时间：</span>
            <span class="info-item-content">{{ manageInfo.tipTime }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">举报人号码：</span>
            <span class="info-item-content">{{ manageInfo.reporterPhone }}</span>
          </div>
          <div class="info-item-quare" v-if="telBoolean">
            <span class="info-item-title">来电显示号码：</span>
            <span class="info-item-content">{{ manageInfo.reporterPhoneShow }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">被举报人单位：</span>
            <span class="info-item-content">{{ manageInfo.tipOffName }}</span>
          </div>
          <div class="info-item-quare">
            <span class="info-item-title">被举报人地址：</span>
            <span class="info-item-content">{{ manageInfo.tipOffAddr }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">行业类型：</span>
            <span class="info-item-content">{{ manageInfo.industryName }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">主要举报内容：</span>
            <span class="info-item-content">
              {{
              manageInfo.tipOffContent
              }}
            </span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">举报地址：</span>
            <span class="info-item-content">{{ manageInfo.tipAddress }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">经度：</span>
            <span class="info-item-content">{{ manageInfo.longitude }}</span>
          </div>
          <div class="info-item-quare">
            <span class="info-item-title">纬度：</span>
            <span class="info-item-content">{{ manageInfo.latitude }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">主要污染类型：</span>
            <span class="info-item-content">
              {{
              manageInfo.pollutionType && manageInfo.pollutionType.split(',')[0]
              }}
            </span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">次要污染类型：</span>
            <span class="info-item-content">
              {{
              manageInfo.pollutionType && manageInfo.pollutionType.split(',')[1]
              }}
            </span>
          </div>
        </div>
        <div class="info-item" v-if="telBoolean == false">
          <div class="info-item-quare">
            <span class="info-item-title">来信电子件：</span>
            <div>
              <span
                class="info-item-content accounChunk"
                v-for="(item, index) in manageInfo.attachementArry"
                :key="index"
                @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
              >{{ item.file_name }}</span>
            </div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">备注：</span>
            <span class="info-item-content">{{ manageInfo.remarks }}</span>
          </div>
        </div>
      </div>

      <template v-if="auditFllowInfoBoolean">
        <div class="examineInfo">
          <h1 class="examineInfo-title">主重件信息</h1>
        </div>
        <div class="manage-info">
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">轮次：</span>
              <span class="info-item-content">
                {{
                manageFllowInfo.inspectTurnName
                }}
              </span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">督察地区：</span>
              <span class="info-item-content">{{ manageFllowInfo.inspectAreaName }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">举报编号：</span>
              <span class="info-item-content">{{ manageFllowInfo.tipNumber }}</span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">举报类型：</span>
              <span class="info-item-content">{{ manageFllowInfo.tipTypeName }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">举报人：</span>
              <span class="info-item-content">{{ manageFllowInfo.tipBy }}</span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">举报时间：</span>
              <span class="info-item-content">{{ manageFllowInfo.tipTime }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">举报人号码：</span>
              <span class="info-item-content">{{ manageFllowInfo.reporterPhone }}</span>
            </div>
            <div class="info-item-quare" v-if="manageFllowInfo.tipTypeName == '来电'">
              <span class="info-item-title">来电显示号码：</span>
              <span class="info-item-content">{{ manageFllowInfo.reporterPhoneShow }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">被举报人单位：</span>
              <span class="info-item-content">{{ manageInfo.tipOffName }}</span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">被举报人地址：</span>
              <span class="info-item-content">{{ manageFllowInfo.tipOffAddr }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">行业类型：</span>
              <span class="info-item-content">{{ manageFllowInfo.industryName }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">主要举报内容：</span>
              <span class="info-item-content">{{ manageFllowInfo.tipOffContent }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">举报地址：</span>
              <span class="info-item-content">{{ manageFllowInfo.tipAddress }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">经度：</span>
              <span class="info-item-content">{{ manageFllowInfo.longitude }}</span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">纬度：</span>
              <span class="info-item-content">{{ manageFllowInfo.latitude }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">主要污染类型：</span>
              <span class="info-item-content">
                {{
                manageFllowInfo.pollutionType &&
                manageFllowInfo.pollutionType.split(",")[0]
                }}
              </span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">次要污染类型：</span>
              <span class="info-item-content">
                {{
                manageFllowInfo.pollutionType &&
                manageFllowInfo.pollutionType.split(",")[1]
                }}
              </span>
            </div>
          </div>
          <div class="info-item" v-if="manageFllowInfo.tipTypeName == '来信'">
            <div class="info-item-quare">
              <span class="info-item-title">来信电子件：</span>
              <div>
                <span
                  class="info-item-content accounChunk"
                  v-for="(item, index) in manageFllowInfo.attachementFllowArry"
                  :key="index"
                  @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
                >{{ item.file_name }}</span>
              </div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">备注：</span>
              <span class="info-item-content">{{ manageFllowInfo.remarks }}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-if="repeatInfoBoolean">
        <div class="examineInfo">
          <h1 class="examineInfo-title">重复举报信息</h1>
        </div>
        <div class="manage-info">
          <div class="info-item" v-if="auditInfo.repeatId">
            <div class="info-item-quare">
              <div class="info-item-content">
                <el-button
                  style="float:right;margin-bottom:10px;"
                  v-if="repeatNumsBoolean&&unfoldBoolean"
                  size="mini"
                  type="primary"
                  @click="handleUnfoldClick"
                >展开</el-button>
                <el-button
                  style="float:right;margin-bottom:10px;"
                  v-if="repeatNumsBoolean&&!unfoldBoolean"
                  size="mini"
                  type="primary"
                  @click="handlePackClick"
                >收起</el-button>
                <el-table :data="repeatList" border :stripe="true">
                  <el-table-column width="50" label="序号">
                    <template v-slot="scope">
                      <span>{{scope.$index +1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="举报主要内容"
                    prop="tipOffContent"
                    :show-overflow-tooltip="true"
                    min-width="200px"
                  ></el-table-column>
                  <el-table-column label="旗县" width="180px">
                    <template v-slot="scope">{{ scope.row.cityName }}{{ scope.row.countyName }}</template>
                  </el-table-column>
                  <el-table-column label="举报地址" :show-overflow-tooltip="true" width="180px">
                    <template v-slot="scope">{{ scope.row.address }}</template>
                  </el-table-column>
                  <el-table-column prop="tipNumber" label="举报编号" width="140px"></el-table-column>
                  <el-table-column prop="tipTime" label="举报时间" width="120px"></el-table-column>
                  <el-table-column
                    prop="tipBy"
                    label="举报人"
                    width="100px"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="pollutionType"
                    label="污染类型"
                    width="120px"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="industryName"
                    label="行业类型"
                    width="120px"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column prop="tipTypeName" label="举报类型" width="80px"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="auditBoolean">
        <div class="examineInfo">
          <h1 class="examineInfo-title">{{auditTitle}}</h1>
        </div>
        <div class="manage-info">
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">审核人：</span>
              <span class="info-item-content">{{ auditInfo.checkByName }}</span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">审核时间：</span>
              <span class="info-item-content">{{ auditInfo.checkTime }}</span>
            </div>
          </div>
          <div class="info-item" v-if="industryBoolena">
            <div class="info-item-quare">
              <span class="info-item-title">行业类型修正：</span>
              <span class="info-item-content">{{ auditInfo.industryTypeReviewName }}</span>
            </div>
          </div>
          <div class="info-item" v-if="tipOffContentBoolean">
            <div class="info-item-quare">
              <span class="info-item-title">举报内容修正：</span>
              <span class="info-item-content">{{ auditInfo.tipOffContentReivew }}</span>
            </div>
          </div>
          <div class="info-item" v-if="addressBoolean">
            <div class="info-item-quare">
              <span class="info-item-title">举报地址修正：</span>
              <span class="info-item-content">
                {{ auditInfo.cityReviewName }}{{ auditInfo.countyRevireName
                }}{{ auditInfo.addressReview }}
              </span>
            </div>
          </div>
          <div class="info-item" v-if="pollutionLevelBoolean">
            <div class="info-item-quare">
              <span class="info-item-title">主要污染类型：</span>
              <span class="info-item-content">
                {{
                auditInfo.pollutionLevelOneReviewName
                }}
              </span>
            </div>
          </div>
          <div class="info-item" v-if="pollutionLevelBoolean">
            <div class="info-item-quare">
              <span class="info-item-title">次要污染类型：</span>
              <span class="info-item-content">
                {{
                auditInfo.pollutionLevelTwoReviewName
                }}
              </span>
            </div>
          </div>
          <div class="info-item" v-if="longitudeBoolean">
            <div class="info-item-quare">
              <span class="info-item-title">经度修正：</span>
              <span class="info-item-content">
                {{
                auditInfo.longitudeReview
                }}
              </span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">纬度修正：</span>
              <span class="info-item-content">
                {{
                auditInfo.latitudeReview
                }}
              </span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">是否受理：</span>
              <span class="info-item-content">{{ auditInfo.weatherAccept }}</span>
            </div>
            <div class="info-item-quare" v-if="auditInfo.weatherAccept === '否'">
              <span class="info-item-title">不受理原因：</span>
              <span class="info-item-content">{{ auditInfo.handIdea }}</span>
            </div>
          </div>
          <div class="info-item" v-if="auditInfo.repeatId">
            <div class="info-item-quare">
              <span class="info-item-title">重复举报信息：</span>
              <div class="info-item-content">
                <el-button
                  style="float:right;margin-bottom:10px;"
                  v-if="repeatNumsBoolean&&unfoldBoolean"
                  size="mini"
                  type="primary"
                  @click="handleUnfoldClick"
                >展开</el-button>
                <el-button
                  style="float:right;margin-bottom:10px;"
                  v-if="repeatNumsBoolean&&!unfoldBoolean"
                  size="mini"
                  type="primary"
                  @click="handlePackClick"
                >收起</el-button>
                <el-table :data="repeatList" border :stripe="true">
                  <el-table-column width="50" label="序号">
                    <template v-slot="scope">
                      <span>{{scope.$index +1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="举报主要内容"
                    prop="tipOffContent"
                    :show-overflow-tooltip="true"
                    min-width="200px"
                  ></el-table-column>
                  <el-table-column label="旗县" width="180px">
                    <template v-slot="scope">{{ scope.row.cityName }}{{ scope.row.countyName }}</template>
                  </el-table-column>
                  <el-table-column label="举报地址" :show-overflow-tooltip="true" width="180px">
                    <template v-slot="scope">{{ scope.row.address }}</template>
                  </el-table-column>
                  <el-table-column prop="tipNumber" label="举报编号" width="140px"></el-table-column>
                  <el-table-column prop="tipTime" label="举报时间" width="120px"></el-table-column>
                  <el-table-column
                    prop="tipBy"
                    label="举报人"
                    width="100px"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="pollutionType"
                    label="污染类型"
                    width="120px"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="industryName"
                    label="行业类型"
                    width="120px"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column prop="tipTypeName" label="举报类型" width="80px"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">纳入抽查范围：</span>
              <span class="info-item-content">{{ auditInfo.spotFlag }}</span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">是否重点关注：</span>
              <span class="info-item-content">{{ auditInfo.importantFlag }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">是否转办：</span>
              <span class="info-item-content">{{ auditInfo.weatherTransfer }}</span>
            </div>
            <div class="info-item-quare" v-if="auditInfo.weatherTransfer === '是'">
              <span class="info-item-title">办理时限：</span>
              <span class="info-item-content">{{ auditInfo.handleDeadline }}</span>
            </div>
          </div>
          <div class="info-item" v-if="auditInfo.weatherTransfer === '是'">
            <div class="info-item-quare">
              <span class="info-item-title">拟办意见：</span>
              <span class="info-item-content">{{ auditInfo.proposal }}</span>
            </div>
          </div>
        </div>
      </template>
      <div class="manage-box" v-if="handleStateName === '已办理'">
        <div class="examineInfo" style="margin-top: 30px">
          <h1 class="examineInfo-title">{{transactTitle}}</h1>
        </div>
        <div class="manage-info">
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">办结情况：</span>
              <span class="info-item-content">
                {{
                transactInfo.finishFlagName
                }}
              </span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">办结时间：</span>
              <span class="info-item-content">
                {{
                transactInfo.finishTime
                }}
              </span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">属实情况：</span>
              <span class="info-item-content">
                {{
                transactInfo.trueFlagName
                }}
              </span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">区域分布：</span>
              <span class="info-item-content">{{ transactInfo.areaName }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">利益关系：</span>
              <span class="info-item-content">{{ transactInfo.interestRelationshipName }}</span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">群众身边：</span>
              <span class="info-item-content">{{ transactInfo.aroundMassesName }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">调查核实情况：</span>
              <span class="info-item-content">{{ transactInfo.investiCheck }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">处理和整改情况：</span>
              <span class="info-item-content">
                {{
                transactInfo.dealReform
                }}
              </span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">问责情况：</span>
              <span class="info-item-content">{{ transactInfo.questioningSituation }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">是否公开：</span>
              <span class="info-item-content">{{ transactInfo.openFlagName }}</span>
            </div>
            <template v-if="transactInfo.openFlag == 1">
              <div class="info-item-quare">
                <span class="info-item-title">公开时间：</span>
                <span class="info-item-content">
                  {{
                  transactInfo.openTime
                  }}
                </span>
              </div>
              <div class="info-item-quare">
                <span class="info-item-title">公开地址：</span>
                <span class="info-item-content">
                  {{
                  transactInfo.openAddr
                  }}
                </span>
              </div>
            </template>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">责令整改（家）：</span>
              <span class="info-item-content">{{ transactInfo.orderReform }}</span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">立案处罚（家）：</span>
              <span class="info-item-content">
                {{
                transactInfo.punishment
                }}
              </span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">罚款金额（元）：</span>
              <span class="info-item-content">{{ transactInfo.fine }}</span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">立案侦查（件）：</span>
              <span class="info-item-content">{{ transactInfo.lawcase }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">约谈（人）：</span>
              <span class="info-item-content">
                {{
                transactInfo.interview
                }}
              </span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">行政拘留（人）：</span>
              <span class="info-item-content">{{ transactInfo.adminDetain }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">刑事拘留（人）：</span>
              <span class="info-item-content">{{ transactInfo.criminalDetain }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  acceptQueryList,
  acceptSee,
  acceptCheckInfo,
  repeatNumList
} from "@/api/burg/garrison";
import { transactManageSee } from "@/api/national/transact";
import { dictListType } from "@/api/styem/dict/type";
import nationalInfo from "@/components/nationalInfo";
import { getFileInfo } from "@/api/file";
import { mapGetters } from "vuex";
import { getKnownSingleInfo } from "@/utils/styem";
export default {
  components: {
    nationalInfo
  },
  data() {
    return {
      showSearch: true,
      pollutantArry: [],
      tipArry: [],
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        tipOffContent: undefined,
        tipNumber: undefined,
        beginTipTime: undefined,
        endTipTime: undefined,
        pollutionLevelOne: undefined,
        tipType: undefined,
        inspectType: undefined,
        inspectTurnId: undefined,
        inspectBatchId: undefined,
        teamId: undefined,
        inspectAreaCode: undefined,
        inspectAreaName: undefined
      },
      List: [],
      total: 0,
      loading: true,
      open: false,
      issueDate: undefined,
      telBoolean: true,
      industryBoolena: false,
      tipOffContentBoolean: false,
      addressBoolean: false,
      pollutionLevelBoolean: false,
      longitudeBoolean: false,
      lookOpen: false,
      manageInfo: {
        inspectTurnName: undefined,
        inspectAreaName: undefined,
        tipNumber: undefined,
        tipTypeName: undefined,
        tipBy: undefined,
        tipTime: undefined,
        reporterPhone: undefined,
        reporterPhoneShow: undefined,
        tipOffName: undefined,
        tipOffAddr: undefined,
        industryName: undefined,
        tipOffContent: undefined,
        tipAddress: undefined,
        pollutionType: undefined,
        remarks: undefined,
        attachementPath: undefined,
        attachementName: undefined,
        longitude: undefined,
        latitude: undefined,
        attachementArry: []
      },
      manageFllowInfo: {
        inspectTurnName: undefined,
        inspectAreaName: undefined,
        tipNumber: undefined,
        tipTypeName: undefined,
        tipBy: undefined,
        tipTime: undefined,
        reporterPhone: undefined,
        reporterPhoneShow: undefined,
        tipOffName: undefined,
        tipOffAddr: undefined,
        industryName: undefined,
        tipOffContent: undefined,
        tipAddress: undefined,
        pollutionType: undefined,
        remarks: undefined,
        attachementPath: undefined,
        attachementName: undefined,
        longitude: undefined,
        latitude: undefined,
        attachementFllowArry: [],
        repeatFlag: undefined,
        repeatId: undefined
      },
      auditInfo: {
        handleState: undefined,
        repeatId: undefined,
        repeatFlag: undefined,
        checkByName: undefined,
        checkTime: undefined,
        industryTypeReviewName: undefined,
        tipOffContentReivew: undefined,
        cityReviewName: undefined,
        countyRevireName: undefined,
        addressReview: undefined,
        weatherAccept: undefined,
        handIdea: undefined,
        repeatId: undefined,
        spotFlag: undefined,
        importantFlag: undefined,
        weatherTransfer: undefined,
        handleDeadline: undefined,
        proposal: undefined,
        pollutionLevelOneReviewName: undefined,
        longitudeReview: undefined,
        latitudeReview: undefined
      },
      transactInfo: {
        finishFlagName: undefined,
        finishTime: undefined,
        trueFlagName: undefined,
        areaName: undefined,
        interestRelationshipName: undefined,
        aroundMassesName: undefined,
        investiCheck: undefined,
        dealReform: undefined,
        questioningSituation: undefined,
        openFlag: "0",
        openTime: undefined,
        openAddr: undefined,
        orderReform: undefined,
        punishment: undefined,
        fine: undefined,
        lawcase: undefined,
        interview: undefined,
        adminDetain: undefined,
        criminalDetain: undefined
      },
      handleStateBoolean: false,
      buttonAuthority: false,
      repeatList: undefined,
      repeatNumsBoolean: false,
      unfoldBoolean: true,
      repeatOtherList: undefined,
      auditTitle: "审核内容",
      transactTitle: "办理信息",
      followTitle: undefined,
      auditFllowInfoBoolean: false,
      repeatInfoBoolean: false,
      auditBoolean: false,
      followFlagBoolean: true,
      handleStateName: undefined
    };
  },
  created() {
    if (this.inspectInfo.suite) {
      this.buttonAuthority = true;
    } else {
      this.buttonAuthority = false;
      const superviseSubject = JSON.parse(
        sessionStorage.getItem("superviseItem")
      );
      this.queryParams.inspectType = superviseSubject.code;
      this.queryParams.inspectTurnId = superviseSubject.roundId;
      this.queryParams.inspectBatchId = superviseSubject.batchId;
    }
    this.getList();
    this.getDictPollutant();
    this.getDictTip();
  },
  computed: {
    ...mapGetters(["inspectInfo"])
  },
  methods: {
    async getList() {
      this.loading = true;
      const reponse = await acceptQueryList(this.queryParams);
      this.List = reponse.data.list;
      this.total = reponse.data.count;
      this.loading = false;
    },
    async getDictPollutant() {
      const reponse = await dictListType({ type: "clue_pollution_type" });
      this.pollutantArry = reponse.data;
    },
    async getDictTip() {
      const reponse = await dictListType({ type: "tip_type" });
      this.tipArry = reponse.data;
    },
    onQuery() {
      this.getList();
      this.queryParams.pageNo = 1;
    },
    onClear() {
      this.queryParams.tipOffContent = undefined;
      this.queryParams.tipNumber = undefined;
      this.queryParams.beginTipTime = undefined;
      this.queryParams.endTipTime = undefined;
      this.queryParams.pollutionLevelOne = undefined;
      this.queryParams.tipType = undefined;
      this.issueDate = undefined;
    },
    async handleSee(data) {
      this.lookOpen = true;
      this.manageInfo.inspectTurnName = data.inspectTurnName;
      this.manageInfo.inspectAreaName = data.inspectAreaName;
      this.manageInfo.tipNumber = data.tipNumber;
      this.manageInfo.tipTypeName = data.tipTypeName;
      this.manageInfo.tipBy = data.tipBy;
      this.manageInfo.tipTime = data.tipTime;
      this.manageInfo.reporterPhone = data.reporterPhone;
      this.manageInfo.reporterPhoneShow = data.reporterPhoneShow;
      this.manageInfo.tipOffName = data.tipOffName;
      this.manageInfo.tipOffAddr = data.tipOffAddr;
      this.manageInfo.industryName = data.industryName;
      this.manageInfo.tipOffContent = data.tipOffContent;
      this.manageInfo.tipAddress =
        data.cityName + data.countyName + data.address;
      this.manageInfo.pollutionType = data.pollutionType;
      this.manageInfo.remarks = data.remarks;
      this.manageInfo.longitude = data.longitude;
      this.manageInfo.latitude = data.latitude;
      const { handleStateName } = data;
      this.handleStateName = handleStateName;
      if (handleStateName === "已办理" && data.followFlag == 0) {
        const manageReponse = await transactManageSee({ tipId: data.id });
        this.transactInfo = manageReponse.data;
        this.transactInfo["openFlagName"] =
          manageReponse.data.openFlag == 1 ? "是" : "否";
      }
      this.getauditInfo(data.id);
    },
    async getauditInfo(id) {
      const reponse = await acceptCheckInfo({ id });
      const subject = reponse.data;
      this.auditInfo.checkByName = subject.checkByName;
      this.auditInfo.checkTime = subject.checkTime;
      this.auditInfo.industryTypeReviewName = subject.industryTypeReviewName;
      this.auditInfo.tipOffContentReivew = subject.tipOffContentReivew;
      this.auditInfo.cityReviewName = subject.cityReviewName;
      this.auditInfo.countyRevireName = subject.countyRevireName;
      this.auditInfo.addressReview = subject.addressReview;
      this.auditInfo.pollutionLevelOneReviewName =
        subject.pollutionLevelOneReviewName;
      this.auditInfo.pollutionLevelTwoReviewName =
        subject.pollutionLevelTwoReviewName;
      this.auditInfo.longitudeReview = subject.longitudeReview;
      this.auditInfo.latitudeReview = subject.latitudeReview;
      this.auditInfo.weatherAccept = this.getNotVal(subject.weatherAccept);
      this.auditInfo.handIdea = subject.handIdea;
      this.auditInfo.repeatFlag = subject.repeatFlag;
      this.auditInfo.repeatId = subject.repeatId;
      this.auditInfo.handleState = subject.handleState;
      this.auditInfo.spotFlag = this.getNotVal(subject.spotFlag);
      this.auditInfo.importantFlag = this.getNotVal(subject.importantFlag);
      this.auditInfo.weatherTransfer = this.getNotVal(subject.weatherTransfer);
      this.auditInfo.handleDeadline = subject.handleDeadline;
      this.auditInfo.proposal = subject.proposal;
      if (subject.tipTypeName === "来信") {
        this.telBoolean = false;
        this.getRegisterFile(subject.attachmentId);
      } else {
        this.telBoolean = true;
      }
      if (subject.modifyItems) {
        subject.modifyItems.indexOf("0") > -1
          ? (this.industryBoolena = true)
          : (this.industryBoolena = false);
        subject.modifyItems.indexOf("1") > -1
          ? (this.tipOffContentBoolean = true)
          : (this.tipOffContentBoolean = false);
        subject.modifyItems.indexOf("2") > -1
          ? (this.addressBoolean = true)
          : (this.addressBoolean = false);
        subject.modifyItems.indexOf("3") > -1
          ? (this.pollutionLevelBoolean = true)
          : (this.pollutionLevelBoolean = false);
        subject.modifyItems.indexOf("4") > -1
          ? (this.longitudeBoolean = true)
          : (this.longitudeBoolean = false);
      }
      this.auditBoolean = true;
      if (subject.repeatFlag == 2 && subject.repeatId) {
        this.followTitle = "(跟随处理件)";
        this.auditTitle = "主重件审核内容";
        this.transactTitle = "主重件办理信息";
        this.getFllowRepeatNumList(subject.repeatId);
        this.auditFllowInfoBoolean = true;
        return;
      } else if (subject.handleState == 1) {
        if (subject.repeatId) {
          this.repeatInfoBoolean = true;
          this.auditBoolean = false;
        } else {
          this.auditBoolean = false;
        }
      }
      if (subject.repeatId) {
        this.getRepeatNumList(subject.repeatId);
      }
    },
    getNotVal(val) {
      if (val === "1") {
        return "是";
      } else {
        return "否";
      }
    },
    async getRepeatNumList(ids) {
      const reponse = await repeatNumList({ ids });
      const subject = reponse.data;
      if (subject.length > 3) {
        this.repeatNumsBoolean = true;
        this.repeatList = [subject[0], subject[1], subject[2]];
        this.repeatOtherList = subject;
      } else {
        this.repeatNumsBoolean = false;
        this.repeatList = reponse.data;
        this.repeatOtherList = undefined;
      }
    },
    async getFllowRepeatNumList(ids) {
      const reponse = await repeatNumList({ ids });
      const subject = reponse.data;
      const data = subject[0];
      this.manageFllowInfo.inspectTurnName = data.inspectTurnName;
      this.manageFllowInfo.inspectAreaName = data.inspectAreaName;
      this.manageFllowInfo.tipNumber = data.tipNumber;
      this.manageFllowInfo.tipTypeName = data.tipTypeName;
      this.manageFllowInfo.tipBy = data.tipBy;
      this.manageFllowInfo.tipTime = data.tipTime;
      this.manageFllowInfo.reporterPhone = data.reporterPhone;
      this.manageFllowInfo.reporterPhoneShow = data.reporterPhoneShow;
      this.manageFllowInfo.tipOffName = data.tipOffName;
      this.manageFllowInfo.tipOffAddr = data.tipOffAddr;
      this.manageFllowInfo.industryName = data.industryName;
      this.manageFllowInfo.tipOffContent = data.tipOffContent;
      this.manageFllowInfo.tipAddress =
        data.cityName + data.countyName + data.address;
      this.manageFllowInfo.pollutionType = data.pollutionType;
      this.manageFllowInfo.remarks = data.remarks;
      this.manageFllowInfo.longitude = data.longitude;
      this.manageFllowInfo.latitude = data.latitude;
      this.manageFllowInfo.repeatFlag = data.repeatFlag;
      this.manageFllowInfo.repeatId = data.repeatId;
      const { handleStateName } = data;
      this.handleStateName = handleStateName;
      if (handleStateName === "已办理" && data.followFlag == 0) {
        const manageReponse = await transactManageSee({ tipId: data.id });
        this.transactInfo = manageReponse.data;
        this.transactInfo["openFlagName"] =
          manageReponse.data.openFlag == 1 ? "是" : "否";
      }
      this.getFllowauditInfo(data.id);
    },
    async getFllowauditInfo(id) {
      const reponse = await acceptCheckInfo({ id });
      const subject = reponse.data;
      this.auditInfo.checkByName = subject.checkByName;
      this.auditInfo.checkTime = subject.checkTime;
      this.auditInfo.industryTypeReviewName = subject.industryTypeReviewName;
      this.auditInfo.tipOffContentReivew = subject.tipOffContentReivew;
      this.auditInfo.cityReviewName = subject.cityReviewName;
      this.auditInfo.countyRevireName = subject.countyRevireName;
      this.auditInfo.addressReview = subject.addressReview;
      this.auditInfo.pollutionLevelOneReviewName =
        subject.pollutionLevelOneReviewName;
      this.auditInfo.pollutionLevelTwoReviewName =
        subject.pollutionLevelTwoReviewName;
      this.auditInfo.longitudeReview = subject.longitudeReview;
      this.auditInfo.latitudeReview = subject.latitudeReview;
      this.auditInfo.weatherAccept = this.getNotVal(subject.weatherAccept);
      this.auditInfo.handIdea = subject.handIdea;
      this.auditInfo.spotFlag = this.getNotVal(subject.spotFlag);
      this.auditInfo.importantFlag = this.getNotVal(subject.importantFlag);
      this.auditInfo.weatherTransfer = this.getNotVal(subject.weatherTransfer);
      this.auditInfo.handleDeadline = subject.handleDeadline;
      this.auditInfo.proposal = subject.proposal;
      if (subject.handleState == 1) {
        if (subject.repeatId) {
          this.repeatInfoBoolean = true;
          this.auditBoolean = false;
        } else {
          this.auditBoolean = false;
        }
      }
      if (subject.repeatId) {
        this.getRepeatNumList(subject.repeatId);
      }
      if (subject.tipTypeName === "来信") {
        this.getFllowRegisterFile(subject.attachmentId);
      }
      if (subject.modifyItems) {
        subject.modifyItems.indexOf("0") > -1
          ? (this.industryBoolena = true)
          : (this.industryBoolena = false);
        subject.modifyItems.indexOf("1") > -1
          ? (this.tipOffContentBoolean = true)
          : (this.tipOffContentBoolean = false);
        subject.modifyItems.indexOf("2") > -1
          ? (this.addressBoolean = true)
          : (this.addressBoolean = false);
        subject.modifyItems.indexOf("3") > -1
          ? (this.pollutionLevelBoolean = true)
          : (this.pollutionLevelBoolean = false);
        subject.modifyItems.indexOf("4") > -1
          ? (this.longitudeBoolean = true)
          : (this.longitudeBoolean = false);
      }
    },
    handleUnfoldClick() {
      this.unfoldBoolean = false;
      this.repeatList = this.repeatOtherList;
    },
    handlePackClick() {
      this.unfoldBoolean = true;
      const subject = this.repeatOtherList;
      this.repeatList = [subject[0], subject[1], subject[2]];
    },
    async getRegisterFile(fileId) {
      const reponse = await getFileInfo({ ids: fileId });
      this.manageInfo.attachementArry = reponse.data;
    },
    async getFllowRegisterFile(fileId) {
      const reponse = await getFileInfo({ ids: fileId });
      this.manageFllowInfo.attachementFllowArry = reponse.data;
    },
    handleDialogLookClose() {
      this.lookOpen = false;
      this.repeatList = undefined;
      this.repeatOtherList = undefined;
      this.repeatNumsBoolean = false;
      this.unfoldBoolean = true;
      this.followTitle = undefined;
      this.auditTitle = "审核内容";
      this.transactTitle = "办理信息";
      this.auditFllowInfoBoolean = false;
      this.repeatInfoBoolean = false;
      this.auditBoolean = false;
    },
    async getSingleMessagInfo(fileId) {
      const reponse = await getFileInfo({ ids: fileId });
      return reponse.data;
    },
    issueDateChange(picker) {
      if (picker == null) {
        this.queryParams.beginTipTime = undefined;
        this.queryParams.endTipTime = undefined;
      } else {
        this.queryParams.beginTipTime = picker[0];
        this.queryParams.endTipTime = picker[1];
      }
    },
    handleKnowDownloadClick(fileId, fileUrl, fileName, state) {
      const teamId = this.queryParams.teamId;
      getKnownSingleInfo(fileId, fileUrl, fileName, state, teamId);
    }
  }
};
</script>

<style lang="scss" scoped>
.manage-info {
  .info-item {
    .info-item-title {
      width: 112px;
    }
  }
}
</style>