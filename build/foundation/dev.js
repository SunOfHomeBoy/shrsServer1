"use strict";
exports.__esModule = true;
var path = require("path");
var utils_1 = require("./utils");
var devTest = (function () {
    function devTest() {
    }
    devTest.render = function (configures) {
        if (configures === void 0) { configures = {}; }
        var apipaths = ['ajax', 'service', 'initialise'];
        var pathinfo = (configures.pathinfo || '')
            .replace('/cgi-bin/development', '')
            .replace('/development', '');
        var bufpaths = pathinfo.split('/');
        if (bufpaths.length === 4) {
            apipaths[0] = bufpaths[1];
            apipaths[1] = bufpaths[2];
            apipaths[2] = bufpaths[3];
        }
        return [
            '<!doctype html>',
            '<html lang="zh-cmn-Hans">',
            '<head>',
            '<meta charset="utf-8" />',
            '<title>服务器端RESTFul接口测试</title>',
            devTest.stylesheets(),
            '</head>',
            '<body>',
            '<h1>服务器端RESTFul接口测试</h1>',
            '<table style="width:100%">',
            '<tr>',
            '<th>接口地址</th>',
            "<td>/cgi-bin/" + apipaths[0] + "/" + apipaths[1] + "/" + apipaths[2] + "</td>",
            '</tr>',
            '<tr>',
            '<th>测试地址</th>',
            "<td>/development/" + apipaths[0] + "/" + apipaths[1] + "/" + apipaths[2] + "</td>",
            '</tr>',
            '<tr>',
            '<th>测试数据</th>',
            "<td>APIPath/" + apipaths[0] + "/" + apipaths[1] + "/" + apipaths[2] + "Test.tsx</td>",
            '</tr>',
            '<tr>',
            '<th>测试结果</th>',
            '<td><pre id="TestResult">等待测试中...</pre></td>',
            '</tr>',
            '</table>',
            '<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>',
            bufpaths.length === 4 ? devTest.run(apipaths) : '',
            '</body>',
            '</html>'
        ].join('');
    };
    devTest.run = function (apipaths) {
        var apiRoot = path.dirname(__dirname);
        var apiPath = '/' + apipaths.join('/');
        var apiTest = path.join.apply(path, [apiRoot].concat(apipaths)) + 'Test.js';
        var apiData = utils_1["default"].jsonLoad(apiTest, []);
        return [
            '<script type="text/javascript">apiData=' + JSON.stringify(apiData) + ';</script>',
            '<Script type="text/javascript">',
            'let results = [];',
            'for (let data of apiData) {',
            'jQuery.ajax({',
            "url: '" + apiPath + "',",
            'async: false,',
            'type: "POST",',
            'data: {parameters: JSON.stringify(data)},',
            'dataType: "json",',
            'success: (response) => {',
            'results.push(response);',
            '}',
            '});',
            '}',
            "jQuery('#TestResult').html(JSON.stringify(results, null, '\t'));",
            '</script>'
        ].join('');
    };
    devTest.stylesheets = function () {
        return [
            '<style type="text/css">',
            'html {',
            'font-family: "Courier New", "Consolas", "楷体";',
            'font-size: 50px;',
            '}',
            'body {',
            'padding-bottom: 1.375rem;',
            'background-color: #FEFBF5;',
            '}',
            'h1 {',
            'color: #2B2B2B;',
            'font-weight: normal;',
            'line-height: 3em;',
            'text-align: center;',
            'font-size: 0.48rem;',
            'border-bottom: 0.02rem #F2F2F2 solid;',
            'letter-spacing: 0.1em;',
            '}',
            'table {',
            'border-right: 0.02rem #F2F2F2 solid;',
            'border-bottom: 0.02rem #F2F2F2 solid;',
            'margin: -0.04rem auto 0 auto;',
            '}',
            'th, td {',
            'color: #2B2B2B;',
            'font-weight: normal;',
            'line-height: 3em;',
            'border-top: 0.02rem #F2F2F2 solid;',
            'border-left: 0.02rem #F2F2F2 solid;',
            'white-space: nowrap;',
            'font-size: 0.32rem;',
            'text-align: left;',
            'padding-left: 1.5em;',
            'padding-right: 1.5em;',
            '}',
            'td {',
            'font-family: "Courier New","Consolas";',
            '}',
            'pre {',
            'color: #0078D7;',
            'font-size: 0.36rem;',
            '}',
            '</style>'
        ].join('');
    };
    return devTest;
}());
exports["default"] = devTest;
