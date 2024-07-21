import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './ProductList.module.css';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  supplierID: number;
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Catalog</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className={styles.card}>
              <h2>{product.name}</h2>
              <p>{formatRupiah(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
