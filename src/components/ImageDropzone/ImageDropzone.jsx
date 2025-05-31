import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImageDropzone = ({ value, onChange, error }) => {
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        console.log("acceptedFiles", acceptedFiles);
        onChange(acceptedFiles[0]);
      }
    },
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => {
    if (value && typeof value === "object") {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(value);
    }
  }, [value]);

  const handleRemoveImage = () => {
    onChange(null);
    setPreview(null);
  };

  return (
    <Box sx={{ mb: 2 }}>
      {preview ? (
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            width: 200,
          }}
        >
          <img
            src={preview}
            alt="Preview"
            width={200}
            style={{
              borderRadius: 8,
              display: "block",
            }}
          />
          <IconButton
            size="small"
            onClick={handleRemoveImage}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              ":hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #aaa",
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            borderRadius: 2,
            backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
          }}
        >
          <input {...getInputProps()} />
          <Typography>
            {isDragActive
              ? "Drop the image here..."
              : "Drag & drop an image, or click to select"}
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default ImageDropzone;
