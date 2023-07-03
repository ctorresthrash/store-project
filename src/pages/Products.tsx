import { Heading } from '@/components/ui/heading';
import { SESSION_STORAGE_KEY } from '@/constants';
import { getProducts } from '@/services/api';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  try {
    const token = window?.localStorage.getItem(SESSION_STORAGE_KEY);
    if (token) {
      const parsedToken = JSON.parse(token) as Token;
      const products = await getProducts(parsedToken.access_token);
      return { products };
    }
  } catch (error) {
    return { error };
  }
};

const Products = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);
  return <Heading>Products</Heading>;
};

export default Products;
