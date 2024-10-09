import { useState, useEffect } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder() {

    //Esta función se utiliza cuando el componente o la aplicación se carga por primera vez
    const initialOrder = (): OrderItem[] => {
        const localStorageCart = localStorage.getItem('order')
        return localStorageCart ? JSON.parse(localStorageCart) : [] //JSON.PARSE CONVIERTE UN JSON A VALOR DE JS
    }
    //<OrderItem[]> sirve para verificar lo que se esta pasando tenga bien la estructura
    const [order, setOrder] = useState<OrderItem[]>(initialOrder)
    const [tip, setTip] = useState(0) //Porcentaje

    // solo se ejecuta cuando el valor de cart cambie
    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order)) // guarda datos en el navegador CONVIERTE EL VALOR A STRING
    }, [order])

    const addItem = (item: MenuItem) => {

        //Verificar si un item existe y comparar el id con el que estamos agregando que sera el item
        const itemExist = order.find(orderItem => orderItem.id === item.id)

        if (itemExist) {
            // ahora que sabemos que existe recorremos la orden para saber cual es el elemento repetido y actualizarlo, si no son iguales mostramos el actual
            const updateOrder = order.map(orderItem => orderItem.id === item.id ? {...orderItem, quantity: orderItem.quantity + 1 }  : orderItem)
            setOrder(updateOrder)
        } else {
            const newItem: OrderItem = { ...item, quantity: 1 }
            setOrder([...order, newItem])
        }


    }

    const removeItem = (id:MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    const placeOrder = () =>{
      // Vaciar
      setOrder([])
      setTip(0)
    }


    return {
        order,
        addItem,
        removeItem,
        placeOrder,
        tip,
        setTip
    }
}