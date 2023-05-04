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
  let [debouncedVal] = useDebounce(word, 200);
  let dictionaryApi = async () => {
    try {
      let response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (debouncedVal) setMeanings(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!debouncedVal) return;
    dictionaryApi();
  }, [word, debouncedVal]);

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
          <span>{LightTheme ? "Dark" : "Light"} Mode</span>
          <Switch
            checked={LightTheme}
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
