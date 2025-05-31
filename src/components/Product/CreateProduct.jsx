import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { createProductApi, productCategory } from "../../services/api";
import { updateCategoty } from "../../redux/actions/categoryAction";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ImageDropzone from "../ImageDropzone/ImageDropzone";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const { categoryList } = useSelector((state) => state?.categoryReducer);

  const fetchProductcategoryList = async () => {
    try {
      const response = await productCategory();
      if (response.status === 200) {
        dispatch(updateCategoty(response?.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProductcategoryList();
  }, []);

  const onSubmit = async (data) => {
 
    try {
      const response = await createProductApi(data);
       if (response?.status === 200) {
        toast.success("product create successfully");
        navigate("/dashboard")
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4" gutterBottom>
            Create Product
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "600px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            label="Title"
            variant="filled"
            fullWidth
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Price"
            variant="filled"
            fullWidth
            type="number"
            inputProps={{ step: "1", min: "1" }}
            sx={{
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            }}
            {...register("price", {
              required: "Price is required",
              min: {
                value: 1,
                message: "Price must be greater than 0",
              },
              valueAsNumber: true,
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            label="Description"
            variant="filled"
            fullWidth
            multiline
            rows={4}
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <FormControl
            fullWidth
            variant="filled"
            error={!!errors.category}
            margin="normal"
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select labelId="category-label" label="Category" {...field}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categoryList.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.category?.message}</FormHelperText>
          </FormControl>

          <Controller
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field, fieldState: { error } }) => (
              <ImageDropzone
                value={field.value}
                onChange={field.onChange}
                error={error}
              />
            )}
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateProduct;
