import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });
const NavBar = () => {
  return (
    <div className="bg-slate-200 top-0 sticky w-full z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className=" flex items-center justify-between gap-4 md:gap-0">
            <div>
              <Link
                href="/"
                className={`${redressed.className} font-bold text-2xl`}
              >
                E-shop
              </Link>
            </div>
            <div className="hidden md:block">Search</div>
            <div className="flex  items-center gap-8 md:gap-12">
              <div>CartCount</div>
              <div>UserMenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
