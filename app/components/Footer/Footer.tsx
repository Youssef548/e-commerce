import React, { ReactNode } from "react";

import Link from "next/link";
import Container from "../Container";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

interface FooterLinkProps {
  href: string;
  children?: ReactNode;
  icon?: React.ReactElement;
}

import FooterList from "./FooterList";

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, icon }) => {
  return (
    <Link href={href}>
      {icon ? React.cloneElement(icon, { size: 24 }) : children}
    </Link>
  );
};

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-small mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList title="Shop Categories">
            <FooterLink href="#">Phones</FooterLink>
            <FooterLink href="#">Laptops</FooterLink>
            <FooterLink href="#">Desktops</FooterLink>
            <FooterLink href="#">Watches</FooterLink>
            <FooterLink href="#">TVs</FooterLink>
            <FooterLink href="#">Accessories</FooterLink>
          </FooterList>

          <FooterList title="Customer Service">
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">Shipping Information</FooterLink>
            <FooterLink href="#">Returns & Exchanges</FooterLink>
            <FooterLink href="#">FAQs</FooterLink>
          </FooterList>

          <FooterList title="About Us">
            <FooterLink href="#">Our Story</FooterLink>
            <FooterLink href="#">Mission and Vision</FooterLink>
            <FooterLink href="#">Team</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
          </FooterList>

          <FooterList title="Follow us">
            <div className="flex md:gap-4 sm:gap-2">
              <FooterLink href="#" icon={<FaFacebook />} />
              <FooterLink href="#" icon={<FaTwitter />} />
              <FooterLink href="#" icon={<FaInstagram />} />
              <FooterLink href="#" icon={<FaLinkedin />} />
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
