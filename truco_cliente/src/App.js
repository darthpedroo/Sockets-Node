
import io from 'socket.io-client'
import {useEffect, useState} from "react"

const socket = io.connect("http://localhost:3001")

function App() {

  const [room, setRoom] = useState("")

  const[message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState([])

  const sendMessage = () => {
    socket.emit("send_message", {message: message, room:room})
  }

  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room", room)
    }
  }

  const receiveCards = () => {
    console.log("AWSA")
    socket.emit("test", socket.id)

  }

  useEffect(() => {
    console.log(socket)
    socket.emit("firstInput", socket.id)
    
  }, []); 

  useEffect(() => {

    console.log("sus...")

    socket.on("receive_message", (data) => {
      setMessageReceived(prevMessages => [
        ...prevMessages,
        data.message
      ]);
    });
    
    // Cleanup function to remove event listener
    return () => {
      socket.off("receive_message");
    };
  }, []); 

  



  return (
    <div >

      <button onClick={receiveCards}>XD</button>

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

    </div>
  );
}

export default App;
