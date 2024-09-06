import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Profile from "./profile.png";
import ChefRequestForm from "../ChefRequest/ChefRequestForm";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Button,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Edit as EditIcon,
  Restaurant as RestaurantIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Fresh green color
    },
    secondary: {
      main: "#FF5722", // Carrot orange color
    },
    background: {
      default: "#F1F8E9", // Light green background
    },
    text: {
      primary: "#33691E", // Dark green text
      secondary: "#689F38", // Medium green text
    },
  },
});

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [showChefRequestForm, setShowChefRequestForm] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        { withCredentials: true }
      );
      setUser(response.data);
      setEditedUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/profile",
        editedUser,
        { withCredentials: true }
      );
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRemoveSavedRecipe = async (recipeId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/users/saved-recipes/${recipeId}`,
        { withCredentials: true }
      );
      fetchUserProfile();
    } catch (error) {
      console.error("Error removing saved recipe:", error);
    }
  };

  const handleRemoveOrderHistory = async (orderId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/users/order-history/${orderId}`,
        { withCredentials: true }
      );
      fetchUserProfile();
    } catch (error) {
      console.error("Error removing order history:", error);
    }
  };

  const handleChefRequest = () => setShowChefRequestForm(true);
  const closeChefRequestForm = () => setShowChefRequestForm(false);

  if (!user)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Loading...
      </Typography>
    );

  const RecipeList = ({ user, handleRemoveSavedRecipe }) => {};

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          color="primary"
          gutterBottom
        >
          User Profile
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ backgroundColor: "#E8F5E9" }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={user.profilePicture || Profile}
                    alt={user.name}
                    sx={{ width: 80, height: 80 }}
                  />
                }
                title={<Typography variant="h5">{user.name}</Typography>}
                subheader={
                  <Typography variant="subtitle1" color="text.secondary">
                    {user.role}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Bio:</strong> {user.bio}
                </Typography>
                <Button
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Edit Profile
                </Button>
                <Button
                  startIcon={<RestaurantIcon />}
                  onClick={handleChefRequest}
                  variant="outlined"
                  color="bacground"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Become a Chef
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#E8F5E9" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                sx={{ mb: 3 }}
              >
                <Tab label="Saved Recipes" />
                <Tab label="Order History" />
              </Tabs>

              {tabValue === 0 && (
                <List>
                  {user.savedRecipes?.map((recipe) => (
                    <ListItem
                      key={recipe.id}
                      sx={{
                        mb: 3,
                        backgroundColor: "#fff", // Light background for better contrast
                        borderRadius: "12px", // Slightly more rounded for modern UI feel
                        padding: "20px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Deeper shadow for depth
                        transition: "transform 0.2s, box-shadow 0.2s", // Smooth transition on hover
                        "&:hover": {
                          transform: "translateY(-5px)", // Slight lift effect on hover
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
                        },
                      }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        {/* Recipe Image */}
                        <Grid item xs={12} md={3}>
                          {recipe.photos.length > 0 ? (
                            <Avatar
                              src={recipe.photos[0]} // Display the first photo from the array
                              alt={recipe.title}
                              variant="square"
                              sx={{
                                width: "100%",
                                height: "160px", // Slightly larger for emphasis
                                borderRadius: "12px",
                                objectFit: "cover", // Ensure the image covers the space neatly
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: "100%",
                                height: "160px",
                                borderRadius: "12px",
                                backgroundColor: "#e0e0e0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="h6" color="textSecondary">
                                No Image
                              </Typography>
                            </Avatar>
                          )}
                        </Grid>

                        {/* Recipe Details */}
                        <Grid item xs={12} md={6}>
                          <ListItemText
                            primary={
                              <Typography
                                variant="h6"
                                sx={{ color: "#333", fontWeight: "bold" }}
                              >
                                {recipe.title}
                              </Typography>
                            }
                            secondary={
                              <div style={{ marginTop: "10px" }}>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#757575", marginBottom: "4px" }}
                                >
                                  Chef: {recipe.chefName}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#757575", marginBottom: "4px" }}
                                >
                                  Cooking Time: {recipe.cookingTime} mins
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#757575", marginBottom: "4px" }}
                                >
                                  Cuisine Type: {recipe.cuisineType}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#757575", marginBottom: "4px" }}
                                >
                                  Servings: {recipe.servings}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#757575", marginBottom: "4px" }}
                                >
                                  Calories: {recipe.nutrition.calories}
                                </Typography>
                              </div>
                            }
                          />
                        </Grid>
                        {/* Action Buttons */}
                        <Grid
                          item
                          xs={12}
                          md={3}
                          sx={{
                            display: "flex",
                            flexDirection: "column", // Stack buttons vertically
                            alignItems: "flex-end", // Align buttons to the right
                            gap: "12px", // Add spacing between buttons
                          }}
                        >
                          {/* View Details Button */}
                          <Button
                            variant="contained" // Make it more prominent
                            onClick={() => navigate(`/recipe/${recipe._id}`)}
                            sx={{
                              backgroundColor: "#4caf50", // Primary color for action
                              color: "#fff",
                              "&:hover": {
                                backgroundColor: "#388e3c",
                              },
                              width: "100%", // Make it full-width for consistency
                              transition: "background-color 0.3s ease-in-out",
                            }}
                          >
                            View Details
                          </Button>

                          {/* Delete Button */}
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveSavedRecipe(recipe.id)}
                            sx={{
                              color: "#e53935",
                              transition: "color 0.2s",
                              "&:hover": { color: "#d32f2f" }, // Darker shade on hover
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              )}

              {tabValue === 1 && (
                <List>
                  {user.orderHistory?.map((order) => (
                    <ListItem
                      key={order.id}
                      sx={{
                        mb: 3,
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        padding: "16px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        {/* Order Details */}
                        <Grid item xs={12} md={8}>
                          <ListItemText
                            primary={
                              <Typography variant="h6" color="primary">
                                Order on{" "}
                                {new Date(order.orderDate).toLocaleDateString()}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Status: {order.status}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Total Amount: ${order.totalAmount.toFixed(2)}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Chef: {order.chef.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Delivery Method: {order.deliveryMethod}
                                </Typography>

                                {/* List of Dishes Ordered */}
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  sx={{ mt: 1 }}
                                >
                                  Dishes:
                                  <ul>
                                    {order.dishes.map((dishItem) => (
                                      <li key={dishItem.dish.id}>
                                        {dishItem.dish.name} -{" "}
                                        {dishItem.quantity}x
                                      </li>
                                    ))}
                                  </ul>
                                </Typography>
                              </>
                            }
                          />
                        </Grid>

                        {/* Delete Button */}
                        <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveOrderHistory(order.id)}
                            sx={{ color: "#ff5722" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Dialog open={isEditing} onClose={handleCancel} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              name="name"
              label="Name"
              value={editedUser.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              value={editedUser.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="bio"
              label="Bio"
              value={editedUser.bio}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Chef Request Form as Popup */}
        <Dialog
          open={showChefRequestForm}
          onClose={closeChefRequestForm}
          maxWidth="md"
          fullWidth
          sx={{ zIndex: 1050 }} // Ensures the Dialog is behind the SweetAlert
        >
          <DialogContent>
            <ChefRequestForm onClose={closeChefRequestForm} />
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default UserProfile;
