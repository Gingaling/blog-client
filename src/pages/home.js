import { useEffect, useState } from 'react';

// Link component allow users to navigate to the blog post component page
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import http from '../lib/http';

// utility function to format the creation date
import formatDate from '../lib/formatDate';
// eslint-disable-next-line
import Home2 from './Home2.css';
// eslint-disable-next-line
import Post from './post';

const Home = () => {
  // useState allows us to make use of the component state to store the posts
  const [posts, setPosts] = useState([]); 
  useEffect(() => {
    // Call the server to fetch the posts and store them into the state
    async function fetchData() {
      const { data } = await http.get('/api/posts');
      setPosts(data.data.posts);
    }
    fetchData();
  }, []);
  
  return (
    <>
      <Container className="my-5" style={{ maxWidth: '800px' }}>
      <section>
        <Image
          src="https://i.imgur.com/QySQprg.png"
          width="100"
          className="d-block mx-auto img-fluid"
        />
        </section>
        <br></ br>
        <h2 className="text-center" id="header-style">Welcome to the LeftOver</h2>
      </Container>
      <Container className="post-style" style={{ maxWidth: '800px' }}>
        <ListGroup variant="flush" as="ol">
          {
            posts.map((post) => {
              // Map the posts to JSX
              return (
                <ListGroup.Item key={post._id}> 
                  <div className="fw-bold h3">
                    <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>{post.title}</Link>
                  </div>
                  <div>{post.userName} - <span className="text-secondary">{formatDate(post.createdAt)}</span></div>
                </ListGroup.Item>
              );
            })
          }
        </ListGroup>
      </Container>
    </>
  );
};

export default Home;