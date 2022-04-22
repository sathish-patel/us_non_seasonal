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
      // y:{
      //   ticks: {
      //     display:true,
      //     min: 1,
      //     stepSize: 1,
      //     callback: function(label, index, labels) {
      //       console.log(label);
      //       return convertToLabel(label);
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
  var PERCENT = {
    legend: {
      display: false
    },
    responsive: true,
    tooltips: {
      enabled: false
    },
    layout: {
      padding: {top: 30}
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

  function RoundNumberCS(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9 ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) // Six Zeroes for Millions
    : Math.abs(Number(labelValue)) >= 1.0e+6 ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3 ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) : Math.abs(Number(labelValue));
  }

  function StrictBillions(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9 ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B" // Six Zeroes for Millions
    : Math.abs(Number(labelValue)) >= 1.0e+6 ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M" // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3 ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K" : Math.abs(Number(labelValue)).toFixed(2);
  }

  function StrictBillionsText(labelValue) {
    // Nine Zeroes for Billions
    // return Math.abs(Number(labelValue)) >= 1.0e+9 ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) // Six Zeroes for Millions
    // : Math.abs(Number(labelValue)) >= 1.0e+6 ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) // Three Zeroes for Thousands
    // : Math.abs(Number(labelValue)) >= 1.0e+3 ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) : Math.abs(Number(labelValue));
    return (Math.abs(Number(labelValue))/ 1.0e+6)
  }

  function init() {
     var output=JSON.parse($('#source_data').attr('json'));
     //var output=[{"id":69,"name":"march24","zrep":"4000057386","season":"HALLOWEEN","channel":"FOOD","rsu_description":"MARS VRTY PKCHOCOLATE FUN SIZE FC SEAS SUP XXL 104.27 OUNCE","brand_change":"MARS VRTY PK","piece_change":"299","incremental_mac":"-209052233.2700049","planner_data":{"donor":[{"id":4,"name":"10010716","weight_per_piece":0.010167598,"cost_per_piece":0.033145524,"status":true,"sequence":4,"brand_id":47,"pack_type_id":27,"sub_brand_id":1,"description_id":"TWIX CARAMELMINIATURES BULK TRANSFER CA","flavour_id":2,"inclusion_id":1,"pack_size_id":2,"piece_count":43,"brand":"TWIX","packtype":"MINIATURE","subbrand":"Not Applicable","flavour":"PEANUT BUTTER","inclusion":"NUT","packsize":"BULK","doner_list":"","donor_type":"default"},{"id":10,"name":"10007844","weight_per_piece":0.005793145,"cost_per_piece":0.02024427,"status":true,"sequence":10,"brand_id":50,"pack_type_id":27,"sub_brand_id":1,"description_id":"3 MUSKETEERS MINIATURES 14LB BULK CASE","flavour_id":1,"inclusion_id":3,"pack_size_id":2,"piece_count":117,"brand":"3 MUSKETEERS","packtype":"MINIATURE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"FRUIT","packsize":"BULK","doner_list":"","donor_type":"default"},{"id":23,"name":"10007242","weight_per_piece":0.008496732,"cost_per_piece":0.02851644,"status":true,"sequence":23,"brand_id":52,"pack_type_id":27,"sub_brand_id":1,"description_id":"MILKY WAY MINIATURES 20LB BULK CASE","flavour_id":7,"inclusion_id":3,"pack_size_id":2,"piece_count":110,"brand":"MILKY WAY US","packtype":"MINIATURE","subbrand":"Not Applicable","flavour":"SOUR","inclusion":"FRUIT","packsize":"BULK","doner_list":"","donor_type":"default"},{"id":27,"name":"10120475","weight_per_piece":0.024456595,"cost_per_piece":0.099100669,"status":true,"sequence":27,"brand_id":45,"pack_type_id":27,"sub_brand_id":1,"description_id":"SNMNTR BULK","flavour_id":4,"inclusion_id":4,"pack_size_id":2,"piece_count":70,"brand":"SNICKERS","packtype":"MINIATURE","subbrand":"Not Applicable","flavour":"MILK CHOCOLATE","inclusion":"NUT & FRUIT","packsize":"BULK","doner_list":"","donor_type":"default"},{"id":53,"name":"10126100","weight_per_piece":0.013265306,"cost_per_piece":0.054240925,"status":true,"sequence":53,"brand_id":49,"pack_type_id":29,"sub_brand_id":1,"description_id":"M&MS MC FS PCH DW","flavour_id":1,"inclusion_id":1,"pack_size_id":2,"piece_count":25,"brand":"M&M'S","packtype":"FUNSIZE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":"","donor_type":"default"},{"id":122,"name":"1000111","weight_per_piece":1,"cost_per_piece":1,"status":true,"sequence":121,"brand_id":46,"pack_type_id":28,"sub_brand_id":1,"description_id":null,"flavour_id":1,"inclusion_id":1,"pack_size_id":2,"piece_count":2,"brand":"HUBBA BUBBA","packtype":"ICP","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":"","donor_type":"default"},{"id":124,"name":"11112222","weight_per_piece":125,"cost_per_piece":21,"status":true,"sequence":122,"brand_id":44,"pack_type_id":26,"sub_brand_id":1,"description_id":null,"flavour_id":1,"inclusion_id":1,"pack_size_id":2,"piece_count":51,"brand":"EXTRA","packtype":"SINGLE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":"","donor_type":"default"},{"id":125,"name":"111122222","weight_per_piece":125,"cost_per_piece":21,"status":true,"sequence":123,"brand_id":44,"pack_type_id":26,"sub_brand_id":1,"description_id":"shdb judsvbujvb kxfjvk","flavour_id":1,"inclusion_id":1,"pack_size_id":2,"piece_count":51,"brand":"EXTRA","packtype":"SINGLE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":"","donor_type":"default"},{"id":126,"name":"1111222222","weight_per_piece":125,"cost_per_piece":21,"status":true,"sequence":124,"brand_id":44,"pack_type_id":26,"sub_brand_id":1,"description_id":"None","flavour_id":1,"inclusion_id":1,"pack_size_id":2,"piece_count":51,"brand":"EXTRA","packtype":"SINGLE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":"","donor_type":"default"},{"id":127,"name":"1111222223","weight_per_piece":1,"cost_per_piece":1,"status":true,"sequence":125,"brand_id":46,"pack_type_id":28,"sub_brand_id":1,"description_id":"test","flavour_id":1,"inclusion_id":1,"pack_size_id":3,"piece_count":1,"brand":"HUBBA BUBBA","packtype":"ICP","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"STANDARD","doner_list":"","donor_type":"default"},{"id":128,"name":"1111222224","weight_per_piece":1,"cost_per_piece":1,"status":true,"sequence":126,"brand_id":47,"pack_type_id":28,"sub_brand_id":1,"description_id":"test twist","flavour_id":1,"inclusion_id":1,"pack_size_id":3,"piece_count":1,"brand":"TWIX","packtype":"ICP","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"STANDARD","doner_list":"","donor_type":"default"},{"id":130,"name":"1111222225","weight_per_piece":1,"cost_per_piece":1,"status":true,"sequence":128,"brand_id":48,"pack_type_id":28,"sub_brand_id":1,"description_id":"new star","flavour_id":1,"inclusion_id":1,"pack_size_id":3,"piece_count":1,"brand":"STARBURST","packtype":"ICP","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"STANDARD","doner_list":"","donor_type":"default"},{"id":131,"name":"1111222226","weight_per_piece":1,"cost_per_piece":1,"status":true,"sequence":129,"brand_id":46,"pack_type_id":27,"sub_brand_id":1,"description_id":"test new doner","flavour_id":1,"inclusion_id":1,"pack_size_id":3,"piece_count":1,"brand":"HUBBA BUBBA","packtype":"MINIATURE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"STANDARD","doner_list":"","donor_type":"default"},{"id":1,"upc_name":"4000057386","name":"UCD_10000000","weight_per_piece":125,"cost_per_piece":21,"description":"Not Applicable","piece_count":51,"status":true,"sequence":1,"brand_id":44,"flavour_id":1,"inclusion_id":1,"pack_size_id":2,"pack_type_id":26,"sub_brand_id":1,"upc_id":16,"description_id":"Not Applicable","brand":"EXTRA","packtype":"SINGLE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":"","donor_type":"user_created"},{"id":2,"upc_name":"4000057386","name":"UCD_10000001","weight_per_piece":125,"cost_per_piece":21,"description":"Not Applicable","piece_count":51,"status":true,"sequence":2,"brand_id":44,"flavour_id":1,"inclusion_id":1,"pack_size_id":2,"pack_type_id":26,"sub_brand_id":1,"upc_id":16,"description_id":"Not Applicable","brand":"EXTRA","packtype":"SINGLE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":"","donor_type":"user_created"}],"doner_mix":[{"id":4,"name":"10010716","weight_per_piece":0.010167598,"cost_per_piece":0.033145524,"status":true,"sequence":4,"brand_id":47,"pack_type_id":27,"sub_brand_id":1,"description_id":"TWIX CARAMEL MINIATURES BULK TRANSFER CA","flavour_id":2,"inclusion_id":1,"pack_size_id":2,"piece_count":43,"brand":"TWIX","packtype":"MINIATURE","subbrand":"Not Applicable","flavour":"PEANUT BUTTER","inclusion":"NUT","packsize":"BULK","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":10,"name":"10007844","weight_per_piece":0.005793145,"cost_per_piece":0.02024427,"status":true,"sequence":10,"brand_id":50,"pack_type_id":27,"sub_brand_id":1,"description_id":"3 MUSKETEERSMINIATURES 14LB BULK CASE","flavour_id":1,"inclusion_id":3,"pack_size_id":2,"brand":"3 MUSKETEERS","packtype":"MINIATURE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"FRUIT","packsize":"BULK","doner_list":"","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0,"piece_count":11},{"id":23,"name":"10007242","weight_per_piece":0.008496732,"cost_per_piece":0.02851644,"status":true,"sequence":23,"brand_id":52,"pack_type_id":27,"sub_brand_id":1,"description_id":"MILKYWAY MINIATURES 20LB BULK CASE","flavour_id":7,"inclusion_id":3,"pack_size_id":2,"piece_count":2,"brand":"MILKY WAY US","packtype":"MINIATURE","subbrand":"Not Applicable","flavour":"SOUR","inclusion":"FRUIT","packsize":"BULK","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":27,"name":"10120475","weight_per_piece":0.024456595,"cost_per_piece":0.099100669,"status":true,"sequence":27,"brand_id":45,"pack_type_id":27,"sub_brand_id":1,"description_id":"SN MNTR BULK","flavour_id":4,"inclusion_id":4,"pack_size_id":2,"piece_count":3,"brand":"SNICKERS","packtype":"MINIATURE","subbrand":"Not Applicable","flavour":"MILK CHOCOLATE","inclusion":"NUT & FRUIT","packsize":"BULK","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":53,"name":"10126100","weight_per_piece":0.013265306,"cost_per_piece":0.054240925,"status":true,"sequence":53,"brand_id":49,"pack_type_id":29,"sub_brand_id":1,"description_id":"M&MS MC FS PCH DW","flavour_id":1,"inclusion_id":1,"pack_size_id":2,"piece_count":4,"brand":"M&M'S","packtype":"FUNSIZE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":122,"name":"1000111","weight_per_piece":1,"cost_per_piece":1,"status":true,"sequence":121,"brand_id":46,"pack_type_id":28,"sub_brand_id":1,"description_id":null,"flavour_id":1,"inclusion_id":1,"pack_size_id":2,"piece_count":5,"brand":"HUBBA BUBBA","packtype":"ICP","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":124,"name":"11112222","weight_per_piece":125,"cost_per_piece":21,"status":true,"sequence":122,"brand_id":44,"pack_type_id":26,"sub_brand_id":1,"description_id":null,"flavour_id":1,"inclusion_id":1,"pack_size_id":2,"piece_count":55,"brand":"EXTRA","packtype":"SINGLE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":125,"name":"111122222","weight_per_piece":125,"cost_per_piece":21,"status":true,"sequence":123,"brand_id":44,"pack_type_id":26,"sub_brand_id":1,"description_id":"shdb judsvbujvb kxfjvk","flavour_id":1,"inclusion_id":1,"pack_size_id":2,"piece_count":6,"brand":"EXTRA","packtype":"SINGLE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":126,"name":"1111222222","weight_per_piece":125,"cost_per_piece":21,"status":true,"sequence":124,"brand_id":44,"pack_type_id":26,"sub_brand_id":1,"description_id":"None","flavour_id":1,"inclusion_id":1,"pack_size_id":2,"piece_count":51,"brand":"EXTRA","packtype":"SINGLE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":127,"name":"1111222223","weight_per_piece":1,"cost_per_piece":1,"status":true,"sequence":125,"brand_id":46,"pack_type_id":28,"sub_brand_id":1,"description_id":"test","flavour_id":1,"inclusion_id":1,"pack_size_id":3,"piece_count":1,"brand":"HUBBA BUBBA","packtype":"ICP","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"STANDARD","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":128,"name":"1111222224","weight_per_piece":1,"cost_per_piece":1,"status":true,"sequence":126,"brand_id":47,"pack_type_id":28,"sub_brand_id":1,"description_id":"test twist","flavour_id":1,"inclusion_id":1,"pack_size_id":3,"piece_count":1,"brand":"TWIX","packtype":"ICP","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"STANDARD","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":130,"name":"1111222225","weight_per_piece":1,"cost_per_piece":1,"status":true,"sequence":128,"brand_id":48,"pack_type_id":28,"sub_brand_id":1,"description_id":"new star","flavour_id":1,"inclusion_id":1,"pack_size_id":3,"piece_count":1,"brand":"STARBURST","packtype":"ICP","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"STANDARD","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":131,"name":"1111222226","weight_per_piece":1,"cost_per_piece":1,"status":true,"sequence":129,"brand_id":46,"pack_type_id":27,"sub_brand_id":1,"description_id":"test new doner","flavour_id":1,"inclusion_id":1,"pack_size_id":3,"piece_count":1,"brand":"HUBBA BUBBA","packtype":"MINIATURE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"STANDARD","doner_list":[],"donor_type":"default","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":1,"upc_name":"4000057386","name":"UCD_10000000","weight_per_piece":125,"cost_per_piece":21,"description":"Not Applicable","piece_count":112,"status":true,"sequence":1,"brand_id":44,"flavour_id":1,"inclusion_id":1,"pack_size_id":2,"pack_type_id":26,"sub_brand_id":1,"upc_id":16,"description_id":"Not Applicable","brand":"EXTRA","packtype":"SINGLE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":[],"donor_type":"user_created","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0},{"id":2,"upc_name":"4000057386","name":"UCD_10000001","weight_per_piece":125,"cost_per_piece":21,"description":"Not Applicable","piece_count":3,"status":true,"sequence":2,"brand_id":44,"flavour_id":1,"inclusion_id":1,"pack_size_id":2,"pack_type_id":26,"sub_brand_id":1,"upc_id":16,"description_id":"Not Applicable","brand":"EXTRA","packtype":"SINGLE","subbrand":"Not Applicable","flavour":"CARAMEL","inclusion":"NUT","packsize":"BULK","doner_list":[],"donor_type":"user_created","sim_place_count":0,"sim_list_price_per_place":0,"sim_total_list_price_donor":0,"sim_weight_per_piece":0,"sim_total_weight_by_donor":0,"sim_cost_per_piece":0,"sim_total_cost_by_donor":0}],"rsu":[{"id":16,"zrep":"4000057386","units_sold":91003,"sales":3447142,"aup":4.634032249450684,"lsp":23.75,"tr":0.12156493216753006,"cost":15.290693283081055,"sequence":15,"brand_id":15,"category_id":1,"description_id":7,"packtype_id":3,"season_id":1,"year_id":2,"pack_size":"FC XXL","channel_id":1,"usage_occasion":"TRICK OR TREAT","description":"MARS VRTY PK CHOCOLATE FUN SIZE FC SEAS SUP XXL 104.27 OUNCE","channel":"FOOD","brand":"MARS VRTY PK","packtype":"STAND UP POUCH","season":"HALLOWEEN","year":"2021","category":"CHOCOLATE","base_price":"","product_form":"","packaging":"","piece_count":626}],"RSU_LIST_PRICE":8,"save_data":{"final_data":{"UPC":4000057386,"CHANNEL":"FOOD","FISCAL_YEAR":2021,"EQ_LBS_with_new_donors":308016.6189990502,"pred_UNITS":43708.923080547116,"TRADE_SPENDS":43395.07169140289,"GSV":349671.3846443769,"NSV":306276.31295297405,"COGS":208850817.35816717,"MARS_PROFIT":-208544541.0452142,"MAC%":-68090.32635743996},"base_data":{"UPC":4000057386,"CHANNEL":"FOOD","FISCAL_YEAR":2021,"EQ_LBS":743875.2351536637,"UNITS":91003,"TRADE_SPENDS":268225.2386402439,"GSV":2161321.25,"NSV":1893096.011359756,"COGS":1385403.7865690761,"MARS_PROFIT":507692.22479068,"MAC%":26.818091726157057}}},"status":true,"global_access":false,"created_by":2,"created_at":"2022-03-24T06:12:01.902210Z","updated_at":"2022-03-24T06:12:01.902246Z"}]
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
  function pack_type(table_view){
    console.log(table_view[0]['planner_data']['rsu'][0]['zrep'],"zrep")
      $('#zrep').html( table_view[0]['planner_data']['rsu'][0]['zrep']);
      $('#description').html( table_view[0]['planner_data']['rsu'][0]['description']);
      $('#channel').html( table_view[0]['planner_data']['rsu'][0]['channel']);
      $('#year').html( table_view[0]['planner_data']['rsu'][0]['year']);
      $('#category').html( table_view[0]['planner_data']['rsu'][0]['category']);
      $('#brand').html( table_view[0]['planner_data']['rsu'][0]['brand']);
      $('#packtype').html( table_view[0]['planner_data']['rsu'][0]['packtype']);
      $('#piece_count').html( table_view[0]['planner_data']['rsu'][0]['piece_count']);
      $('#pack_size').html( table_view[0]['planner_data']['rsu'][0]['pack_size']);
      $('#usage_occasion').html( table_view[0]['planner_data']['rsu'][0]['usage_occasion']);
      $('#units_sold').html( table_view[0]['planner_data']['rsu'][0]['units_sold'].toFixed(2));
      $('#sales').html( table_view[0]['planner_data']['rsu'][0]['sales'].toFixed(2));
      $('#aup').html( table_view[0]['planner_data']['rsu'][0]['aup'].toFixed(2));
      $('#tr').html( table_view[0]['planner_data']['rsu'][0]['tr'].toFixed(2));
      $('#cost').html( table_view[0]['planner_data']['rsu'][0]['cost'].toFixed(2));

  }
  function compare_scenario() {
    var res = {};
    res['data'] = init();
    var comparedata = res.data;
    
    $('#scenario_name').html(comparedata[0].name);
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
              if (["TRADE_SPENDS", "GSV", "NSV", "MARS_PROFIT", "COGS", "MAC%","EQ_LBS", "EQ_LBS_with_new_donors"].includes(key)) {
                table_view[index]['planner_data']['save_data'][item][key] = StrictBillions(table_view[index]['planner_data']['save_data'][item][key]);
              }
            }
          } else if (["EQ_LBS", "EQ_LBS_with_new_donors"].includes(key)) {
            table_view[index]['planner_data']['save_data'][item][key] =StrictBillions(table_view[index]['planner_data']['save_data'][item][key]);
          }
        }
      });
    });
    var final_results = [];
    var barChartLabels = ['Base'];
    SimulatedResult.forEach(function (row_items, index) {
      barChartLabels.push('Simulated' );
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
      var temp_te = StrictBillionsText(parseFloat(element['TRADE_SPENDS']).toFixed(2));
      var temp_gsv = StrictBillionsText(parseFloat(element['GSV']));
      var temp_nsv = StrictBillionsText(parseFloat(element['NSV']));
      var temp_mac = StrictBillionsText(parseFloat(element['MARS_PROFIT']));
      var temp_cogs = StrictBillionsText(parseFloat(element['COGS']));
      var temp_vol = StrictBillionsText(parseFloat(element['EQ_LBS_with_new_donors']));
      var temp_cogs_p = parseFloat(element['COGS']) / parseFloat(element['NSV']) * 100;
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
    gen_compare_scenario(table_view);
    pack_type(table_view);
  }

  compare_scenario();

  
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

  function gen_changesummary(table_view) {
    var tr = "";
    table_view[0]["planner_data"]["donor"].forEach(function (item, index) {
      if (index == 0) {
        tr += '<tr><td rowspan=' + table_view[0]['planner_data']['donor'].length + '>Old Mix </td><td class="br-1">' + item.name + '</td><td >' + item.description_id + '</td><td >' + item.brand + '</td><td >' + item.subbrand + '</td><td >' + item.flavour + '</td><td >' + item.inclusion + '</td><td >' + item.packtype + '</td><td >' + item.packsize + '</td><td >' + item.piece_count + '</td><td >' + item.weight_per_piece.toFixed(2) + '</td><td >' + item.cost_per_piece.toFixed(2) + '</td></tr>';
      } else {
        tr += '<tr><td class="br-1">' + item.name + '</td><td >' + item.description_id + '</td><td >' + item.brand + '</td><td >' + item.subbrand + '</td><td >' + item.flavour + '</td><td >' + item.inclusion + '</td><td >' + item.packtype + '</td><td >' + item.packsize + '</td><td >' + item.piece_count + '</td><td >' + item.weight_per_piece.toFixed(2) + '</td><td >' + item.cost_per_piece.toFixed(2) + '</td></tr>';
      }
    });
    tr += '<tr  style="border-bottom:1px solid #ccc"><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td></tr>';
    console.log(tr, "tr");
    table_view.forEach(function (donor, o_index) {
      donor["planner_data"]["doner_mix"].forEach(function (item, index) {
        if (index == 0) {
          tr += '<tr><td rowspan=' + donor['planner_data']['doner_mix'].length + '>New Mix </td><td class="br-1">' + item.name + '</td><td >' + item.description_id + '</td><td >' + item.brand + '</td><td >' + item.subbrand + '</td><td >' + item.flavour + '</td><td >' + item.inclusion + '</td><td >' + item.packtype + '</td><td >' + item.packsize + '</td><td >' + item.piece_count + '</td><td >' + item.weight_per_piece.toFixed(2) + '</td><td >' + item.cost_per_piece.toFixed(2) + '</td></tr>';
        } else {
          tr += '<tr><td class="br-1">' + item.name + '</td><td >' + item.description_id + '</td><td >' + item.brand + '</td><td >' + item.subbrand + '</td><td >' + item.flavour + '</td><td >' + item.inclusion + '</td><td >' + item.packtype + '</td><td >' + item.packsize + '</td><td >' + item.piece_count + '</td><td >' + item.weight_per_piece.toFixed(2) + '</td><td >' + item.cost_per_piece.toFixed(2) + '</td></tr>';
        }
      });
      tr += '<tr style="border-bottom:1px solid #ccc"><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td></tr>';
    });
    $('#cmp_t_body').append(tr);
  }

  function gen_compare_scenario(table_view) {
    var th = "";
    table_view.forEach(function (item, o_index) {
      th += '<th>Simulated</th>';
    });
    var tr = "";
    tr += '<tr class="create-table"><td class="create-table_head">GSV</td><td>($)' + table_view[0]["planner_data"]["save_data"]["base_data"]["GSV"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>($)' + item['planner_data']['save_data']['final_data']['GSV'] + '</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">TE</td><td>($)' + table_view[0]["planner_data"]["save_data"]["base_data"]["TRADE_SPENDS"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>($)' + item['planner_data']['save_data']['final_data']['TRADE_SPENDS'] + '</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">NSV</td><td>($)' + table_view[0]["planner_data"]["save_data"]["base_data"]["NSV"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>($)' + item['planner_data']['save_data']['final_data']['NSV'] + '</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">COGS</td><td>($)' + table_view[0]["planner_data"]["save_data"]["base_data"]["COGS"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>($)' + item['planner_data']['save_data']['final_data']['COGS'] + '</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">MAC</td><td>($)' + table_view[0]["planner_data"]["save_data"]["base_data"]["MARS_PROFIT"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>($)' + item['planner_data']['save_data']['final_data']['MARS_PROFIT'] + '</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">MAC %</td><td>' + table_view[0]["planner_data"]["save_data"]["base_data"]["MAC%"] + '%</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>' + parseFloat(item['planner_data']['save_data']['final_data']['MAC%']).toFixed(2) + ' %</td>';
    });
    tr += '</tr>';
    tr += '<tr class="create-table"><td class="create-table_head">Total Volume</td><td>' + table_view[0]["planner_data"]["save_data"]["base_data"]["EQ_LBS"] + '</td>';
    table_view.forEach(function (item, o_index) {
      tr += '<td>' + item['planner_data']['save_data']['final_data']['EQ_LBS_with_new_donors'] + '</td>';
    });
    tr += '</tr>';
    $('#cmp_scenario').append(tr);
    $('#heade_text').append(th);
  }
});