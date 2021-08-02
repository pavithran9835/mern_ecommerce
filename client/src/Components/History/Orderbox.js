import React from "react";

const Orderbox = ({ order }) => {
  return (
    <div className="orderBox">
      <p>show payment info</p>
      <table className="orderTable">
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>

        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td>{p.product.title}</td>
              <td>{p.product.price}</td>
              <td>{p.product.brand}</td>
              <td>
                <i
                  className="fas fa-circle"
                  style={{
                    color: `${p.color}`,
                  }}
                ></i>
              </td>
              <td>{p.count}</td>
              <td>
                <i
                  className="fas fa-circle"
                  style={{
                    color: order.orderStatus === "processing" ? "green" : "red",
                  }}
                ></i>
                {order.orderStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>PDF Download</p>
    </div>
  );
};

export default Orderbox;
