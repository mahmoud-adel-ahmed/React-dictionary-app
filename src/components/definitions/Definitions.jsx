import React from "react";
import "./defintions.css";

const Definitions = ({ meanings, word, LightTheme }) => {
  return (
    <div className="meanings">
      {word === "" ? (
        <span
          className="subTitle"
          style={{ color: LightTheme ? "#000" : "#fff" }}
        >
          Start by typing a word in search
        </span>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => {
              console.log(def);
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
                  <hr style={{ backgroundColor: "black", width: "100%" }} />
                  {def?.example && (
                    <span style={{ color: LightTheme ? "white" : "black" }}>
                      <b>Example :</b>
                      {def.example}
                    </span>
                  )}
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
