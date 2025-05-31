import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Tooltip,
  Select,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProuctApi,
  getProductList,
  productCategory,
} from "../../services/api";
import { updateProductList } from "../../redux/actions/productAction";
import { updateCategoty } from "../../redux/actions/categoryAction";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState(null);
  const { productList } = useSelector((state) => state?.productReducer);
  const { categoryList } = useSelector((state) => state?.categoryReducer);
  const [loading, setLoading] = useState(false);
  const [sortTitle, setSortTiltle] = useState("asc");

  const dispatch = useDispatch();

  const fetchProductList = async () => {
    setLoading(true);

    try {
      const response = await getProductList();
      if (response.status === 200) {
        dispatch(updateProductList(response?.data));
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const fetchProductcategoryList = async () => {
    try {
      const response = await productCategory();
      if (response.status === 200) {
        dispatch(updateCategoty(response?.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProductList();
    fetchProductcategoryList();
  }, []);

  const sortedProducts = productList
    .filter((p) => !selectedCategory || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortTitle) {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return sortTitle === "asc" ? -1 : 1;
        if (titleA > titleB) return sortTitle === "asc" ? 1 : -1;
        return 0;
      }
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

  const handleDelete = (product) => {
    setOpen(true);
    setProductData(product);
  };

  const handleClose = () => {
    setOpen(false);
    setProductData(null);
  };

  const confirmDeleteProduct = async () => {
    try {
      const response = await deleteProuctApi(productData?.id);
      if (response.status === 200) {
        setOpen(false);
        setProductData(null);
        fetchProductList();
        toast.success("delete successfully");
      }
    } catch (error) {
      console.log("error", error);
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
        <Box padding={6}>
          <Typography variant="h3">Product List</Typography>
          <Box mb={3} display="flex" gap={2}>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              displayEmpty
            >
              <MenuItem value="asc">Price: Low to High</MenuItem>
              <MenuItem value="desc">Price: High to Low</MenuItem>
            </Select>

            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All Categories</MenuItem>
              {categoryList.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={sortTitle}
              onChange={(e) => setSortTiltle(e.target.value)}
              displayEmpty
            >
              <MenuItem value="asc">Title: A to Z</MenuItem>
              <MenuItem value="desc">Title: Z to A</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/new-product")}
            >
              Add Product
            </Button>
          </Box>
          {sortedProducts.length ? (
            <Grid
              container
              spacing={4}
              columns={{ xs: 3, sm: 8, md: 12, lg: 12 }}
            >
              {sortedProducts.map((product) => (
                <Grid
                  item
                  key={product.id}
                  size={{ xs: 2, sm: 4, md: 4, lg: 3 }}
                >
                  <Box
                    onClick={() => console.log(product)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.title}
                      />
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            {product.title}
                          </Typography>
                          <Box sx={{ display: "flex", gap: "5px" }}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() =>
                                navigate(`/edit-product/${product.id}`)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(product)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>

                        <Tooltip title={product.description}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {product.description}
                          </Typography>
                        </Tooltip>
                        <Typography color="text.secondary">
                          ${product.price}
                        </Typography>
                        <Typography variant="body2">
                          {product.category}
                        </Typography>
                        <Typography variant="body2">
                          ⭐ Rating: {product?.rating?.rate ?? "N/A"} (
                          {product?.rating?.count ?? 0} reviews)
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6">No Product found</Typography>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography>
                Are you sure you want to delete{" "}
                <strong>{productData?.title || "this product"}</strong>?
              </Typography>
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={confirmDeleteProduct} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
