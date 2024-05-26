import { LoggedInButton } from "./LoggedInButton";
import { LoginButton } from "./LoginButton";

export const AuthButton = () => {
  const user = null;

  if (!user) {
    return <LoginButton />;
  }

  return <LoggedInButton user={user} />;
};
