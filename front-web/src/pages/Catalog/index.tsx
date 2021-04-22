import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductCard from './Components/ProductCard';
import ProductCardLoader from './Components/Loaders/ProductCardLoader';
import './styles.scss';
import Pagination from 'core/components/Pagination';

const Catalog = () => {
    // quando a lista de produtos estiver disponível,
    // popular um estado no componente, e listar os produtos dinâmicamente
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);

    console.log(productsResponse);

    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 12
        }
        // iniciar o loader
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                // finalizar o loader
                setIsLoading(false);
            });
    }, [])

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catalogo de produtos
            </h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> :
                    (productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>
                    ))
                )}
            </div>
            <Pagination />
        </div>
    );
};

export default Catalog;