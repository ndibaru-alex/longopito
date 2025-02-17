import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'reactstrap';

import { Button } from 'reactstrap';
import { DeleteIcon, Edit } from 'lucide-react';
import FormTemp from '../../component/FormTemp'
import ImageUpload from '../../component/Admin/ImageUpload';
import { createBanner, deleteBanner, editBanner } from '../../store/banner-slice';
import { fetchBanners } from '../../store/banner-slice';




const initialFormData = {
  image: null,
  title: '',
  description: '',
  to : ''

};

const banner = () => {

  const [imageFile,setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch()
  const { bannerList} = useSelector((state)=>state. bannerSlice)
  const [formData, setFormData] = useState(initialFormData)
  const [currentEditId,setCurrentEditId] = useState(null)
  

  const BannerForm = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter Banner title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter Banner description",
    },
    {
      label: "Link",
      name: "to",
      componentType: "input",
      placeholder: "Enter the link to",
    },

  ]

  const onSubmit = (event)=>{
    event.preventDefault()
    if(!uploadedImageUrl){
      alert('Please upload an image and title to submit')
      return;
    }

    currentEditId !== null ?
    dispatch(editBanner({id:currentEditId,formData:{...formData,image:uploadedImageUrl}})).
    then(()=>{
      dispatch(fetchBanners())
      setFormData(initialFormData)
      setUploadedImageUrl('')
      setImageFile(null)
      setCurrentEditId(null)
    })
     :
    dispatch(createBanner({...formData,image:uploadedImageUrl}))
    .then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchBanners())
        setImageFile(null)
        setUploadedImageUrl('')
        setFormData(initialFormData)
      }
    })
  }

  const handleDelete = (id)=>{
     dispatch(deleteBanner(id))
     .then((data)=>{
         if(data.payload?.success){
          dispatch(fetchBanners())
         }
     })

  }

  

  useEffect(()=>{
    dispatch(fetchBanners())
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
        formControls={BannerForm}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-14">
      {bannerList && bannerList.length > 0
        ? bannerList.map((item) => (
      <div key={item?._id} className="relative">  
        <Card>
          <CardHeader>
            <CardTitle className='text-center'>{item?.title}</CardTitle>
          </CardHeader>
          <CardBody> 
          <div className="d-flex justify-content-end gap-2">
            <Button className="absolute top-0 left-0 text-red-600 "
            outline
            onClick={()=>handleDelete(item?._id)}
            ><DeleteIcon />
           </Button>
           <Button className="absolute top-0 left-0 text-red-600"
            outline
            onClick={()=>{
              setCurrentEditId(item?._id)
              setFormData({
                title: item?.title,
                description: item?.description,
                to: item?.to
              })
              window.scrollTo({top:0,behavior:'smooth'})
            }}
            ><Edit/>
           </Button>
            </div>           
            <div>
              <img src={item?.image} alt={item?.title} className="" style={{ width: '700px', height: '350px' }} />
            </div>

            <div className="mt-2">{item?.description}</div>  
          </CardBody>
          <CardFooter>
            
          </CardFooter>
        </Card>
        
        
       
      </div>
    ))
    : <p>No features available</p>}
</div>

    </div>
  );
}

export default banner;
