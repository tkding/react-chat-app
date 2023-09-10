import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { ChatMain } from './pages/chat-page/chat-main';
import { Navbar } from './components/Navbar';
import { CreatePost } from './pages/create-post/create-post';
import { PostMain } from './pages/post-page/post-main';
import { useState, createContext } from 'react';
import { UserPostMain } from './pages/user-post-page/user-post-main';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';

export interface Post{
  title: string;
  description: string;
  username: string;
  userId: string;
  id: string;
  createAt: string;
}

interface AppContextProps {
  room: number | null;
  setRoom: React.Dispatch<React.SetStateAction<number | null>>;
  postsList: Post[] | null;
  setPostsList: React.Dispatch<React.SetStateAction<Post[] | null>>;
}

const cookies = new Cookies();
export const AppContext = createContext<AppContextProps>({
  room: null,
  setRoom: () => {},
  postsList: null,
  setPostsList: () => {},
});

function App() {
  const [room, setRoom] = useState<number | null>(null);
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const [ user ] = useAuthState(auth);
  
  return(
    <div className="App">
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <AppContext.Provider value={{room, setRoom, postsList, setPostsList}}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PostMain />} />
            <Route path={`/user/${user?.displayName}`} element={<UserPostMain />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/chat" element={<ChatMain />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Router>
        </AppContext.Provider>
    </div>
  );
}

export default App;

