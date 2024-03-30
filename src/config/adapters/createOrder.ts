import { Order } from "../../store/cart/useCart";

export const createOrder = (product : Order,quantity : number, idProduct : string) : Order => {
    const order: Order = {
        quantity,
        name: product.name,
        category: product.category,
        discount: product.discount,
        description: product.description,
        image: product.image,
        price: product.discount > 0 ? 
                                (product.price - (product.price * (product.discount / 100)))
                                 * quantity : product.price * quantity,  
        paid: false,
        unitPrice: product.price,
        ProductId: idProduct,

    }

    return order
}