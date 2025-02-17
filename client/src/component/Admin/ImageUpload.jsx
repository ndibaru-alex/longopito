import React, { useEffect, useRef, useState } from 'react';
import {  
  Label,
  Input,
  Button,
  Spinner,  
} from 'reactstrap';
import { CloudUpload, File, FolderX } from 'lucide-react';
import axios from 'axios';

const ImageUpload = ({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
  formData,
}) => {

  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append('my_file', imageFile);
    data.append('folder', 'banner');

    const response = await axios.post(
      'https://longopito-api.onrender.com/api/upload-image',
      data
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? '' : 'max-w-md mx-auto'}`}>
      <Label className="text-lg font-semibold mb-2 d-block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? 'opacity-60' : ''
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          innerRef={inputRef}
          onChange={handleImageFileChange}
          className="d-none"
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? 'cursor-not-allowed' : 'cursor-pointer'
            } d-flex flex-column align-items-center justify-content-center h-32`}
          >
            <CloudUpload className="w-10 h-10 text-muted mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <div className="d-flex justify-content-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-center">
              {uploadedImageUrl && (
                <img
                  className="mt-3 img-thumbnail"
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  style={{ width: '200px', height: '150px' }}
                />
              )}
            </div>
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div className="d-flex align-items-center">
                <File className="w-8 text-primary mr-2 h-8" />
                <span className="text-sm font-medium">{imageFile.name}</span>
              </div>
              <Button
                color="link"
                className="text-muted hover:text-foreground p-0"
                onClick={handleRemoveImage}
              >
                <FolderX className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
