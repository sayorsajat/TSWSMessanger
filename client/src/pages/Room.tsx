import React, { useEffect, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addNewMessage, selectMessages, setMessages } from '../features/redux/messages/messageSlice';
import { loadMessages } from '../http/messageAPI';
import { Button, Container, FormControl, Input } from '@mui/material';
import { selectUser } from '../features/redux/user/userSlice';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8000", {
  extraHeaders: {
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
export const Room = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const {userName}: any = useAppSelector(selectUser);
  const {id}: any = useAppSelector(selectUser);

  const [currentMessage, setCurrentMessage] = useState('')
  const [file, setFile] = useState(null)

  const {roomId} = useParams();

  useEffect(() => {
    socket.emit('joinRoom', {roomId: roomId, authorization: localStorage.getItem('token')})
    loadMessages(String(roomId)).then(data => dispatch(setMessages(data)));

    socket.on('newMessageToClientsInRoom', data => {
      dispatch(addNewMessage({id: data.id, content: data.content, roomId: data.room, userName: data.userName, image: data.image}));
      console.log(data);
    })
  }, [roomId])
  
  const handleMessageSubmit = (e: any) => {
    e.preventDefault()

    socket.emit('newMessageToServer', {
      authorization: localStorage.getItem('token'),
      content: currentMessage, 
      roomId,
      userId: id,
      userName,
      image: String(file)
    });
    setFile(null)
    setCurrentMessage('')
  }

  return (
    <>
      <Container style={{width: '90vw'}}>
        {messages.map((message) =>
          <div key={message.id}>
            <div>{message.userName}: {message.content}</div>
            {(message.image !== null && message.image !== undefined)?
              <img src={'http://localhost:5000/' + message.image} />
              :
              null
            }
          </div>
        )}
      </Container>
      <form style={{position: 'fixed', bottom: '0', width: "70%", margin: '0 auto'}} onSubmit={(e) => handleMessageSubmit(e)}>
        <Container style={{width: '90vw'}}>
          <div style={{width: '50vw', display: 'flex', float: 'right'}}>
            <FormControl variant='standard'>
              <Input fullWidth
                type='file'
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.files![0]) {
                    let imageObject: any = target.files![0]
                    setFile(imageObject)
                  }
                }}
              />
              <AttachFileIcon />
            </FormControl>
            <FormControl fullWidth variant='standard'>
              <Input fullWidth
                  type='text'
                  placeholder="Message..."
                  inputProps={{'aria-label': 'message'}}
                  value={currentMessage}
                  onChange={e => {
                    setCurrentMessage(e.target.value)
                  }}
              />
            </FormControl>
            <Button style={{marginTop: '15px', marginBottom: '40px'}} type='submit' color='inherit' variant='text'>Send</Button>
          </div>
        </Container>
      </form>
    </>
  )
}
