"use strict";
exports.__esModule = true;
var province_1 = require("./province");
var city_1 = require("./city");
var town_1 = require("./town");
var foreigns_1 = require("./foreigns");
var ab = function (name) {
    if (name.length <= 2)
        return name;
    return name
        .replace('省', '')
        .replace('市', '')
        .replace('地区', '')
        .replace('矿区', '')
        .replace('林区', '')
        .replace('自治区', '')
        .replace('特别行政区', '')
        .replace('新区', '')
        .replace('区', '')
        .replace('自治县', '')
        .replace('县', '')
        .replace('自治州', '')
        .replace('自治旗', '')
        .replace('旗', '')
        .replace('哈尼族', '')
        .replace('哈萨克', '')
        .replace('保安族', '')
        .replace('布依族', '')
        .replace('布朗族', '')
        .replace('普米族', '')
        .replace('白族', '')
        .replace('藏族', '')
        .replace('朝鲜族', '')
        .replace('东乡族', '')
        .replace('达斡尔族', '')
        .replace('独龙族', '')
        .replace('各族', '')
        .replace('羌族', '')
        .replace('回族', '')
        .replace('景颇族', '')
        .replace('拉祜族', '')
        .replace('黎族', '')
        .replace('苗族', '')
        .replace('蒙古族', '')
        .replace('蒙古', '')
        .replace('仡佬族', '')
        .replace('畲族', '')
        .replace('傈僳族', '')
        .replace('满族', '')
        .replace('纳西族', '')
        .replace('怒族', '')
        .replace('撒拉族', '')
        .replace('傣族', '')
        .replace('土族', '')
        .replace('土家族', '')
        .replace('侗族', '')
        .replace('塔吉克', '')
        .replace('维吾尔', '')
        .replace('佤族', '')
        .replace('裕固族', '')
        .replace('瑶族', '')
        .replace('彝族', '')
        .replace('壮族', '')
        .replace('仫佬族', '')
        .replace('毛南族', '')
        .replace('锡伯', '');
};
var buildCity = function (configures) {
    if (configures === void 0) { configures = {}; }
    var dataCity = [configures.name];
    var townBuffers = Object(town_1.town)[configures.id] || [];
    for (var _i = 0, townBuffers_1 = townBuffers; _i < townBuffers_1.length; _i++) {
        var buf = townBuffers_1[_i];
        if (buf.name === '市辖区' || buf.name === '城区') {
            continue;
        }
        dataCity.push(buf.name);
    }
    return dataCity;
};
var buildProvince = function (name, configures) {
    if (configures === void 0) { configures = {}; }
    var dataProvince = { data: [], children: [] };
    var cityBuffers = Object(city_1.city)[configures.id] || [];
    if (cityBuffers[0].name === '市辖区') {
        cityBuffers[0].name = cityBuffers[0].province;
        var idCity = name + '-' + cityBuffers[0].province;
        return {
            data: [cityBuffers[0].province],
            children: [{
                    _id: 'regions#' + idCity,
                    data: buildCity(cityBuffers[0])
                }]
        };
    }
    for (var _i = 0, cityBuffers_1 = cityBuffers; _i < cityBuffers_1.length; _i++) {
        var buffer = cityBuffers_1[_i];
        if (buffer.name === '省直辖县级行政区划' || buffer.name === '自治区直辖县级行政区划') {
            var townBuffers = Object(town_1.town)[buffer.id];
            for (var _a = 0, townBuffers_2 = townBuffers; _a < townBuffers_2.length; _a++) {
                var item = townBuffers_2[_a];
                var alias_1 = item.name;
                dataProvince.data.push(alias_1);
                dataProvince.children.push({
                    _id: 'regions#' + name + '-' + alias_1,
                    data: [alias_1]
                });
            }
            continue;
        }
        var alias = buffer.name;
        dataProvince.data.push(alias);
        dataProvince.children.push({
            _id: 'regions#' + name + '-' + alias,
            data: buildCity(buffer)
        });
    }
    return dataProvince;
};
var regionsData = [
    { _id: 'regions', data: ['中国'] },
    { _id: 'regions#中国', data: [] }
];
for (var _i = 0, province_2 = province_1.province; _i < province_2.length; _i++) {
    var buffer = province_2[_i];
    var name = buffer.name;
    regionsData[1].data.push(name);
    var idProvince = '中国-' + name;
    var dataProvince = buildProvince(idProvince, buffer);
    if (dataProvince) {
        regionsData.push({
            _id: 'regions#' + idProvince,
            data: dataProvince.data
        });
        if (dataProvince.children instanceof Array) {
            for (var _a = 0, _b = dataProvince.children; _a < _b.length; _a++) {
                var children = _b[_a];
                regionsData.push(children);
            }
        }
    }
}
for (var _c = 0, foreigns_2 = foreigns_1["default"]; _c < foreigns_2.length; _c++) {
    var item = foreigns_2[_c];
    regionsData.push(item);
}
exports["default"] = regionsData;
