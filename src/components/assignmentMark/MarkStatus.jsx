export default function MarkStatus({ total, pending, published }) {
  return (
    <ul className='assignment-status'>
      <li>
        Total <span>{total}</span>
      </li>
      <li>
        Pending <span>{pending}</span>
      </li>
      <li>
        Mark Sent <span>{published}</span>
      </li>
    </ul>
  );
}
