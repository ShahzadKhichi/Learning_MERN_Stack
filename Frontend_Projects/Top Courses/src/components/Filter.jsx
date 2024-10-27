function Filter(props) {
  const data = props.data;
  let title = "All";
  function clickHandler(event) {
    props.filterHandler(event.target.id, event.target.name);
  }
  console.log(data);

  return (
    <div className=" m-2">
      {data.map((btn) =>
        btn.id == props.filterId ? (
          <button
            key={btn.id}
            id={btn.id}
            name={btn.title}
            className={`px-3 mx-1 text-white rounded bg-slate-900  `}
            onClick={clickHandler}
          >
            {btn.title}
          </button>
        ) : (
          <button
            key={btn.id}
            id={btn.id}
            name={btn.title}
            className={`px-3 mx-1 text-white rounded bg-slate-900 opacity-50 `}
            onClick={clickHandler}
          >
            {btn.title}
          </button>
        )
      )}
    </div>
  );
}
export default Filter;
