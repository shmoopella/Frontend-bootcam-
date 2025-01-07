function SomeList(props) {
  return (
    <div className="somelist">
      <ul>
        {props.list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SomeList;
