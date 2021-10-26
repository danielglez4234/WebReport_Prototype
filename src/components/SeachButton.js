import * as React                   from 'react';
import LoadingButton                from '@material-ui/lab/LoadingButton';
// import Box                          from '@mui/material/Box';
// import FormControlLabel             from '@mui/material/FormControlLabel';
// import Switch                       from '@mui/material/Switch';
// import SaveIcon                     from '@mui/icons-material/Save';
// import SendIcon                     from '@mui/icons-material/Send';
import PlayCircleFilledWhiteIcon    from '@mui/icons-material/PlayCircleFilledWhite';

export default function SeachButton() {
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

  return (
      <LoadingButton
        onClick={handleClick}
        loading={loading}
        loadingPosition="start"
        className="perfrom-query-button-search"
        variant="contained"
        startIcon={<PlayCircleFilledWhiteIcon/>}
      >
        Search
      </LoadingButton>
  );
}
