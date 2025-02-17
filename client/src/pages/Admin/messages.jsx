import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table,Button } from 'reactstrap';
import { deleteMessage, fetchMessages } from '../../store/message-slice';

const messages = () => {
    const {messages} = useSelector((state)=>state.messageSlice)
    const dispatch = useDispatch()

    const handleDelete = (id)=>{
           
        dispatch(deleteMessage(id)).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchMessages())
            }
        })
    }

    useEffect(()=>{
      dispatch(fetchMessages())
    },[dispatch])
  return (
    <div>
      <Table hover responsive>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th style={{ width: '40%' }}>Message</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((contact, index) => (
          <tr key={index}>
            <td>{contact.fullName}</td>
            <td>{contact.email}</td>
            <td>{contact.subject}</td>
            <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {contact.message}
            </td>
            <td>
              <Button color="danger" onClick={() => handleDelete(contact?._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default messages
