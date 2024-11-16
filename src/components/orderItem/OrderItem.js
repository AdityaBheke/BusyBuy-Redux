import styles from "./orderItem.module.css";

function OrderItem(props){
    const {myOrder, grandTotal, date} = props.orderItem;
    const orderDate = new Date(date.seconds*1000);
    return <div className={styles.orderItem}>
        <h2>Ordered on: {orderDate.getDate()+"-"+(orderDate.getMonth()+1)+"-"+orderDate.getFullYear()}</h2>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {myOrder.map((order)=>(<tr key={order.id}>
                    <td title={order.title}>{order.title.length>30?order.title.substring(0,30)+"...":order.title}</td>
                    <td>$ {order.price}</td>
                    <td>{order.quantity}</td>
                    <td>$ {Number(order.price)*Number(order.quantity)}</td>
                </tr>))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}></td>
                    <td>$ {grandTotal}</td>
                </tr>
            </tfoot>
        </table>

    </div>
}
export default OrderItem;