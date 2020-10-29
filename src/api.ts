import { HttpResult } from "widgets-for-react";
import { Product } from "./models/Product";
import { Chance } from 'chance'
import { Map } from "immutable";

export let get_all_products = (): Promise<HttpResult<Map<number, Product>>> => {
    let chance = Chance()
    let products: Product[] = new Array(1000)
    let tags1 = ['sale', 'new release', 'pre-order', 'best choice']
    let tags2 = ['nice', 'cool', 'stuff', 'awesome']
    let tags3 = ['super cool', 'limited edition', 'just for you']
    products = products.fill({ Id: -1, Description: '', Name: '', Price: 0, Tags: [] }, 0, 100)
        .map<Product>(_ => ({
            Id: chance.integer({ min: 1 }),
            Name: chance.word(),
            Description: chance.paragraph(),
            Price: chance.floating({ min: 0, max: 10000 }),
            Tags: chance.shuffle([chance.pickone(tags1), chance.pickone(tags2), chance.pickone(tags3)])
        }))

    return new Promise(res => {
        setTimeout(() => res({ kind: 'result', value: Map(products.map(p => [p.Id, p])), status: 200 }), 2500)
    })

}