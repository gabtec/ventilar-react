function OrderStatusTag({ status }) {
  switch (status) {
    case 'PENDING':
      return <span className="tag is-warning">{status}</span>;
    case 'DISPATCHED':
      return <span className="tag is-success">{status}</span>;
    case 'RETURNED':
      return <span className="tag is-info">{status}</span>;

    default:
      return <span className="tag is-danger is-outlined">{status}</span>;
  }
}

export default OrderStatusTag;
