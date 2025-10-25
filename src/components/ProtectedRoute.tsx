import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useWallet from "../hooks/useWallet";
import { useToast } from "../contexts/ToastContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isConnected } = useWallet();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isConnected) {
      showToast({
        type: 'warning',
        title: 'Wallet Required',
        message: 'Please connect your wallet to access this page'
      });
    }
  }, [isConnected, showToast]);

  if (!isConnected) {
    return <Navigate to="/wallet-login" replace />;
  }

  return <>{children}</>;
}
