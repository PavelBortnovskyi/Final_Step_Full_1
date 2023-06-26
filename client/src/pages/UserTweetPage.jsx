import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TweetList from 'src/UI/TweetList';
import { UserAllTypeTweets } from 'src/components/User/UserAllTypeTweets/UserAllTypeTweets';

import { getUserTweetsThunk } from 'src/redux/thunk/tweets/getUserTweets';

export const UserTweetPage = ({ idUser }) => {
  const { id } = useParams();
  const user = idUser ? idUser : id;
  const dispatch = useDispatch();
  const userTweets = useSelector((state) => state.userTweets.userTweets) || [];

  useEffect(() => {
    dispatch(getUserTweetsThunk({ userId: user, page: 0, pageSize: 100 }));
  }, [user, dispatch]);

  return (
    userTweets && (
      <Box>
        {/* <TweetList tweets={userTweets} /> */}
        <UserAllTypeTweets tweets={userTweets} />
      </Box>
    )
  );
};
