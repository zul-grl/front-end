"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { FoodOrderType } from "../_util/type";

type OrderContextType = {
  fetchOrderData: () => Promise<void>;
  fetchAllOrderData: () => Promise<void>;
  handleStatusChange: (
    newStatus: "pending" | "delivered" | "cancelled",
    foodOrderId: string
  ) => Promise<void>;
  orders: FoodOrderType[];
  setOrders: (orders: FoodOrderType[]) => void;
  loading: boolean;
  allOrders: FoodOrderType[];
  setAllOrders: (orders: FoodOrderType[]) => void;
};

const OrderContext = createContext<OrderContextType>({} as OrderContextType);

export const useOrder = () => useContext(OrderContext);

const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<FoodOrderType[]>([]);
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState<FoodOrderType[]>([]);

  const fetchOrderData = useCallback(async () => {
    const currentUserId = localStorage.getItem("userId");
    if (!currentUserId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://food-delivery-back-end-r6wt.onrender.com/food-order/${currentUserId}`
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllOrderData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://food-delivery-back-end-r6wt.onrender.com/food-order"
      );
      setAllOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching all orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    newStatus: "pending" | "delivered" | "cancelled",
    foodOrderId: string
  ) => {
    try {
      await axios.patch(
        `https://food-delivery-back-end-r6wt.onrender.com/food-order/${foodOrderId}`,
        {
          status: newStatus,
        }
      );
      fetchAllOrderData();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        fetchOrderData,
        fetchAllOrderData,
        handleStatusChange,
        orders,

        setOrders,
        loading,
        allOrders,
        setAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
