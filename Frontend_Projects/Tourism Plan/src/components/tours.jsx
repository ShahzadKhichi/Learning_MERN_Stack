import Card from "./card";
function Tours(props) {
  return (
    <div className="Tours flex flex-wrap place-content-center w-[100%]">
      {props.data.map((tour) => {
        return (
          <Card data={tour} key={tour.id} removeTour={props.removeTour}></Card>
        );
      })}
    </div>
  );
}
export default Tours;
