import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, ReactNode,useState,useEffect,useContext } from "react";
import { auth } from "../firebase/firebase";
import { registerUser } from "../helper/api-communication";


type AuthContextType={
    currentUser : User | null;
    loading:boolean;
    logout:()=>Promise<void>;
    manualRegister: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}:{children:ReactNode})=>{
    const [currentUser,setCurrentUser]= useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    },[]);

    const logout = async ()=>{
        await signOut(auth);
        setCurrentUser(null);
    }


  const manualRegister = async (name: string, email: string, password: string) => {
    try {
      const {firebaseUser} = await registerUser(name, email, password);
    //   setCurrentUser(data.user);
    setCurrentUser(firebaseUser.user); // Set Firebase user as current user
    } catch (error) {
      console.error("Manual registration error:", error);
      throw error;
    }
  };

    const value:AuthContextType={
        currentUser,
        loading,
        manualRegister,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

// Custom hook to use the AuthContext, and throw an error if not used within a provider
export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("UseAuth must be used within an AuthProvider");
    }
    return context; // This ensures TypeScript knows the context will never be null
  };