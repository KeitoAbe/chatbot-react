import { useState } from "react";
import "./App.css";
let bot_dictionary: any;

fetch(
  "https://script.google.com/macros/s/AKfycbyFUSiOd75JyMGfUlkRqHmtBGuIq5YMaXE5lmllIquPt6REsGwO3ua3EuBvqRN77RMkKw/exec"
)
  .then((res) => res.json())
  .then((result) => {
    bot_dictionary = result;
  });

function left_balloon(text: string) {
  return (
    <div>
      <p className="name">どく子ちゃん</p>
      <div className="chat_left">
        <img className="icon_img" src="src/img/dokuta.png"></img>
        <p className="left_balloon" style={{ whiteSpace: "pre-line" }}>
          {text}
        </p>
        <br className="clear_balloon" />
      </div>
    </div>
  );
}

function App() {
  const [text, setText] = useState("");
  const [replyText, setReplyText] = useState<string[]>([]);
  function write_message() {
    if (text !== "") {
      setReplyText([...replyText, text]);
    }
    setText("");
  }

  function answer(question: string) {
    if (
      bot_dictionary.some(
        (u: any) => ~question.indexOf(u.key1) && ~question.indexOf(u.key2)
      )
    ) {
      let dokuta_answer = bot_dictionary.find(
        (u: any) => ~question.indexOf(u.key1) && ~question.indexOf(u.key2)
      );
      return dokuta_answer["ans"];
    } else {
      return "うーん、難しい…\n履修登録、PorTaⅡ、図書館などについて聞いてほしい！";
    }
  }

  return (
    <div>
      <div className="maxWidth">
        <header>
          <a href="../" className="back">
            <i className="fa fa-arrow-left"></i>
          </a>
          <p className="do_tweet">チャットボットどく子ちゃん</p>
        </header>
        <div className="container">
          <section>
            <div className="chat_container">
              {left_balloon("私はどく子！！\nd-salonのキャラクターだよ！")}
              {left_balloon("獨協大学のことなら何でも聞いてね！")}
              {replyText.map((text) => {
                return (
                  <div>
                    <div className="chat_right">
                      <p className="post_date_right"></p>
                      <p className="right_balloon">{text}</p>
                      <br className="clear_balloon" />
                    </div>
                    <p className="name">どく子ちゃん</p>
                    <div className="chat_left">
                      <img className="icon_img" src="src/img/dokuta.png"></img>
                      <p
                        className="left_balloon"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: answer(text) }}
                        ></div>
                      </p>
                      <br className="clear_balloon" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <form method="post">
          <div className="form">
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              id="message"
              name="message"
              className="message"
            ></textarea>
            <svg
              onClick={write_message}
              className="send_icon"
              width="30px"
              height="30px"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 100 125"
              enable-background="new 0 0 100 100"
            >
              <path
                fill="#94847b"
                d="M5.1,90.8l7.6-32.9c0.3-1.4,1.5-2.5,3-2.7l42.5-4.4c1.2-0.1,1.2-1.9,0-2.1l-42.5-4.1c-1.5-0.1-2.7-1.2-3-2.6  L5.1,9.2C4.4,6.4,7.4,4.1,10,5.4l83.1,41.6c2.5,1.3,2.5,4.9,0,6.2L10,94.6C7.4,95.9,4.4,93.6,5.1,90.8z"
              />
              <text
                x="0"
                y="115"
                fill="#94847b"
                font-size="5px"
                font-weight="bold"
                font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
              ></text>
              <text
                x="0"
                y="120"
                fill="#94847b"
                font-size="5px"
                font-weight="bold"
                font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
              ></text>
            </svg>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
