import Link from "next/link";
export default () => {
  return (
    <div className="d-flex justify-content-between align-items-center flex-md-row flex-column col-lg-9 col-12 mx-auto">
      {/* <Link href="/signin?goTo=/">
        <a className="btn btn-es col-lg-3 col-md-3 col-sm-5 col-6  mt-3">
          ثبت نام کاربر
        </a>
      </Link> */}
      <Link href="/signin/RealStateRegistration?goTo=/dashboard">
        <a className="btn btn-es col-lg-3 col-md-3 col-sm-5 col-6   mt-3">
          ثبت نام املاک
        </a>
      </Link>
      <Link href="/signin/AdvisorRegistration?goTo=/dashboard">
        <a className="btn btn-es col-lg-3 col-md-3 col-sm-5 col-6 mt-3">
          {" "}
          دعوت به همکاری
        </a>
      </Link>
    </div>
  );
};
