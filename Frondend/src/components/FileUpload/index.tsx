import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addImage } from "../../lib/api";
import { Button } from "@mui/material";
import {
  IoArrowForwardSharp,
  IoCheckmark,
  IoClose,
  IoCloudUploadOutline,
  IoWarning,
} from "react-icons/io5";

interface SelectedImageData {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File;
}

export const FileUpload = () => {
  const [selectedImg, setSelectedImg] = useState<SelectedImageData | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { mutate: AddImage } = useMutation({
    mutationFn: addImage,
    onSuccess: (data) => {
      console.log("Image uploaded successfully: ", data);
    },
  });

  const handleUploadImage = async (event: any) => {
    const file = event.target.files[0];

    // Check if file is undefined
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Wrong file type, please");
      return;
    }

    setIsUploading(true);

    try {
      // Create preview url
      const preview_url = URL.createObjectURL(file);

      // Create metadata of image
      const image_data = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        file: file,
      };

      setSelectedImg(image_data);
      setImagePreview(preview_url);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setError("Failed to read file");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("[File upload]: ", error);
    }
  };

  const handleRemoveImage = async () => {
    // clear memory of preview url
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImg(null);
    setImagePreview("");

    // Reset the input file
    const file_input = document.querySelector(
      ".file-input",
    ) as HTMLInputElement;
    if (file_input) {
      file_input.value = "";
    }
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    setSuccess("");
    try {
      const data = await new Promise((resolve, reject) => {
        AddImage(selectedImg?.file, {
          onSuccess: (imageResponse) => {
            setIsUploading(false);
            setSuccess("Avatar uploaded successfully");
            resolve(imageResponse);
          },
          onError: (error) => {
            setIsUploading(false);
            setError("Failed to upload avatar");
            reject(error);
          },
        });
      });
      console.log("Image: ", data);
    } catch (error) {
      console.error("Error uploading image: ", error);
      setIsUploading(false);
      setSuccess("Failed to upload avatar");
    }
  };
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Upload Avatar
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
          <IoWarning className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center gap-2">
          <IoCheckmark className="h-4 w-4" />
          {success}
        </div>
      )}

      {!selectedImg ? (
        <div className="upload-container border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <div className="upload-icon mb-4">
            <IoCloudUploadOutline className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-4">
            Drag and drop an image here or click to select
          </p>
          <Button
            variant="contained"
            component="label"
            disabled={isUploading}
            startIcon={<IoCloudUploadOutline />}
            sx={{
              textTransform: "none",
              backgroundColor: isUploading ? "#9CA3AF" : "#3B82F6",
              "&:hover": {
                backgroundColor: isUploading ? "#9CA3AF" : "#2563EB",
              },
            }}
          >
            {isUploading ? "Processing..." : "Select Image"}
            <input
              type="file"
              accept="image/*"
              className="file-input"
              onChange={handleUploadImage}
              disabled={isUploading}
              hidden
            />
          </Button>
        </div>
      ) : (
        <div className="preview-container">
          {/* Image Preview */}
          <div className="relative mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg border"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              title="Remove image"
              disabled={isUploading}
            >
              <IoClose className="h-4 w-4" />
            </button>
          </div>

          {/* Image Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Image Info:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Name:</span> {selectedImg.name}
              </p>
              <p>
                <span className="font-medium">Size:</span>{" "}
                {formatFileSize(selectedImg.size)}
              </p>
              <p>
                <span className="font-medium">Type:</span> {selectedImg.type}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleRemoveImage}
              variant="contained"
              color="error"
              disabled={isUploading}
              startIcon={<IoClose />}
              sx={{ flex: 1 }}
            >
              Remove
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="success"
              disabled={isUploading}
              startIcon={
                isUploading ? (
                  <IoArrowForwardSharp className="animate-spin" />
                ) : (
                  <IoCheckmark />
                )
              }
              sx={{ flex: 1 }}
            >
              {isUploading ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
