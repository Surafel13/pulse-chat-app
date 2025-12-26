import React from 'react'
import img1 from './../../Img/cat-1.jpg'
import './UsersBar.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../Context/UserContext'
import { db } from '../../firebase'
import { collection, query, onSnapshot, where } from 'firebase/firestore'

function UsersBar() {
    const navigate = useNavigate()
    const { receiverId } = useParams()
    const { user: currentUser } = useUser()

    const [users, setUsers] = React.useState([])
    const [conversations, setConversations] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [search, setSearch] = React.useState('')

    // 1. Listen to all users in real-time
    React.useEffect(() => {
        setLoading(true);
        const q = query(collection(db, "users"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersList);
            setLoading(false);
        }, (err) => {
            console.error('Failed to fetch users', err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // 2. Listen to real-time conversation updates for last messages
    React.useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, "conversations"),
            where("participants", "array-contains", currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const convMap = {};
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                const otherId = data.participants.find(id => id !== currentUser.uid);
                if (otherId) {
                    convMap[otherId] = data;
                }
            });
            setConversations(convMap);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const filteredUsers = React.useMemo(() => {
        const q = (search || '').trim().toLowerCase()

        let list = (users || [])
            .filter(u => u && u.id !== currentUser?.uid)
            .map(user => {
                const conv = conversations[user.id];
                let ts = 0;
                if (conv?.timestamp) {
                    ts = conv.timestamp?.toMillis ? conv.timestamp.toMillis() : (Number(conv.timestamp) || 0);
                }
                return {
                    ...user,
                    lastMsg: conv?.lastMessage || "Start a new conversation",
                    timestamp: ts
                };
            });

        // Sort: users with recent history come first
        list.sort((a, b) => b.timestamp - a.timestamp);

        if (!q) return list;

        return list.filter((u) => {
            const name = (u.displayName || '').toLowerCase()
            const email = (u.email || '').toLowerCase()
            return name.includes(q) || email.includes(q)
        });
    }, [users, search, conversations, currentUser])

    return (
        <div className='UsersContainer'>
            <div className='barHeader'>
                <h4>Chats</h4>
            </div>
            <div className='InputWrapper'>
                <input
                    type="text"
                    placeholder='Search students...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className='UsersList'>
                {loading ? (
                    <div className="spinnerWrap">
                        <div className="spinner"></div>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="emptyState">No students found</div>
                ) : (
                    filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className={`UserItem ${receiverId === user.id ? 'active' : ''}`}
                            onClick={() => navigate(`/Messaging/${user.id}`)}
                        >
                            <div className='imageWrapper'>
                                <img src={user.photoURL || img1} alt="img" />
                            </div>
                            <div className='UserInfo'>
                                <h6>{user.displayName || user.email.split('@')[0]}</h6>
                                <p>{user.lastMsg}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default UsersBar
