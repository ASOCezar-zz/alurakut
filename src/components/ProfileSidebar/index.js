import Box from "../Box";

const ProfileSidebar = (props) => {
    
    return (
        <Box >
         <img src={`http://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
        </Box>
    )
}

export default ProfileSidebar;