import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";


const Pickup = () => {

  const [orderid, setOrderid] = useState("--");
  const [ordertimehours, setOrderTimeHours] = useState("--");
  const [ordertimemins, setOrderTimeMins] = useState("--");
  const [orderam, setOrderam] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() =>
  {
    if(!loaded && localStorage.getItem("order_id") !== null)
    {
      setOrderid(localStorage.getItem("order_id"));
      var order_hours = parseInt(localStorage.getItem("order_time_hours"), 10);
      var order_mins = parseInt(localStorage.getItem("order_time_mins"),10);
      var order_am;
      order_hours = order_mins >= 40 ? order_hours + 19: order_hours + 18;
      order_hours = order_hours % 24;
      order_am = order_hours < 12 ? "am" : "pm";
      order_hours = order_hours == 0? 12: order_hours % 12;
      order_mins = (order_mins + 20) % 60;
      setOrderTimeHours(order_hours);
      setOrderTimeMins(order_mins);
      setOrderam(order_am);
      setLoaded(true);
    }
    
    

  })
  return (
    <div className="container">
      <h1 className="text-center">Pickup Order Page</h1>
      <div className="row g-4 py-5 row-cols-1 row-cols-sm-1">
        <div className="feature col">
          {/* <h4><br></br></h4> */}
          <h4>Order Number: {orderid}</h4>
          </div>
          <div className="feature col">
          <h4>Estimated Pickup Time: {!loaded ? "--:--": ordertimehours + ":" + ordertimemins} {orderam}</h4>

          <p>
            Give your order number(or name) at the specified time to pickup your order!
          </p>
        </div>
          
        <div className="feature col">
        
        {/* <p>
          Return Home:
        </p> */}
        <a href="/home">
          <Button variant="primary">Return Home</Button>{' '}
        </a>
        {/* <p>
            <br></br>Want to create a new order? Click "New Order" Below:
          </p> */}
          <a href="/order">
            <Button variant="primary">Create New Order</Button>{' '}
          </a>
        </div>

      </div>
    </div>

  );
};

export default Pickup;
