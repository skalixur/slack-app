const { setAuthInfo } = useContext(AuthContext)
const { setAllUsersAndChannels } = useContext(UserChannelContext)

export function logOut() {
    setAuthInfo(null);
    setAllUsersAndChannels(null);
}

