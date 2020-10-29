import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { AppState } from '../../state'

type ProductOverViewPageProps = {
    appState: AppState
}

export const ProductOverViewPage = (props: ProductOverViewPageProps) => {
    if (props.appState.products.kind != 'loaded') return <div>Loading...</div>
    let products = props.appState.products.value
    return <div>
        <h1>ProductOverView</h1>

        {products.toIndexedSeq().map(product => <div key={product.Id}>
            <NavLink to={`/product/${product.Id}`}>
                <h3>{product.Name}</h3>
                <p>{product.Description}</p>
                <b>Price: {product.Price}</b>
                <br />
                <i>{product.Tags.reduce((xs, x) => xs + x + ' ', '')}</i>
            </NavLink>
        </div>)}
    </div>
}