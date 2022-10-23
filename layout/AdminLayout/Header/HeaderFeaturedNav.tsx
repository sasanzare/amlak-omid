import Link from 'next/link'
import { Nav } from 'react-bootstrap'

export default function HeaderFeaturedNav() {
  return (
    <Nav>
      <Nav.Item>
        <Link href="/admin" passHref>
          <Nav.Link className="p-2">داشتبرد</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/src/pages" passHref>
          <Nav.Link className="p-2">کاربرها</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/src/pages" passHref>
          <Nav.Link className="p-2">تنظیمات</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  )
}
