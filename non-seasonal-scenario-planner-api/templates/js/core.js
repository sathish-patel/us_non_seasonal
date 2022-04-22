"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
//Chart.register(ChartDataLabels);
$(document).ready(function () {
  var COLORLIST = ['#1D4E89', '#00B2CA', '#7DCFB6', '#FBD1A2'];
  var Millions = {
    legend: {
      display: false
    },
    responsive: true,
    tooltips: {
      enabled: false
    },
    layout: {
      padding: {top:30}
    },
    scales: {
      x: {
        gridLines: {
          drawOnChartArea: false
        }
      },
      // y: {
      //   ticks: {
      //     beginAtZero: true,
      //     callback: function callback(label, index, labels) {
      //       return label + 'M';
      //     }
      //   },
      //   gridLines: {
      //     drawOnChartArea: false
      //   },
      //   scaleLabel: {
      //     display: true,
      //     labelString: 'in Millions'
      //   }
      // }
      yAxes: [{
        ticks: {
          callback: function(value, index, values) {
            return convertToLabel(value);
          }
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 10
        },
        formatter: function formatter(value, ctx) {
          if (value) {
            var perc = "$ "+StrictBillions(value*1.0e+6);
            return perc;
          } else {
            return value;
          }
        }
      }
    }
  };
  var PLAIN = {
    legend: {
      display: false
    },
    responsive: true,
    tooltips: {
      enabled: false
    },
    layout: {
      padding: {top:30}
    },
    scales: {
      x: {
        gridLines: {
          drawOnChartArea: false
        }
      },
      yAxes: [{
        ticks: {
          callback: function(value, index, values) {
            return convertToLabel(value);
          }
        }
      }]
      // y: {
      //   ticks: {
      //     beginAtZero: true,
      //     callback: function callback(label, index, labels) {
      //       return label ;
      //     }
      //   },
      //   gridLines: {
      //     drawOnChartArea: false
      //   },
      //   scaleLabel: {
      //     display: true,
      //     labelString: 'in Millions'
      //   }
      // }
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 10
        },
        formatter: function formatter(value, ctx) {
          if (value) {
            var perc = StrictBillions(value*1.0e+6);
            return perc;
          } else {
            return value;
          }
        }
      }
    }
  };
  var PERCENT = {
    legend: {
      display: false
    },
    responsive: true,
    tooltips: {
      enabled: false
    },
    layout: {
      padding: {top:30}
    },
    scales: {
      x: {
        gridLines: {
          drawOnChartArea: false
        }
      },
      yAxes: [{
        ticks: {
          callback: function(value, index, values) {
            return value + '%';
          }
        }
      }]
      // y: {
      //   ticks: {
      //     beginAtZero: true,
      //     callback: function callback(label, index, labels) {
      //       return label + '%';
      //     }
      //   },
      //   gridLines: {
      //     drawOnChartArea: false
      //   },
      //   scaleLabel: {
      //     display: true,
      //     labelString: 'in Percentage'
      //   }
      // }
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 10
        },
        formatter: function formatter(value, ctx) {
          if (value) {
            var perc = value.toFixed(2) + " " + '%';
            return perc;
          } else {
            return value;
          }
        }
      }
    }
  };

  function convertToLabel (value) {
    var labelValue = value*(1.0e+6);
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9
  
    ? Math.floor((Math.abs(Number(labelValue)) / 1.0e+9)) + "B"
    // Six Zeroes for Millions
    : Math.abs(Number(labelValue)) >= 1.0e+6
  
    ? Math.floor((Math.abs(Number(labelValue)) / 1.0e+6)) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) > 1.0e+3
  
    ? Math.floor(Math.round(Math.abs(Number(labelValue)) / 1.0e+3)) + "K"
  
    : Math.floor(Math.abs(Number(labelValue)));
  
  }

  function RoundNumberCS(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9 ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) // Six Zeroes for Millions
    : Math.abs(Number(labelValue)) >= 1.0e+6 ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3 ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) : Math.abs(Number(labelValue));
  }

  function StrictBillions(labelValue) {
    // Nine Zeroes for Billions
    var result=Math.abs(Number(labelValue)) >= 1.0e+9 ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B" // Six Zeroes for Millions
    : Math.abs(Number(labelValue)) >= 1.0e+6 ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M" // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3 ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K" : Math.abs(Number(labelValue)).toFixed(2);
    return result;
  }

  function StrictBillionsText(labelValue) {
    // Nine Zeroes for Billions
    // var result= Math.abs(Number(labelValue)) >= 1.0e+9 ? (Math.abs(Number(labelValue)) / 1.0e+9) // Six Zeroes for Millions
    // : Math.abs(Number(labelValue)) >= 1.0e+6 ? (Math.abs(Number(labelValue)) / 1.0e+6) // Three Zeroes for Thousands
    // : Math.abs(Number(labelValue)) >= 1.0e+3 ? (Math.abs(Number(labelValue)) / 1.0e+3) : Math.abs(Number(labelValue));
    // return parseFloat(result.toFixed(2));
    return (Math.abs(Number(labelValue))/ 1.0e+6)
  }

  function init() {
    var output=JSON.parse($('#source_data').attr('json'));
    return output;
  }

  function volume_data_fc(data, label) {
    var ctx = document.getElementById('volume_data').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: data
      },
      options: PLAIN
    });
  }

  function gsv_te_data_fc(data, label) {
    var ctx = document.getElementById('gsv_te_data').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: data
      },
      options: Millions
    });
  }

  function nsv_mac_data_fc(data, label) {
    var ctx = document.getElementById('nsv_mac_data').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: data
      },
      options: Millions
    });
  }

  function cogs_data_fc(data, label) {
    var ctx = document.getElementById('cogs_data').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: data
      },
      options: Millions
    });
  }

  function cogs_percent_data_fc(data, label) {
    var ctx = document.getElementById('cogs_percent_data').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: data
      },
      options: PERCENT
    });
  }

  function compare_scenario() {
    var res = {};
    res['data'] = init();
    var comparedata = res.data;
    var table_view = JSON.parse(JSON.stringify(res.data));
    var SimulatedResult = JSON.parse(JSON.stringify(res.data));
    var SimulatedResult_BASE = JSON.parse(JSON.stringify(res.data));
    var SimulatedResult_RAW = JSON.parse(JSON.stringify(res.data));
    var to_change = ["TRADE_SPENDS", "GSV", "NSV", "COGS", "MARS_PROFIT", "MAC%", "EQ_LBS", "EQ_LBS_with_new_donors"];
    var indexes = ['base_data', 'final_data'];
    table_view.forEach(function (row_items, index) {
      indexes.forEach(function (item) {
        for (var _i = 0, _Object$entries = Object.entries(row_items['planner_data']['save_data'][item]); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          if (to_change.includes(key)) {
            if (table_view[index]['planner_data']['save_data'][item][key]) {
              if (["TRADE_SPENDS", "GSV", "NSV", "MARS_PROFIT", "COGS", "MAC%"].includes(key)) {
                table_view[index]['planner_data']['save_data'][item][key] = StrictBillionsText(table_view[index]['planner_data']['save_data'][item][key]);
              }
            }
          } else if (["EQ_LBS", "EQ_LBS_with_new_donors"].includes(key)) {
            table_view[index]['planner_data']['save_data'][item][key] = StrictBillionsText(table_view[index]['planner_data']['save_data'][item][key]);
          }
        }
      });
    });
    var indexes = ['base_data'];
    SimulatedResult_BASE.forEach(function (row_items, index) {
      indexes.forEach(function (item) {
        for (var _i = 0, _Object$entries = Object.entries(row_items['planner_data']['save_data'][item]); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          if (to_change.includes(key)) {
            if (SimulatedResult_BASE[index]['planner_data']['save_data'][item][key]) {
              if (["TRADE_SPENDS", "GSV", "NSV", "MARS_PROFIT", "COGS", "MAC%"].includes(key)) {
                SimulatedResult_BASE[index]['planner_data']['save_data'][item][key] = StrictBillions(SimulatedResult_BASE[index]['planner_data']['save_data'][item][key]);
              }
            }
          } else if (["EQ_LBS", "EQ_LBS_with_new_donors"].includes(key)) {
            SimulatedResult_BASE[index]['planner_data']['save_data'][item][key] = StrictBillions(SimulatedResult_BASE[index]['planner_data']['save_data'][item][key]);
          }
        }
      });
    });
    
    var final_results = [];
    var barChartLabels = ['Base'];
    SimulatedResult.forEach(function (row_items, index) {
      barChartLabels.push(row_items.name);
      final_results.push(row_items['planner_data']['save_data']['final_data']);
    });
    var baseList = SimulatedResult[0]['planner_data']['save_data']['base_data'];
    var TE_Data = [];
    var GSV_Data = [];
    var NSV_Data = [];
    var MAC_Data = [];
    var COGS_Data = [];
    var COGS_P_Data = [];
    var Volume_Data = [];
    final_results.forEach(function (element) {
      var temp_te = StrictBillionsText(parseFloat(element['TRADE_SPENDS']));
      var temp_gsv = StrictBillionsText(parseFloat(element['GSV']));
      var temp_nsv = StrictBillionsText(parseFloat(element['NSV']));
      var temp_mac = StrictBillionsText(parseFloat(element['MARS_PROFIT']));
      var temp_cogs = StrictBillionsText(parseFloat(element['COGS']));
      var temp_vol = StrictBillionsText(parseFloat(element['EQ_LBS_with_new_donors']));
      var temp_cogs_p = (parseFloat(element['COGS']) / parseFloat(element['NSV']) * 100);
      TE_Data.push(parseFloat(temp_te));
      GSV_Data.push(parseFloat(temp_gsv));
      NSV_Data.push(parseFloat(temp_nsv));
      MAC_Data.push(parseFloat(temp_mac));
      COGS_Data.push(parseFloat(temp_cogs));
      Volume_Data.push(parseFloat(temp_vol));
      COGS_P_Data.push(parseFloat(temp_cogs_p));
    });
    var gsv_te_data = [{
      data: [StrictBillionsText(baseList['GSV'])].concat(GSV_Data),
      label: 'GSV',
      backgroundColor: COLORLIST[2],
      hoverBackgroundColor: COLORLIST[2]
    },
    {
      data: [StrictBillionsText(baseList['TRADE_SPENDS'])].concat(TE_Data),
      label: 'TE',
      backgroundColor: COLORLIST[1],
      hoverBackgroundColor: COLORLIST[1]
    }];
    gsv_te_data_fc(gsv_te_data, barChartLabels);
    var nsv_mac_data = [{
      data: [StrictBillionsText(baseList['NSV'])].concat(NSV_Data),
      label: 'NSV',
      backgroundColor: COLORLIST[2],
      hoverBackgroundColor: COLORLIST[2]
    }, {
      data: [StrictBillionsText(baseList['MARS_PROFIT'])].concat(MAC_Data),
      label: 'MAC',
      backgroundColor: COLORLIST[3],
      hoverBackgroundColor: COLORLIST[3]
    }];
    nsv_mac_data_fc(nsv_mac_data, barChartLabels);
    var cogs_data = [{
      data: [StrictBillionsText(baseList['COGS'])].concat(COGS_Data),
      label: 'COGS',
      backgroundColor: COLORLIST[2],
      hoverBackgroundColor: COLORLIST[2]
    }];
    cogs_data_fc(cogs_data, barChartLabels);
    var volume_data = [{
      data: [StrictBillionsText(baseList['EQ_LBS'])].concat(Volume_Data),
      label: 'Donor Volume',
      backgroundColor: COLORLIST[1],
      hoverBackgroundColor: COLORLIST[2]
    }];
    volume_data_fc(volume_data, barChartLabels);
    var cogs_percent_data = [{
      data: [parseFloat((baseList['COGS'] / baseList['NSV'] * 100).toFixed(2))].concat(COGS_P_Data),
      label: 'COGS %',
      backgroundColor: COLORLIST[2],
      hoverBackgroundColor: COLORLIST[2]
    }];
    cogs_percent_data_fc(cogs_percent_data, barChartLabels);
    gen_changesummary(table_view);
    gen_compare_scenario(SimulatedResult_BASE);
  }

  compare_scenario();

  function gen_changesummary(table_view) {
    var tr = "";
    table_view[0]["planner_data"]["donor"].forEach(function (item, index) {
      if (index == 0) {
        tr += '<tr><td rowspan=' + table_view[0]['planner_data']['donor'].length + '>Base</td><td class="br-1">' + item.name + '</td><td >' + item.description_id + '</td><td >' + item.brand + '</td><td >' + item.subbrand + '</td><td >' + item.flavour + '</td><td >' + item.inclusion + '</td><td >' + item.packtype + '</td><td >' + item.packsize + '</td><td >' + item.piece_count + '</td><td >' + item.weight_per_piece.toFixed(2) + '</td><td >' + item.cost_per_piece.toFixed(2) + '</td></tr>';
      } else {
        tr += '<tr><td class="br-1">' + item.name + '</td><td >' + item.description_id + '</td><td >' + item.brand + '</td><td >' + item.subbrand + '</td><td >' + item.flavour + '</td><td >' + item.inclusion + '</td><td >' + item.packtype + '</td><td >' + item.packsize + '</td><td >' + item.piece_count + '</td><td >' + item.weight_per_piece.toFixed(2) + '</td><td >' + item.cost_per_piece.toFixed(2) + '</td></tr>';
      }
    });
    tr += '<tr colspan="12" class="custom_row"><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td></tr>';
    table_view.forEach(function (donor, o_index) {
      donor["planner_data"]["doner_mix"].forEach(function (item, index) {
        if (index == 0) {
          tr += '<tr><td rowspan=' + donor['planner_data']['doner_mix'].length + '>'+donor.name+'</td><td class="br-1">' + item.name + '</td><td >' + item.description_id + '</td><td >' + item.brand + '</td><td >' + item.subbrand + '</td><td >' + item.flavour + '</td><td >' + item.inclusion + '</td><td >' + item.packtype + '</td><td >' + item.packsize + '</td><td >' + item.piece_count + '</td><td >' + item.weight_per_piece.toFixed(2) + '</td><td >' + item.cost_per_piece.toFixed(2) + '</td></tr>';
        } else {
          tr += '<tr><td class="br-1">' + item.name + '</td><td >' + item.description_id + '</td><td >' + item.brand + '</td><td >' + item.subbrand + '</td><td >' + item.flavour + '</td><td >' + item.inclusion + '</td><td >' + item.packtype + '</td><td >' + item.packsize + '</td><td >' + item.piece_count + '</td><td >' + item.weight_per_piece.toFixed(2) + '</td><td >' + item.cost_per_piece.toFixed(2) + '</td></tr>';
        }
      });
      tr += '<tr colspan="12" class="custom_row"><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td></tr>';
    });
    $('#cmp_t_body').append(tr);
  }

  function gen_compare_scenario(table_view) {
    var th = "";
    table_view.forEach(function (item, o_index) {
      th += '<th>'+item.name+'</th>';
    });
    var tr = "";
    tr += '<tr class="create-table"><td class="create-table_head">GSV</td><td>($)' + table_view[0]["planner_data"]["save_data"]["base_data"]["GSV"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>($)' + StrictBillions((item['planner_data']['save_data']['final_data']['GSV'])) + '</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">TE</td><td>($)' + table_view[0]["planner_data"]["save_data"]["base_data"]["TRADE_SPENDS"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>($)' + StrictBillions((item['planner_data']['save_data']['final_data']['TRADE_SPENDS'])) + '</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">NSV</td><td>($)' + table_view[0]["planner_data"]["save_data"]["base_data"]["NSV"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>($)' + StrictBillions(item['planner_data']['save_data']['final_data']['NSV']) + '</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">COGS</td><td>($)' + table_view[0]["planner_data"]["save_data"]["base_data"]["COGS"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>($)' + StrictBillions(item['planner_data']['save_data']['final_data']['COGS']) + '</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">MAC</td><td>($)' + table_view[0]["planner_data"]["save_data"]["base_data"]["MARS_PROFIT"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>($)' + StrictBillions(item['planner_data']['save_data']['final_data']['MARS_PROFIT'] )+ '</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">MAC %</td><td>' + (table_view[0]["planner_data"]["save_data"]["base_data"]["MAC%"]) + '%</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>' + StrictBillions(item['planner_data']['save_data']['final_data']['MAC%']) + '%</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">Total Volume</td><td>' + StrictBillions(table_view[0]["planner_data"]["save_data"]["base_data"]["EQ_LBS"]) + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>' + StrictBillions(item['planner_data']['save_data']['final_data']['EQ_LBS_with_new_donors']) + '</td>';
    });
    tr += '</tr>';
    $('#cmp_scenario').append(tr);
    $('#heade_text').append(th);
  }
});