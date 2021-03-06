import React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

type Resume = {
  resume_id: string;
  title: string;
  updated_at: string;
  job_summary: string;
  skills: string;
  about_myself: string;
}

export default function ResumeCard(props: Resume) {

  const [title, setTitle] = useState<string>(props.title);
  const [jobSummary, setJobSummary] = useState(props.job_summary);
  const [skills, setSkills] = useState(props.skills);
  const [aboutMyself, setAboutMyself] = useState(props.about_myself);

  const [openStatus, setOpenStatus] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);

  const hundleResumeOpen = ((event: React.MouseEvent<HTMLElement>) => {
    setOpenStatus(!openStatus)
    event.stopPropagation();
  });
  
  const hundleDeleteConfirm = ((event: React.MouseEvent<HTMLElement>) => {
    setDeleteConfirm(!deleteConfirm)
    event.stopPropagation();
  });

  const deleteResume = ((event: React.MouseEvent<HTMLElement>) => {
    axios.delete<Resume>("https://yjsig8wqw9.execute-api.ap-northeast-1.amazonaws.com/Stage/resume/" + props.resume_id).then(() => {
      setDeleteConfirm(!deleteConfirm);
    });
    console.log(event);
    event.stopPropagation();
  })

  const updateResume = (event: React.MouseEvent<HTMLElement>) => {
    axios.put<Resume>("https://yjsig8wqw9.execute-api.ap-northeast-1.amazonaws.com/Stage/resume/" + props.resume_id, {
      resume_id: props.resume_id,
      title: title,
      contents: {
        job_summary: jobSummary,
        skills: skills,
        about_myself: aboutMyself,
      }
    }).then((res) => {
      console.log(res.data);
      setOpenStatus(!openStatus);
    });
    event.stopPropagation();
  }
  
  return (
    <>
      <Grid item xs={3}>
        <Card
          sx={{ maxWidth: 275, borderRadius: '16px' }}
          onClick={hundleResumeOpen}
          style={{margin: "0 auto", textAlign: "center"}}
        >
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              { props.updated_at }
            </Typography>
            <Typography variant="h5" component="div">
              { title }
            </Typography>
            <Button onClick={hundleDeleteConfirm}>
              ??????????????????
            </Button>
            <Dialog open={deleteConfirm} onClose={hundleDeleteConfirm}>
              <Typography>"{ title }" ????????????????????????</Typography>
              <Button onClick={deleteResume}>
                ??????
              </Button>
              <Button onClick={hundleDeleteConfirm}>
                ???????????????
              </Button>
            </Dialog>
          </CardContent>
        </Card>
        <Dialog open={openStatus} onClose={hundleResumeOpen}>
          <DialogTitle>
            <TextField variant="standard" label="????????????" value={title} onChange={(event) => {if(title !== event.target.value) setTitle(event.target.value);}}/>
          </DialogTitle>
          <DialogContent>
            {/*<TextField label="??????" placeholder={{}}/>
            <TextField label="????????????" placeholder={{}}/>
            <TextField label="????????????" placeholder={{}}/>
            <TextField label="??????" placeholder={{}}/>
            <TextField label="?????????" placeholder={{}}/>
            <TextField label="??????" placeholder={{}}/>*/}
          </DialogContent>
          <DialogContent>
            <TextField multiline label="????????????" value={jobSummary} onChange={(event) => {if(jobSummary !== event.target.value) setJobSummary(event.target.value);}}/>
          </DialogContent>
          <DialogContent>
            <TextField multiline label="???????????????????????????????????????" value={skills} onChange={(event) => {if(skills !== event.target.value) setSkills(event.target.value);}}/>
          </DialogContent>
          <DialogContent>
            <TextField multiline label="??????PR" value={aboutMyself} onChange={(event) => {if(aboutMyself !== event.target.value) setAboutMyself(event.target.value);}}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={updateResume}>?????????????????????</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
}
