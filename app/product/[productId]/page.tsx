import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { product } from "@/utils/product";
import ListRating from "./ListRating";

interface paramsProps {
  productId?: string;
}

const ProductPage = ({ params }: { params: paramsProps }) => {
  console.log("params", params);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div>
          <div className="flex flex-col mt-20 gap-4">Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
