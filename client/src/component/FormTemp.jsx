 
import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
 
} from 'reactstrap';
import { Eye, EyeOff } from 'lucide-react';

const Commonform = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isbtnDisabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderInputsByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name];

    switch (getControlItem.componentType) {
      case 'input':
        element = (
          <FormGroup className="d-flex align-items-center">
            <Input
              name={getControlItem.name}
              type={showPassword ? 'text' : getControlItem.type}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              value={value}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                });
              }}
            />
            {getControlItem.type === 'password' && (
              <div
                className="cursor-pointer ml-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span>
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
            )}
          </FormGroup>
        );
        break;

      case 'select':
        element = (
          <Input
            type="select"
            name={getControlItem.name}
            id={getControlItem.name}
            value={value}
            onChange={(event) => {
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              });
            }}
          >
            <option value="" disabled>
              {getControlItem.label}
            </option>
            {getControlItem.options &&
              getControlItem.options.map((optionItem) => (
                <option key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </option>
              ))}
          </Input>
        );
        break;

      case 'textarea':
        element = (
          <Input
            type="textarea"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) => {
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              });
            }}
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) => {
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              });
            }}
          />
        );
        break;
    }

    return element;
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="d-flex flex-column gap-1">
        {formControls.map((controlItem) => (
          <FormGroup key={controlItem.name}>
            <Label for={controlItem.name}>{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </FormGroup>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3 mb-5">
      <Button type="submit" color="primary" className="mt-2 w-10" disabled={isbtnDisabled}>
        {buttonText || 'Submit'}
      </Button>
      </div>
      
    </Form>
  );
};

export default Commonform;