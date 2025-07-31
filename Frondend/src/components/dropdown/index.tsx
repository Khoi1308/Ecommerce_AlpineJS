import "./index.css";

export function DropdownMenu(props) {
  return <div className="dropdown">{props.children}</div>;
}

export function DropdownItem(props) {
  return (
    <a className="menu-item cursor-pointer">
      <span className="icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-button">{props.rightIcon}</span>
    </a>
  );
}
