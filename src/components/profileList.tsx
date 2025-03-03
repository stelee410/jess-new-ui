import ProfileCard from "./profileCard";
import { Grid } from '@mui/material';
import { Profile } from "@/types/profile";

function ProfileList({ profiles }: { profiles: Profile[] }) {
    if(!profiles){
        return null;
    }
    return (
        <Grid container>
              {profiles.map((profile, index) => (
                    <ProfileCard profile={profile} key={index}/>
                ))}
        </Grid>
    );
}

export default ProfileList;