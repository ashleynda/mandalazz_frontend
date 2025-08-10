import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import { useUserProfile } from '../lib/hooks/account/useAccountDetails';

export default function UploadAvatars() {
  const [avatarSrc, setAvatarSrc] = React.useState(undefined);
    const { data: userProfile } = useUserProfile();

    let initials = "";
  
  if (userProfile?.message?.user) {
    const { firstName = "", lastName = "" } = userProfile.message.user;
    initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ButtonBase
      component="label"
      role={undefined}
      tabIndex={-1} 
      aria-label="Avatar image"
      sx={{
        borderRadius: '40px',
        '&:has(:focus-visible)': {
          outline: '2px solid',
          outlineOffset: '2px',
        },
      }}
    >
      {/* <Avatar alt="Upload new avatar" src={avatarSrc} /> */}
       <Avatar
        alt="User Avatar"
        src={avatarSrc || undefined} // Only use src if we have an image
        sx={{
          bgcolor: '#26735B', // background color for initials
          color: '#fff',
        }}
      >
        {!avatarSrc && initials} {/* Show initials when no image */}
      </Avatar>
      <input
        type="file"
        accept="image/*"
        style={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        }}
        onChange={handleAvatarChange}
      />
    </ButtonBase>
  );
}
