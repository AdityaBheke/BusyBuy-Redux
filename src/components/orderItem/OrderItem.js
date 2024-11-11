import styles from "./orderItem.module.css";

function OrderItem(){
    return <div className={styles.orderItem}>
        <h2>Ordered on: yyyy-mm-dd</h2>
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
                <tr>
                    <td>Product Title</td>
                    <td>$ 00.00</td>
                    <td>0</td>
                    <td>$ 00.00</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}></td>
                    <td>$ 00.00</td>
                </tr>
            </tfoot>
        </table>

    </div>
}
export default OrderItem;