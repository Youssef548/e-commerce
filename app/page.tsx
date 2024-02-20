import Image from "next/image";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner/HomeBanner";
import { products } from "@/utils/products";
import TruncateText from "@/utils/Truncate";
import ProductCard from "./components/Products/ProductCard";
// stop at 30 episode
// Next is 31 episode
export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
          {products.map((product: any) => {
            return <ProductCard data={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}
