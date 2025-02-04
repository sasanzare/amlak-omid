import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBell,
  faFileLines,
  faStar,
  IconDefinition,
  faMessage,
  faQuestionCircle,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBug,
  faCalculator,
  faChartPie,
  faChevronUp,
  faCode,
  faDroplet,
  faGauge,
  faLayerGroup,
  faLocationArrow,
  faPencil,
  faPuzzlePiece,
  faRightToBracket,
  faNewspaper,
  faEarth,
  faPlaneDeparture,
  faWarning
} from "@fortawesome/free-solid-svg-icons";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Accordion,
  AccordionContext,
  Badge,
  Button,
  Nav,
  useAccordionButton,
} from "react-bootstrap";
import classNames from "classnames";
import Link from "next/link";

type SidebarNavItemProps = {
  href: string;
  icon?: IconDefinition;
} & PropsWithChildren;

const SidebarNavItem = (props: SidebarNavItemProps) => {
  const { icon, children, href } = props;

  return (
    <Nav.Item>
      <Link href={href} passHref>
        <Nav.Link className="px-3 py-2 d-flex align-items-center">
          {icon ? (
            <FontAwesomeIcon className="nav-icon me-n3" icon={icon} />
          ) : (
            <span className="nav-icon ms-n3" />
          )}
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  );
};

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">
      {children}
    </li>
  );
};

type SidebarNavGroupToggleProps = {
  eventKey: string;
  icon: IconDefinition;
  setIsShow: (isShow: boolean) => void;
} & PropsWithChildren;

const SidebarNavGroupToggle = (props: SidebarNavGroupToggleProps) => {
  // https://react-bootstrap.github.io/components/accordion/#custom-toggle-with-expansion-awareness
  const { activeEventKey } = useContext(AccordionContext);
  const { eventKey, icon, children, setIsShow } = props;

  const decoratedOnClick = useAccordionButton(eventKey);

  const isCurrentEventKey = activeEventKey === eventKey;

  useEffect(() => {
    setIsShow(activeEventKey === eventKey);
  }, [activeEventKey, eventKey, setIsShow]);

  return (
    <Button
      variant="link"
      type="button"
      className={classNames(
        "rounded-0 nav-link px-3 py-2 d-flex align-items-center flex-fill w-100 shadow-none",
        {
          collapsed: !isCurrentEventKey,
        }
      )}
      onClick={decoratedOnClick}
    >
      <FontAwesomeIcon className="nav-icon me-n3" icon={icon} />
      {children}
      <div className="nav-chevron me-auto text-end">
        <FontAwesomeIcon size="xs" icon={faChevronUp} />
      </div>
    </Button>
  );
};

type SidebarNavGroupProps = {
  toggleIcon: IconDefinition;
  toggleText: string;
} & PropsWithChildren;

const SidebarNavGroup = (props: SidebarNavGroupProps) => {
  const { toggleIcon, toggleText, children } = props;

  const [isShow, setIsShow] = useState(false);

  return (
    <Accordion
      as="li"
      bsPrefix="nav-group"
      className={classNames({ show: isShow })}
    >
      <SidebarNavGroupToggle
        icon={toggleIcon}
        eventKey="0"
        setIsShow={setIsShow}
      >
        {toggleText}
      </SidebarNavGroupToggle>
      <Accordion.Collapse eventKey="0">
        <ul className="nav-group-items list-unstyled">{children}</ul>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default function SidebarNav() {
  return (
    <ul className="list-unstyled pt-4">
      <SidebarNavItem icon={faGauge} href="/">
        داشتبرد
        <small className="me-auto">
          <Badge bg="info">NEW</Badge>
        </small>
      </SidebarNavItem>



    
  
      <SidebarNavTitle>دسترسی سریع</SidebarNavTitle>
      <SidebarNavGroup toggleIcon={faUser} toggleText="کاربران">
        <SidebarNavItem href="/Admin/Users">
           کاربرها 
        </SidebarNavItem>
      </SidebarNavGroup>
      <SidebarNavGroup toggleIcon={faCalculator} toggleText="املاک‌">
        <SidebarNavItem href="/Admin/Agency">
          آژانس‌های املاک 
        </SidebarNavItem>
      </SidebarNavGroup>
      <SidebarNavGroup toggleIcon={faPuzzlePiece} toggleText="آگهی ها">
        <SidebarNavItem href="/Admin/RealEstate">
          آگهی ها
        </SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faNewspaper} toggleText="مقاله ها">
        {/* <SidebarNavItem href="/Admin/Articles/New">
          اضافه کردن مقاله
          <small className="me-auto">
            <Badge bg="danger">+</Badge>
          </small>
        </SidebarNavItem> */}
        <SidebarNavItem href="/Admin/Articles">
          مقاله‌ها
        </SidebarNavItem>
      </SidebarNavGroup>
    
      <SidebarNavGroup toggleIcon={faMessage} toggleText="ارتباط‌باما">
        <SidebarNavItem href="/Admin/Contact">
          فرم ارتباط‌‌باما
        </SidebarNavItem>
      </SidebarNavGroup>
     <SidebarNavGroup toggleIcon={faQuestionCircle} toggleText="سوالات متداول">
        <SidebarNavItem href="/Admin/Faq">
          سوالات
        </SidebarNavItem>
      </SidebarNavGroup>
    
      <SidebarNavGroup toggleIcon={faEarth} toggleText="شهر ها">
        <SidebarNavItem href="/Admin/City">
           شهر
        </SidebarNavItem>
        <SidebarNavItem href="/Admin/City/area">
           محله
        </SidebarNavItem>
      </SidebarNavGroup>
      <SidebarNavGroup toggleIcon={faFileLines} toggleText="یادداشت ها">
        <SidebarNavItem href="/Admin/Note">
           یادداشت
        </SidebarNavItem>
      </SidebarNavGroup>
      <SidebarNavGroup toggleIcon={faWarning} toggleText="گزارش‌ها">
        <SidebarNavItem href="/Admin/Report">
           گزارش
        </SidebarNavItem>
      </SidebarNavGroup>


 
    


      <SidebarNavGroup toggleIcon={faBell} toggleText="Notifications">

      </SidebarNavGroup>

 

      <SidebarNavTitle>Extras</SidebarNavTitle>


      
      <SidebarNavItem icon={faLayerGroup} href="tel:+989059048626">
        پشتیبانی
      </SidebarNavItem>
    </ul>
  );
}
