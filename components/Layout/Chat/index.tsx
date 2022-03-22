import { FC, useState } from "react";
import styled from "styled-components";

const contacts = [
  { id: "0", name: "Steve Harris", lastMessage: "Hi, I would like to... " },
  {
    id: "1",
    name: "Charlie Robinson",
    lastMessage: "Hey John, let's talk ",
  },
];

export const Chat: FC = () => {
  const [showContacts, setShowContacts] = useState(false);

  const toggleChat = () => {
    setShowContacts(state => !state);
  };

  return (
    <Box>
      <Header onClick={toggleChat}>
        <h4>Messages</h4>
      </Header>
      {showContacts && (
        <Body>
          <Contacts>
            {contacts.map(contact => (
              <li key={contact.id}>
                <div className="img"></div>
                <div>
                  <h5>{contact.name}</h5>
                  <p>{contact.lastMessage}</p>
                </div>
              </li>
            ))}
          </Contacts>
        </Body>
      )}
    </Box>
  );
};

const Box = styled.div`
  position: fixed;
  bottom: 0;
  right: 15px;
  border-radius: 0.5rem 0.5rem 0 0;
  width: 300px;
  overflow: hidden;
  z-index: 99;
  background-color: #fff;
`;
const Header = styled.header`
  width: 100%;
  background-color: #1f1c22;

  h4 {
    padding: 0.75rem;
    font-weight: 700;
    color: #fff;
  }
`;

const Body = styled.div`
  padding: 0.75rem;
  height: 400px;
  overflow: scroll;
  background-color: #f8f8f8;
`;

const Contacts = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & li {
    padding: 0.5rem 0;
    overflow: hidden;
  }

  & .img {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    display: inline-block;
    margin-right: 0.5rem;
  }

  & h5 {
    margin-bottom: 0.25rem;
  }

  & p {
    font-size: 0.75rem;
  }
`;
