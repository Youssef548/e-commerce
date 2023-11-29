import React, { ReactNode } from "react";

interface FooterListProps {
  title: string;
  children: ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({ title, children }) => {
  return (
    <>
      <div
        className="
      w-full
      sm:w-1/2
      md:w-1/4
      lg:w-1/6
      flex
      flex-col
      gap-2
  "
      >
        <h3 className="text-base font-bold mb-2">{title}</h3>

        {children}
      </div>
    </>
  );
};

export default FooterList;
