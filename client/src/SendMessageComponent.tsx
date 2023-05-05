// import { useState } from "react";
// import { io } from "socket.io-client";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperclip, faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


// const socket = io("http://localhost:3001");

// function MessageInput() {
//   const [message, setMessage] = useState("");

//   const handleSend = () => {
//     if (message) {
//       socket.emit("send-message", message);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="message-input">
//       <div className="input-group">
//         <span className="input-group-addon">
//           <FontAwesomeIcon icon={faPaperclip} />
//         </span>
//         <span className="input-group-addon">
//           <FontAwesomeIcon icon={faImage} />
//         </span>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Type message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <span className="input-group-btn">
//           <button className="btn btn-primary" onClick={handleSend}>
//             <FontAwesomeIcon icon={faPaperPlane} />
//           </button>
//         </span>
//       </div>
//     </div>
//   );
// }

// export default MessageInput;
