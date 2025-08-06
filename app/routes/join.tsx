import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Join() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/?focus=email");
  }, [navigate]);

  return null;
}