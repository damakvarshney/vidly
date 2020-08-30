import React from "react";

const ListGroup = (props) => {
  const { onItemSelected, items, textProperty, valueProperty } = props;
  return (
    <div>
      <ul className="list-group">
        {items.map((genre) => (
          <li
            //genre._id = genre[valueProperty]
            key={genre[valueProperty]}
            className="list-group-item"
            //genre.name = genre[textProperty]
            onClick={() => onItemSelected(genre[textProperty])}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
