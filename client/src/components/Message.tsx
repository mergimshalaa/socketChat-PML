import React from "react";
import styled from "styled-components";

type Props = {
  username: string;
  message: string;
  key: number;
};

export const Message: React.FC<Props> = ({ username, message }) => {
  return (
    <MessageWrapper>
      <SenderName>{username} said:</SenderName>
      <MessageContent>{message}</MessageContent>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  margin-bottom: 1rem
`;

const SenderName = styled.div`
  padding: 0.5rem;
`;

const MessageContent = styled.div`
  display: inline-block;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;
