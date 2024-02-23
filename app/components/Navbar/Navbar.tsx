import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });
const NavBar = () => {
  const Logo = () => (
    <Link href="/" className={`${redressed.className} font-bold text-2xl`}>
      E-shop
    </Link>
  );

  const Search = () => <div className="hidden md:block">Search</div>;

  const Cart = () => <CartCount />;

  const UserMenu = () => <div>UserMenu</div>;

  return (
    <div className="bg-slate-200 top-0 sticky w-full z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-4 md:gap-0">
            <Logo />
            <Search />
            <div className="flex items-center gap-8 md:gap-12">
              <Cart />
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
