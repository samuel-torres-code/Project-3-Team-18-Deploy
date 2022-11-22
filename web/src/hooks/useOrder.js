import { useState, useEffect } from 'react';


// Example JSON Structure
// {
//     "order": {
//         "emp_id": "-1",
//         "cust_name": "Sam Torres"
//     },
//     "pizzas":[
//         {
//             "pizza_type": "cheese",
//             "pizza_price": "6.45",
//             "ingredients":[
//                 { "ingredient_id" : "4" },
//                 { "ingredient_id" : "36" },
//                 { "ingredient_id" : "18" },
//             ]
//         },
//         ...
//     ],
//     "drinks": [
//         {
//             "drink_type": "Fountain",
//             "drink_price": "2.49",
//         },
//         {
//             "drink_type": "Bottled",
//             "drink_price": "2.49",
//         },
//         ...
//     ]

// }



const useOrder = () => {
    const [orderLoading, setOrderLoading] = useState(true)
    const [orderError, setOrderError] = useState(null)
    const [order, setOrder] = useState({
        // order_info:{ 
        //     emp_id: "-1", 
        //     cust_name: ""
        // },
        // pizzas:[],
        // drinks:[]
    })
    const [pizzas,setPizzas] = useState([])
    const [drinks,setDrinks] = useState([])

    useEffect(() => {
        loadStorage()
    },[])

    useEffect(() => {
        if(!orderLoading) {
            console.log('done loading')
            updateStorage()
        }
        
    },[order])

    useEffect(() => {
        if(!orderLoading) {
            setOrder({
                order_info: {...order.order_info},
                pizzas: pizzas,
                drinks: drinks,
            })
        }
    },[pizzas,drinks])

    const updateStorage = () => {
        try {
            console.log("updating storage with")
            console.log(order)
            localStorage.setItem('order', JSON.stringify(order));
        }
        catch(e) {
            console.log("Trouble updating localStorage")
            console.log(e);
        }
        
    }

    const loadStorage = () => {
        if(localStorage.getItem("order") == null) {
            console.log('default order added')
            setOrder({
                order_info:{ 
                    emp_id: "-1", 
                    cust_name: ""
                },
                pizzas:[],
                drinks:[]})
        }
        else {
            setOrder(JSON.parse(localStorage.getItem('order')));
            console.log(JSON.parse(localStorage.getItem('order')))
        }
        console.log("orderr loaded")
        setOrderLoading(false)
    }

    const setOrderName = (name) => {
        setOrder({
            order_info: {
                ...order.order_info,
                cust_name: name,
            },
            pizzas:[...order.pizzas],
            drinks:[...order.drinks]
        })
    }

    const updatePizza = (updatedPizza,index) => {
        setPizzas(order.pizzas.map((currPizza,i) => 
            index===i ? updatedPizza:currPizza
        ))
        
    }

    const addNewPizza = () => {
        setPizzas([...order.pizzas,{
            pizza_type: "",
            pizza_price: "0.00",
            ingredients: []
        }])
        
    }

    const deletePizza = (index) => {
        setPizzas([order.pizzas.filter((pizza,i) => i !== index)])
        
    }

    const addDrink = (drink_type,drink_price) => {
        setDrinks([
            ...order.drinks,
            {
                drink_type:drink_type,
                drink_price:drink_price,
            }
        ])
        
    }


    return {
        orderLoading,
        orderError,
        order,
        setOrderName,
        addNewPizza,
        updatePizza,
        addDrink,
        deletePizza,
    }
}

export default useOrder;