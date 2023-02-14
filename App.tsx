import * as React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchuser, setSearchUser] = useState('');

  const usersurl = 'https://jsonplaceholder.typicode.com/users';
  const postsurl = 'https://jsonplaceholder.typicode.com/posts';

  const fetchUsers = () => {
    fetch(usersurl)
      .then((res) => {
        if (!res.ok) {
          return Error('Oh no');
        }
        return res.json();
      })
      .then((data) => setUsers(data));
  };

  const fetchPosts = () => {
    fetch(postsurl)
      .then((res) => {
        if (!res.ok) {
          return Error('Oh no');
        }
        return res.json();
      })
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  useEffect(() => {}, [searchuser]);

  const filterUser = (searchuser: String) => {
    console.log(searchuser);

    if (searchuser != '') {
      console.log(users);
      const filteredUser = users.filter((x) =>
        x.name.toLowerCase().startsWith(searchuser)
      );
      console.log(filteredUser);
      setUsers(filteredUser);
    } else {
      fetchUsers();
      fetchPosts();
    }
  };

  return (
    <div>
      <h2 data-testid="my-title">Users Post</h2>
      <div>
        <input
          type="search"
          placeholder="search user🔍"
          onChange={(e) => filterUser(e.target.value)}
        />
      </div>
      {users.length > 0 &&
        posts.length > 0 &&
        users.map((user, key) => (
          <div key={user.id}>
            <h1 key={key}>{user.name}</h1>
            <div className="post">
              <h3>{posts[key].title}</h3>
              <p>{posts[key].body}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
