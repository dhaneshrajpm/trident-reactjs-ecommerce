import TableCell from '../components/TableCell/TableCell';

export const CHECKOUT_TABLE_COLUMNS = [
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: product => <TableCell product={product} />,
    width: 400,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (quantity, row) => <TableCell type='quantity' quantity={quantity} row={row} />
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: price => <span>$ {price}</span>
  },
  {
    title: '',
    dataIndex: '',
    key: 'd',
    render: (_, row) => <TableCell type='delete' row={row} />,
    width: 75,
  },
];