import { alpha, Avatar, Box, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import {
  getChats,
  getMessages,
  getUserData,
} from 'src/redux/selectors/selectors';
import { Loading } from 'src/UI/Loading';
import UserNames from 'src/UI/UserNames';
import { getCurrentChat } from 'src/redux/thunk/getCurrentChat';
import { useEffect } from 'react';
import { setGuest } from 'src/redux/reducers/chatSlice';
import { findMessage } from './../../../redux/thunk/findMessage';

// ************ STYLE ************
const BoxSearchPerson = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  padding: '8px',
  borderBottom: ` 1px solid ${theme.palette.border.main}`,

  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    cursor: 'pointer',
  },
}));
// ************ STYLE ************

// ************ TabMessages ************
export const TabMessages = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUserData);
  const { isLoading, findMessage } = useSelector(getMessages);
  const { currentChat } = useSelector(getChats);

  // set Guest for chat
  const handleClick = (id) => {
    // get chat data
    // dispatch(getCurrentChat(id));
  };

  // set chat
  useEffect(() => {
    if (findMessage?.content) {
      console.log(findMessage.content);

      //*********** Convert findMessage.content to obj for viewing
      // Преобразование массива объектов в нужный формат
      const result = findMessage.content.reduce((acc, obj) => {
        // Ищем, есть ли уже чат с таким chatId в result
        const existingChat = acc.find((chat) => chat.chatId === obj.chatId);

        if (existingChat) {
          if (!existingChat.usersId.includes(obj.userId)) {
            existingChat.usersId.push(obj.userId);
          }

          existingChat.messagesData.push({
            messageId: obj.messageId,
            body: obj.body,
            sent: obj.sent,
          });
        } else {
          acc.push({
            chatId: obj.chatId,
            usersId: [obj.userId],
            messagesData: [
              {
                messageId: obj.messageId,
                body: obj.body,
                sent: obj.sent,
              },
            ],
          });
        }

        return acc;
      }, []);
      //**************************************

      console.log('res:', result);
    }
  }, [findMessage]);

  // return hello-string if searchStr is empty
  if ((!findMessage || findMessage.searchStr === '') && !isLoading)
    return <Typography>Try searching for people or messages</Typography>;

  // return Loading component if isLoading=true
  if (isLoading) return <Loading size={34} />;

  // check data not empty
  const isResult = findMessage?.content?.length ? true : false;

  // return content after loading
  return (
    <>
      {!isResult ? (
        <Box>
          <Typography variant="h5">no results</Typography>
          The term you entered did not bring up any results
        </Box>
      ) : (
        <Box>
          test
          {/* {findMessage.content
            .filter((find) => find.id !== user.id)
            .map(({ id, fullName, avatarImgUrl, userTag }) => (
              <BoxSearchPerson key={id} onClick={() => handleClick(id)}>
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  alt={fullName}
                  src={avatarImgUrl || 'img/avatar/empty-avatar.png'}
                />
                <UserNames
                  fullName={fullName}
                  userTag={userTag}
                  // text={''}
                  // postTime={''}
                />
              </BoxSearchPerson>
            ))} */}
        </Box>
      )}
    </>
  );
};
