import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { DefaultComponentProps } from '../../state'

interface ProductDetailPageProps extends DefaultComponentProps { }

export const ProductDetailPage = (props: ProductDetailPageProps) => {
    if (props.appState.currentPage.kind != 'product-detail') return <></>
    if (props.appState.products.kind != 'loaded') return <div>Loading product details...</div>


    let products = props.appState.products.value
    if (!products.has(props.appState.currentPage.productId)) return <h1>Product not found</h1>
    let product = products.get(props.appState.currentPage.productId)!

    return <div className="container">
        <h1>ProductDetail</h1>
        <NavLink className="btn btn-primary" to='/products'>Go back</NavLink>
        <div className="card" style={{ width: 600 }}>
            <div className="col align-items-start" style={{ marginBottom: 15, marginLeft: 10 }}>
                <img src="https://thisartworkdoesnotexist.com/" className="card-img-top" alt={product.Name} />
                <div className="card-body">
                    <h5 className="card-title">{product.Name}</h5>
                    <p className="card-text">
                        {product.Description}
                    </p>
                </div>
                <div className="card-footer">
                    <b>Price: </b><i>{product.Price}</i>
                    <p>
                        {product.Tags.map(tag => <span key={tag}>{tag}</span>)}
                    </p>
                </div>
            </div>
        </div>
    </div>
}