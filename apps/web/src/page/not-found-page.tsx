import { useNavigate } from "react-router-dom";
import { Button } from "@react-workshop/ui/button";
import { Container } from "@/components/container";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-32 text-center">
      <p className="text-6xl font-bold text-[#b88e2f]">404</p>
      <h1 className="text-2xl font-semibold text-[#333333]">Page not found</h1>
      <p className="text-sm text-[#9f9f9f]">
        The page you are looking for does not exist.
      </p>
      <Button onClick={() => navigate("/")}>Back to home</Button>
    </Container>
  );
}
