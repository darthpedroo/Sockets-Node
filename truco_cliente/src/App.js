
import io from 'socket.io-client'
import {useEffect, useState} from "react"

const socket = io.connect("http://localhost:3001")
function App() {

  const [room, setRoom] = useState("")
  const [userId, setUserId] = useState("")
  
  const[message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState([])
  const [cards, setCards] = useState([])

  const sendMessage = () => {
    socket.emit("send_message", {message: message, room:room})
  }

  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room", room)
    }
  }

  const testSocketId = () =>{
    console.log("testSocketId: ", userId)

    //socket.emit("send_cards", userId)
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected")
      setUserId(socket.id);
    })
  
    socket.on("receive_message", (data) => {
      setMessageReceived(prevMessages => [
        ...prevMessages,
        data.message
      ]);
    });
  
    socket.on("initial_cards", (initialCards) => {
      console.log("Received initial cards:", initialCards);
      setCards(initialCards);
    });
  
    return () => {
      socket.off("receive_message");
      socket.off("test"); // Make sure to remove the event listener when component unmounts
    };
  }, []);



  useEffect(()=> {
    console.log("Hello Ohio")
    socket.emit("join_room", userId)

  },[userId])
  



  return (
    <div >

      <button onClick={testSocketId}>XD</button>

      <input placeholder="Room Code" onChange={(event) => {setRoom(event.target.value)}}>

      </input>
      <button onClick={joinRoom}>JOIN NOW TO THE MEGA SUPER MEGA ROOM</button>
      
      <br></br>
      <br></br>

      <input placeholder="hiyaa" onChange={(event) => {
        setMessage(event.target.value)
      }}>
        </input>
      
      <button onClick={sendMessage}>
        POSTEAR
      </button>

      <h1>Received Messages:</h1>
      <ul>
        {messageReceived.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>


      <div>
        <ul>
        {cards.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}

        </ul>
      </div>

    </div>
  );
}

export default App;
