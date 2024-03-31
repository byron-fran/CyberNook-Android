import { Order } from "../store/cart/useCart";


export const calculateTotalPrice = (cart : Order[])  =>  {
    let totalQuantity : number = 0;
    for(let i = 0; i<cart.length; i++){
        totalQuantity += cart[i].quantity
    };

    //calculate price total
    let totalPriceToPay : number = 0;
    for(let i =0; i<cart.length; i++){
        totalPriceToPay += cart[i].price
    }

    let save : number = 0;
    let totalPriceNoDiscount : number = 0;

    for(let i = 0; i<cart.length; i++) {
        totalPriceNoDiscount += cart[i].unitPrice! * cart[i].quantity;
        save = totalPriceNoDiscount - totalPriceToPay
    }

    return {
        totalQuantity,
        totalPriceToPay,
        save,
        totalPriceNoDiscount
    }
}