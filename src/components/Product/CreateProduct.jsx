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
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  createProductApi,
  editProuctApi,
  getSingalProductApi,
  productCategory,
} from "../../services/api";
import { updateCategoty } from "../../redux/actions/categoryAction";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ImageDropzone from "../ImageDropzone/ImageDropzone";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
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

  const getSingalProductData = async () => {
    setLoading(true);

    try {
      const response = await getSingalProductApi(id);
      console.log("responseresponseresponse", response);
      setValue("category", response.data?.category);
      setValue("title", response.data?.title);
      setValue("price", response.data?.price);
      setValue("image", response.data?.image);
      setValue("description", response.data?.description);
      setLoading(false);
    } catch (error) {
      console.log("error :>> ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getSingalProductData();
    }
  }, [id]);

  const onSubmit = async (data) => {
    if (id) {
      const payload = {
        id: id,
        title: data?.title,
        price: data?.price,
        description: data?.description,
        category: data?.category,
        image: data?.image,
      };
      try {
        const response = await editProuctApi(id, payload);
        if (response?.status === 200) {
          toast.success("product update successfully");
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        const response = await createProductApi(data);
        if (response?.status === 200) {
          toast.success("product create successfully");
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth="sm">
          <Box mt={5} sx={{ paddingBottom: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4" gutterBottom>
                {id ? "Edit Product" : "Create Product"}
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
                variant="outlined"
                fullWidth
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ step: "0.01", min: "0" }}
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
                    value: 0.01,
                    message: "Price must be greater than 0",
                  },
                  valueAsNumber: true,
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
              <TextField
                label="Description"
                variant="outlined"
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
                variant="outlined"
                error={!!errors.category}
                margin="normal"
              >
                <InputLabel id="category-label">Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      labelId="category-label"
                      label="Category"
                      {...field}
                    >
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {id ? "Save" : "Submit"}
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default CreateProduct;
