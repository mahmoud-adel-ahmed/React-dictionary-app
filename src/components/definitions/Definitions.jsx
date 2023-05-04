import React from "react";
import "./defintions.css";

const Definitions = ({ meanings, word, LightTheme }) => {
  console.log(meanings);
  return (
    <div className="meanings">
      {word === "" ? (
        <span className="subTitle">Start by typing a word in search</span>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => {
              return (
                <div
                  key={def.definition}
                  className="singleMean"
                  style={{
                    backgroundColor: LightTheme ? "#3b5360" : "white",
                    color: LightTheme ? "white" : "black",
                  }}
                >
                  <b>{def.definition}</b>
                </div>
              );
            })
          )
        )
      )}
    </div>
  );
};

export default Definitions;
