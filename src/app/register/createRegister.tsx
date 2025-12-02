import CreateRegisterForm from "@/components/organisms/createRegisterForm";
import { useStatusBar } from "@/hooks/useStatusBar";

export default function RegisterFossil() {
    useStatusBar("dark"); 
  return (
    <>
      <CreateRegisterForm />
    </>
  );
}
