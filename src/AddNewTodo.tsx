import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTable } from './hooks';






const validationSchema = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .trim(),
    location: yup
      .string()
      .required('Location is required')
      .trim(),
      title: yup
      .string()
      .required('Title is required')
      .trim(),
  });
  
export const AddNewTodo =()=> {

    const {addNewContact} = useTable();

    const formik = useFormik({
        initialValues: {
          name: '',
          location: '',
          title: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            addNewContact(values)
        },
      });
      return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
            fullWidth
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            label="Name"
            error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
            fullWidth
            id="location"
            name="location"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.location}
            label="Location"
            error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
            fullWidth
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            label="Title"
            error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
            />

          <Button  variant="contained"  fullWidth type="submit">Submit</Button>
        </form>
      );

}

export default AddNewTodo;