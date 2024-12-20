import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data: any) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        // navigate("/auth/login");
        setTimeout(() => navigate("/auth/login"), 2000);
      } else {
        console.log(data?.payload?.message, "toast", toast);
        toast({
          title: "Scheduled: Catch up",
          description: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }
  useEffect(() => {
    toast({ title: "Test Toast" });
  }, []);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <button
        onClick={() =>
          toast({
            title: "Test Toast",
            description: "This is a test",
          })
        }
      >
        Trigger Toast
      </button>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login to your account
        </h1>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p className="mt-2">
        Don't have an account
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default AuthLogin;
