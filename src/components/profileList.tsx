import ProfileCard from "./profileCard";
import { Grid } from '@mui/material';
import { Profile } from "@/types/profile";
function ProfileList({ profiles }: { profiles: Profile[] }) {
    if(!profiles){
        return null;
    }
    return (
        <Grid container spacing={2}>
              {profiles.map((profile, index) => (
                    <ProfileCard key={index} profile={profile}/>
                ))}
        </Grid>
    );
}

export default ProfileList;