import styles from "./SelectPlayer.module.scss";
import Select from "react-select";

const options = [
  { value: 69, label: "69 Angelo Mathews" },
  { value: 11, label: "11 Kumar Sangakkara" },
  { value: 7, label: "07 Dasun Shanaka" },
];
const SelectPlayer = () => {
  return (
    <Select
      placeholder="Select a player"
      options={options}
      classNames={{
        container: () => styles.selectContainer,
        control: (state) =>
          `${styles.selectControl} ${
            state.isFocused && styles.selectControlFocused
          }`,
        option: (state) =>
          `${styles.selectOption} ${
            state.isFocused && styles.selectOptionFocused
          } ${state.isSelected && styles.selectOptionSelected} ${
            state.isRtl && styles.selectOptionNew
          } `,
        placeholder: () => styles.selectPlaceholder,
        input: (state) =>
          ` ${styles.selectInput}
          ${state.onFocus && styles.selectInputFocused}
    `,
        menu: () => styles.selectMenu,
        valueContainer: (state) =>
          `${styles.selectValueContainer} ${
            state.hasValue && styles.selectValueContainerHasValue
          }`,
      }}
    />
  );
};

export default SelectPlayer;
