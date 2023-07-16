import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../services/authService";

export const useRegisterUser = () =>
  useMutation({
    mutationFn: registerUser,
  });
export const useLogin = () =>
  useMutation({
    mutationFn: loginUser,
  });
