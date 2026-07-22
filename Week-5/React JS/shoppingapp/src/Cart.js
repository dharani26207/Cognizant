import React, { Component } from 'react';

class Cart extends Component {
  render() {
    const itemName = this.props.Itemname || this.props.itemname;
    const itemPrice = this.props.Price || this.props.price;

    return (
      <tr className="cart-row">
        <td>{itemName}</td>
        <td>{itemPrice}</td>
      </tr>
    );
  }
}

export default Cart;
