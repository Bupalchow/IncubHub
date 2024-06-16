import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import axios from "axios";
import { ConnectWallet } from "@fewcha/web3-react";
const AuthPage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    axios
      .post("http://localhost:3001/authenticate", { username: value })
      .then((r) => props.onAuth({ ...r.data, secret: value }))
      .catch((e) => console.log("Auth Error", e));
  };
  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome To The Chat</div>
        <div className="form-subtitle">Set a username to get started</div>
        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
          <div style={{display:"flex", height:"30px", gap:'20px'}}>
          <ConnectWallet type="submit" />
          <WalletSelector type='submit' />
          </div>
        </div>
      </form>
      
    </div>
  );
};
export default AuthPage;