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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductList, productCategory } from "../../services/api";
import { updateProductList } from "../../redux/actions/productAction";
import { updateCategoty } from "../../redux/actions/categoryAction";

const Dashboard = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { productList } = useSelector((state) => state?.productReducer);
  const { categoryList } = useSelector((state) => state?.categoryReducer);
  const dispatch = useDispatch();

  const fetchProductList = async () => {
    try {
      const response = await getProductList();
      if (response.status === 200) {
        dispatch(updateProductList(response?.data));
      }
    } catch (error) {
      console.log("error", error);
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
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
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
        <Button
          variant="text"
          onClick={() => navigate("/new-product")}
          sx={{ padding: 0, textTransform: "none" }}
        >
          Add Product
        </Button>
      </Box>
      <Grid container spacing={4} columns={{ xs: 3, sm: 8, md: 12 }}>
        {sortedProducts.map((product) => (
          <Grid item key={product.id} size={{ xs: 2, sm: 4, md: 3 }}>
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
                  <Typography variant="h6">{product.title}</Typography>
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
                  <Typography variant="body2">{product.category}</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
