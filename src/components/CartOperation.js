import React from "react";
import { Icon } from "antd";

const CartOperation = ({ sapling, increment, decrement }) => {
  return (
    <span>
      <button
        onClick={() => increment(sapling.id)}
        disabled={sapling.inCart === sapling.quantity}
      >
        <Icon type="plus" />
      </button>
      {sapling.inCart}
      <button
        disabled={sapling.inCart === 0}
        onClick={() => decrement(sapling.id)}
      >
        <Icon type="minus" />
      </button>
    </span>
  );
};
export default CartOperation;
