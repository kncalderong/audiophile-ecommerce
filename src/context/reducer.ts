import { GlobalAction } from "./actions";
import { GlobalState } from "./appContext";

export default function reducer(
  state: GlobalState,
  action: GlobalAction
): GlobalState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, amount } = action.payload;
      const existingProduct = state.productsAddedToCart.find(
        (p) => p.id === product.id
      );

      return {
        ...state,
        productsAddedToCart: existingProduct
          ? state.productsAddedToCart.map((p) =>
              p.id === product.id ? { ...p, amount: p.amount + amount } : p
            )
          : [...state.productsAddedToCart, { ...product, amount }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        productsAddedToCart: state.productsAddedToCart.filter(
          (product) => product.id !== action.payload.productId
        ),
      };

    default: {
      console.error(
        `No such action type: ${String((action as { type: string }).type)}`
      );
      return state;
    }
  }
}
