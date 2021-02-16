import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getBoards } from '../Actions/Board';
import CreateBoard from "../Components/CreateBoard/CreateBoard"
import { NavBar }  from '../Components/NavBar/NavBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./index.css"

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const boards = useSelector((state) => state.board.boards);
  const loading = useSelector((state) => state.board.dashboardLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='dashboard-and-navbar'>
      <NavBar />
      <section className='dashboard'>
        <h1>Welcome {user && user.name}</h1>
        <h2>Your Boards</h2>
        <CreateBoard />
        {loading && <CircularProgress className='dashboard-loading' />}
        <div className='boards'>
        
          {boards.map((board) => (
            <Link key={board._id} to={`/board/${board._id}`} className='board-card'>
              {board.title}
            </Link>
          ))}
          
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
