import Link from "next/link";
export default () => {
  return (
    <footer className="footer flex-column flex-md-row border-top d-flex align-items-center justify-content-between px-4 py-2 dir-l">
      <div>
        <span>Copyright</span> ©
        <Link href="/">
          <a className="text-decoration-none text-warning">
            <span>{new Date().getFullYear()}</span>
          </a>
        </Link>
      </div>
      <div className="ms-md-auto">
        Powered by&nbsp;
        <a
          className="text-decoration-none text-warning"
          href="https://sasanzare.ir"
          target="_blank"
        >
          Sasan Zare
        </a>
      </div>
    </footer>
  );
};
