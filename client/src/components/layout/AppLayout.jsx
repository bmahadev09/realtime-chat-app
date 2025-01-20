import { Drawer, Grid, Skeleton } from "@mui/material";
import Title from "../shared/Title";
import Header from "./Header";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobileMenu } from "../../redux/reducers/misc";

const AppLayout = () => (WrappedComponent) => {
  const ComponentWithLayout = (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();

    const { isMobileMenu } = useSelector((state) => state.misc);

    const { data, isLoading, refetch } = useMyChatsQuery();

    console.log("Chats", data);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id);
    };

    const handleMobileMenuClose = () => {
      dispatch(setIsMobileMenu(false));
    };

    return (
      <>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileMenuClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

        <main>
          <Grid container height={"calc(100vh - 4rem)"}>
            <Grid
              item
              sm={4}
              md={3}
              sx={{ display: { xs: "none", sm: "block" } }}
              height={"100%"}
            >
              {isLoading ? (
                <Skeleton />
              ) : (
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
              <WrappedComponent {...props} />
            </Grid>
            <Grid
              item
              md={4}
              lg={3}
              sx={{
                display: { xs: "none", md: "block" },
                padding: "2rem",
                bgcolor: "rgb(0,0,0,0.85)",
              }}
              height={"100%"}
            >
              <Profile />
            </Grid>
          </Grid>
        </main>
        <div>Footer</div>
      </>
    );
  };

  ComponentWithLayout.displayName = `AppLayout(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithLayout;
};
export default AppLayout;
