import { ListGroup } from 'react-bootstrap';
import Link from "next/link";
function List({ lists }) {
  return (
    <ListGroup className='List border-0'>
      {lists.map((list) => (
        <ListGroup.Item key={list.href} className='border-0 bg-transparent'>
          <Link href={list.href}  >
            <a className='text-decoration-none text-dark'>{list.title}</a>
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default List;