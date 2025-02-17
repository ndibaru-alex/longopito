import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'reactstrap';
import {
  Col, Container, Row, Nav,
 
} from "reactstrap";
import { Button } from 'reactstrap';
import { DeleteIcon, Edit } from 'lucide-react';
import FormTemp from '../../component/FormTemp'
import ImageUpload from '../../component/Admin/ImageUpload';
import { addTeam, deleteTeam, fetchTeams, updateTeam } from '../../store/team-slice';




const initialFormData = {
    Name: "",
    title: '',
    image: null,
};

const team = () => {

  const [imageFile,setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch()
  const { teams} = useSelector((state)=>state.teamSlice)
  const [formData, setFormData] = useState(initialFormData)
  const [currentEditId,setCurrentEditId] = useState(null)
  

  const TeamForm = [
    {
        label: "Name",
        name: "Name",
        componentType: "input",
        placeholder: "Full Name",
      },
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "title",
    },
    
    

  ]

  const onSubmit = (event)=>{
    event.preventDefault()
    if(!uploadedImageUrl){
      alert('Please upload an image and title to submit')
      return;
    }

    currentEditId !== null ?
    dispatch(updateTeam({id:currentEditId,formData:{...formData,image:uploadedImageUrl}})).
    then(()=>{
      dispatch(fetchTeams())
      setFormData(initialFormData)
      setUploadedImageUrl('')
      setImageFile(null)
      setCurrentEditId(null)
    })
     :
    dispatch(addTeam({...formData,image:uploadedImageUrl}))
    .then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchTeams())
        setImageFile(null)
        setUploadedImageUrl('')
        setFormData(initialFormData)
      }
    })
  }

  const handleDelete = (id)=>{
     dispatch(deleteTeam(id))
     .then((data)=>{
         if(data.payload?.success){
          dispatch(fetchTeams())
         }
     })

  }

  

  useEffect(()=>{
    dispatch(fetchTeams())
  },[dispatch])
  

  return (
    <div>
      <div className="grid sm:grid-cols-2 grid-cols-2">
        <div>
          <h1 className="text-center text-[39px]">Upload Banner Image</h1>
          <ImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          imageLoadingState={imageLoadingState}
          setImageLoadingState={setImageLoadingState}
          />
        </div>
        <FormTemp
        formControls={TeamForm}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
      </div>

      <section className="section overflow-hidden" id="team">
                    <Container>
                        <Row className="justify-content-center">
                            <div className="col-12">
                                <div className="section-title text-center mb-4 pb-2">
                                    <h4 className="title mb-3">Meet the Team </h4>
                                    
                                </div>
                            </div>
                        </Row>

                        <Row>
                            {
                              teams && teams.length > 0 ?
                              teams.map((item, key) => (
                                <Col lg={3} md={6} className="mt-4 pt-2" key={key}>
                                    <Card className="border-0 text-center shadow border-0 overflow-hidden rounded">
                                        <img src={item?.image} className="img-fluid custom-img" alt="" style={{height : "350px"}} />
                                        <CardBody>
                                            <h5 className="mb-1">{item?.name}</h5>
                                            <small className="text-muted">{item?.title}</small>
                                        </CardBody>
                                        <CardFooter className='d-flex justify-content-between'>
                                          <Button color="primary" onClick={()=>{
                                            setCurrentEditId(item?._id)
                                            setFormData({
                                              Name: item?.Name,
                                              title: item?.title,
                                            })
                                            window.scrollTo({top:0,behavior:'smooth'})
                                          }}>
                                            <Edit />
                                          </Button>
                                          <Button color="danger" onClick={()=>handleDelete(item?._id)}>
                                            <DeleteIcon />
                                          </Button>
                                          </CardFooter>
                                    </Card>
                                </Col>
                            )):
                            <p>Upload new team members </p>
                            
                            }
                        </Row>
                    </Container>
                   
    </section>

    </div>
  );
}

export default team;
