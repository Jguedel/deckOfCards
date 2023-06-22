import "./Card.css";
const Card = (props) => {
  let imgVar = "";
  if (props.img.cards[0] === undefined) {
    imgVar = "https://bicyclecards.org/wp-content/uploads/2019/11/red-56.jpg";
  } else {
    imgVar = props.img.cards[0].image;
  }

  return (
    <div
      className="singleCard"
      style={{ backgroundImage: `url(${imgVar})` }}
    ></div>
  );
};
export default Card;
