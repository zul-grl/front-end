"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserType } from "../_util/type";

type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  updateAddress: (address: string) => Promise<void>;
  fetchUserData: (userId: string) => Promise<void>;
  isAdmin: boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserData(userId).catch(() => {
        router.push("/auth/login");
      });
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(
        `https://food-delivery-back-end-r6wt.onrender.com/user/${userId}`
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const updateAddress = async (address: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/auth/login");
      return;
    }

    try {
      await axios.patch(
        `https://food-delivery-back-end-r6wt.onrender.com/user/${userId}`,
        { address }
      );
      setUser((prev) => (prev ? { ...prev, address } : null));
      localStorage.setItem("address", address);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, updateAddress, fetchUserData, isAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
