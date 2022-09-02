export default function Clip({src,cover=null}) { 
    return (
        <video height="100%" width="100%" controls poster={cover} className="Clip mt-3 p-0  rounded-5" >
                <source src={src} type="video/mp4" />
        </video>
    );
  }
  