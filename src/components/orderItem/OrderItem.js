import styles from "./orderItem.module.css"; // Importing CSS module for styling

function OrderItem(props) {
  // Destructuring props to extract order details
  const { myOrder, grandTotal, date } = props.orderItem;

  // Converting the order date from a string to a Date object for formatting
  const orderDate = new Date(date);

  return (
    <div className={styles.orderItem}>
      {/* Displaying the formatted order date */}
      <h2>
        Ordered on:{" "}
        {orderDate.getDate() +
          "-" +
          (orderDate.getMonth() + 1) +
          "-" +
          orderDate.getFullYear()}
      </h2>
      <table>
        <thead>
          <tr>
            {/* Table headers for the order details */}
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterating through the ordered items to display them in rows */}
          {myOrder.map((order) => (
            <tr key={order.id}>
              {/* Displaying the product title, truncating if it's too long */}
              <td title={order.title}>
                {order.title.length > 30
                  ? order.title.substring(0, 30) + "..."
                  : order.title}
              </td>
              {/* Displaying the product price */}
              <td>$ {order.price}</td>
              {/* Displaying the product quantity */}
              <td>{order.quantity}</td>
              {/* Calculating and displaying the total for the product */}
              <td>$ {Number(order.price) * Number(order.quantity)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            {/* Leaving the first three columns empty */}
            <td colSpan={3}></td>
            {/* Displaying the grand total for the entire order */}
            <td>$ {grandTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default OrderItem;
