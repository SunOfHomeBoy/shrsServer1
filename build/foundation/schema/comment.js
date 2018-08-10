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
var schemaComment = (function (_super) {
    __extends(schemaComment, _super);
    function schemaComment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    schemaComment.prototype.init = function () {
        return {
            name: 'comment',
            schema: schema_1.newSchema({
                _id: String,
                openID: String,
                commentType: String,
                commentDest: String,
                commentPID: String,
                commentMessage: String,
                commentAt: Number,
                commentUpdate: Date,
                commentStatus: Boolean
            })
        };
    };
    return schemaComment;
}(schema_1.schema));
exports["default"] = new schemaComment();
