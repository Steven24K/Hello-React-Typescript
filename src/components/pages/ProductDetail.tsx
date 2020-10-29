import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { AppState } from '../../state'

type ProductDetailPageProps = {
    appState: AppState
}

export const ProductDetailPage = (props: ProductDetailPageProps) => {
    if (props.appState.currentPage.kind != 'product-detail') return <></>
    if (props.appState.products.kind != 'loaded') return <div>Loading product details...</div>


    let products = props.appState.products.value
    if (!products.has(props.appState.currentPage.productId)) return <h1>Product not found</h1>
    let detailProduct = products.get(props.appState.currentPage.productId)

    return <div>
        <h1>ProductDetail</h1>
        <NavLink to='/products'>Go back</NavLink>
        <div>
            <h1>{detailProduct?.Name}</h1>

            <p>{detailProduct?.Description}</p>

            <div>
                <b>Price: €{detailProduct?.Price}</b>
            </div>

            <div>
                <i>{detailProduct?.Tags.reduce((xs, x) => xs + x + ' ', '')}</i>
            </div>

        </div>
    </div>
}