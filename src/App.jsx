import { Container, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./components/header/header";
import axios from "axios";
import Definitions from "./components/definitions/Definitions";
import Footer from "./components/Footer/Footer";
import { useDebounce } from "use-debounce";

const App = () => {
  let [category, setCategory] = useState("en");
  let [word, setWord] = useState("");
  let [meanings, setMeanings] = useState([]);
  let [LightTheme, setLightTheme] = useState(false);
  let [debouncedVal] = useDebounce(word.trim(), 200);

  let dictionaryApi = async () => {
    try {
      if (debouncedVal) {
        let response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${debouncedVal}`
        );
        setMeanings(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getLocalTheme = () => {
    if (localStorage.getItem("LIGHT_THEME") !== null) {
      let localTheme = JSON.parse(localStorage.getItem("LIGHT_THEME"));
      let localWord = JSON.parse(localStorage.getItem("WORD"));
      setLightTheme(localTheme);
      setWord(localWord);
    } else {
      localStorage.setItem("LIGHT_THEME", JSON.stringify(LightTheme));
      localStorage.setItem("WORD", JSON.stringify(word));
    }
  };

  useEffect(() => {
    getLocalTheme();
  }, []);

  useEffect(() => {
    localStorage.setItem("LIGHT_THEME", JSON.stringify(LightTheme));
    localStorage.setItem("WORD", JSON.stringify(word));
  }, [LightTheme, word]);

  useEffect(() => {
    if (!debouncedVal) setMeanings([]);
    dictionaryApi();
  }, [debouncedVal]);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: LightTheme ? "#fff" : "#282c34",
        color: LightTheme ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span style={{ color: LightTheme ? "#000" : "#fff" }}>
            {LightTheme ? "Dark" : "Light"} Mode
          </span>
          <Switch
            checked={LightTheme}
            value={LightTheme}
            onChange={() => setLightTheme(!LightTheme)}
          />
        </div>
        <Header
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          word={word}
          setMeanings={setMeanings}
          LightTheme={LightTheme}
        />
        {meanings && (
          <Definitions
            meanings={meanings}
            word={word}
            debouncedVal={debouncedVal}
            LightTheme={LightTheme}
            category={category}
          />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default App;
