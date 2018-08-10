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
var schemaTeam = (function (_super) {
    __extends(schemaTeam, _super);
    function schemaTeam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    schemaTeam.prototype.init = function () {
        return {
            name: 'team',
            schema: schema_1.newSchema({
                _id: String,
                openID: String,
                submitTime: Date,
                teamCompany: String,
                teamNumber: String,
                teamPlace: String,
                teamDate: String,
                teamBudget: String,
                teamConnect: String,
                teamEmail: String,
                teamComment: String,
                teamCost: Number,
                teamStatus: Boolean
            })
        };
    };
    return schemaTeam;
}(schema_1.schema));
exports["default"] = new schemaTeam();
