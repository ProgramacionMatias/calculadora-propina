//MOSTRAREMOS LA CANTIDAD DE LAS ORDENES Y EL TOTAL DE ELLAS CONSUMO

import { formatCurrency } from "../helpers"
import type { MenuItem, OrderItem } from "../types"

type OrderContentsProps = {
    order: OrderItem[],
    removeItem: (id: MenuItem['id']) => void
}
export default function OrderContents({ order, removeItem }: OrderContentsProps) {
    return (
        <div>
            <h2 className='font-black text-4xl'>Consumo</h2>
            <div className="space-y-3 mt-10">

                {order.map(orderItem => (
                        <div className="flex justify-between items-center border-t border-gray-200 py-5 last-of-type:border-b" key={orderItem.id}>

                            <div>
                                <p className="text-lg">
                                    {orderItem.name} - {formatCurrency(orderItem.price)}
                                </p>
                                <p className="font-bold">
                                    Cantidad: {orderItem.quantity} - {formatCurrency(orderItem.price * orderItem.quantity)}
                                </p>
                            </div>


                            <button className="bg-red-600 h-8 w-8 rounded-full text-white font-black" onClick={()=>removeItem(orderItem.id)}>
                                X
                            </button>
                        </div>
                    ))

                    

                }

            </div>

        </div>
    )
}