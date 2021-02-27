import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { DefaultComponentProps } from '../../state'
import { Loader } from '../shared/Loader'

interface ProductOverViewPageProps extends DefaultComponentProps { }

export const ProductOverViewPage = (props: ProductOverViewPageProps) => {
    let products = props.appState.products
    return <div className="container">
        <h1>An overview page</h1>
        <div className="row">
            {
                products.kind == 'loaded' ?
                    products.value.toIndexedSeq().map(product => <div key={product.Id} className="card" style={{ width: 300 }}>
                        <div className="col align-items-start" style={{ marginBottom: 15, marginLeft: 10 }}>
                            <img src="https://thisartworkdoesnotexist.com/" className="card-img-top" alt={product.Name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.Name}</h5>
                                <p className="card-text">
                                    {product.Description}
                                </p>
                                <NavLink to={`/product/${product.Id}`} className="btn btn-primary">See details</NavLink>
                            </div>
                            <div className="card-footer">
                                <b>Price: </b><i>{product.Price}</i>
                                <p>
                                    {product.Tags.map(tag => <span key={tag}>{tag}</span>)}
                                </p>
                            </div>
                        </div>
                    </div>)
                    :
                    <Loader />
            }
        </div>

    </div>
}