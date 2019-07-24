/**
 * created by 丁银 @ 20180416 
 * 折线图拖动
 */
import React, { Component, PropTypes } from 'react';
import echarts from 'echarts/lib/echarts';
import line from 'echarts/lib/chart/line';
import legend from 'echarts/lib/component/legend';
import dataZoom from 'echarts/lib/component/dataZoom';
import title from 'echarts/lib/component/title';
import tooltip from 'echarts/lib/component/tooltip';
import graphic from 'echarts/lib/component/graphic';

var myChart;
// var axixData  = [[0, 0], [10, 10], [20, 20], [30, 30], [40, 40]];
var axixData = [[0,30],[120,30],[240,30],[360,30],[480,1],[600,30],[720,30],[840,59],[960,30],[1080,30],[1200,30],[1320,30],[1440,30],[1560,0],[1680,30],[1800,30],[1920,30],[2040,30],[2160,86],[2280,30],[2400,30],[2520,30],[2640,23],[2760,30],[2880,30],[3000,30],[3120,30],[3240,30],[3360,67],[3480,30],[3600,30],[3720,30],[3840,30],[3960,30],[4080,30],[4200,30],[4320,30],[4440,30],[4560,30],[4680,30],[4800,30],[4920,30],[5040,30],[5160,30],[5280,30],[5400,30],[5520,30],[5640,30],[5760,30],[5880,30],[6000,30],[6120,30],[6240,30],[6360,30],[6480,30],[6600,30],[6720,30],[6840,30],[6960,30],[7080,30],[7200,30]]
const yAxisRange=[0,100];
class Line extends Component {
  state = {
    visible: true,
  }
  componentDidMount = () => {
    this.drawChart(axixData);
  }
  getAxixData = () => {
    console.log('axixData:', axixData)
  }
  drawChart = (data = [],) => {
    myChart = echarts.init(document.getElementById('chartContianer'));
    var symbolSize = 6;
    const option = {
        title: {
            text: 'Try Dragging these Points'
        },
        tooltip: {
            triggerOn: 'none',
            formatter: function (params) {
                return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
            }
        },
        grid: {
        },
        xAxis: {
            min: 0,
            // max: 80,
            type: 'value',
            axisLine: {onZero: false}
        },
        yAxis: {
            min: yAxisRange[0],
            max: yAxisRange[1],
            type: 'value',
            axisLine: {onZero: false}
        },
        dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                type: 'slider',
                yAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            }
        ],
        series: [
            {
                id: 'a',
                type: 'line',
                smooth: true,
                symbolSize: symbolSize,
                hoverAnimation: false,
                data: data
            }
        ]
    };
    myChart.setOption(option);
    
    setTimeout(()=> {
        // Add shadow circles (which is not visible) to enable drag.
        myChart.setOption({
            graphic: echarts.util.map(data, function (item, dataIndex) {
                return {
                    type: 'circle',
                    position: myChart.convertToPixel('grid', item),
                    shape: {
                        cx: 0,
                        cy: 0,
                        r: symbolSize / 2
                    },
                    invisible: true,
                    draggable: true,
                    ondrag: echarts.util.curry(onPointDragging, dataIndex),
                    onmousemove: echarts.util.curry(showTooltip, dataIndex),
                    onmouseout: echarts.util.curry(hideTooltip, dataIndex),
                    ondragstart:echarts.util.curry(onPointDragStart, dataIndex),
                    z: 100
                };
            })
        });
    }, 0);

    window.addEventListener('resize', updatePosition);
    
    myChart.on('dataZoom', updatePosition);
    
    function updatePosition() {
        myChart.setOption({
            graphic: echarts.util.map(data, function (item, dataIndex) {
                return {
                    position: myChart.convertToPixel('grid', item)
                };
            })
        });
    }
    
    function onPointDragStart(){
        this.newPostion = JSON.parse(JSON.stringify(this.position))
    }
    function showTooltip(dataIndex) {
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex
        });
    }
    
    function hideTooltip(dataIndex) {
        myChart.dispatchAction({
            type: 'hideTip'
        });
    }
    
    function onPointDragging(dataIndex, dx, dy) {
        let YPosition = this.position[1];
        // console.log('dataIndex:', dataIndex,'YPosition:', YPosition)
       
        data[dataIndex] = myChart.convertFromPixel('grid',[this.newPostion[0],YPosition] );

        if ( data[dataIndex][1] > yAxisRange[1]) {
          data[dataIndex][1] = yAxisRange[1]
        } else if  ( data[dataIndex][1] < yAxisRange[0]) {
          data[dataIndex][1] = yAxisRange[0]
        }
        axixData = data;
        // Update data
        myChart.setOption({
            series: [{
                id: 'a',
                data: data
            }]
        });
    }
         
  }

  render() {
    const { data = {} } = this.props;
    return (
      <span>
        <a onClick={this.getAxixData}>获取经纬度信息</a>
        <div id='chartContianer' style={{ width: '100%',height: 300 }} />
      </span>
    );
  }
}

export default Line;
