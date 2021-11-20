import { FC, useState } from "react";

const ChatBox: FC = function () {
  const [showMessages, setShowMessages] = useState(false);

  const toggleChat = () => {
    setShowMessages((prevState) => !prevState);
  };

  return (
    <div className="w-64 rouded fixed bottom-0 right-10 rounded-t-md overflow-hidden">
      <header
        className="bg-black text-white cursor-pointer"
        onClick={toggleChat}
      >
        <h4 className="p-3 font-bold">Messages</h4>
      </header>
      {showMessages && (
        <main className="border">
          <section className="p-2">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
              ipsam accusantium ea nam, incidunt doloremque repellendus earum
              repudiandae enim tenetur aperiam nobis libero magnam impedit ipsum
              ducimus inventore rem sequi?
            </p>
          </section>
        </main>
      )}
    </div>
  );
};

export default ChatBox;
