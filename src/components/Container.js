import React, { Component }         from 'react';
import {curveCatmullRom}            from 'd3-shape';

import { compareAsc, format }       from 'date-fns'

import interact                     from 'interactjs'

import { styled, alpha }            from '@mui/material/styles';

import $                            from "jquery";
import axios                        from 'axios';
import Fuse                         from 'fuse.js'


/*----------------------------------------------------*/


import * as am4core                 from "@amcharts/amcharts4/core";
import * as am4charts               from "@amcharts/amcharts4/charts";
import am4themes_animated           from "@amcharts/amcharts4/themes/animated";
import am4themes_dark               from "@amcharts/amcharts4/themes/dark";
import am4themes_dataviz            from "@amcharts/amcharts4/themes/dataviz";


/*-------------------------------------------------------*/

import AppBar                       from '@mui/material/AppBar';
import Box                          from '@mui/material/Box';
import Toolbar                      from '@mui/material/Toolbar';
import Typography                   from '@mui/material/Typography';
import MenuIcon                     from '@mui/icons-material/Menu';
import InsertChartIcon              from '@mui/icons-material/InsertChart';
import Switch                       from '@mui/material/Switch';
import FormGroup                    from '@mui/material/FormGroup';
import Menu                         from '@mui/material/Menu';
import Skeleton                     from '@mui/material/Skeleton';

import Stack                        from '@mui/material/Stack';
import TextField                    from '@mui/material/TextField';
import Button                       from '@mui/material/Button';
import IconButton                   from '@mui/material/IconButton';
import ButtonGroup                  from '@mui/material/ButtonGroup';
import InputBase                    from '@mui/material/InputBase';

import Checkbox                     from '@mui/material/Checkbox';
import FormControlLabel             from '@mui/material/FormControlLabel';
import MenuItem                     from '@mui/material/MenuItem';
import FormHelperText               from '@mui/material/FormHelperText';
import FormControl                  from '@mui/material/FormControl';
import Select                       from '@mui/material/Select';

import ListSubheader                from '@mui/material/ListSubheader';
import List                         from '@mui/material/List';
import ListItemButton               from '@mui/material/ListItemButton';
import ListItemIcon                 from '@mui/material/ListItemIcon';
import ListItemText                 from '@mui/material/ListItemText';
import Divider                      from '@mui/material/Divider';

import FolderIcon                   from '@mui/icons-material/Folder';
import TableChartIcon               from '@mui/icons-material/TableChart';
import StackedBarChartIcon          from '@mui/icons-material/StackedBarChart';
import DownloadIcon                 from '@mui/icons-material/Download';
import SaveIcon                     from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon    from '@mui/icons-material/SettingsBackupRestore';
import SearchIcon                   from '@mui/icons-material/Search';
import SettingsIcon                 from '@mui/icons-material/Settings';
import PlayCircleFilledWhiteIcon    from '@mui/icons-material/PlayCircleFilledWhite';
import EmailIcon                    from '@mui/icons-material/Email';
import DataSaverOnIcon              from '@mui/icons-material/DataSaverOn';
import PreviewIcon                  from '@mui/icons-material/Preview';
import PlayCircleIcon               from '@mui/icons-material/PlayCircle';
import EditIcon                     from '@mui/icons-material/Edit';
import DeleteForeverIcon            from '@mui/icons-material/DeleteForever';
import HeightIcon                   from '@mui/icons-material/Height';
import VisibilityOffIcon            from '@mui/icons-material/VisibilityOff';
import DataUsageIcon                from '@mui/icons-material/DataUsage';
import Brightness4Icon              from '@mui/icons-material/Brightness4';

import AnalyticsIcon                from '@mui/icons-material/Analytics';

import SortIcon                     from '@mui/icons-material/Sort';
import SortByAlphaIcon              from '@mui/icons-material/SortByAlpha';
import TextRotateVerticalIcon       from '@mui/icons-material/TextRotateVertical';

//hide Sections icon Button
import ViewSidebarIcon              from '@mui/icons-material/ViewSidebar';

//Icon for MonitorList Items
import CircleIcon                   from '@mui/icons-material/Circle';
import DonutSmallIcon               from '@mui/icons-material/DonutSmall';
import LayersIcon                   from '@mui/icons-material/Layers';
import ErrorIcon                    from '@mui/icons-material/Error';
import StopCircleIcon               from '@mui/icons-material/StopCircle';
import DragIndicatorIcon            from '@mui/icons-material/DragIndicator';
import CloseIcon                    from '@mui/icons-material/Close';

//select a component from the component listeners
import SnippetFolderIcon            from '@mui/icons-material/SnippetFolder';
import RemoveCircleIcon             from '@mui/icons-material/RemoveCircle';



import { pink }                     from '@mui/material/colors';

import logoSrc                      from '../img/logo.png';


import BasicDateTimePicker                   from './DatePicker';
import SeachButton                           from './SeachButton';
import AntDesign                             from './AntDesign';
import ComponentListElement                  from './ComponentListElement';
import MonitorListElement                    from './MonitorListElement';
import StoreQuery                            from './StoreQuery';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`
  },
}));



var monitorSlectedListItem = [];


const options = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};





class Container extends Component {

  state = {
    data_components: [],
    data_monitors_components: [],
    data_monitors_selected: [],
    axislimits: [],
    lastDrawLocation: null,
    loading: true,
    loadingMonitors: true,
    startloadingMonitors: true,
    connectioError: false,
    showSearchResults: false
  };


  hideAndShowComponentSelectSection = () => {
      $('.SampleMonitorList-section').toggleClass('display-none');
  }
  hideAndShowPerformQuerySection = () => {
      $('.perform-query-section').toggleClass('display-none');
  }
  hideAndShowButtonsSection = () => {
      $('.buttons-and-search-section').toggleClass('display-none');
  }
  hideAndShowSelectedMonitorsSection = () => {
      $('.selected-monitors-section').toggleClass('display-none');
  }
  hideAllAndShowGrafic = () => {
      $('.SampleMonitorList-section').toggleClass('display-none');
      $('.perform-query-section').toggleClass('display-none');
      $('.grafic-options-section').toggleClass('display-none');
      $('.selected-monitors-section').toggleClass('display-none');
      $('.buttons-and-search-section').toggleClass('display-none');
  }


  activateMultiAxis = () => {

    if ($(".multiAxis input[type='checkbox']").is(":checked")) {
      $(".howManyXAxis-label").removeClass("display-none");
      $(".howManyYAxis-label").removeClass("display-none");
      $(".howManyYAxis").removeClass("display-none");
      $(".howManyXAxis").removeClass("display-none");

      $(".monitor-limits-label").addClass("display-none");
      $(".input-limits-grafic-options").addClass("display-none");

      $(".set-Axis-limits-box").removeClass("display-none");
      $(".position-axis-y").removeClass("display-none");
      $(".position-axis-x").removeClass("display-none");

    }else {
      $(".howManyXAxis-label").addClass("display-none");
      $(".howManyYAxis-label").addClass("display-none");
      $(".howManyYAxis").addClass("display-none");
      $(".howManyXAxis").addClass("display-none");

      $(".monitor-limits-label").removeClass("display-none");
      $(".input-limits-grafic-options").removeClass("display-none");

      $(".set-Axis-limits-box").addClass("display-none");
      $(".position-axis-y").addClass("display-none");
      $(".position-axis-x").addClass("display-none");
    }

  }

  checkAllCheckboxes = (selectedCheckbox) => {
    var checkboxAll       = $("." + selectedCheckbox + "-all input[type='checkbox']");
    var checkboxMonitors  = $("." + selectedCheckbox + " input[type='checkbox']");

    if (checkboxAll.is(":checked")) {
      for (var i = 0; i < checkboxMonitors.length; i++) {
        checkboxMonitors.eq(i).prop('checked', true);
      }
    }else {
      for (var i = 0; i < checkboxMonitors.length; i++) {
        checkboxMonitors.eq(i).prop('checked', false);
      }
    }
  }




                      searchthroughtComponent = (component, searchText, noResultArray) => {
                        const options = {
                          includeScore: true
                        }

                        const fuse = new Fuse(component, options);
                        const result = fuse.search(searchText);

                        if (result.length === 0 ) {
                          this.setState({ //save the current state of the data
                            data_components: [{item: "NO RESULTS"}]
                          });
                        }
                        else {
                          this.setState({ //save the current state of the data
                            data_components: result
                          });
                        }
                        if (searchText === "") {
                          this.setState({ //save the current state of the data
                            data_components: noResultArray
                          });
                        }

                      }


                      searchthroughtMonitor = (monitor, searchText, noResultArray) => {
                        // console.log(monitor);
                        const options = {
                          includeScore: true,
                          isCaseSensitive: true,
                          keys: ['magnitude']
                        }
                        const fuse = new Fuse(monitor, options);
                        const result = fuse.search(searchText);

                        if (result.length === 0 ) {
                          this.setState({ //save the current state of the data
                            data_monitors_components: [{item: {
                                                                magnitude:"NO RESULTS"
                                                              }
                                                      }]
                          });
                        }
                        else {
                          this.setState({ //save the current state of the data
                            data_monitors_components: result
                          });
                        }
                        if (searchText === "") {
                          this.setState({ //save the current state of the data
                            data_monitors_components: noResultArray
                          });
                        }

                      }


componentDidMount(){
const _this = this;
  axios.get("http://172.18.0.4:8080/WebReport/rest/webreport/components", { headers: options	})
    .then(response => {

      var itemComponent = [];
      var arrayItem;
      for (var i = 0; i < response.data.length; i++) {
        arrayItem = {
          item: response.data[i]
        }
        itemComponent.push(arrayItem);
      }

      this.setState({ //save the current state of the data
        data_components: itemComponent,
        loading: false
      });


      $( ".searchInputComponent input[type='text']" ).keyup(function() {
          _this.searchthroughtComponent(response.data, $(this).val(), itemComponent);

      });

      console.log("subscription was reset successfully");
      // console.log("data: " + this.state.data_components);
    })
    .catch(error => {
      console.log('Error fetching and parsing data on the ORION context brocker');
    });


    interact('#resizable')
      .resizable({
        edges: { bottom: true},
        invert: 'negate',
        listeners: {
          move: function (event) {
            let { y } = event.target.dataset

            y = (parseFloat(y) || 0) + event.deltaRect.top

            Object.assign(event.target.style, {
              height: `${event.rect.height}px`,
              transform: `translate(${y}px)`
            })

            Object.assign(event.target.dataset, { y })
          }
        },
        restrict: {
        restriction: {
            y: 0,
            width: 0,
            height: 500
        },
    },
    });



this.generateGrafic();
}


  getMonitors = (title) =>{
    const _this = this;

    this.setState({ //save the current state of the data
      startloadingMonitors: false
    });

    axios.get("http://172.18.0.4:8080/WebReport/rest/webreport/components/" + title)
      .then(response => {

        //-----------------------FOR SEARCH FUNCTION----------------------------------------------------

        var monitors = [];
        var enumList = response.data.magnitudeDescriptions;
        var escalList = response.data.monitorDescription;
        //----------------------------------------------------------------------------------------------
        for (var i = 0; i < enumList.length; i++) {
          var enumerados2 = response.data.magnitudeDescriptions[i];
          monitors.push(enumerados2);
        }
        for (var i = 0; i < escalList.length; i++) {
          var escalares2 = response.data.monitorDescription[i];
          monitors.push(escalares2);
        }
        if (monitors.length > 0) {
          var stateInfo2 = {
                            magnitude: "STATE"
                          };
          monitors.push(stateInfo2);
        }
        //----------------------------------------------------------------------------------------------



        var itemMonitor = [];
        var arrayItemENum;
        for (var i = 0; i < enumList.length; i++) {
          arrayItemENum = {
            item: response.data.magnitudeDescriptions[i]
          }
          itemMonitor.push(arrayItemENum);
        }
        var arrayItemEscala;
        for (var i = 0; i < escalList.length; i++) {
          arrayItemEscala = {
            item: response.data.monitorDescription[i]
          }
          itemMonitor.push(arrayItemEscala);
        }
        if (itemMonitor.length > 0) {
          var stateInfo = {
                           item:{
                            magnitude: "STATE"
                          }
                        };
          itemMonitor.push(stateInfo);
        }
        // console.log("ITEM:   " + itemMonitor[0].item.magnitude);



        this.setState({ //save the current state of the data
          data_monitors_components: itemMonitor,
          loadingMonitors: false,
          startloadingMonitors: true
        });



        $( ".searchInputMonitor input[type='text']" ).keyup(function() {
            _this.searchthroughtMonitor(monitors, $(this).val(), itemMonitor);
            // alert($(this).val());
        });

        console.log("Get monitors from component successfully");
      })
      .catch(error => {
        console.log('Error to obtein the monitors');
      });
  }


    // darktheme = (darktheme) =>{
    //   if (darktheme) {
    //     am4core.useTheme(am4themes_dark);
    //     $(".display-grafic-section").css({ 'background-color': 'rgb(60 65 72)' });
    //   }else {
    //     am4core.useTheme(am4themes_dataviz);
    //     $(".display-grafic-section").css({ 'background-color': '#d1d8d9' });
    //   }
    //   this.generateGrafic();
    // }



    generateGrafic = (selectMonitorName, selectGraficType, selectFilled, selectCurved, selectDotted, selectUnitType, selectStrokeWidth, selectMultiaxisPOS, selectLogaritm, generalSelectLogartm, selectValueMIN, selectValueMAX, selectTooltip, selectGrid, selectPositionAxisY, selectPositionAxisX, selectHowManyYAxis, selectHowManyXAxis) => {
      var graficImage = $(".img_grafic");

      if (selectMonitorName === undefined) {
        graficImage.removeClass('display-none');
        graficImage.addClass('display-block');
      }
      else if (selectMonitorName.length <= 0) {
        graficImage.removeClass('display-none');
        graficImage.addClass('display-block');
      }
      else{
        graficImage.addClass('display-none');

        am4core.ready(function() {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.menu.verticalAlign = "bottom";



        var allDateAxis  = [];
        var allValueAxis = [];
        if (selectMultiaxisPOS) {

          console.log(selectHowManyYAxis);
          console.log(selectHowManyXAxis);

          for (var i = 0; i < selectHowManyXAxis; i++) {

            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 100;
            // dateAxis.renderer.grid.template.disabled = true;

            allDateAxis.push(dateAxis);
         }
         for (var i = 0; i < selectHowManyYAxis; i++) {
           var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
           // valueAxis.renderer.grid.template.disabled = true;

            if (selectLogaritm[i]) {
              allValueAxis[i].logarithmic = true;
            }
            if (selectValueMIN[i]) {
              allValueAxis[i].min = selectValueMIN[i];
            }
            if (selectValueMAX[i]) {
              allValueAxis[i].max = selectValueMAX[i];
            }

            allValueAxis.push(valueAxis);
          }


        }else {
          var dateAxis1 = chart.xAxes.push(new am4charts.DateAxis());
          dateAxis1.renderer.grid.template.location = 0;
          dateAxis1.renderer.minGridDistance = 100;


          var valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());

          if (!selectGrid) {
            dateAxis1.renderer.grid.template.disabled = true;
            valueAxis1.renderer.grid.template.disabled = true;
          }


          if (generalSelectLogartm) {
            valueAxis1.logarithmic = true;
          }

        }




        var monitorselected = [];
        for (var i = 0; i < selectMonitorName.length; i++) {

          if (!selectMultiaxisPOS) {
            if (selectValueMIN[i]) {
              valueAxis1.min = selectValueMIN[i];
              console.log("MIN " + selectValueMIN[i]);
               valueAxis1.strictMin = true;
            }
            if (selectValueMAX[i]) {
              valueAxis1.max = selectValueMAX[i];
              console.log("MAX " + selectValueMAX[i]);
               valueAxis1.strictMax = true;
            }
          }


          var monitor ={ id: i ,
                         name: selectMonitorName[i],
                         color: false,
                         data: generateHourlyData(),
                         grafic:{
                               type: selectGraficType[i],
                               strokeWidth: selectStrokeWidth[i],
                               filled: selectFilled[i],
                               curved: selectCurved[i],
                               dotted: selectDotted[i]
                             },
                         unit: selectUnitType[i]
                        };
          monitorselected.push(monitor);
        }


        for (var i = 0; i < monitorselected.length; i++) {

          if (monitorselected[i].grafic.type === "Line Series") {
            var series = chart.series.push(new am4charts.LineSeries());
          }
          else if(monitorselected[i].grafic.type === "Step Line Series") {
            var series = chart.series.push(new am4charts.StepLineSeries());
          }
          else if(monitorselected[i].grafic.type === "Vertical Bar Series") {
            var series = chart.series.push(new am4charts.ColumnSeries());
          }
          else if(monitorselected[i].grafic.type === "Candel Sticks Series") {
            chart.dataSource.parser.options.useColumnNames = true;
            chart.dataSource.parser.options.reverse = true;
            // the following line makes value axes to be arranged vertically.
            chart.leftAxesContainer.layout = "vertical";

            var series = chart.series.push(new am4charts.CandlestickSeries());
            series.dataFields.dateX = "Date";
            series.dataFields.openValueY = "Open";
            series.dataFields.valueY = "Close";
            series.dataFields.lowValueY = "Low";
            series.dataFields.highValueY = "High";
            // dateAxis1.groupData = true;
            // dateAxis1.minZoomCount = 5;
            series.clustered = false;
          }
          else {
            var series = chart.series.push(new am4charts.LineSeries());
          }


          if (monitorselected[i].color) {
            series.stroke = am4core.color(monitorselected[i].color);
          }


          if (monitorselected[i].grafic.curved) {
            series.tensionX = 0.8;
          }

          if (monitorselected[i].grafic.filled) {
            series.fillOpacity = 0.3;
          }

          if (monitorselected[i].grafic.strokeWidth === "Bolder") {
            series.strokeWidth = 4;
          }else if (monitorselected[i].grafic.strokeWidth === "Bold") {
            series.strokeWidth = 3;
          }else if (monitorselected[i].grafic.strokeWidth === "Medium") {
            series.strokeWidth = 2;
          }else {
            series.strokeWidth = 1;
          }

          series.name = monitorselected[i].name;
          series.dataFields.valueY = "value";
          series.dataFields.dateX = "date";
          // series.stacked = true;
          // series.sequencedInterpolation = true;
          // series.connect = false;
          series.data = monitorselected[i].data;



          if (selectMultiaxisPOS) {

              if (selectPositionAxisY[i] == "1") {
                series.yAxis = allValueAxis[0];
              }
              if (selectPositionAxisY[i] == "2") {
                series.yAxis = allValueAxis[1];
              }
               if (selectPositionAxisY[i] == "3") {
                series.yAxis = allValueAxis[2];
              }
              if (selectPositionAxisY[i] == "4") {
                series.yAxis = allValueAxis[3];
              }
              if (selectPositionAxisY[i] == "5") {
                series.yAxis = allValueAxis[4];
              }

              if (selectPositionAxisX[i] == "1") {
                series.xAxis = allDateAxis[0];
              }
              if (selectPositionAxisX[i] == "2") {
                series.xAxis = allDateAxis[1];
              }
              if (selectPositionAxisX[i] == "3") {
                series.xAxis = allDateAxis[2];
              }
              if (selectPositionAxisX[i] == "4") {
                series.xAxis = allDateAxis[3];
              }
              if (selectPositionAxisX[i] == "5") {
                series.xAxis = allDateAxis[4];
              }



          }else {
            series.xAxis = dateAxis1;
            series.yAxis = valueAxis1;
          }


          // series.strokeWidth = 2;


          if (selectTooltip) {
            series.tooltipText = "{dateX.formatDate('yyyy-MM-dd hh:00')}: [bold]{valueY}[/]";
            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#333a44");
            series.tooltip.getStrokeFromObject = false;
            series.tooltip.background.strokeWidth = 1;
          }


          series.legendSettings.labelText = "{name}[/]";
          series.legendSettings.valueText = "{valueY.close}";


          if (monitorselected[i].grafic.dotted) {
            series.minBulletDistance = 15;
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 4;
            bullet.circle.fill = am4core.color("#fff");
            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.3;
          }


          if (monitorselected[i].grafic.type === "Vertical Bar Series" || monitorselected[i].grafic.type === "Candel Sticks Series") {
          }else {
            let segment = series.segments.template;
              segment.interactionsEnabled = true;

              let hoverState = segment.states.create("hover");
              hoverState.properties.strokeWidth = 3;

              let dimmed = segment.states.create("dimmed");
              dimmed.properties.stroke = am4core.color("#cfd9db");
              dimmed.properties.fillOpacity = 0;

              // segment.events.on("over", function(event) {
              //   processOver(event.target.parent.parent.parent);
              // });
              //
              // segment.events.on("out", function(event) {
              //   processOut(event.target.parent.parent.parent);
              // });
          }

        }

        /* Add legend */
        chart.legend = new am4charts.Legend();

        chart.legend.markers.template.states.create("dimmed").properties.opacity = 0.3;
        chart.legend.labels.template.states.create("dimmed").properties.opacity = 0.3;

        chart.legend.itemContainers.template.events.on("over", function(event) {
          processOver(event.target.dataItem.dataContext);
        })

        chart.legend.itemContainers.template.events.on("out", function(event) {
          processOut(event.target.dataItem.dataContext);
        })

        function processOver(hoveredSeries) {
          hoveredSeries.toFront();

          hoveredSeries.segments.each(function(segment) {
            segment.setState("hover");
          })

          hoveredSeries.legendDataItem.marker.setState("default");
          hoveredSeries.legendDataItem.label.setState("default");

          chart.series.each(function(series) {
            if (series != hoveredSeries) {
              series.segments.each(function(segment) {
                segment.setState("dimmed");
              })
              series.bulletsContainer.setState("dimmed");
              series.legendDataItem.marker.setState("dimmed");
              series.legendDataItem.label.setState("dimmed");
            }
          });
        }

        function processOut() {
          chart.series.each(function(series) {
            series.segments.each(function(segment) {
              segment.setState("default");
            })
            series.bulletsContainer.setState("default");
            series.legendDataItem.marker.setState("default");
            series.legendDataItem.label.setState("default");
          });
        }


        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        // Create vertical scrollbar and place it before the value axis

        if (!selectMultiaxisPOS) {
          chart.scrollbarY = new am4core.Scrollbar();
          chart.scrollbarY.parent = chart.leftAxesContainer;
          chart.scrollbarY.toBack();
        }

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        // chart.scrollbarX = new am4charts.XYChartScrollbar();
        // chart.scrollbarX.series.push(series);

        function generateDailyData() {
            var firstDate = new Date();
            firstDate.setDate(firstDate.getDate() - 10);
            firstDate.setHours(0, 0, 0, 0);
            var data = [];
            for(var i = 0; i < 100; i++) {
              var newDate = new Date(firstDate);
              newDate.setDate(newDate.getDate() + i);
              data.push({
                date: newDate,
                value: Math.round(Math.random() * 120) + 1
              });
            }
          return data;
        }

        function generateHourlyData() {
            var firstDate = new Date();
            firstDate.setDate(firstDate.getDate() - 10);
            var data = [];
            for(var i = 0; i < 10 * 24; i++) {
                var newDate = new Date(firstDate);
              newDate.setHours(newDate.getHours() + i);

                if (i == 0) {
                    var value = Math.round(Math.random() * 10) + 1;
                } else {
                    var value = Math.round(data[data.length - 1].value / 100 * (90 + Math.round(Math.random() * 20)) * 100) / 100;
                }
              data.push({
                date: newDate,
                value: value
              });
            }
          return data;
        }

        }); // end am4core.ready()

      }
  }






  // printOptionStore = (name, storeMonitorID) => {
  //
  //     // console.log("ELEMENT SELECTED " + $("#gtype" + storeMonitorID + " option").eq(1).text());
  //
  //     var gtype2 = {type:   ["Line Series", "Step Line Series", "Vertical Bar Series"],
  //                   unit:   ["M", "MM", "K"],
  //                   stroke: ["Light", "Medium", "Bold"],
  //                   curved: ["true", "false"],
  //                   filled: ["true", "false"],
  //                   dotted: ["true", "false"]
  //                  }
  //
  //
  //     var monitorSlectedItem =  <tr>
  //                                 <td>
  //                                   <Stack className="monitor-seleted-item" direction="row">
  //                                     <div className="monitor-selected-item-title-box">
  //                                       <p className="monitor-selected-item-title monitor-name">{ name }</p>
  //                                     </div>
  //                                     <div className="monitor-selected-checkbox-box">
  //                                       <select id={ "gtype" + storeMonitorID } className="monitor-selected-select grafic-type">
  //                                         <option value="0">Grafic Type</option>
  //                                         <option value="1">Line Series</option>
  //                                         <option value="2">Step Line Series</option>
  //                                         <option value="3">Vertical Bar Series</option>
  //                                       </select>
  //                                       <select id={ "unit" +storeMonitorID } className="monitor-selected-select unit-type">
  //                                         <option value="0">Unit</option>
  //                                         <option value="1">M</option>
  //                                         <option value="2">MM</option>
  //                                         <option value="3">K</option>
  //                                       </select>
  //                                       <select id={ "stroke" +storeMonitorID } className="monitor-selected-select stroke-width">
  //                                         <option value="0">StrokeWidth</option>
  //                                         <option value="1">Light</option>
  //                                         <option value="2">Medium</option>
  //                                         <option value="3">Bold</option>
  //                                       </select>
  //                                       <FormControlLabel className="select-all-checkbox select-monitor-checkbox curved-check" label="Curved"  control={<Checkbox id={ "curved" +storeMonitorID } />} />
  //                                       <FormControlLabel className="select-all-checkbox select-monitor-checkbox filled" label="Filled"  control={<Checkbox id={ "filled" +storeMonitorID } />} />
  //                                       <FormControlLabel className="select-all-checkbox select-monitor-checkbox dotted" label="Dotted" control={<Checkbox id={ "dotted" +storeMonitorID } />} />
  //                                       {/*<FormControlLabel className="select-all-checkbox select-monitor-checkbox axis" label="Axis" control={<Checkbox />} />*/}
  //                                     </div>
  //                                   </Stack>
  //                                 </td>
  //                               </tr>;
  //
  //         monitorSlectedListItem.push(monitorSlectedItem);
  //         console.log(monitorSlectedListItem);
  //         this.setState({ //save the current state of the data
  //           data_monitors_selected: monitorSlectedListItem
  //         });
  //
  // }


  cheackMuiltiAxisCheacked = () => {
    if ($(".multiAxis input[type='checkbox']").is(":checked")) {
      $(".monitor-limits-label").addClass("display-none");
      $(".input-limits-grafic-options").addClass("display-none");

      $(".position-axis-y").removeClass("display-none");
      $(".position-axis-x").removeClass("display-none");
    }else {
      $(".monitor-limits-label").removeClass("display-none");
      $(".input-limits-grafic-options").removeClass("display-none");

      $(".position-axis-y").addClass("display-none");
      $(".position-axis-x").addClass("display-none");
    }
  }

  selectMonitor = (name, typeIcon, stroreOptions, storeMonitorID) => {

    if (monitorSlectedListItem.length <= 0) {
      $(".no_monitor_selected").addClass("display-none");
    }else {
      $(".no_monitor_selected").remove("display-none");
    }



    var monitorSlectedItem =  <tr>
                                <td>
                                <div className="monitor-selected-td-container">

                                  <div className="monitor-seleted-options-icons">
                                    <div className="monitor-seleted-typeIcon">
                                      { typeIcon }
                                    </div>
                                    <div className="monitor-seleted-dragIcon">
                                      <DragIndicatorIcon />
                                    </div>
                                    <div className="monitor-seleted-closeIcon">
                                      <CloseIcon />
                                    </div>
                                  </div>
                                  <div className="monitor-seleted-item-box">
                                    <Stack className="monitor-seleted-item" direction="row">
                                      <div className="monitor-selected-item-title-box">
                                        <p className="monitor-selected-item-title monitor-name">{ name }</p>
                                      </div>
                                      <div className="checkbox-monitor-selected">
                                        <FormControlLabel className="select-all-checkbox select-monitor-checkbox logarithm" label="Logarithm"  control={<Checkbox id={ "logarithm" +storeMonitorID } />} />
                                        <FormControlLabel className="select-all-checkbox select-monitor-checkbox curved-check" label="Curved"  control={<Checkbox id={ "curved" +storeMonitorID } />} />
                                        <FormControlLabel className="select-all-checkbox select-monitor-checkbox filled" label="Filled"  control={<Checkbox id={ "filled" +storeMonitorID } />} />
                                        <FormControlLabel className="select-all-checkbox select-monitor-checkbox dotted" label="Dotted" control={<Checkbox id={ "dotted" +storeMonitorID } />} />
                                      </div>
                                    </Stack>
                                      <div className="monitor-selected-checkbox-box">
                                        <div className="monitor-selected-select-box">
                                          <label className="monitor-limits-label"> Max </label>
                                          <input type="number" placeholder="0.." className="input-limits-grafic-options yaxisMax" />
                                          <label className="monitor-limits-label"> Min </label>
                                          <input type="number" placeholder="0.." className="input-limits-grafic-options yaxisMin" />
                                          <select id={ "multiAxis" +storeMonitorID } className="monitor-selected-select position-axis-y display-none">
                                            <option disabled selected value="0">Pos-Y</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                          </select>
                                          <select id={ "multiAxis" +storeMonitorID } className="monitor-selected-select position-axis-x display-none">
                                            <option disabled selected value="0">Pos-X</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                          </select>
                                        </div>
                                        <div className="monitor-selected-input-box">
                                          <select id={ "unit" +storeMonitorID } className="monitor-selected-select unit-type">
                                            <option disabled selected value="0">Unit</option>
                                            <option value="1">M</option>
                                            <option value="2">MM</option>
                                            <option value="3">K</option>
                                          </select>
                                          <select id={ "gtype" + storeMonitorID } className="monitor-selected-select grafic-type">
                                            <option disabled selected value="0">Grafic Type</option>
                                            <option value="1">Line Series</option>
                                            <option value="2">Step Line Series</option>
                                            <option value="3">Vertical Bar Series</option>
                                            <option value="4">Candel Sticks Series</option>
                                          </select>
                                          <select id={ "stroke" +storeMonitorID } className="monitor-selected-select stroke-width">
                                            <option disabled selected value="0">StrokeWidth</option>
                                            <option value="1">Light</option>
                                            <option value="2">Medium</option>
                                            <option value="3">Bold</option>
                                            <option value="4">Bolder</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>

                                </div>
                                </td>
                              </tr>;

        monitorSlectedListItem.push(monitorSlectedItem);
        console.log(monitorSlectedListItem);
        this.setState({ //save the current state of the data
          data_monitors_selected: monitorSlectedListItem
        });
        const _this = this;
        setTimeout(function(){ _this.cheackMuiltiAxisCheacked(); }, 500);

  }


  dataMonitorSelected = () => {
    var monitor_name          = $(".monitor-name");
    var selectMonitorName     = [];
    var graficTypeChoose      = $(".grafic-type option:selected");
    var selectGraficType      = [];
    var unitChoose            = $(".unit-type option:selected");
    var selectUnitType        = [];
    var strokeWidthChoose     = $(".stroke-width option:selected");
    var selectStrokeWidth     = [];
    var positionAxisYChoose   = $(".position-axis-y option:selected");
    var selectPositionAxisY   = [];

    var positionAxisXChoose   = $(".position-axis-x option:selected");
    var selectPositionAxisX   = [];


    var selectMultiaxisPOS    = $(".multiAxis input[type='checkbox']").is(":checked");
    var generalSelectLogartm  = $(".logarithm-all input[type='checkbox']").is(":checked");

    var selectTooltip         = $(".tooltip input[type='checkbox']").is(":checked");
    var selectGrid            = $(".showGrid input[type='checkbox']").is(":checked");

    var selectHowManyYAxis    = $(".howManyYAxis option:selected").text();
    var selectHowManyXAxis    = $(".howManyXAxis option:selected").text();


    var curvedChoose          = $(".curved-check input[type='checkbox']");
    var selectCurved          = [];
    var filledChoose          = $(".filled input[type='checkbox']");
    var selectFilled          = [];
    var dottedChoose          = $(".dotted input[type='checkbox']");
    var selectDotted          = [];
    var logaritmChoose        = $(".logarithm input[type='checkbox']");
    var selectLogaritm        = [];

    var valueMINChoose        = $(".yaxisMin");
    var selectValueMIN        = [];
    var valueMAXChoose        = $(".yaxisMax");
    var selectValueMAX        = [];


    for (var i = 0; i < monitor_name.length; i++) {
      selectMonitorName.push(monitor_name.eq(i).text());
      selectGraficType.push(graficTypeChoose.eq(i).text());
      selectUnitType.push(unitChoose.eq(i).text());
      selectStrokeWidth.push(strokeWidthChoose.eq(i).text());
      selectPositionAxisY.push(positionAxisYChoose.eq(i).text());
      selectPositionAxisX.push(positionAxisXChoose.eq(i).text());

      selectCurved.push(curvedChoose.eq(i).is(":checked"));
      selectFilled.push(filledChoose.eq(i).is(":checked"));
      selectDotted.push(dottedChoose.eq(i).is(":checked"));
      selectLogaritm.push(logaritmChoose.eq(i).is(":checked"));

      if (valueMINChoose.eq(i).val() === "") { selectValueMIN.push(false)  }
      else { selectValueMIN.push(valueMINChoose.eq(i).val()) }

      if (valueMAXChoose.eq(i).val() === "") { selectValueMAX.push(false) }
      else { selectValueMAX.push(valueMAXChoose.eq(i).val()) }
    }

    this.generateGrafic(selectMonitorName, selectGraficType, selectFilled, selectCurved, selectDotted, selectUnitType, selectStrokeWidth, selectMultiaxisPOS, selectLogaritm, generalSelectLogartm, selectValueMIN, selectValueMAX, selectTooltip, selectGrid, selectPositionAxisY, selectPositionAxisX, selectHowManyYAxis, selectHowManyXAxis);
  }





  getHowManyAxis = () => {
      var positionAxisXChoose = $("#howManyYAxis-id option:selected").text();
      this.generateConfiglimitsAxis(positionAxisXChoose);
  }




  generateConfiglimitsAxis = (howManyAxises) => {
    var axislimitsInputs = [];
    var e = 2;

        for (var i = 1; i < howManyAxises; i++) {
          var element = <div className="limitsMultiAxis">
                          <div className="limitsMultiAxis-label-box">
                            <label className="limitsMultiAxis-label">Axis</label>
                            <label>{ e }</label>
                          </div>
                          <label className="limitsMultiAxis-label min">Max</label>
                          <input type="number" placeholder="0.." className="limitsMultiAxis-inputMax" />
                          <label className="limitsMultiAxis-label max">Min</label>
                          <input type="number" placeholder="0.." className="limitsMultiAxis-inputMin" />
                        </div>;
          axislimitsInputs.push(element);
          e += 1;
        }


    this.setState({ //save the current state of the data
      axislimits: axislimitsInputs
    });

  }












  setStorequery = () =>{
    var escalarIcon = <CircleIcon className ="monitor-type-indicator_scalar_azul" />;
    var escalarArrayIcon = <DonutSmallIcon className ="monitor-type-indicator_1" />;
    var enumIcon = <CircleIcon className ="monitor-type-indicator_2" />

    var monitorStore = [{id: 1,
                         name:"ShutterCS",
                         type: escalarIcon,
                         grafictype: 1,
                         unit: 1,
                         curved: true,
                         filled: false,
                         dotted: true
                        },
                        {id: 2,
                         name:"ARCDriver",
                         type: escalarIcon,
                         grafictype: 2,
                         unit:3,
                         curved: true,
                         filled: false,
                         dotted: false
                        },
                        {id: 3,
                         name:"Mad",
                         type: escalarIcon,
                         grafictype: 1,
                         unit:1,
                         curved: false,
                         filled: false,
                         dotted: true
                        },
                        {id: 4,
                         name:"CoverCS",
                         type: escalarArrayIcon,
                         grafictype: 2,
                         unit:2,
                         curved: false,
                         filled: true,
                         dotted: false
                        },
                        {id: 5,
                         name:"SlitCS",
                         type: enumIcon,
                         grafictype: 3,
                         unit:1,
                         curved: false,
                         filled: false,
                         dotted: false
                        }];

    monitorSlectedListItem = [];

    for (var i = 0; i < monitorStore.length; i++) {
      // this.selectMonitor(monitorStore[i].name, monitorStore[i].id);
      this.selectMonitor(monitorStore[i].name, monitorStore[i].type);
    }

  }


  render(){
    var _this = this;
    // console.log(this.state.data_monitors_selected);
    // var resultComponent = [{id: 1, name: "CCCS/Mads/MAD_Megara "},{id: 2, name: "MEGARA/DAS"},{id: 3, name: "MEGARA/MCS/Actuator"},{id: 4, name: "MCS/CCDTemperature"}];
    var resultAPIComponent = this.state.data_components;
    let componentElements;
    let monitorcomponentElements;
    monitorcomponentElements = <div className="noComponentSelected-box">
                                  <SnippetFolderIcon className="noComponentSelected-icon" />
                                  <p className="noComponentSelected-title">No Component Selected From Component Item List</p>
                               </div>;


        if (!this.state.loading) { // if the results found are greater than 0 the images are displayed
            componentElements = resultAPIComponent.map(element =>
               <ComponentListElement
                key                = { element.id }
                name               = { element.item }
                getMonitors        = { this.getMonitors }
                />
            );

        }else if (this.state.connectioError) {
          componentElements = <div className="noComponentSelected-box">
                                        <SnippetFolderIcon className="noComponentSelected-icon" />
                                        <p className="noComponentSelected-title">Connection Error</p>
                                     </div>;
        }
        else { // if not, the component <NotFound> is displayed
          componentElements = <div>
                                <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                             </div>;
        }

    // var resultMonitor = [{id: 1, name: "EdgeSensor"},{id: 2, name: "M1Segment"},{id: 3, name: "Positioner"},{id: 4, name: "Stabilisation"},{id: 5, name: "CDIOSLoadCell"},{id: 6, name: "M1Temperature"},{id: 7, name: "SkewWatcher"},{id: 8, name: "Mad"},{id: 9, name: "ARCDriver"},{id: 10, name: "CoverCS"},{id: 11, name: "FocusCS"},{id: 12, name: "SlitCS"},{id: 13, name: "Adam6015"},{id: 14, name: "ShutterCS"}];



        if (!this.state.loadingMonitors) {

          if (this.state.data_monitors_components.length <= 0) {

              monitorcomponentElements = <div className="noComponentSelected-box">
                                            <RemoveCircleIcon className="noComponentSelected-icon" />
                                            <p className="noComponentSelected-title">No Monitors Available</p>
                                         </div>;
          }else {

            var resultAPIMonitor = this.state.data_monitors_components;
            monitorcomponentElements = resultAPIMonitor.map(element =>
               <MonitorListElement
                key                = { element.id }
                name               = { element.item.magnitude }
                type               = { element.item.type }
                selectMonitor      = { this.selectMonitor }
                />
            );
        }
      }
      if (!this.state.startloadingMonitors){
        monitorcomponentElements = <div>
                                      <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                      <Skeleton className="skeleton-componentmonitor"variant="rectangular" width={235} height={30} />
                                      <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                      <Skeleton className="skeleton-componentmonitor" variant="rectangular" width={235} height={30} />
                                   </div>;
      }

      var howManyComponents = 1187;
      var componentListItem = []
      var componentItem = <div>
                            <ListItemButton>
                              <ListItemIcon>
                                <FolderIcon />
                              </ListItemIcon>
                              <ListItemText primary="Component" />
                            </ListItemButton>
                            <Divider light />
                          </div>;

      for (var i = 0; i < howManyComponents; i++) {
        componentListItem.push(componentItem);
      }


    var howManyStoreQuery = 1;
    var storeQueryListItem = []
    var storeQueryItem =  <div className="store-query-contain-box">
                            <div className="store-query-item-title-box">
                              <p className="store-query-item-title">Random Monitors</p>
                            </div>

                            <div className="store-query-consult-button-box">
                              <IconButton onClick={() => {this.setStorequery()}} aria-label="play" className="stroreQueryButton">
                                <PlayCircleIcon />
                              </IconButton>
                              <IconButton aria-label="preview" className="stroreQueryButton">
                                <PreviewIcon />
                              </IconButton>
                              <IconButton aria-label="edit"className="stroreQueryButton">
                                <EditIcon />
                              </IconButton>
                              <IconButton aria-label="delete" className="stroreQueryButton">
                                <DeleteForeverIcon />
                              </IconButton>
                            </div>
                        </div>;

    for (var i = 0; i < howManyStoreQuery; i++) {
      storeQueryListItem.push(storeQueryItem);
    }




    return(
    <div className="container">


    <div className="header">
      <Box sx={{ flexGrow: 1 }}>
       <AppBar position="static">
         <Toolbar>
           <IconButton
             size="large"
             edge="start"
             color="inherit"
             aria-label="menu"
             sx={{ mr: 2 }}
           >
             {/*<MenuIcon />*/}
             <img src={ logoSrc } className="header-logo" alt="logo"/>
           </IconButton>
           <Typography className="header-h2" variant="h6" component="div" sx={{ flexGrow: 1 }}>
             WebReport Prototype
           </Typography>
             <div>
               {/*<IconButton
                 onClick={() =>{this.darktheme(true)}}
                 size="large"
                 aria-label="account of current user"
                 aria-controls="menu-appbar"
                 aria-haspopup="true"
                 color="inherit"
               >                 <Brightness4Icon />
               </IconButton>*/}
               <IconButton
                 onClick={() =>{this.hideAllAndShowGrafic()}}
                 size="large"
                 aria-label="account of current user"
                 aria-controls="menu-appbar"
                 aria-haspopup="true"
                 color="inherit"
               >
                 <AnalyticsIcon />
               </IconButton>
             </div>
         </Toolbar>
       </AppBar>
     </Box>
    </div>


<div className="content">

<div className="SampleMonitorList-section">

<div className="sample-list-box">

          <div className="sample-header sample-items-components">

            <Stack direction="column" spacing={2}>
                <Stack className="stack-row-components-title-buttons" direction="row">
                  <p className="components-item-title">Components Item List</p>
                  {/*<IconButton
                    onClick={() =>{this.hideAndShowComponentSelectSection()}}
                    className="showAndHideComponentSectionButton"
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <VisibilityOffIcon sx={{ fontSize: 18 }} />
                  </IconButton>*/}
               </Stack>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  className="searchInputComponent"
                />
            </Search>

            {/*<ButtonGroup className="button-group-sort-component-monitor" variant="text" aria-label="text button group">
              <TextRotateVerticalIcon className="button-group-sort-component-monitor-icon" />
            </ButtonGroup>*/}

            </Stack>

          </div>

          <div className="sample-items">

            { componentElements }


          </div>

      </div>

      <div className="monitor-of-selected-sample-box">

          <div className="sample-header sample-header-monitors">

            <Stack direction="column" spacing={2}>
              Monitors Item List

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  className="searchInputMonitor"
                />
            </Search>

            {/*<ButtonGroup className="button-group-sort-component-monitor" variant="text" aria-label="text button group">
              <TextRotateVerticalIcon className="button-group-sort-component-monitor-icon" />
            </ButtonGroup>*/}

            </Stack>

          </div>

          <div id="offer-area" className="sample-items">

            { monitorcomponentElements }

          </div>

      </div>
</div>







      <div className="grafic-section">


      <div className="buttons-and-search-section">
            <Button className="btn-and-srch btn-and-srch-grafic-button" variant="contained" startIcon={<StackedBarChartIcon />}>
              Grafic
            </Button>
            <Button className="btn-and-srch btn-and-srch-table-button" variant="contained" startIcon={<TableChartIcon />}>
              Table
            </Button>

            <Search className="search-on-table">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
          </Search>
      </div>

      <div  className="selected-monitors-section">
        {/*<div className="selected-monitors-title"> Selected Monitors </div>*/}

        <div className="selected-monitors-select-all">
          <div className="selected-monitors-select-all-title"> Selected Monitors </div>
          <FormControlLabel onClick={this.activateMultiAxis} className="select-all-checkbox select-monitor-checkbox multiAxis" label="MultiAxis" control={<Checkbox sx={{ color: "#34373e", '&.Mui-checked': { color: "#bac9fd"}}} />} />
          <label className="howManyYAxis-label display-none">YAxis</label>
          <select id="howManyYAxis-id" className="monitor-selected-select howManyYAxis display-none">
            <option onClick={this.getHowManyAxis} value="1">1</option>
            <option onClick={this.getHowManyAxis} value="2">2</option>
            <option onClick={this.getHowManyAxis} value="3">3</option>
            <option onClick={this.getHowManyAxis} value="4">4</option>
            <option onClick={this.getHowManyAxis} value="5">5</option>
          </select>
          <label className="howManyXAxis-label display-none">XAxis</label>
          <select id="howManyXAxis-id" className="monitor-selected-select howManyXAxis display-none">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <FormControlLabel className="select-all-checkbox select-monitor-checkbox logarithm-all" label="Logarithm"  control={<Checkbox />} />
          <FormControlLabel onClick={() =>{this.checkAllCheckboxes("curved")}} className="select-all-checkbox curved-all" label="Curved" control={<Checkbox />} />
          <FormControlLabel onClick={() =>{this.checkAllCheckboxes("filled")}} className="select-all-checkbox filled-all" label="Filled" control={<Checkbox />} />
          <FormControlLabel onClick={() =>{this.checkAllCheckboxes("dotted")}} className="select-all-checkbox dotted-all" label="Dotted" control={<Checkbox />} />
        </div>


        <div className="set-Axis-limits-box display-none">
          <div className="limitsMultiAxis">
            <div className="limitsMultiAxis-label-box">
              <label className="limitsMultiAxis-label axis">Axis</label>
              <label className="limitsMultiAxis-label-number">1</label>
            </div>
            <label className="limitsMultiAxis-label min">Max</label>
            <input type="number" placeholder="0.." className="limitsMultiAxis-inputMax" />
            <label className="limitsMultiAxis-label max">Min</label>
            <input type="number" placeholder="0.." className="limitsMultiAxis-inputMin" />
          </div>

          { this.state.axislimits }

        </div>


        <div id="resizable" data-bottom="true" className="selected-monitors-box">
            <table id="drop-area" className="table-selected-monitors">
              <tbody>

                { this.state.data_monitors_selected }

              </tbody>
            </table>

            <div className="no_monitor_selected">
              <DataUsageIcon className="img_monitor_selected"/>
              <p className="no_monitor_selected_message">Select a Monitor from the MonitorList</p>
            </div>
        </div>
      </div>

{/*      <div id="resize-handle" data-bottom="true">
        <IconButton aria-label="height">
          <HeightIcon />
        </IconButton>
      </div>
*/}


        <div className="display-grafic-section">

           <div id="chartdiv" className="grafic-box">



            <InsertChartIcon className='img_grafic' />
           </div>

       </div>




                  <div className="grafic-options-section">

                    <Stack className="grafic-option-display-width" direction="row" spacing={2}>

                      <div className="grafic-option-inputs-box">
                        <div className="grafic-options-generic-box">
                          <div className="sample-header-grafic-option">
                             Grafic Options
                          </div>

                          <Stack className="grafic-options-monitor-selected-inputs-box" direction="column" spacing={2}>

                                <div className="sample-header-grafic-option-inside">

                                </div>
                                <div className="sample-header-grafic-option-inside sample-header-other-inside">
                                   <label className="display-block">Others</label>
                                   <FormControlLabel className="tooltip" control={<Checkbox defaultChecked sx={{ color: "#34373e", '&.Mui-checked': { color: pink[600],},}} />} label="ToolTip" />
                                   <FormControlLabel className="showYAxis" control={<Checkbox defaultChecked sx={{ color: "#34373e", '&.Mui-checked': { color: "#12939a",},}} />} label="Show YAxis" />
                                   <FormControlLabel className="showXAxis" control={<Checkbox defaultChecked sx={{ color: "#34373e", '&.Mui-checked': { color: "#be51e6",},}} />} label="Show XAxis" />
                                   <FormControlLabel className="showGrid" control={<Checkbox defaultChecked sx={{ color: "#34373e", '&.Mui-checked': { color: "#83db51",},}} />} label="Show Grid" />
                                </div>


                            <IconButton className="icon-reset-grafic-options" aria-label="reset_grafic">
                              <SettingsBackupRestoreIcon />
                            </IconButton>
                          </Stack>



                        </div>

                        {/*<div className="grafic-options-monitor-selected-box">
                          <div className="sample-header-grafic-option">
                              Monitor Grafic Options
                          </div>
                          <Stack className="grafic-options-monitor-selected-inputs-box" direction="column" spacing={1}>


                            <IconButton className="icon-reset-grafic-options" aria-label="reset_grafic">
                              <SettingsBackupRestoreIcon />
                            </IconButton>
                          </Stack>
                        </div>*/}

                      </div>

                      <div className="grafic-option-box">
                        <Stack className="grafic-option-buttons-box" direction="column" spacing={2}>
                          <Stack className="grafic-options-save-and-reset-button-box" direction="row" spacing={2}>
                            <Button onClick={() => {this.dataMonitorSelected()}} className="grafic-option-buttons grafic-option-button-save" variant="contained" startIcon={<SaveIcon/>}>
                              Save
                            </Button>
                            <Button className="grafic-option-buttons grafic-option-button-reset" variant="contained" startIcon={<SettingsBackupRestoreIcon />}>
                              Reset
                            </Button>
                          </Stack>
                          <Button className="grafic-option-button-download-state" variant="contained" startIcon={<DownloadIcon />}>
                            Donwload current grafic state
                          </Button>
                        </Stack>
                      </div>


                  </Stack>
                </div>



            </div>


            <div className="perform-query-section">

            <div className="sample-header-perform-query">

              <Stack direction="column" spacing={1}>
                <Stack className="stack-row-components-title-buttons" direction="row">
                  <p className="components-item-title">Perform Querys</p>
                  {/*<IconButton
                    onClick={() =>{this.hideAndShowPerformQuerySection()}}
                    className="showAndHideComponentSectionButton"
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <VisibilityOffIcon sx={{ fontSize: 18 }} />
                  </IconButton>*/}
               </Stack>
              { /*<BasicDateTimePicker />*/ }
              { <AntDesign /> }
              <TextField
                required
                className="perform-query-sampling-number-input"
                type="number"
                placeholder="Sampling (microsec)"
                defaultValue="Hello World"
              />
              </Stack>

            </div>

              <div className="perform-query-buttons-box">
                <Stack spacing={1}>

                  <Button className="perfrom-query-button-advanced-options" variant="contained" startIcon={<SettingsIcon />}>
                    Advanced Options
                  </Button>

                  { <SeachButton /> }

                    <Stack className="perform-query-down-and-email-buttons-box" direction="row" spacing={1}>
                      <Button className="perfrom-query-button-download-data" variant="contained" startIcon={<DownloadIcon />}>
                        Download Data
                      </Button>
                      <Button className="perfrom-query-button-email-data" variant="contained" startIcon={<EmailIcon />}>
                        Email Results
                      </Button>
                    </Stack>
                </Stack>
              </div>






              <div className="store-query-section">


                <div className="sample-header-store-query">

                  <Stack direction="column" spacing={1}>
                    Store Querys

                    <Button className="save-query-button" variant="contained"  startIcon={<DataSaverOnIcon />}>
                      Save New Query
                    </Button>
                  </Stack>

                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </div>

                  <div className="sample-items-store-query">

                      { storeQueryListItem }

                  </div>
              </div>


            </div>

        </div>
      </div>
    );
  }
}
export default Container;
