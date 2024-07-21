import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import ChatBox from '../../components/ChatBox';
import styles from '../../styles/ProductDetail.module.css';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  supplierID: number;
};

type Props = {
  product: Product;
};

const ProductDetail: React.FC<Props> = ({ product }) => {
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <strong className={styles.backButton}> Back to Product List</strong>
      </Link>
      <div className={styles.card}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{formatRupiah(product.price)}</p>
      </div>
      <ChatBox />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const product = await res.json();

  return { props: { product } };
};

export default ProductDetail;
