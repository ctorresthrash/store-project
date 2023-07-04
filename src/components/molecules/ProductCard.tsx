import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import { twMerge } from 'tailwind-merge';

type ProductCardProps = {
  product: Product;
  className?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  return (
    <Card className={twMerge('py-4', className)}>
      <CardContent className='pb-4'>
        <div className="flex flex-col">
          <img
            width={200}
            height={200}
            className="mb-4 mr-4 h-[200px] w-[200px] object-contain"
            src={product.images?.[0]}
            alt={product.title}
          />
          <Heading as="h4">{product.title}</Heading>
          <p className='line-clamp-3'>{product.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
