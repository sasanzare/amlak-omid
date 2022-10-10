import {Col } from "react-bootstrap";
import Link from "next/link";
export default function SideBarLinks() {
  return (
    <>
      <Col sm className="dir-r pt-1  fw-bold h3 text-center">
        <Link href="/">
          <span className="text-decoration-none text-es">Amlak Omid</span>
        </Link>
      </Col>
      <h3 className="h6 text-secondary">آژانس مشاوره املاک امید</h3>
      <p className="col-10 mx-auto pt-4 text-secondary">
          جدیدترین‌ مشاوره املاک در ایران و بهره گیری از هوش مصنوعی
      </p>
      <Col sm={12}>
        <Link href="/">
          <a className="btn btn-es  col-10  mt-3">خرید ملک</a>
        </Link>
        <Link href="/">
          <a className="btn btn-es  col-10  mt-3">رهن و اجار ملک</a>
        </Link>
        <Link href="/">
          <a className="btn btn-es col-10  mt-3">ثبت آگهی رایگان ملک</a>
        </Link>
        <Link href="/">
          <a className="btn btn-es  col-10 mt-3">ثبت آگهی مشاورین املاک</a>
        </Link>
      </Col>
    </>
  );
}
