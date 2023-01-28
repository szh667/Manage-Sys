<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px;">
            <el-card shadow="hover">
                <div>
                    <img src="../assets/images/user.webp" alt="" class="bigHead">
                    <div class="userInfo">
                        <h2>Admin</h2>
                        <p>超级管理员</p>
                    </div>
                </div>
                <div class="leftinB">
                    <p>
                        <span>上一次登录时间:</span>
                        <span>2023-1-12</span>
                    </p>
                    <p>
                        <span>上一次登录地点:</span>
                        <span>江苏泰州</span>
                    </p>

                </div>
            </el-card>
            <el-card shadow="hover" class="leftB">
                <template>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column v-for="(val, key) of tableTitle" :prop="key" :label="val" :key="key" />
                    </el-table>
                </template>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left:5px">
            <div class="rightT">
                <el-card :body-style="{ display: 'flex', padding: '0', width: '290px' }" shadow="hover"
                    v-for="(i, index) of countData" :key="index">
                    <div>
                        <i :style="{ background: i.color }" class="iconS">
                            <span :class="`el-icon-${i.icon}`"></span>
                        </i>
                    </div>
                    <div class="priceInfo">
                        <h3>¥ {{ i.value }}</h3>
                        <p>{{ i.name }}</p>
                    </div>
                </el-card>

            </div>
            <el-card shadow="hover" id="chartB" class="rightM">
            </el-card>
            <div class="rightB">
                <el-card shadow="hover" id="chartA">
                </el-card>
                <el-card shadow="hover" id="chartC">
                </el-card>
            </div>



        </el-col>
    </el-row>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
    name: 'Home',
    data() {
        return {
            tableData: [
            ],
            tableTitle: {
                name: '品牌',
                todayBuy: '日销售',
                monthBuy: '月销售',
                totalBuy: '总销售',
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],

        }

    },


    mounted() {

        this.$store.state.breadList.forEach(item => {
            if (item.path === this.$route.path) this.$store.commit('UBGCOLOR', this.$route.path)
        })
        getData().then(({ data }) => {
            this.tableData = data.tableData
            const chartB = echarts.init(document.getElementById('chartB'));
            const chartA = echarts.init(document.getElementById('chartA'));
            const chartC = echarts.init(document.getElementById('chartC'));
            let optionB = {

                xAxis: {},
                yAxis: {},
                series: [],
                legend: {
                },
            }
            let optionA = {
                xAxis: {},
                yAxis: {},
                series: [],
                legend: {
                },
            }
            let optionC = {
                series: []
            }
            // 折线图
            const key1 = Object.keys(data.orderData.data[1])
            optionB.xAxis.data = data.orderData.date
            data.orderData.data.forEach((item1, index) => {
                optionB.series.push({
                    type: 'line',
                    name: key1[index],
                    data: key1.map(item2 => item1[item2]),
                })
            })
            // 柱状图
            for (let k in data.userData[0]) {
                if (k === 'date') continue
                optionA.series.push({
                    name: k === 'new' ? '新用户' : '活跃用户',
                    type: 'bar',
                    data: data.userData.map(item => item[k])
                })
            }
            const weekArr = data.userData.map(item => item.date)
            optionA.xAxis.data = weekArr
            // 饼状图
            let objPie = {}
            objPie.type = 'pie'
            objPie.data = data.videoData
            optionC.series.push(objPie)
            chartB.setOption(optionB)
            chartA.setOption(optionA)
            chartC.setOption(optionC)
        }, error => { console.log(error.message) })


    },

}
</script>

<style lang="less" scoped>
.el-row {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.el-col {
    .bigHead {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .userInfo {
        float: right;
        margin: 30px 150px 30px 0;

        p {
            color: #999;
            font-size: 12px;
        }
    }

    .leftB {
        margin-top: 16px;
        height: 432px;
    }

    .leftinB {
        border-top: 2px solid rgb(236, 236, 236);
        margin-top: 10px;
        font-size: 12px;

        p {
            color: #999;
            margin-top: 12px;

            span:last-child {
                margin-left: 40px;
                color: #666;
            }

        }
    }

    .rightT {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .priceInfo {
            h3 {
                font-size: 30px;
                margin-top: 5px;

            }

            p {
                color: #999;
                font-size: 12px;
                margin-top: 5px;
            }
        }

        .iconS {
            color: white;
            height: 80px;
            float: left;
            width: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            margin-right: 15px;
        }


    }

    .rightM {
        margin-top: 10px;
        height: 246px;
        // position: relative;

        div {
            width: 700px;
            height: 246px;
            // position: absolute;
            margin-left: 80px
        }
    }

    .rightB {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .el-card {
            height: 230px;
            width: 48%;
        }
    }

}
</style>