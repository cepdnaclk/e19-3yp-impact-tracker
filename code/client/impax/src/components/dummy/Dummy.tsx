import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import { useAppState } from "../../states/appState";
import { useEffect } from "react";

interface Props {
  isOnline: boolean;
}

const Dummy: React.FC<Props> = ({ isOnline }: Props) => {
  const setIsInternetAvailable = useAppState(
    (state) => state.setIsInternetAvailable
  );
  // console.log("issss", isOnline);
  useEffect(() => {
    isOnline ? setIsInternetAvailable(true) : setIsInternetAvailable(false);
  }, [isOnline, setIsInternetAvailable]);

  return (
    <>
      <Sidebar />
      <Content
      //   isOnline={online}
      />
    </>
  );
};

export default Dummy;
