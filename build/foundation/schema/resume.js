"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var schema_1 = require("./schema");
var keywords_1 = require("./keywords");
var member_1 = require("./member");
var order_1 = require("./order");
var utils_1 = require("../utils");
var vedio_1 = require("../vedio");
var maxSafeTimespan = 604800000;
var schemaResume = (function (_super) {
    __extends(schemaResume, _super);
    function schemaResume() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onlineTimeinterval = 300000;
        return _this;
    }
    schemaResume.prototype.init = function () {
        return {
            name: 'resume',
            schema: schema_1.newSchema({
                _id: String,
                openID: String,
                resumeType: String,
                resumeComplete: Number,
                resumeHidden: Boolean,
                resumeViews: Number,
                resumeVMonth: Number,
                resumeAt: Number,
                resumeComment: Number,
                resumeFollows: Number,
                resumeScore: Number,
                resumeGrade: Number,
                resumeName: String,
                resumeTop: Number,
                resumeTBTime: Date,
                resumeTETime: Date,
                resumeWeight: Number,
                resumeWBTime: Date,
                resumeWETime: Date,
                resumeUpdate: Date,
                realname: String,
                sex: Number,
                img: String,
                birthdayYear: Number,
                birthdayMonth: Number,
                birthdayDay: Number,
                localeCountry: String,
                localeProvince: String,
                localeCity: String,
                localeTown: String,
                mobile: String,
                mobileArea: String,
                email: String,
                address: String,
                idcardNumber: String,
                statusIDCard: Boolean,
                signature: String,
                picture: Array,
                honor: Array,
                skill: {
                    type: Array,
                    index: true
                },
                educationGrade: Number,
                educationMajor: String,
                workYear: Number,
                expectCountry: String,
                expectProvince: String,
                expectCity: String,
                expectTown: String,
                expectDirection: String,
                expectWork: String,
                expectMoney: Number,
                expectStatus: Number,
                works: [
                    {
                        workName: String,
                        workCompany: String,
                        workBYear: Number,
                        workBMonth: Number,
                        workFYear: Number,
                        workFMonth: Number,
                        workMoney: Number,
                        workDescription: String
                    }
                ],
                educations: [
                    {
                        educationSchool: String,
                        educationMajor: String,
                        educationGrade: Number,
                        educationBYear: Number,
                        educationBMonth: Number,
                        educationFYear: Number,
                        educationFMonth: Number,
                        educationDescription: String
                    }
                ],
                trains: [
                    {
                        trainName: String,
                        trainJob: String,
                        trainBYear: Number,
                        trainBMonth: Number,
                        trainFYear: Number,
                        trainFMonth: Number,
                        trainDescription: String
                    }
                ],
                timeMonday: Array,
                timeTuesday: Array,
                timeWednesday: Array,
                timeThursday: Array,
                timeFriday: Array,
                timeSaturday: Array,
                timeSunday: Array,
                serviceType: Number,
                servicePrice: Number,
                serviceUnit: String,
                serviceDescription: String,
                goodAt: String,
                location: {
                    type: Array,
                    index: '2dsphere'
                },
                locationHome: {
                    type: Array,
                    index: '2dsphere'
                },
                onlineTime: Number
            })
        };
    };
    schemaResume.prototype.saveResume = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var id, document, member, bufDate, maxYear, minYear, _i, _a, buf, item, begins, finish, bufDate, bufDate, maxGrade, maxMajor, _b, _c, buf, item, begins, finish, bufDate, bufDate, _d, _e, buf, item, begins, finish, bufDate, bufDate, _f, _g, key, resumeComplete, resumeFields, _h, _j, key;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (String(parameters.openID).length !== 37 || ['FULLTIME', 'PARTTIME'].indexOf(parameters.resumeType) === -1) {
                            return [2, new Promise(function (resolve) { return resolve(false); })];
                        }
                        id = parameters.openID + '#' + parameters.resumeType;
                        return [4, this.findById(id)];
                    case 1:
                        document = _k.sent();
                        return [4, member_1["default"].findById(parameters.openID)];
                    case 2:
                        member = _k.sent();
                        document._id = document._id || id;
                        document.openID = document.openID || parameters.openID;
                        document.resumeType = document.resumeType || parameters.resumeType;
                        document.resumeComplete = parameters.resumeComplete || document.resumeComplete || 0;
                        document.resumeViews = parameters.resumeViews || document.resumeViews || 0;
                        document.resumeVMonth = parameters.resumeVMonth || document.resumeVMonth || 0;
                        document.resumeAt = parameters.resumeAt || document.resumeAt || 0;
                        document.resumeComment = parameters.resumeComment || document.resumeComment || 0;
                        document.resumeFollows = parameters.resumeFollows || document.resumeFollows || 0;
                        document.resumeScore = parameters.resumeScore || document.resumeScore || 0;
                        document.resumeGrade = parameters.resumeGrade || document.resumeGrade || 0;
                        document.resumeName = parameters.resumeName || document.resumeName || '';
                        document.resumeTop = parameters.resumeTop || document.resumeTop || 0;
                        document.resumeTBTime = parameters.resumeTBTime || document.resumeTBTime || new Date(0);
                        document.resumeTETime = parameters.resumeTETime || document.resumeTETime || new Date(0);
                        document.resumeWeight = parameters.resumeWeight || document.resumeWeight || 0;
                        document.resumeWBTime = parameters.resumeWBTime || document.resumeWBTime || new Date(0);
                        document.resumeWETime = parameters.resumeWETime || document.resumeWETime || new Date(0);
                        document.resumeUpdate = new Date();
                        document.realname = parameters.realname || document.realname || '';
                        document.sex = document.sex || 0;
                        if (parameters.sex === 1 || parameters.sex === 2) {
                            document.sex = parameters.sex;
                        }
                        if (parameters.sex === '1' || parameters.sex === '2') {
                            document.sex = parseInt(parameters.sex);
                        }
                        document.img = parameters.img || document.img || '';
                        document.birthdayYear = parameters.birthdayYear || document.birthdayYear || 0;
                        document.birthdayMonth = parameters.birthdayMonth || document.birthdayMonth || 0;
                        document.birthdayDay = parameters.birthdayDay || document.birthdayDay || 0;
                        if (/^\d{4}-\d{2}$/i.test(parameters.birthday) || /^\d{4}-\d{2}-\d{2}$/i.test(parameters.birthday)) {
                            bufDate = new Date(parameters.birthday);
                            document.birthdayYear = bufDate.getFullYear();
                            document.birthdayMonth = bufDate.getMonth() + 1;
                            document.birthdayDay = bufDate.getDate();
                        }
                        document.localeCountry = parameters.localeCountry || document.localeCountry || '';
                        document.localeProvince = parameters.localeProvince || document.localeProvince || '';
                        document.localeCity = parameters.localeCity || document.localeCity || '';
                        document.localeTown = parameters.localeTown || document.localeTown || '';
                        document.address = parameters.address || document.address || '';
                        document.mobile = parameters.mobile || document.mobile || '';
                        document.mobileArea = parameters.mobileArea || document.mobileArea || '86';
                        document.mobileArea = String(document.mobileArea).replace('+', '');
                        document.email = parameters.email || document.email || '';
                        document.idcardNumber = parameters.idcardNumber || document.idcardNumber || '';
                        document.statusIDCard = parameters.statusIDCard || document.statusIDCard || false;
                        document.picture = parameters.picture || document.picture || [];
                        if (typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                            document.location = [parameters.locationX, parameters.locationY];
                        }
                        if (typeof (parameters.locationHomeX) === 'number' && typeof (parameters.locationHomeY) === 'number') {
                            document.locationHome = [parameters.locationHomeX, parameters.locationHomeY];
                        }
                        if (document.resumeType === 'FULLTIME') {
                            document.expectCountry = parameters.expectCountry || document.expectCountry || '';
                            document.expectProvince = parameters.expectProvince || document.expectProvince || '';
                            document.expectCity = parameters.expectCity || document.expectCity || '';
                            document.expectTown = parameters.expectTown || document.expectTown || '';
                            document.expectDirection = parameters.expectDirection || document.expectDirection || '';
                            document.expectWork = parameters.expectWork || document.expectWork || '';
                            document.expectMoney = parameters.expectMoney || document.expectMoney || 0;
                            document.expectStatus = parameters.expectStatus || document.expectStatus || 0;
                            document.skill = document.skill || [];
                            if (parameters.skill instanceof Array) {
                                document.skill = parameters.skill;
                            }
                            document.signature = parameters.signature || document.signature || '';
                            document.honor = document.honor || [];
                            if (parameters.honor instanceof Array) {
                                document.honor = parameters.honor;
                            }
                            document.works = document.works || [];
                            if (utils_1["default"].empty(parameters) === false && parameters.works instanceof Array) {
                                document.works = [];
                                maxYear = 0;
                                minYear = 3000;
                                for (_i = 0, _a = parameters.works; _i < _a.length; _i++) {
                                    buf = _a[_i];
                                    item = {
                                        workName: buf.workName || '',
                                        workCompany: buf.workCompany || '',
                                        workBYear: buf.workBYear || 0,
                                        workBMonth: buf.workBMonth || 0,
                                        workFYear: buf.workFYear || 0,
                                        workFMonth: buf.workFMonth || 0,
                                        workMoney: buf.workMoney || 0,
                                        workDescription: buf.workDescription
                                    };
                                    begins = buf.workBegins || '';
                                    finish = buf.workFinish || '';
                                    if (/^\d{4}-\d{2}$/.test(begins) || /^\d{4}-\d{2}-\d{2}$/.test(begins)) {
                                        bufDate = new Date(buf.workBegins);
                                        item.workBYear = bufDate.getFullYear();
                                        item.workBMonth = bufDate.getMonth() + 1;
                                    }
                                    if (/^\d{4}-\d{2}$/.test(finish) || /^\d{4}-\d{2}-\d{2}$/.test(finish)) {
                                        bufDate = new Date(buf.workFinish);
                                        item.workFYear = bufDate.getFullYear();
                                        item.workFMonth = bufDate.getMonth() + 1;
                                    }
                                    if (maxYear < item.workFYear) {
                                        maxYear = item.workFYear;
                                    }
                                    if (minYear > item.workBYear) {
                                        minYear = item.workBYear;
                                    }
                                    document.works.push(item);
                                }
                                document.workYear = maxYear - minYear + 1;
                                if (document.workYear < 0) {
                                    document.workYear = 0;
                                }
                            }
                            document.educations = document.educations || [];
                            if (parameters.educations && parameters.educations instanceof Array) {
                                document.educations = [];
                                maxGrade = 0;
                                maxMajor = '';
                                for (_b = 0, _c = parameters.educations; _b < _c.length; _b++) {
                                    buf = _c[_b];
                                    item = {
                                        educationSchool: buf.educationSchool || '',
                                        educationMajor: buf.educationMajor || '',
                                        educationGrade: buf.educationGrade || 0,
                                        educationBYear: buf.educationBYear || 0,
                                        educationBMonth: buf.educationBMonth || 0,
                                        educationFYear: buf.educationFYear || 0,
                                        educationFMonth: buf.educationFMonth || 0,
                                        educationDescription: buf.educationDescription || ''
                                    };
                                    begins = buf.educationBegins || '';
                                    finish = buf.educationFinish || '';
                                    if (/^\d{4}-\d{2}$/.test(begins) || /^\d{4}-\d{2}-\d{2}$/.test(begins)) {
                                        bufDate = new Date(buf.educationBegins);
                                        item.educationBYear = bufDate.getFullYear();
                                        item.educationBMonth = bufDate.getMonth() + 1;
                                    }
                                    if (/^\d{4}-\d{2}/.test(finish) || /^\d{4}-\d{2}-\d{2}$/.test(finish)) {
                                        bufDate = new Date(buf.educationFinish);
                                        item.educationFYear = bufDate.getFullYear();
                                        item.educationFMonth = bufDate.getMonth() + 1;
                                    }
                                    if (maxGrade < item.educationGrade) {
                                        maxGrade = item.educationGrade;
                                        maxMajor = item.educationMajor;
                                    }
                                    document.educations.push(item);
                                }
                                document.educationGrade = maxGrade;
                                document.educationMajor = maxMajor;
                            }
                            document.trains = document.trains || [];
                            if (parameters.trains && parameters.trains instanceof Array) {
                                document.trains = [];
                                for (_d = 0, _e = parameters.trains; _d < _e.length; _d++) {
                                    buf = _e[_d];
                                    item = {
                                        trainName: buf.trainName || '',
                                        trainJob: buf.trainJob || '',
                                        trainBYear: buf.trainBYear || 0,
                                        trainBMonth: buf.trainBMonth || 0,
                                        trainFYear: buf.trainFYear || 0,
                                        trainFMonth: buf.trainFMonth || 0,
                                        trainDescription: buf.trainDescription || ''
                                    };
                                    begins = buf.trainBegins || '';
                                    finish = buf.trainFinish || '';
                                    if (/^\d{4}-\d{2}$/.test(begins) || /^\d{4}-\d{2}-\d{2}$/.test(begins)) {
                                        bufDate = new Date(buf.trainBegins);
                                        item.trainBYear = bufDate.getFullYear();
                                        item.trainBMonth = bufDate.getMonth() + 1;
                                    }
                                    if (/^\d{4}-\d{2}/.test(finish) || /^\d{4}-\d{2}-\d{2}$/.test(finish)) {
                                        bufDate = new Date(buf.trainFinish);
                                        item.trainFYear = bufDate.getFullYear();
                                        item.trainFMonth = bufDate.getMonth() + 1;
                                    }
                                    document.trains.push(item);
                                }
                            }
                        }
                        if (document.resumeType === 'PARTTIME') {
                            for (_f = 0, _g = ['timeMonday', 'timeTuesday', 'timeWednesday', 'timeThursday', 'timeFriday', 'timeSaturday', 'timeSunday']; _f < _g.length; _f++) {
                                key = _g[_f];
                                if (utils_1["default"].empty(document[key])) {
                                    document[key] = [];
                                }
                                if (parameters[key] instanceof Array) {
                                    document[key] = parameters[key];
                                }
                            }
                            document.skill = parameters.skill || document.skill || [];
                            document.serviceType = parameters.serviceType || document.serviceType || 0;
                            document.servicePrice = parameters.servicePrice || document.servicePrice || 0;
                            document.serviceUnit = parameters.serviceUnit || document.serviceUnit || '小时';
                            document.serviceDescription = parameters.serviceDescription || document.serviceDescription || '';
                            document.goodAt = parameters.goodAt || document.goodAt || '';
                        }
                        resumeComplete = 0;
                        resumeFields = {
                            FULLTIME: [
                                'realname', 'sex', 'img', 'birthdayYear', 'localeProvince', 'address', 'mobile', 'idcardNumber',
                                'expectProvince', 'expectDirection', 'expectWork', 'expectMoney', 'expectStatus',
                                'skill', 'signature', 'honor', 'works', 'educations', 'trains'
                            ],
                            PARTTIME: [
                                'realname', 'sex', 'img', 'birthdayYear', 'localeProvince', 'address', 'mobile', 'idcardNumber',
                                'timeMonday', 'timeTuesday', 'timeWednesday', 'timeThursday', 'timeFriday', 'timeSaturday', 'timeSunday',
                                'skill', 'serviceType', 'servicePrice', 'serviceUnit', 'serviceDescription', 'goodAt'
                            ]
                        };
                        for (_h = 0, _j = resumeFields[parameters.resumeType]; _h < _j.length; _h++) {
                            key = _j[_h];
                            if (utils_1["default"].empty(document[key]) === false) {
                                resumeComplete = resumeComplete + 1;
                            }
                        }
                        document.resumeComplete = Math.ceil((resumeComplete * 100) / resumeFields[parameters.resumeType].length);
                        if (typeof (parameters.resumeHidden) === 'undefined') {
                            document.resumeHidden = document.resumeComplete >= 60 ? false : true;
                        }
                        else if (typeof (parameters.resumeHidden) === 'boolean') {
                            document.resumeHidden = parameters.resumeHidden;
                        }
                        member_1["default"].updateByResume(parameters, member);
                        keywords_1["default"].signSkills(document.skill);
                        return [2, this.save(document)];
                }
            });
        });
    };
    schemaResume.prototype.saveLocation = function (openID, locationX, locationY) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.saveResume({ openID: openID, resumeType: 'FULLTIME', locationX: locationX, locationY: locationY, resumeHidden: 0 })];
                    case 1:
                        _a.sent();
                        return [4, this.saveResume({ openID: openID, resumeType: 'PARTTIME', locationX: locationX, locationY: locationY, resumeHidden: 0 })];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    schemaResume.prototype.findFulltime = function (openID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.findById(openID + "#FULLTIME")];
            });
        });
    };
    schemaResume.prototype.findParttime = function (openID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.findById(openID + "#PARTTIME")];
            });
        });
    };
    schemaResume.prototype.checkSafe = function (openID, resumeID, resumeType) {
        return __awaiter(this, void 0, void 0, function () {
            var order, timeCurr, timeLate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, order_1["default"].findOne({
                            where: {
                                openID: openID,
                                orderUser: resumeID,
                                orderType: 2,
                                orderStatus: 1,
                                orderComment: resumeType
                            }
                        })];
                    case 1:
                        order = _a.sent();
                        if (Object.keys(order).length === 0) {
                            return [2, new Promise(function (resolve) { return resolve(false); })];
                        }
                        timeCurr = new Date().getTime();
                        timeLate = new Date(order.orderSubmit).getTime();
                        if (timeCurr - timeLate < maxSafeTimespan) {
                            return [2, new Promise(function (resolve) { return resolve(order); })];
                        }
                        return [2, new Promise(function (resolve) { return resolve(false); })];
                }
            });
        });
    };
    schemaResume.prototype.formatResumes = function (documents, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = {}; }
        return utils_1["default"].forEach(documents, function (item) {
            var document = {
                openID: utils_1["default"].openIDEncode(item.openID),
                resumeType: item.resumeType,
                img: item.img || '',
                sex: item.sex || 0,
                username: item.username || '',
                realname: item.realname || '',
                mobileArea: item.mobileArea || '86',
                mobile: utils_1["default"].formatMobile(item.mobile || ''),
                localeCountry: item.localeCountry || '',
                localeProvince: item.localeProvince || '',
                localeCity: item.localeCity || '',
                localeTown: item.localeTown || '',
                expectCountry: item.expectCountry || '',
                expectProvince: item.expectProvince || '',
                expectCity: item.expectCity || '',
                expectTown: item.expectTown || '',
                expectWork: item.expectWork || '',
                expectMoney: item.expectMoney || 0,
                skill: item.skill || [],
                servicePrice: item.servicePrice || 0,
                serviceUnit: item.serviceUnit || '小时',
                signature: item.signature || '',
                workYear: item.workYear || 0,
                goodAt: item.goodAt || '',
                locationX: (item.location || [])[0] || 0,
                locationY: (item.location || [])[1] || 0,
                distance: 100000001,
                resumeAt: item.resumeAt || 0,
                onlineStatus: utils_1["default"].timeInterval(item.onlineTime || 0) < _this.onlineTimeinterval
            };
            if (typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                document.distance = utils_1["default"].gcDistance((item.location || [])[0] || 0, (item.location || [])[1] || 0, parameters.locationX, parameters.locationY);
            }
            if (parameters.fields instanceof Array) {
                for (var _i = 0, _a = parameters.fields; _i < _a.length; _i++) {
                    var field = _a[_i];
                    document[field] = item[field];
                }
            }
            return document;
        });
    };
    schemaResume.prototype.formatFulltime = function (document, step, orderInfo) {
        if (orderInfo === void 0) { orderInfo = null; }
        if (utils_1["default"].empty(document) === false) {
            document.openID = utils_1["default"].openIDEncode(document.openID);
            document.unsafe = false;
            if (orderInfo) {
                document.infoType = orderInfo.orderMoney === order_1["default"].itvPrice
                    ? 'VEDIO'
                    : 'MOBILE';
            }
            var c1st = [
                'openID', 'infoType', 'realname', 'sex', 'img', 'picture', 'unsafe', 'resumeAt',
                'birthday', 'birthdayYear', 'birthdayMonth', 'birthdayDay',
                'localeCountry', 'localeProvince', 'localeCity', 'localeTown', 'locationHome',
                'address', 'mobile', 'mobileArea', 'email', 'idcardNumber', 'statusIDCard', 'onlineStatus'
            ];
            var c2nd = [
                'openID', 'works', 'educations', 'trains', 'skill', 'honor', 'signature', 'expectWork', 'workYear',
                'expectStatus', 'expectMoney', 'expectDirection', 'expectCountry', 'expectProvince', 'expectCity', 'expectTown'
            ];
            switch (step) {
                case 'ALL':
                    return utils_1["default"].atKeys(document, c1st.concat(c2nd));
                case 'SAFE':
                    return utils_1["default"].atKeys(document, c1st.concat(c2nd));
                case 'FIRST':
                    return utils_1["default"].atKeys(document, c1st);
                case 'SECOND':
                    return utils_1["default"].atKeys(document, c2nd);
                case 'UNSAFE':
                    document.unsafe = true;
                    document.mobile = utils_1["default"].formatMobile(document.mobile);
                    document.email = '';
                    return utils_1["default"].atKeys(document, c1st.concat(c2nd));
            }
        }
        return {};
    };
    schemaResume.prototype.formatParttime = function (document, step, orderInfo) {
        if (orderInfo === void 0) { orderInfo = null; }
        if (utils_1["default"].empty(document) === false) {
            document.openID = utils_1["default"].openIDEncode(document.openID);
            document.unsafe = false;
            if (orderInfo) {
                document.infoType = orderInfo.orderMoney === order_1["default"].itvPrice
                    ? 'VEDIO'
                    : 'MOBILE';
            }
            var c1st = [
                'openID', 'infoType', 'realname', 'sex', 'img', 'picture', 'unsafe', 'resumeAt',
                'birthday', 'birthdayYear', 'birthdayMonth', 'birthdayDay',
                'localeCountry', 'localeProvince', 'localeCity', 'localeTown', 'locationHome',
                'address', 'mobile', 'mobileArea', 'email', 'idcardNumber', 'statusIDCard', 'onlineStatus'
            ];
            var c2nd = [
                'openID', 'skill', 'serviceType', 'servicePrice', 'serviceUnit', 'goodAt', 'serviceDescription', 'unsafe',
                'timeMonday', 'timeTuesday', 'timeWednesday', 'timeThursday', 'timeFriday', 'timeSaturday', 'timeSunday'
            ];
            switch (step) {
                case 'ALL':
                    return utils_1["default"].atKeys(document, c1st.concat(c2nd));
                case 'SAFE':
                    return utils_1["default"].atKeys(document, c1st.concat(c2nd));
                case 'FIRST':
                    return utils_1["default"].atKeys(document, c1st);
                case 'SECOND':
                    return utils_1["default"].atKeys(document, c2nd);
                case 'UNSAFE':
                    document.unsafe = true;
                    document.mobile = utils_1["default"].formatMobile(document.mobile);
                    document.email = '';
                    return utils_1["default"].atKeys(document, c1st.concat(c2nd));
            }
        }
        return {};
    };
    schemaResume.prototype.updateOnline = function (openID) {
        return this.update({ openID: openID }, { onlineTime: utils_1["default"].time() });
    };
    schemaResume.prototype.onlineStatusRealtime = function (openID) {
        return __awaiter(this, void 0, void 0, function () {
            var online;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, vedio_1["default"].onlineMember(openID)];
                    case 1:
                        online = _a.sent();
                        if (!utils_1["default"].empty(online)) return [3, 3];
                        return [4, this.update({ openID: openID }, { onlineTime: 0 })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2, new Promise(function (resolve) { return resolve(online); })];
                }
            });
        });
    };
    return schemaResume;
}(schema_1.schema));
exports["default"] = new schemaResume();
