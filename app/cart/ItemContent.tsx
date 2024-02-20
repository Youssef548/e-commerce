"use client"

import { formatPrice } from "@/utils/FormatPrice";
import { CartProdcutType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import TruncateText from "@/utils/Truncate";
import Image from "next/image";
import SetQuantity from "../components/Products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
    item: CartProdcutType;
}


const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const { handleRemoveProductFromCart } = useCart();


    return <div className="
    grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200
    py-4 items-center
    ">
        <div className="col-span-2 flex justify-self-start gap-2 md:gap-4">
            <Link href={`product/${item.id}`}>
                <div className="relative w-[70px] aspect-square">
                    <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain" />
                </div>
            </Link>
            <div className="flex flex-col justify-between">
                <Link href={`product/${item.id}`}>
                    {TruncateText(item.name)}
                </Link>
                <div>{item.selectedImg.color}</div>
                <div className="w-[70px]">
                    <button className="text-slate-500 underline" onClick={() => handleRemoveProductFromCart(item)}>Remove</button>
                </div>
            </div>
        </div>
        <div className="justify-self-center">{formatPrice(item.price)}</div>
        <div className="justify-self-center">
            <SetQuantity
                cartCounter={true}
                cartProduct={item}
                handleQTYIncrease={() => { }}
                handleQTYDecrease={() => { }}
            />
        </div>
        <div className="justify-self-end font-semibold">
            {formatPrice(item.price * item.quantity)}
        </div>
    </div>
}

export default ItemContent