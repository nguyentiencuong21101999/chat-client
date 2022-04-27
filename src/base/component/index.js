import { useNavigate } from "react-router-dom";
import Logger from "../../component/service/logger";

export const withNavigation = (Component) => {
  function handleNavigateWithState(navigate, pathName, state = {}) {
    Logger.info("withNavigation execute function handleNavigateWithState");
    Logger.debug(
      "withNavigation execute function handleNavigateWithState pathName",
      pathName
    );
    Logger.debug(
      "withNavigation execute function handleNavigateWithState state",
      state
    );
    navigate(pathName, {
      state: state,
    });
  }
  return (props) => {
    return (
      <Component
        {...props}
        navigate={useNavigate()}
        handleNavigateWithState={handleNavigateWithState}
      />
    );
  };
};
