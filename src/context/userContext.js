import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase.config";
import { collection, getDocs } from "firebase/firestore";
const userContext = createContext();

const useValue = () => {
  const value = useContext(userContext);
  return value;
};

function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async()=>{
    const snapShot = await getDocs(collection(db, 'products'));
    const docs = snapShot.docs.map((product)=>{return {id: product.id, ...product.data()}});
    setProducts(docs);
  }
  
  useEffect(()=>{
    fetchProducts();
  },[])
  return (
    <userContext.Provider value={{ useValue, isLoggedIn, setIsLoggedIn, products }}>
      {children}
    </userContext.Provider>
  );
}

export { useValue };
export default UserContextProvider;
