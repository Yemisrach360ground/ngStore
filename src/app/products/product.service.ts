import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Item } from '../../api/products/models/item';

//import { IProduct } from './product';

@Injectable()
export class ProductService {
    private productUrl = 'http://localhost:8080/item';

    constructor(private http: Http) { }

    getProducts(): Observable<Item[]> {
        let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // //headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET');
        // headers.append('Access-Control-Allow-Origin', '*');

        return this.http.get(this.productUrl, {headers: headers})
            .map((response: Response) => <Item[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<Item> {
        return this.getProducts()
            .map((products: Item[]) => products.find(p => p.productId === id));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
