import {
  ADD_PENDING_ORDER,
  REMOVE_PENDING_ORDER,
  LOAD_PENDING_ORDERS
} from "modules/orders/actions/pending-orders-management";

const DEFAULT_STATE = () => ({});

export default function(pendingOrders = DEFAULT_STATE(), { type, data }) {
  switch (type) {
    case ADD_PENDING_ORDER: {
      const { pendingOrder, marketId } = data;
      const orders = pendingOrders[marketId] || [];
      orders.push(pendingOrder);

      return {
        ...pendingOrders,
        [marketId]: orders
      };
    }
    case REMOVE_PENDING_ORDER: {
      const { id, marketId } = data;
      let orders = pendingOrders[marketId];
      orders = orders.filter(obj => obj.id !== id);
      return {
        ...pendingOrders,
        [marketId]: orders
      };
    }
    case LOAD_PENDING_ORDERS: {
      return data.pendingOrders;
    }
    default:
      return pendingOrders;
  }
}
