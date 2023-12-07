import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { product } from "@/utils/product";

interface paramsProps {
  productId?: string;
}

const ProductPage = ({ params }: { params: paramsProps }) => {
  console.log("params", params);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
};

export default ProductPage;
