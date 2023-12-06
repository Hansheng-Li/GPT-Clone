import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import homeIcon from './assets/home.svg';
import sendIcon from './assets/bookmark.svg'; 
import rocketIcon from './assets/rocket.svg';
import React, { useEffect } from 'react';
import sendBtem from './assets/send.svg'; 
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';
import { useState } from 'react';  
import { useRef } from 'react'; 
// import axios from 'axios';
// import cheerio from 'cheerio';


function App() {    
  // useEffect(() => {
    // const url = 'https://www.zhihu.com/question/631978591';   
  //   axios.get(url)
  //     .then(response => {
  //       const html = response.data;
  //       const $ = cheerio.load(html); // 使用 load 函数
  //       const title = $('.QuestionHeader-title').text();
  //       console.log(title);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching the page:', error);
  //     });
  // }, []);
 
  const msgEnd = useRef(null);

  const[input, setInput] = useState(''); 
  const[messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "How may I help you today?" 
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView({ behavior: 'smooth' });
  },[messages]);  
  
  const handleSend = async () => { 
    const newMessage = { role: "user", content: input };
    setInput('');
   
    setMessages(prevMessages => [...prevMessages, newMessage]);
   
    const response = await sendMsgToOpenAI([...messages, newMessage]);
    const assistantMessage = { role: response.message.role, content: response.message.content };
   
    setMessages(prevMessages => [...prevMessages, assistantMessage]);
  }

  const handleQuery = async (e) => {
    const content = e.target.value;
    setInput('');
   
    const newMessage = { role: "user", content: content };
   
    setMessages(prevMessages => [...prevMessages, newMessage]);
   
    const response = await sendMsgToOpenAI([...messages, newMessage]);
    const assistantMessage = { role: response.message.role, content: response.message.content };
   
    setMessages(prevMessages => [...prevMessages, assistantMessage]);
  }

  return ( 
    <div className="App">
      <div className='sideBar'> 
        <div className='upperSide'>  
          <div className='upperSideTop'>
            <img src={gptLogo} alt="Logo" className='logo'/>

            <span className='brand'> ChatGPT</span> 
          </div>
          <button className='midBtn' onClick={()=>{window.location.reload()}}>
            <img src={addBtn} alt='new chat' className='addBtn'/>
            New Chat
          </button>
          <div className='upperSideBottom'>
            <button className='query' onClick={handleQuery} value={'What is GPT?'}><img src={msgIcon} alt='Query' />
              What is GPT?
            </button>
            <button className='query' onClick={handleQuery} value={'What can you do?'}><img src={msgIcon} alt='Query' />
              What can you do?
            </button>
          </div>
        </div>
        <div className='lowerSide'> 
          <div className='listItems'><img src={homeIcon} alt='' className='listItemsImg'/>Home</div>
          <div className='listItems'><img src={sendIcon} alt='' className='listItemsImg'/>Saved</div>
          <div className='listItems'><img src={rocketIcon} alt='' className='listItemsImg'/>Upreade to Pro</div>
        </div>
      </div>
      <div className='main'> 
        <div className="chats">
          {messages.map((message, i) =>
            <div key={i} className={message.role==='assistant'?'chat bot':'chat'}>
              <img className="chatImg" src={message.role==='assistant'?gptImgLogo:userIcon} alt="" /><p className="txt">{message.content}</p>
            </div> 
          )}
          <div ref={msgEnd}/>
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input 
              type='text' 
              placeholder='Send a message' 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown ={(e) => {
                if (e.key === 'Enter') {
                  handleSend();  // 当按下回车键时调用 handleSend 函数
                }
              }}
            />
            <button className='send' onClick={handleSend}>
              <img src={sendBtem} alt='end'></img>
            </button>
          </div> 
          <p className='bottomText'>ChatGPT can make mistakes. Consider checking important information.</p>
        </div>
      </div> 
    </div>
  );
}

export default App;
