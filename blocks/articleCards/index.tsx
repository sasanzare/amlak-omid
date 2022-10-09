import ArticleCard from "../../components/ArticleCard";
export default function ArticleCards(props) {
  return (
    <div className="ArticleCards col-lg-4 col-md-6 col-11 mx-auto pt-5">
      <ArticleCard
        img={props.img}
        title={props.title}
        content={props.content}
      />
    </div>
  );
}
