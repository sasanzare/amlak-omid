import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Button } from "react-bootstrap";
import SidebarNav from "./SidebarNav";

export default function Sidebar(props: { isShow: boolean; isShowMd: boolean }) {
  const { isShow, isShowMd } = props;
  const [isNarrow, setIsNarrow] = useState(false);

  const toggleIsNarrow = () => {
    const newValue = !isNarrow;
    localStorage.setItem("isNarrow", newValue ? "true" : "false");
    setIsNarrow(newValue);
  };

  // On first time load only
  useEffect(() => {
    if (localStorage.getItem("isNarrow")) {
      setIsNarrow(localStorage.getItem("isNarrow") === "true");
    }
  }, [setIsNarrow]);

  return (
    <div
      className={classNames("sidebar d-flex flex-column position-fixed h-100", {
        "sidebar-narrow": isNarrow,
        show: isShow,
        "md-hide": !isShowMd,
      })}
      id="sidebar"
    >
      <div className="sidebar-brand d-none d-md-flex align-items-center justify-content-center">
        <span className="sidebar-brand-full">Amlak Omid</span>
        <span className="sidebar-brand-narrow d-none">Omid</span>
      </div>

      <div className="sidebar-nav flex-fill">
        <SidebarNav />
      </div>

      <Button
        variant="link"
        className="sidebar-toggler d-none d-md-inline-block rounded-0 text-start pe-4 fw-bold shadow-none"
        onClick={toggleIsNarrow}
        type="button"
        aria-label="sidebar toggler"
      >
        <FontAwesomeIcon
          className="sidebar-toggler-chevron"
          icon={faAngleRight}
          fontSize={24}
        />
      </Button>
    </div>
  );
}

export const SidebarOverlay = (props: {
  isShowSidebar: boolean;
  toggleSidebar: () => void;
}) => {
  const { isShowSidebar, toggleSidebar } = props;

  return (
    <div
      tabIndex={-1}
      aria-hidden
      className={classNames(
        "sidebar-overlay position-fixed top-0 bg-dark w-100 h-100 opacity-50",
        {
          "d-none": !isShowSidebar,
        }
      )}
      onClick={toggleSidebar}
    />
  );
};
