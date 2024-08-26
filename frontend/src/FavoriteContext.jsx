import { createContext, useState } from "react";

const FavoriteContext = createContext(new Set());

export const FavoriteContextProvider = ({ children }) =>{
const [favorites, setFavorites] = useState(null);
console.log(favorites)
return(
<FavoriteContext.Provider value = {[favorites, setFavorites]}>
  { children }
</FavoriteContext.Provider>
)
}
export default FavoriteContext