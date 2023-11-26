import React from "react";
import Brand from "./shopBy/Place";
import Category from "./shopBy/Category";
import Color from "./shopBy/View";
import Price from "./shopBy/Price";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} />
      <Color />
      <Brand />
      <Price />
    </div>
  );
};

export default ShopSideNav;
