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
        while (_) try {
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
import { getPatientsSchema } from '../utils/schemas.js';
import { create, deleteOne, getAll, updateService, getByIdService } from "../services/patientService.js";
import { patientRepository } from "../repositories/patientRepository.js";
export function post(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var patient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    patient = res.locals.patient;
                    return [4 /*yield*/, create(patient)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(201)];
            }
        });
    });
}
export function get(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, take, skip, type, patients_1, patients_2, patients_3, error, patients;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, take = _a.take, skip = _a.skip;
                    type = req.query.type;
                    if (!type) return [3 /*break*/, 7];
                    if (!(type === 'creationDate')) return [3 /*break*/, 2];
                    return [4 /*yield*/, patientRepository.orderByCreationDate()];
                case 1:
                    patients_1 = _b.sent();
                    return [2 /*return*/, res.send(patients_1)];
                case 2:
                    if (!(type === 'name')) return [3 /*break*/, 4];
                    return [4 /*yield*/, patientRepository.orderByName()];
                case 3:
                    patients_2 = _b.sent();
                    return [2 /*return*/, res.send(patients_2)];
                case 4:
                    if (!(type === 'email')) return [3 /*break*/, 6];
                    return [4 /*yield*/, patientRepository.orderByEmail()];
                case 5:
                    patients_3 = _b.sent();
                    return [2 /*return*/, res.send(patients_3)];
                case 6: throw { type: 'BAD_REQUEST', message: 'Undefined type' };
                case 7:
                    error = getPatientsSchema.validate(req.body).error;
                    if (error)
                        throw { type: 'BAD_REQUEST', message: error.details[0].message };
                    return [4 /*yield*/, getAll(take, skip)];
                case 8:
                    patients = _b.sent();
                    return [2 /*return*/, res.send(patients)];
            }
        });
    });
}
export function deletePatient(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, deleteOne(parseInt(id))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(204)];
            }
        });
    });
}
export function getById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, patient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, getByIdService(parseInt(id))];
                case 1:
                    patient = _a.sent();
                    return [2 /*return*/, res.send(patient)];
            }
        });
    });
}
export function update(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var patient, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    patient = res.locals.patient;
                    id = req.params.id;
                    return [4 /*yield*/, updateService(parseInt(id), patient)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(204)];
            }
        });
    });
}
