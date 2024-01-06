import { useAppState } from "../../../../states/appState";
import styles from "./SelectPlayer.module.scss";
import Select from "react-select";

const SelectPlayer: React.FC<{
  options: { value: string; label: string }[];
  buddyID: number;
  playerID?: number;
}> = ({ options, buddyID, playerID }) => {
  const updatePlayerMap = useAppState((state) => state.updatePlayerMap);
  const playerDetails = useAppState((state) => state.playerDetails);

  const handleOptionChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      updatePlayerMap(buddyID, parseInt(selectedOption.value));
    }
  };

  // Determine the initial value of the Select component
  let initialValue = null;
  if (playerID && playerDetails[playerID]) {
    initialValue = {
      value: playerID.toString(),
      label: `${playerID} ${playerDetails[playerID].name}`,
    };
  }
  return (
    <Select
      placeholder="Select a player"
      options={options}
      value={initialValue}
      onChange={handleOptionChange}
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
