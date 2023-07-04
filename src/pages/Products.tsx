import ProductCard from '@/components/molecules/ProductCard';
import { Heading } from '@/components/ui/heading';
import { getProducts } from '@/services/api';
import queryClient from '@/services/queryClient';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

const productsQuery = () => {
  return {
    queryKey: ['products', 'all'],
    queryFn: getProducts,
  };
};

export const loader = async () => {
  try {
    const query = productsQuery();
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  } catch (error) {
    return { error };
  }
};

const Products = () => {
  const { data: products, error } = useQuery<Product[], AxiosError>(
    productsQuery(),
  );
  return (
    <div className="h-full w-full bg-slate-100">
      <section className="max-w-container mx-auto w-10/12 px-2 py-2 sm:w-4/6">
        <Heading className="mb-4">Products</Heading>
        {error && <div className="text-red-500">{error.message}</div>}
        {products && (
          <div className="grid auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {products?.map((product) => (
              <Link to={`/products/${product.id}`}>
                <ProductCard key={product.id} product={product} className='h-full' />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
