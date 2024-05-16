import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSocketContext } from "../../context/socketcontext";

const MyCard = ({ user, id, isOnline }) => {
  const { onlineUsers } = useSocketContext();
  // Function to handle
  console.log(onlineUsers, "usersonline");
  // console.log(id);
  // const isOnline = onlineUsers.includes(id);
  console.log(isOnline, "online");
  const handleLogout = () => {
    // Add logout functionality here
  };

  return (
    <Card
      className={`max-w-md mx-auto mt-8 p-3 rounded-lg shadow-lg border ${
        isOnline ? "bg-green-200" : ""
      }`}
    >
      <CardContent className="flex flex-col items-start">
        {/* User Email */}
        <Typography variant="h5" component="div" className="mb-4">
          {user.email}
        </Typography>
        <Typography variant="h5" component="div" className="mb-4">
          {user._id}
        </Typography>

        {/* Device Info */}
        <Typography variant="body2" className="mb-2">
          Device Type: {user.deviceInfo?.deviceType}
        </Typography>
        {user.deviceInfo?.geolocation ? (
          <>
            <Typography variant="body2" className="mb-2">
              Longitude: {user.deviceInfo.geolocation?.longitude}
            </Typography>
            <Typography variant="body2" className="mb-2">
              Latitude: {user.deviceInfo.geolocation.latitude}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body2" className="mb-2">
              No Access
            </Typography>
            <Typography variant="body2" className="mb-2">
              No Access
            </Typography>
          </>
        )}
        <Typography variant="body2" className="mb-2">
          Device Name: {user.deviceInfo?.deviceName}
        </Typography>
        <Typography variant="body2" className="mb-2">
          IP Address: {user.deviceInfo?.ipAddress}
        </Typography>

        {/* Date */}
        <Typography variant="body2" className="mb-4">
          Date: {new Date(user.createdAt).toLocaleString()}
        </Typography>

        {/* Logout Button */}
        <Button
          variant="contained"
          onClick={handleLogout}
          className="mt-4 btn--color"
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default MyCard;
