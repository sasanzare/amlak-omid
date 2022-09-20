function BgTop(props) { 
  return (
    <div className="BgTop bg-cover text-center d-flex flex-column align-items-center justify-content-center" style={{ backgroundImage: `url(${props.img})` 
      }}>
         <h1 className={`text-white h2 fw-bold text-shadow ${props.myClass}`}>{props.content}</h1>
         {props.children}  
    </div>
  );
}

export default BgTop;