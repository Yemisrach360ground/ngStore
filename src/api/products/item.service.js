"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var ItemService = (function () {
    function ItemService(http) {
        this.http = http;
        this.itemUrl = 'http://localhost:8080/item';
        //observable source
        this.itemCreatedSource = new Subject_1.Subject();
        this.itemDeletedSource = new Subject_1.Subject();
        // observable stream
        this.itemcreated$ = this.itemCreatedSource.asObservable();
        this.itemDeleted$ = this.itemDeletedSource.asObservable();
    }
    /**
     * Get all items
     */
    ItemService.prototype.getItems = function () {
        var _this = this;
        return this.http.get(this.itemUrl)
            .map(function (res) { return res.json().data; })
            .map(function (items) { return items.map(_this.toItem); })
            .catch(this.handleError);
    };
    /**
   * Convert user info from the API to our standard/format
   */
    ItemService.prototype.toItem = function (item) {
        return {
            productId: item.productId,
            productName: item.productName,
            productCode: item.productCode,
            releaseDate: item.releaseDate,
            description: item.description,
            price: item.price,
            starRating: item.starRating,
            imageUrl: item.imageUrl
        };
    };
    /**
       * Handle any errors from the API
       */
    ItemService.prototype.handleError = function (err) {
        var errMessage;
        if (err instanceof http_1.Response) {
            var body = err.json() || '';
            var error = body.error || JSON.stringify(body);
            errMessage = err.status + " - " + (err.statusText || '') + " " + error;
        }
        else {
            errMessage = err.message ? err.message : err.toString();
        }
        return Observable_1.Observable.throw(errMessage);
    };
    return ItemService;
}());
ItemService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map