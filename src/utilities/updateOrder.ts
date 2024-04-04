import { Order } from "../store/cart/useCart";

type QuantityAction = 'increment' | 'decrement'

export const updateOrderQuantity = (order: Order, action: QuantityAction): Order => {
    let newQuantity = 0;
    if(action === 'increment'){
        newQuantity = order.quantity + 1 
    }
    else {
        newQuantity = order.quantity - 1
    }

    const newPrice = order.discount > 0 ?
        (order.unitPrice! - (order.unitPrice! * (order.discount / 100)))
        * newQuantity : order.unitPrice! * newQuantity  // Calcula el nuevo precio basado en la nueva cantidad

    const newOrder: Order = {
        ...order,
        quantity: newQuantity,
        price: newPrice
    };


    return newOrder
}