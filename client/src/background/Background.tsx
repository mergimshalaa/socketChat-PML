import { PropsWithChildren } from "react";
import "./Background.css"; // Import background styles

function Background({ children }: PropsWithChildren) {
  return (
    <div className="background-container">
      <div className="logo-container">
        <h1>
          Chat
          <span className="io">.IO</span>
        </h1>
      </div>
      {children}
    </div>
  );
}

export default Background;
