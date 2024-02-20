import Container from "../components/Container";
import CartClient from "./CartClient";

const page = () => {
  return (
    <div>
      <Container>
        <CartClient />
      </Container>
    </div>
  );
};

export default page;
