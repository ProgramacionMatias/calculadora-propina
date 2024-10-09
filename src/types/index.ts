export type MenuItem = {
    id:number,
    name:string,
    price:number
}

// Tomamos todos los datos de MenuItem pero le agregamos el valor quantity
export type OrderItem = MenuItem & {
    quantity: number
}