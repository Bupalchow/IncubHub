import { PrettyChatWindow } from "react-chat-engine-pretty";
import FormDialog from "./Components/Dialog";
import AlignItemsList from "./Components/Ideas";
import "./index.css"
const ChatsPage = (props) => {
  return (
    <div className="background">
      <div className="accordin">
        <AlignItemsList/>
      </div>
      <div className="Dialogbox" >
        <FormDialog />
      </div>
      <PrettyChatWindow
        projectId={'acded99f-f383-46d5-892e-54372380dcf9'}
        username={props.user.username}
        secret={props.user.secret}
      />
    </div>
  );
};

export default ChatsPage;