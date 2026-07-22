import React, { Component } from 'react';
import Cart from './Cart';

class OnlineShopping extends Component {
  constructor(props) {
    super(props);
    // Initialize an array of 5 shopping items
    this.cartItems = [
      { Itemname: 'MacBook Pro', Price: 'Rs 149,999' },
      { Itemname: 'iPhone 15 Pro', Price: 'Rs 129,900' },
      { Itemname: 'Sony WH-1000XM5', Price: 'Rs 29,990' },
      { Itemname: 'Apple Watch Series 9', Price: 'Rs 41,900' },
      { Itemname: 'iPad Air', Price: 'Rs 59,900' }
    ];
  }

  render() {
    return (
      <div className="shopping-card">
        <h2>Online Shopping Portal</h2>
        <div className="table-responsive">
          <table className="shopping-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {this.cartItems.map((item, index) => (
                <Cart 
                  key={index} 
                  Itemname={item.Itemname} 
                  Price={item.Price} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default OnlineShopping;
