import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
// import {  Label } from "../ui/button";

const CommonForm = ({
  formData,
  setFormData,
  formControls,
  buttonText,
  onSubmit,
}) => {
  const renderInputsByComponentType = (getControlItem: any) => {
    return <></>;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem: any) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
