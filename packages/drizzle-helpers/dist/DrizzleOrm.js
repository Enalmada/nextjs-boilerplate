"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRepo = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var drizzle_orm_1 = require("drizzle-orm");
var buildWhereClause = function (criteria, table) {
    var conditions = Object.keys(criteria)
        .filter(function (key) { return criteria[key] !== undefined; })
        .map(function (key) {
        var criteriaType = key;
        return (0, drizzle_orm_1.eq)(table[criteriaType], criteria[criteriaType]);
    });
    if (conditions.length === 1) {
        return conditions[0];
    }
    else {
        return drizzle_orm_1.and.apply(void 0, conditions);
    }
};
var createRepo = function (db, // replace with the appropriate type for db
table, queryBuilder) {
    return {
        findFirst: function (criteria) { return __awaiter(void 0, void 0, void 0, function () {
            var where;
            return __generator(this, function (_a) {
                where = buildWhereClause(criteria, table);
                return [2 /*return*/, queryBuilder.findFirst({ where: where })];
            });
        }); },
        findMany: function (criteria) { return __awaiter(void 0, void 0, void 0, function () {
            var where;
            return __generator(this, function (_a) {
                where = buildWhereClause(criteria, table);
                return [2 /*return*/, queryBuilder.findMany({ where: where })];
            });
        }); },
        create: function (createWith) { return __awaiter(void 0, void 0, void 0, function () {
            var inserted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(table).values(createWith).returning()];
                    case 1:
                        inserted = _a.sent();
                        return [2 /*return*/, inserted.shift()];
                }
            });
        }); },
        update: function (id, updateWith) { return __awaiter(void 0, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.update(table).set(updateWith).where((0, drizzle_orm_1.eq)(table.id, id)).returning()];
                    case 1:
                        updated = _a.sent();
                        return [2 /*return*/, updated.shift()];
                }
            });
        }); },
        delete: function (id) { return __awaiter(void 0, void 0, void 0, function () {
            var deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.delete(table).where((0, drizzle_orm_1.eq)(table.id, id)).returning()];
                    case 1:
                        deleteResult = _a.sent();
                        return [2 /*return*/, deleteResult.shift()];
                }
            });
        }); },
    };
};
exports.createRepo = createRepo;
