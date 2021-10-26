import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;




class Amcharts extends Component {
componentDidMount(){
  /* Chart code */
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart
  let chart = am4core.create("chartdiv3", am4charts.XYChart);

  let data = [];
  let price1 = 1000, price2 = 1200, price3 = 1;
  let quantity = 30000;
  for (var i = 0; i < 360; i++) {
    price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
    data.push({ date1: new Date(2015, 0, i), price1: price1 });
  }
  for (var i = 0; i < 360; i++) {
    price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
    data.push({ date2: new Date(2017, 0, i), price2: price2 });
  }
  for (var i = 0; i < 360; i++) {
    price3 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
    data.push({ date3: new Date(2017, 0, i), price3: price3 });
  }

  chart.data = data;

  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.labels.template.fill = am4core.color("#e59165");

  let dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis2.renderer.grid.template.location = 0;
  dateAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");

  let dateAxis3 = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis3.renderer.grid.template.location = 0;
  dateAxis3.renderer.labels.template.fill = am4core.color("#dfcc64");

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.labels.template.fill = am4core.color("#e59165");

  valueAxis.renderer.minWidth = 60;

  let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis2.tooltip.disabled = true;
  valueAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
  valueAxis2.renderer.minWidth = 60;
  valueAxis2.syncWithAxis = valueAxis;

  let valueAxis3 = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis3.tooltip.disabled = true;
  valueAxis3.renderer.labels.template.fill = am4core.color("#dfcc64");
  valueAxis3.renderer.minWidth = 60;
  valueAxis3.syncWithAxis = valueAxis;

  let series = chart.series.push(new am4charts.LineSeries());
  series.name = "2015";
  series.dataFields.dateX = "date1";
  series.dataFields.valueY = "price1";
  series.tooltipText = "{valueY.value}";
  series.fill = am4core.color("#e59165");
  series.stroke = am4core.color("#e59165");
  //series.strokeWidth = 3;

  let series2 = chart.series.push(new am4charts.LineSeries());
  series2.name = "2017";
  series2.dataFields.dateX = "date2";
  series2.dataFields.valueY = "price2";
  series2.yAxis = valueAxis2;
  series2.xAxis = dateAxis2;
  series2.tooltipText = "{valueY.value}";
  series2.fill = am4core.color("#dfcc64");
  series2.stroke = am4core.color("#dfcc64");


  let series3 = chart.series.push(new am4charts.LineSeries());
  series3.name = "2020";
  series3.dataFields.dateX = "date3";
  series3.dataFields.valueY = "price3";
  series3.yAxis = valueAxis3;
  series3.xAxis = dateAxis;
  series3.tooltipText = "{valueY.value}";
  series3.fill = am4core.color("#dfcc64");
  series3.stroke = am4core.color("#dfcc64");
  //series2.strokeWidth = 3;

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis2;

  let scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(series);
  chart.scrollbarX = scrollbarX;

  chart.legend = new am4charts.Legend();
  chart.legend.parent = chart.plotContainer;
  chart.legend.zIndex = 100;

  valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
  dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
  dateAxis.renderer.grid.template.strokeOpacity = 0.07;
  valueAxis.renderer.grid.template.strokeOpacity = 0.07;
}

  render(){
    return (
          <div id="chartdiv3"></div>
    );
  }
}
export default Amcharts;
