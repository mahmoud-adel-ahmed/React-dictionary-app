import React from "react";
import styles from "./header.module.css";
import { MenuItem, TextField, ThemeProvider, createTheme } from "@mui/material";
import categories from "../../data/category";

const Header = ({ category, setCategory, word, setWord, LightTheme }) => {
  let darkTheme = createTheme({
    palette: {
      primary: {
        main: LightTheme ? "#000" : "#fff",
      },
      mode: LightTheme ? "light" : "dark",
    },
  });

  let handleChange = (e) => {
    setCategory(e.target.value);
    setWord("");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.header}>
        <span
          className={styles.title}
          style={{ color: LightTheme ? "#000" : "#fff" }}
        >
          {word ? word : "word hunt"}
        </span>
        <div className={styles.inputs}>
          <TextField
            className={styles.search}
            label="Search a word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <TextField
            className={styles.select}
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e)}
          >
            {categories.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Header;
