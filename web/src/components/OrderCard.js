import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const DrinkCountRows = ({ drink_counts }) => {
  return drink_counts.map((drink, index) => (
    <p key={drink.drink_type + index} className="my-0">
      {drink.drink_type} Drink: {drink.drink_count}
    </p>
  ));
};

const SeasonalItemRows = ({ seasonal_items }) => {
  return seasonal_items.map((item, index) => (
    <div key={item.item_name + index} className="row my-2">
      <div className="col-8">
        <p className="my-0">{item.item_name}</p>
        <p className="my-0"> {item.item_price} </p>
      </div>
      <div className="col-2">
        <a href="/server" className="btn btn-primary">
          <FontAwesomeIcon icon={faPencil} />
        </a>
      </div>
      <div className="col-2">
        <a href="/server" className="btn btn-primary">
          <FontAwesomeIcon icon={faTrash} />
        </a>
      </div>
    </div>
  ));
};

const PizzaRows = ({ pizzas }) => {
  return pizzas.map((pizza, index) => (
    <div key={pizza.pizza_type + index} className="row my-2">
      <div className="col-8">
        <p className="text-left my-0">
          {pizza.pizza_type}
          </p>
          <p className="text-left mb-1">
          {pizza.pizza_price}
          </p>
       
        {pizza.ingredients.map((ingredient, index) => (
          <p
            key={ingredient.ingredient_name + pizza.pizza_type + index}
            className="text-left my-0"
          >
            {ingredient.ingredient_name}
          </p>
        ))}
      </div>
      <div className="col-2">
        <a href="/server" className="btn btn-primary">
          <FontAwesomeIcon icon={faPencil} />
        </a>
      </div>
      <div className="col-2">
        <a href="/server" className="btn btn-primary">
          <FontAwesomeIcon icon={faTrash} />
        </a>
      </div>
    </div>
  ));
};

const OrderCard = ({
  order_info,
  pizzas,
  seasonal_items,
  drink_counts,
  total_price,
}) => {
  order_info = {
    order_name: "Sam",
  };
  pizzas = [
    {
      pizza_type: "build-your-own",
      pizza_price: "$4.50",
      ingredients: [
        {
          ingredient_id: "1",
          ingredient_type: "Sauce",
          ingredient_name: "Red Sauce",
        },
        {
          ingredient_id: "2",
          ingredient_type: "Cheese",
          ingredient_name: "Mozzarella Cheese",
        },
        {
          ingredient_id: "3",
          ingredient_type: "Drizzle",
          ingredient_name: "Olive Oil Drizzle",
        },
      ],
    },
    {
      pizza_type: "one-topping",
      pizza_price: "$3.50",
      ingredients: [
        {
          ingredient_id: "4",
          ingredient_type: "Drizzle",
          ingredient_name: "Pesto Sauce",
        },
        {
          ingredient_id: "5",
          ingredient_type: "Cheese",
          ingredient_name: "Ricotta Cheese",
        },
        {
          ingredient_id: "6",
          ingredient_type: "Meat",
          ingredient_name: "Pepperoni",
        },
      ],
    },
  ];
  seasonal_items = [
    {
      item_name: "Seasonal Item 1",
      item_price: "$9.45",
    },
    {
      item_name: "Seasonal Item 1",
      item_price: "$9.46",
    }
  ];
  drink_counts = [
    {
      drink_type: "Fountain",
      drink_count: 1,
    },
    {
      drink_type: "Bottled",
      drink_count: 0,
    },
  ];

  return (
    <>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Order Name: {order_info.order_name}</strong>
          </li>
          <div style={{maxHeight: '80vh', overflowY:'scroll'}} >
          <li className="list-group-item">
          <strong>Drink Vibes:</strong>
            <DrinkCountRows drink_counts={drink_counts} />
          </li>
          <li className="list-group-item" >
          <strong>Seasonal Item Vibes:</strong>
            <SeasonalItemRows seasonal_items={seasonal_items} />
          </li>
          <li className="list-group-item">
            <strong>Pizza Vibes:</strong>
            <PizzaRows pizzas={pizzas} />
          </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default OrderCard;
