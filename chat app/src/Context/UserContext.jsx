import React, { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateStatus = async (uid, status) => {
        if (!uid) return;
        try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, {
                isOnline: status,
                lastSeen: serverTimestamp()
            });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                updateStatus(currentUser.uid, true);
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        const handleVisibilityChange = () => {
            if (auth.currentUser) {
                updateStatus(auth.currentUser.uid, document.visibilityState === 'visible');
            }
        };

        const handleUnload = () => {
            if (auth.currentUser) {
                // Use a small trick for synchronous-like firestore update on close if possible
                // though updateDoc is async. In modern browsers, we'd use navigator.sendBeacon
                // but for Firestore we just try our best here.
                updateStatus(auth.currentUser.uid, false);
            }
        };

        window.addEventListener('beforeunload', handleUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
