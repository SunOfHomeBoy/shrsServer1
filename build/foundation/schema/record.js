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
exports.__esModule = true;
var schema_1 = require("./schema");
var schemaRecord = (function (_super) {
    __extends(schemaRecord, _super);
    function schemaRecord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    schemaRecord.prototype.init = function () {
        return {
            name: 'record',
            schema: schema_1.newSchema({
                _id: String,
                recordType: String,
                recordDest: String,
                recordTime: String,
                recordData: schema_1.Mixed
            })
        };
    };
    return schemaRecord;
}(schema_1.schema));
exports["default"] = new schemaRecord();
