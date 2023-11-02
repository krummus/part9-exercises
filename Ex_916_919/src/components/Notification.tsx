import { NotificationProp } from "../types";

const Notification = (props : NotificationProp) => {
    if (props.message === '') {
      return (
        <div>
        </div>
      )
    }else{
        return(
            <div className="error">
            {props.message}
            </div>
        )
    }
}

export default Notification;