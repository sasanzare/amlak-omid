import styles from './ArticleCard.module.css';
function ArticleCard({ img, title, content,id,getId }) {
  return (
    <div className="ArticleCard rounded-3 overflow-hidden text-center shadow-sm pb-3">
      <img src={"/uploads/articles/"+img} className="w-100" height={200} />
      <h6 className='pt-3 text-truncate fw-bold'>{title}</h6>
      <p className={'px-3 ' + styles.content}  dangerouslySetInnerHTML={{ __html: content }} />
      <button onClick={getId} data-reactid={id} className="btn btn-es  col-lg-6 col-md-8 col-8 rounded-3 he-fit" >مشاهده ادامه مطلب</button>
    </div>
  );
}

export default ArticleCard;