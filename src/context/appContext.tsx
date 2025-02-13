import { Product } from "@prisma/client";
import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

export interface CartProduct extends Product {
  amount: number;
}

export interface GlobalState {
  productsAddedToCart: CartProduct[];
}

export interface AppContextType extends GlobalState {
  addToCart: (product: Product, amount?: number) => void;
  removeFromCart: (productId: string) => void;
}

const initialState: GlobalState = {
  productsAddedToCart: [],
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product: Product, amount: number = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, amount } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  return (
    <AppContext.Provider value={{ ...state, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
