import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { 
  Container, 
  Button, 
  Box, 
  Typography,
  TextField,
  IconButton,
  Grid,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "../styles/Form.css";

function Form() {
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      dateOfBirth: '',
      workExperiences: [{ 
        companyName: '', 
        role: '', 
        yearsOfExperience: '' 
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperiences'
  });

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    alert("Form submitted successfully!");
    
    reset();
  };

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^\d{10}$/;

  return (
    <Container maxWidth="md" className="form-container">
      <Typography variant="h4" component="h1" className="form-title">
        Registration Form
      </Typography>
      

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="form-row">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                className="input-field first-name"
              />
            )}
          />
        </Box>
        
        <Box className="form-row">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                fullWidth
                className="input-field last-name"
              />
            )}
          />
        </Box>
        
        <Box className="form-row">
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ 
              required: 'Phone number is required',
              pattern: {
                value: phonePattern,
                message: 'Please enter a valid 10-digit phone number'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                variant="outlined"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                className="input-field phone"
              />
            )}
          />
        </Box>
        
        <Box className="form-row">
          <Controller
            name="email"
            control={control}
            rules={{ 
              required: 'Email is required',
              pattern: {
                value: emailPattern,
                message: 'Please enter a valid email address'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                className="input-field email"
              />
            )}
          />
        </Box>
        
        <Box className="form-row">
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className="input-field dob"
              />
            )}
          />
        </Box>
        
        <Paper elevation={3} className="work-experience-section">
          <Typography variant="h6" component="h2" className="section-title">
            Work Experience
          </Typography>
          
          {fields.map((item, index) => (
            <Box key={item.id} className="experience-row">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Controller
                    name={`workExperiences.${index}.companyName`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        className="experience-field company"
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={3}>
                  <Controller
                    name={`workExperiences.${index}.role`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Role/Position"
                        variant="outlined"
                        fullWidth
                        className="experience-field role"
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={4}>
                  <Controller
                    name={`workExperiences.${index}.yearsOfExperience`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Years of Experience"
                        variant="outlined"
                        type="number"
                        fullWidth
                        className="experience-field years"
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={2} className="experience-buttons">
                  <IconButton 
                    aria-label="remove"
                    onClick={() => fields.length > 1 && remove(index)}
                    disabled={fields.length === 1}
                    size="small"
                    className="icon-button remove-button"
                  >
                    <RemoveIcon />
                  </IconButton>
                  
                  <IconButton 
                    aria-label="add"
                    onClick={() => append({ companyName: '', role: '', yearsOfExperience: '' })}
                    size="small"
                    className="icon-button add-button"
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Paper>
        
        <Box className="form-row submit-container">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className="submit-button"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Form;
